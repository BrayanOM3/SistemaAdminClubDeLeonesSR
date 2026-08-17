using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Voluntarios;

public record VoluntarioDto(
    Guid Id,
    string NombreCompleto,
    string Cedula,
    string? Telefono,
    string? Correo,
    DateOnly FechaIngreso,
    string? Disponibilidad,
    string? Especialidad,
    EstadoUsuario Estado,
    bool TieneUsuario
);