using SA.ClubDeLeones.Domain.Common;
using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Domain.Entidades;

public class AyudaSocial : EntidadBase
{
    public Guid BeneficiarioId { get; private set; }
    public TipoAyuda Tipo { get; private set; }
    public string Descripcion { get; private set; } = string.Empty;
    public decimal? Monto { get; private set; }
    public DateTime FechaEntrega { get; private set; }
    public Guid? CampanaId { get; private set; }
    public Guid? VoluntarioId { get; private set; }
    public EstadoAyuda Estado { get; private set; } = EstadoAyuda.Pendiente;

    // Relaciones
    public Beneficiario Beneficiario { get; private set; } = null!;
    public Campana? Campana { get; private set; }
    public Voluntario? Voluntario { get; private set; }

    protected AyudaSocial()
    {
        FechaEntrega = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
    }

    public AyudaSocial(
        Guid beneficiarioId,
        TipoAyuda tipo,
        string descripcion,
        DateTime fechaEntrega,
        decimal? monto = null,
        Guid? campanaId = null,
        Guid? voluntarioId = null)
    {
        BeneficiarioId = beneficiarioId;
        Tipo = tipo;
        Descripcion = descripcion;
        FechaEntrega = fechaEntrega;
        Monto = monto;
        CampanaId = campanaId;
        VoluntarioId = voluntarioId;
    }

    public void Actualizar(
        TipoAyuda tipo,
        string descripcion,
        DateTime fechaEntrega,
        decimal? monto,
        Guid? campanaId,
        Guid? voluntarioId,
        EstadoAyuda estado)
    {
        Tipo = tipo;
        Descripcion = descripcion;
        FechaEntrega = fechaEntrega;
        Monto = monto;
        CampanaId = campanaId;
        VoluntarioId = voluntarioId;
        Estado = estado;
        MarcarActualizado();
    }

    public void CambiarEstado(EstadoAyuda estado)
    {
        Estado = estado;
        MarcarActualizado();
    }
}