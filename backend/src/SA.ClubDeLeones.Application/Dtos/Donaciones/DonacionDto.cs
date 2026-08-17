using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Donaciones;

public record DonacionDto(
    Guid Id,
    string DonanteNombre,
    TipoDonacion Tipo,
    decimal? Monto,
    string? Descripcion,
    DateTime Fecha,
    string? ReciboNumero,
    Guid? CampanaId,
    string? NombreCampana,
    Guid? VoluntarioId,
    string? NombreVoluntario
);