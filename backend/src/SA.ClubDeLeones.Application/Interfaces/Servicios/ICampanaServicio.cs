using SA.ClubDeLeones.Application.Dtos.Campanas;

namespace SA.ClubDeLeones.Application.Interfaces.Servicios;

public interface ICampanaServicio
{
    Task<CampanaDto?> ObtenerPorIdAsync(Guid id);
    Task<IReadOnlyList<CampanaDto>> ObtenerTodosAsync();
    Task<IReadOnlyList<CampanaDto>> ObtenerActivasAsync();
    Task<CampanaDto> CrearAsync(CrearCampanaDto dto);
    Task<CampanaDto> ActualizarAsync(Guid id, ActualizarCampanaDto dto);
    Task<bool> EliminarAsync(Guid id);
    Task<decimal> ObtenerMontoRecaudadoAsync(Guid campanaId);
}