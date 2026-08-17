using SA.ClubDeLeones.Domain.Common;

namespace SA.ClubDeLeones.Domain.Entidades.Relaciones;

public class CampanaVoluntario : EntidadBase
{
    public Guid CampanaId { get; private set; }
    public Guid VoluntarioId { get; private set; }
    public DateTime FechaParticipacion { get; private set; } = DateTime.UtcNow;
    public string? RolEnCampana { get; private set; }

    // Relaciones
    public Campana? Campana { get; private set; }
    public Voluntario? Voluntario { get; private set; }

    private CampanaVoluntario() { }

    public CampanaVoluntario(Guid campanaId, Guid voluntarioId, string? rolEnCampana = null)
    {
        CampanaId = campanaId;
        VoluntarioId = voluntarioId;
        RolEnCampana = rolEnCampana;
    }

    public void ActualizarRol(string? rolEnCampana)
    {
        RolEnCampana = rolEnCampana;
        MarcarActualizado();
    }
}