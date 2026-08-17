using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Usuarios;

public record CrearUsuarioDto(
    string NombreUsuario,
    string Correo,
    string Password,
    RolUsuario Rol,
    Guid? VoluntarioId = null
);