using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Autenticacion;

public record IniciarSesionRespuestaDto(
    string Token,
    Guid UsuarioId,
    string NombreUsuario,
    string Correo,
    RolUsuario Rol,
    Guid? VoluntarioId,
    string? NombreVoluntario
);