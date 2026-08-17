using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Usuarios;

public record ActualizarUsuarioDto(
    string NombreUsuario,
    string Correo,
    RolUsuario Rol,
    EstadoUsuario Estado,
    Guid? VoluntarioId = null
);