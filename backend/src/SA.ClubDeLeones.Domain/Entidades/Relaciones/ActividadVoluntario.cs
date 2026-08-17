using SA.ClubDeLeones.Domain.Common;

namespace SA.ClubDeLeones.Domain.Entidades.Relaciones;

public class ActividadVoluntario : EntidadBase
{
    public Guid ActividadId { get; private set; }
    public Guid VoluntarioId { get; private set; }
    public DateTime FechaParticipacion { get; private set; } = DateTime.UtcNow;
    public string? Rol { get; private set; }
    public string? Observaciones { get; private set; }

    // Relaciones
    public Actividad Actividad { get; private set; } = null!;
    public Voluntario Voluntario { get; private set; } = null!;

    private ActividadVoluntario() { }

    public ActividadVoluntario(Guid actividadId, Guid voluntarioId, string? rol = null, string? observaciones = null)
    {
        ActividadId = actividadId;
        VoluntarioId = voluntarioId;
        Rol = rol;
        Observaciones = observaciones;
    }

    public void Actualizar(string? rol, string? observaciones)
    {
        Rol = rol;
        Observaciones = observaciones;
        MarcarActualizado();
    }
}