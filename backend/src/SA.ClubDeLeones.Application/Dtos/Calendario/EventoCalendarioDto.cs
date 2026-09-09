namespace SA.ClubDeLeones.Application.Dtos.Calendario;

/// <summary>
/// Evento unificado para la vista de calendario. Donaciones y Ayudas Sociales
/// se representan agregadas por día (EsAgregado = true), con Id vacío.
/// </summary>
public record EventoCalendarioDto(
    Guid Id,
    TipoEventoCalendario Tipo,
    string Titulo,
    DateOnly FechaInicio,
    DateOnly? FechaFin,
    bool EsAgregado,
    int? CantidadAgregada,
    decimal? MontoTotalAgregado);