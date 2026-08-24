using SA.ClubDeLeones.Domain.Common;

namespace SA.ClubDeLeones.Domain.Entidades.Relaciones;

public class ActividadVoluntario : EntidadBase
{
    public Guid ActividadId { get; private set; }
    public Guid VoluntarioId { get; private set; }
    public DateTime FechaParticipacion { get; private set; } = DateTime.UtcNow;
    public string? RolEnActividad { get; private set; }

    // Relaciones
    public Actividad? Actividad { get; private set; }
    public Voluntario? Voluntario { get; private set; }

    protected ActividadVoluntario()
    {
        FechaParticipacion = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
    }

    public ActividadVoluntario(Guid actividadId, Guid voluntarioId, string? rolEnActividad = null)
    {
        ActividadId = actividadId;
        VoluntarioId = voluntarioId;
        RolEnActividad = rolEnActividad;
    }

    public void ActualizarRol(string? rolEnActividad)
    {
        RolEnActividad = rolEnActividad;
        MarcarActualizado();
    }
}