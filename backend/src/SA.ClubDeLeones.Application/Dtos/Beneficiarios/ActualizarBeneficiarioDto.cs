using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Beneficiarios;

public record ActualizarBeneficiarioDto(
    string NombreCompleto,
    string Cedula,
    string Direccion,
    EstadoCivil EstadoCivil,
    string SituacionNecesidad,
    DateOnly? FechaNacimiento = null,
    string? Telefono = null,
    string? Correo = null,
    string? Observaciones = null
);