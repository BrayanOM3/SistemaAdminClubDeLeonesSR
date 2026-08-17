using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Voluntarios;

public record ActualizarVoluntarioDto(
    string NombreCompleto,
    string Cedula,
    DateOnly FechaIngreso,
    string? Telefono = null,
    string? Correo = null,
    string? Disponibilidad = null,
    string? Especialidad = null,
    EstadoUsuario Estado = EstadoUsuario.Activo
);