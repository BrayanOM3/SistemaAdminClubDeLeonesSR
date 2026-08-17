using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Usuarios;

public record UsuarioDto(
    Guid Id,
    string NombreUsuario,
    string Correo,
    RolUsuario Rol,
    EstadoUsuario Estado,
    Guid? VoluntarioId,
    string? NombreVoluntario
);