using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Beneficiarios;

public record BeneficiarioDto(
    Guid Id,
    string NombreCompleto,
    string Cedula,
    DateOnly? FechaNacimiento,
    string? Telefono,
    string? Correo,
    string Direccion,
    EstadoCivil EstadoCivil,
    string SituacionNecesidad,
    DateTime FechaRegistro,
    EstadoBeneficiario Estado,
    string? Observaciones
);