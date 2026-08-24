using SA.ClubDeLeones.Domain.Common;
using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Domain.Entidades;

public class Donacion : EntidadBase
{
    public string DonanteNombre { get; private set; } = string.Empty;
    public TipoDonacion Tipo { get; private set; }
    public decimal? Monto { get; private set; }
    public string? Descripcion { get; private set; }
    public DateTime Fecha { get; private set; }
    public string? ReciboNumero { get; private set; }
    public Guid? CampanaId { get; private set; }
    public Guid? VoluntarioId { get; private set; }

    // Relaciones
    public Campana? Campana { get; private set; }
    public Voluntario? Voluntario { get; private set; }

    protected Donacion()
    {
        Fecha = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
    }

    public Donacion(
        string donanteNombre,
        TipoDonacion tipo,
        DateTime fecha,
        decimal? monto = null,
        string? descripcion = null,
        string? reciboNumero = null,
        Guid? campanaId = null,
        Guid? voluntarioId = null)
    {
        DonanteNombre = donanteNombre;
        Tipo = tipo;
        Fecha = fecha;
        Monto = monto;
        Descripcion = descripcion;
        ReciboNumero = reciboNumero;
        CampanaId = campanaId;
        VoluntarioId = voluntarioId;

        if (Tipo == TipoDonacion.Monetaria && !Monto.HasValue)
            throw new ArgumentException("Las donaciones monetarias requieren un monto.");
    }

    public void Actualizar(
        string donanteNombre,
        TipoDonacion tipo,
        DateTime fecha,
        decimal? monto,
        string? descripcion,
        string? reciboNumero,
        Guid? campanaId,
        Guid? voluntarioId)
    {
        DonanteNombre = donanteNombre;
        Tipo = tipo;
        Fecha = fecha;
        Monto = monto;
        Descripcion = descripcion;
        ReciboNumero = reciboNumero;
        CampanaId = campanaId;
        VoluntarioId = voluntarioId;
        MarcarActualizado();

        if (Tipo == TipoDonacion.Monetaria && !Monto.HasValue)
            throw new ArgumentException("Las donaciones monetarias requieren un monto.");
    }
}