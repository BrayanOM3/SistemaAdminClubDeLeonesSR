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
    public Actividad Actividad { get; private set; } = null!;
    public Beneficiario Beneficiario { get; private set; } = null!;

    private ActividadBeneficiario() { }

    public ActividadBeneficiario(Guid actividadId, Guid beneficiarioId, bool asistio = true, string? observaciones = null)
    {
        ActividadId = actividadId;
        BeneficiarioId = beneficiarioId;
        Asistio = asistio;
        Observaciones = observaciones;
    }

    public void Actualizar(bool asistio, string? observaciones)
    {
        Asistio = asistio;
        Observaciones = observaciones;
        MarcarActualizado();
    }
}