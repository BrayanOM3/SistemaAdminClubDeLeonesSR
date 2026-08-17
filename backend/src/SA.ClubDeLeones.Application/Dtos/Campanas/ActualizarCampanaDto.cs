using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Campanas;

public record ActualizarCampanaDto(
    string Nombre,
    string Descripcion,
    DateOnly FechaInicio,
    DateOnly? FechaFin,
    decimal? ObjetivoMonto,
    TipoCampana Tipo,
    EstadoCampana Estado
);