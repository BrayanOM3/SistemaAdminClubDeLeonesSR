using FluentAssertions;
using Moq;
using SA.ClubDeLeones.Application.Dtos.Actividades;
using SA.ClubDeLeones.Application.Dtos.AyudasSociales;
using SA.ClubDeLeones.Application.Dtos.Calendario;
using SA.ClubDeLeones.Application.Dtos.Campanas;
using SA.ClubDeLeones.Application.Dtos.Donaciones;
using SA.ClubDeLeones.Application.Interfaces.Servicios;
using SA.ClubDeLeones.Application.Servicios;
using SA.ClubDeLeones.Domain.Enums;
using Xunit;

namespace SA.ClubDeLeones.Tests;

/// <summary>
/// Verifica la composición del calendario: unifica los 4 tipos, agrupa Donaciones y
/// Ayudas Sociales por día con sus cantidades/montos, respeta el rango [desde, hasta]
/// y valida el rango inverso.
/// </summary>
public class CalendarioServicioTests
{
    private static readonly DateOnly Sep1 = new(2026, 9, 1);
    private static readonly DateOnly Sep30 = new(2026, 9, 30);

    /// <summary>Crea un DateTime en UTC (consistente con lo que Npgsql devuelve).</summary>
    private static DateTime Utc(int anio, int mes, int dia, int hora = 0, int minuto = 0) =>
        new(anio, mes, dia, hora, minuto, 0, DateTimeKind.Utc);

    private static CalendarioServicio CrearServicio(
        IReadOnlyList<CampanaDto>? campanas = null,
        IReadOnlyList<ActividadDto>? actividades = null,
        IReadOnlyList<DonacionDto>? donaciones = null,
        IReadOnlyList<AyudaSocialDto>? ayudas = null)
    {
        var mCampanas = new Mock<ICampanaServicio>();
        mCampanas.Setup(s => s.ObtenerTodosAsync()).ReturnsAsync(campanas ?? Array.Empty<CampanaDto>());

        var mActividades = new Mock<IActividadServicio>();
        mActividades.Setup(s => s.ObtenerTodosAsync()).ReturnsAsync(actividades ?? Array.Empty<ActividadDto>());

        var mDonaciones = new Mock<IDonacionServicio>();
        mDonaciones.Setup(s => s.ObtenerTodosAsync()).ReturnsAsync(donaciones ?? Array.Empty<DonacionDto>());

        var mAyudas = new Mock<IAyudaSocialServicio>();
        mAyudas.Setup(s => s.ObtenerTodosAsync()).ReturnsAsync(ayudas ?? Array.Empty<AyudaSocialDto>());

        return new CalendarioServicio(mCampanas.Object, mActividades.Object, mDonaciones.Object, mAyudas.Object);
    }

    private static CampanaDto Campana(DateOnly inicio, DateOnly? fin = null) =>
        new(Guid.NewGuid(), "Campaña", "Descripción", inicio, fin, null, EstadoCampana.Activa, TipoCampana.Recaudacion, 0m);

    private static ActividadDto Actividad(DateTime fecha) =>
        new(Guid.NewGuid(), "Actividad", "Descripción", TipoActividad.Evento, fecha, null, null, null);

    private static DonacionDto Donacion(DateTime fecha, TipoDonacion tipo = TipoDonacion.Monetaria, decimal? monto = null) =>
        new(Guid.NewGuid(), "Donante", tipo, monto, null, fecha, null, null, null, null, null);

    private static AyudaSocialDto Ayuda(DateTime fecha, decimal? monto = null) =>
        new(Guid.NewGuid(), Guid.NewGuid(), "Beneficiario", TipoAyuda.Alimentos, "Descripción", monto, fecha,
            null, null, null, null, EstadoAyuda.Entregada);

    [Fact]
    public async Task ObtenerAsync_DevuelveUnEventoPorCadaTipo_ConFechasAscendentes()
    {
        var campana = Campana(new DateOnly(2026, 9, 2));
        var actividad = Actividad(Utc(2026, 9, 1, 10));
        var donacion = Donacion(Utc(2026, 9, 3, 12));
        var ayuda = Ayuda(Utc(2026, 9, 4, 9));

        var servicio = CrearServicio(
            campanas: new[] { campana },
            actividades: new[] { actividad },
            donaciones: new[] { donacion },
            ayudas: new[] { ayuda });

        var eventos = await servicio.ObtenerAsync(Sep1, Sep30);

        eventos.Should().HaveCount(4);
        eventos.Select(e => e.FechaInicio)
            .Should().Equal(new DateOnly(2026, 9, 1), new DateOnly(2026, 9, 2), new DateOnly(2026, 9, 3), new DateOnly(2026, 9, 4));
        eventos.Select(e => e.Tipo)
            .Should().Equal(TipoEventoCalendario.Actividad, TipoEventoCalendario.Campana, TipoEventoCalendario.Donacion, TipoEventoCalendario.AyudaSocial);

        eventos.Single(e => e.Tipo == TipoEventoCalendario.Campana).EsAgregado.Should().BeFalse();
        eventos.Single(e => e.Tipo == TipoEventoCalendario.Actividad).EsAgregado.Should().BeFalse();
        // La actividad es de día puntual: FechaFin == FechaInicio.
        var evActividad = eventos.Single(e => e.Tipo == TipoEventoCalendario.Actividad);
        evActividad.FechaFin.Should().Be(evActividad.FechaInicio);
    }

    [Fact]
    public async Task ObtenerAsync_AgrupaDonacionesPorDia_Y_SumaSoloMontosNoNulos()
    {
        var donaciones = new[]
        {
            Donacion(Utc(2026, 9, 10, 8), monto: 10_000m),
            Donacion(Utc(2026, 9, 10, 14), monto: 20_000m),
            Donacion(Utc(2026, 9, 10, 16), TipoDonacion.EnEspecie, null),
            Donacion(Utc(2026, 9, 12, 9), monto: 5_000m),
        };

        var servicio = CrearServicio(donaciones: donaciones);

        var eventos = await servicio.ObtenerAsync(Sep1, Sep30);

        var dia10 = eventos.Single(e => e.Tipo == TipoEventoCalendario.Donacion && e.FechaInicio == new DateOnly(2026, 9, 10));
        dia10.EsAgregado.Should().BeTrue();
        dia10.Id.Should().Be(Guid.Empty);
        dia10.CantidadAgregada.Should().Be(3);
        dia10.MontoTotalAgregado.Should().Be(30_000m);
        dia10.Titulo.Should().Be("3 donaciones");
        dia10.FechaFin.Should().Be(dia10.FechaInicio);

        var dia12 = eventos.Single(e => e.Tipo == TipoEventoCalendario.Donacion && e.FechaInicio == new DateOnly(2026, 9, 12));
        dia12.CantidadAgregada.Should().Be(1);
        dia12.MontoTotalAgregado.Should().Be(5_000m);
    }

    [Fact]
    public async Task ObtenerAsync_AgrupaAyudasSocialesPorDia_SinMontoTotal()
    {
        var ayudas = new[]
        {
            Ayuda(Utc(2026, 9, 10, 9), monto: 100m),
            Ayuda(Utc(2026, 9, 10, 15), monto: 200m),
        };

        var servicio = CrearServicio(ayudas: ayudas);

        var eventos = await servicio.ObtenerAsync(Sep1, Sep30);

        var dia10 = eventos.Single(e => e.Tipo == TipoEventoCalendario.AyudaSocial);
        dia10.EsAgregado.Should().BeTrue();
        dia10.CantidadAgregada.Should().Be(2);
        dia10.MontoTotalAgregado.Should().BeNull();
        dia10.Titulo.Should().Be("2 ayudas sociales");
    }

    [Fact]
    public async Task ObtenerAsync_ExcluyeCampanasCuyoInicioQuedaFueraDelRango()
    {
        // FechaInicio antes del rango (aunque FechaFin caiga dentro): no se muestra.
        var inicioAnterior = Campana(new DateOnly(2026, 8, 20), new DateOnly(2026, 9, 15));
        // FechaInicio después del rango.
        var inicioPosterior = Campana(new DateOnly(2026, 10, 1));
        var dentro = Campana(new DateOnly(2026, 9, 5));

        var servicio = CrearServicio(campanas: new[] { inicioAnterior, inicioPosterior, dentro });

        var eventos = await servicio.ObtenerAsync(Sep1, Sep30);

        var eventosCampana = eventos.Where(e => e.Tipo == TipoEventoCalendario.Campana).ToList();
        eventosCampana.Should().ContainSingle().Which.Id.Should().Be(dentro.Id);
    }

    [Fact]
    public async Task ObtenerAsync_IncluyeActividadEnElLimiteSuperior_DelRango()
    {
        var actividad = Actividad(Utc(2026, 9, 30, 23));

        var servicio = CrearServicio(actividades: new[] { actividad });

        var eventos = await servicio.ObtenerAsync(Sep1, Sep30);

        eventos.Should().ContainSingle(e => e.Tipo == TipoEventoCalendario.Actividad);
    }

    [Fact]
    public async Task ObtenerAsync_ExcluyeRegistrosFueraDeRango_PorFechasUtc()
    {
        var enLimiteInferior = Donacion(Utc(2026, 9, 1, 0, 0), monto: 100m);   // medianoche de desde: incluida
        var anterior = Donacion(Utc(2026, 8, 31, 23, 0), monto: 100m);          // día anterior: excluida
        var posterior = Actividad(Utc(2026, 10, 1, 0, 0));                      // justo después de hasta: excluida

        var servicio = CrearServicio(donaciones: new[] { enLimiteInferior, anterior }, actividades: new[] { posterior });

        var eventos = await servicio.ObtenerAsync(Sep1, Sep30);

        eventos.Should().ContainSingle(e => e.Tipo == TipoEventoCalendario.Donacion);
        eventos.Should().NotContain(e => e.Tipo == TipoEventoCalendario.Actividad);
    }

    [Fact]
    public async Task ObtenerAsync_RangoInverso_LanzaArgumentException()
    {
        var servicio = CrearServicio();

        var act = () => servicio.ObtenerAsync(Sep30, Sep1);

        await act.Should().ThrowAsync<ArgumentException>();
    }

    [Fact]
    public async Task ObtenerAsync_DiaConUnaSolaDonacion_GeneraAgregadoDeUno()
    {
        var servicio = CrearServicio(donaciones: new[] { Donacion(Utc(2026, 9, 10, 12), monto: 100m) });

        var eventos = await servicio.ObtenerAsync(Sep1, Sep30);

        var dia10 = eventos.Single(e => e.Tipo == TipoEventoCalendario.Donacion);
        dia10.EsAgregado.Should().BeTrue();
        dia10.CantidadAgregada.Should().Be(1);
        dia10.MontoTotalAgregado.Should().Be(100m);
    }

    [Fact]
    public async Task ObtenerDonacionesPorDiaAsync_DevuelveSoloLasDelDiaPedido()
    {
        var delDia = Donacion(Utc(2026, 9, 15, 14, 30), monto: 100m);
        var otroDia = Donacion(Utc(2026, 9, 16, 9, 0), monto: 200m);

        var servicio = CrearServicio(donaciones: new[] { delDia, otroDia });

        var resultado = await servicio.ObtenerDonacionesPorDiaAsync(new DateOnly(2026, 9, 15));

        resultado.Should().ContainSingle().Which.Id.Should().Be(delDia.Id);
    }

    [Fact]
    public async Task ObtenerAyudasSocialesPorDiaAsync_DevuelveSoloLasDelDiaPedido()
    {
        var delDia = Ayuda(Utc(2026, 9, 15, 10, 0));
        var otroDia = Ayuda(Utc(2026, 9, 16, 10, 0));

        var servicio = CrearServicio(ayudas: new[] { delDia, otroDia });

        var resultado = await servicio.ObtenerAyudasSocialesPorDiaAsync(new DateOnly(2026, 9, 15));

        resultado.Should().ContainSingle().Which.Id.Should().Be(delDia.Id);
    }
}