using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Campanas;

public record CampanaDto(
    Guid Id,
    string Nombre,
    string Descripcion,
    DateOnly FechaInicio,
    DateOnly? FechaFin,
    decimal? ObjetivoMonto,
    EstadoCampana Estado,
    TipoCampana Tipo,
    decimal MontoRecaudado
);