namespace SA.ClubDeLeones.Application.Dtos.Autenticacion;

public record IniciarSesionRequestDto(
    string NombreUsuario,
    string Password
);