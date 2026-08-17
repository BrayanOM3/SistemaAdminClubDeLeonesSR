using SA.ClubDeLeones.Domain.Common;
using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Domain.Entidades;

public class Usuario : EntidadBase
{
    public string NombreUsuario { get; private set; } = string.Empty;
    public string Correo { get; private set; } = string.Empty;
    public string PasswordHash { get; private set; } = string.Empty;
    public RolUsuario Rol { get; private set; }
    public EstadoUsuario Estado { get; private set; } = EstadoUsuario.Activo;
    public Guid? VoluntarioId { get; private set; }

    // Relación
    public Voluntario? Voluntario { get; private set; }

    private Usuario() { }

    public Usuario(
        string nombreUsuario,
        string correo,
        string passwordHash,
        RolUsuario rol,
        Guid? voluntarioId = null)
    {
        NombreUsuario = nombreUsuario;
        Correo = correo;
        PasswordHash = passwordHash;
        Rol = rol;
        VoluntarioId = voluntarioId;
    }

    public void Actualizar(
        string nombreUsuario,
        string correo,
        RolUsuario rol,
        EstadoUsuario estado,
        Guid? voluntarioId)
    {
        NombreUsuario = nombreUsuario;
        Correo = correo;
        Rol = rol;
        Estado = estado;
        VoluntarioId = voluntarioId;
        MarcarActualizado();
    }

    public void CambiarPassword(string passwordHash)
    {
        PasswordHash = passwordHash;
        MarcarActualizado();
    }

    public void CambiarEstado(EstadoUsuario estado)
    {
        Estado = estado;
        MarcarActualizado();
    }
}