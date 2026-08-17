using SA.ClubDeLeones.Domain.Common;
using SA.ClubDeLeones.Domain.Enums;
using SA.ClubDeLeones.Domain.Entidades.Relaciones;

namespace SA.ClubDeLeones.Domain.Entidades;

public class Campana : EntidadBase
{
    public string Nombre { get; private set; } = string.Empty;
    public string Descripcion { get; private set; } = string.Empty;
    public DateOnly FechaInicio { get; private set; }
    public DateOnly? FechaFin { get; private set; }
    public decimal? ObjetivoMonto { get; private set; }
    public EstadoCampana Estado { get; private set; } = EstadoCampana.Planificada;
    public TipoCampana Tipo { get; private set; }

    // Relaciones
    public ICollection<Donacion> Donaciones { get; private set; } = new List<Donacion>();
    public ICollection<AyudaSocial> AyudasGeneradas { get; private set; } = new List<AyudaSocial>();
    public ICollection<CampanaBeneficiario> Beneficiarios { get; private set; } = new List<CampanaBeneficiario>();
    public ICollection<CampanaVoluntario> Voluntarios { get; private set; } = new List<CampanaVoluntario>();
    public ICollection<Actividad> Actividades { get; private set; } = new List<Actividad>();

    private Campana() { }

    public Campana(
        string nombre,
        string descripcion,
        DateOnly fechaInicio,
        TipoCampana tipo,
        DateOnly? fechaFin = null,
        decimal? objetivoMonto = null)
    {
        Nombre = nombre;
        Descripcion = descripcion;
        FechaInicio = fechaInicio;
        Tipo = tipo;
        FechaFin = fechaFin;
        ObjetivoMonto = objetivoMonto;
    }

    public void Actualizar(
        string nombre,
        string descripcion,
        DateOnly fechaInicio,
        DateOnly? fechaFin,
        decimal? objetivoMonto,
        TipoCampana tipo,
        EstadoCampana estado)
    {
        Nombre = nombre;
        Descripcion = descripcion;
        FechaInicio = fechaInicio;
        FechaFin = fechaFin;
        ObjetivoMonto = objetivoMonto;
        Tipo = tipo;
        Estado = estado;
        MarcarActualizado();
    }

    public void CambiarEstado(EstadoCampana estado)
    {
        Estado = estado;
        MarcarActualizado();
    }

    // Propiedad calculada (no se mapea a BD)
    public decimal MontoRecaudado => Donaciones
        .Where(d => d.Tipo == TipoDonacion.Monetaria && d.Monto.HasValue)
        .Sum(d => d.Monto!.Value);
}