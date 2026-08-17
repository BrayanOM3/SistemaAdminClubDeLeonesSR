using SA.ClubDeLeones.Domain.Common;

namespace SA.ClubDeLeones.Domain.Entidades.Relaciones;

public class CampanaVoluntario : EntidadBase
{
    public Guid CampanaId { get; private set; }
    public Guid VoluntarioId { get; private set; }
    public DateTime FechaVinculacion { get; private set; } = DateTime.UtcNow;
    public string? Rol { get; private set; }
    public string? Observaciones { get; private set; }

    // Relaciones
    public Campana Campana { get; private set; } = null!;
    public Voluntario Voluntario { get; private set; } = null!;

    private CampanaVoluntario() { }

    public CampanaVoluntario(Guid campanaId, Guid voluntarioId, string? rol = null, string? observaciones = null)
    {
        CampanaId = campanaId;
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