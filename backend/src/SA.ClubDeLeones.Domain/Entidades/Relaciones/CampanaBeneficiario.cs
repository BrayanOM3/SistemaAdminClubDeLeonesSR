using SA.ClubDeLeones.Domain.Common;

namespace SA.ClubDeLeones.Domain.Entidades.Relaciones;

public class CampanaBeneficiario : EntidadBase
{
    public Guid CampanaId { get; private set; }
    public Guid BeneficiarioId { get; private set; }
    public DateTime FechaAsignacion { get; private set; } = DateTime.UtcNow;
    public string? Observaciones { get; private set; }

    // Relaciones
    public Campana? Campana { get; private set; }
    public Beneficiario? Beneficiario { get; private set; }

    protected CampanaBeneficiario()
    {
        FechaAsignacion = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
    }

    public CampanaBeneficiario(Guid campanaId, Guid beneficiarioId, string? observaciones = null)
    {
        CampanaId = campanaId;
        BeneficiarioId = beneficiarioId;
        Observaciones = observaciones;
    }

    public void ActualizarObservaciones(string? observaciones)
    {
        Observaciones = observaciones;
        MarcarActualizado();
    }
}