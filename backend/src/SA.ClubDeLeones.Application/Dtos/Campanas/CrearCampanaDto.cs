using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Dtos.Campanas;

public record CrearCampanaDto(
    string Nombre,
    string Descripcion,
    DateOnly FechaInicio,
    TipoCampana Tipo,
    DateOnly? FechaFin = null,
    decimal? ObjetivoMonto = null
);