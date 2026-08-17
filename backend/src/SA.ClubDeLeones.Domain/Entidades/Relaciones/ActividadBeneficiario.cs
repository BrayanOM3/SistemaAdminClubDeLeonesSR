using SA.ClubDeLeones.Domain.Common;

namespace SA.ClubDeLeones.Domain.Entidades.Relaciones;

public class ActividadBeneficiario : EntidadBase
{
    public Guid ActividadId { get; private set; }
    public Guid BeneficiarioId { get; private set; }
    public DateTime FechaAsistencia { get; private set; } = DateTime.UtcNow;
    public bool Asistio { get; private set; } = true;
    public string? Observaciones { get; private set; }

    // Relaciones
    public Actividad? Actividad { get; private set; }
    public Beneficiario? Beneficiario { get; private set; }

    private ActividadBeneficiario() { }

    public ActividadBeneficiario(Guid actividadId, Guid beneficiarioId, bool asistio = true, string? observaciones = null)
    {
        ActividadId = actividadId;
        BeneficiarioId = beneficiarioId;
        Asistio = asistio;
        Observaciones = observaciones;
    }

    public void MarcarAsistencia(bool asistio, string? observaciones = null)
    {
        Asistio = asistio;
        Observaciones = observaciones;
        MarcarActualizado();
    }
}