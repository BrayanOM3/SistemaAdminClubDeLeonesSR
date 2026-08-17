namespace SA.ClubDeLeones.Application.Dtos.Voluntarios;

public record CrearVoluntarioDto(
    string NombreCompleto,
    string Cedula,
    DateOnly FechaIngreso,
    string? Telefono = null,
    string? Correo = null,
    string? Disponibilidad = null,
    string? Especialidad = null
);