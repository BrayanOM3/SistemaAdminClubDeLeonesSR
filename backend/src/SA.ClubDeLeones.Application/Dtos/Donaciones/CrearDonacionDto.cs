using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Donaciones;

public record CrearDonacionDto(
    string DonanteNombre,
    TipoDonacion Tipo,
    DateTime Fecha,
    decimal? Monto = null,
    string? Descripcion = null,
    string? ReciboNumero = null,
    Guid? CampanaId = null,
    Guid? VoluntarioId = null
);