using SA.ClubDeLeones.Application.Dtos.AyudasSociales;
using SA.ClubDeLeones.Application.Dtos.Calendario;
using SA.ClubDeLeones.Application.Dtos.Donaciones;
using SA.ClubDeLeones.Application.Interfaces.Servicios;

namespace SA.ClubDeLeones.Application.Servicios;

/// <summary>
/// Compone la vista unificada del calendario a partir de los servicios existentes
/// (análogo a ReportesController): Campañas y Actividades se listan una a una;
/// Donaciones y Ayudas Sociales se agregan por día.
/// </summary>
public class CalendarioServicio : ICalendarioServicio
{
    private readonly ICampanaServicio _campanas;
    private readonly IActividadServicio _actividades;
    private readonly IDonacionServicio _donaciones;
    private readonly IAyudaSocialServicio _ayudasSociales;

    public CalendarioServicio(
        ICampanaServicio campanas,
        IActividadServicio actividades,
        IDonacionServicio donaciones,
        IAyudaSocialServicio ayudasSociales)
    {
        _campanas = campanas;
        _actividades = actividades;
        _donaciones = donaciones;
        _ayudasSociales = ayudasSociales;
    }

    public async Task<IReadOnlyList<EventoCalendarioDto>> ObtenerAsync(DateOnly desde, DateOnly hasta)
    {
        if (desde > hasta)
            throw new ArgumentException("'desde' no puede ser posterior a 'hasta'.");

        // Rango media-abierto [desde, hasta + 1 día) a medianoche UTC, consistente con
        // las fechas Utc de la BD y con la agrupación por día que muestra el frontend.
        var inicioUtc = desde.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
        var finExclusivoUtc = hasta.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc).AddDays(1);

        var campanas = await _campanas.ObtenerTodosAsync();
        var actividades = await _actividades.ObtenerTodosAsync();
        var donaciones = await _donaciones.ObtenerTodosAsync();
        var ayudas = await _ayudasSociales.ObtenerTodosAsync();

        var eventos = new List<EventoCalendarioDto>();

        // Campañas: un evento por campaña, anclado en FechaInicio.
        foreach (var c in campanas.Where(c => c.FechaInicio >= desde && c.FechaInicio <= hasta))
        {
            eventos.Add(new EventoCalendarioDto(
                c.Id, TipoEventoCalendario.Campana, c.Nombre,
                c.FechaInicio, c.FechaFin, false, null, null));
        }

        // Actividades: un evento por actividad, día puntual (FechaFin = FechaInicio).
        foreach (var a in actividades.Where(a => a.Fecha >= inicioUtc && a.Fecha < finExclusivoUtc))
        {
            var dia = DateOnly.FromDateTime(a.Fecha);
            eventos.Add(new EventoCalendarioDto(
                a.Id, TipoEventoCalendario.Actividad, a.Nombre,
                dia, dia, false, null, null));
        }

        // Donaciones: agrupadas por día, con cantidad y monto total de los montos no nulos.
        foreach (var grupo in donaciones
            .Where(d => d.Fecha >= inicioUtc && d.Fecha < finExclusivoUtc)
            .GroupBy(d => DateOnly.FromDateTime(d.Fecha)))
        {
            eventos.Add(new EventoCalendarioDto(
                Guid.Empty, TipoEventoCalendario.Donacion,
                $"{grupo.Count()} donaciones", grupo.Key, grupo.Key, true, grupo.Count(),
                grupo.Where(d => d.Monto.HasValue).Sum(d => d.Monto!.Value)));
        }

        // Ayudas sociales: agrupadas por día; el monto total no aplica (solo Donaciones).
        foreach (var grupo in ayudas
            .Where(a => a.FechaEntrega >= inicioUtc && a.FechaEntrega < finExclusivoUtc)
            .GroupBy(a => DateOnly.FromDateTime(a.FechaEntrega)))
        {
            eventos.Add(new EventoCalendarioDto(
                Guid.Empty, TipoEventoCalendario.AyudaSocial,
                $"{grupo.Count()} ayudas sociales", grupo.Key, grupo.Key, true, grupo.Count(), null));
        }

        return eventos
            .OrderBy(e => e.FechaInicio)
            .ThenBy(e => e.Tipo)
            .ToList()
            .AsReadOnly();
    }

    public async Task<IReadOnlyList<DonacionDto>> ObtenerDonacionesPorDiaAsync(DateOnly fecha)
    {
        var todas = await _donaciones.ObtenerTodosAsync();
        return todas
            .Where(d => DateOnly.FromDateTime(d.Fecha) == fecha)
            .OrderBy(d => d.Fecha)
            .ToList()
            .AsReadOnly();
    }

    public async Task<IReadOnlyList<AyudaSocialDto>> ObtenerAyudasSocialesPorDiaAsync(DateOnly fecha)
    {
        var todas = await _ayudasSociales.ObtenerTodosAsync();
        return todas
            .Where(a => DateOnly.FromDateTime(a.FechaEntrega) == fecha)
            .OrderBy(a => a.FechaEntrega)
            .ToList()
            .AsReadOnly();
    }
}