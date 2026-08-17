using SA.ClubDeLeones.Application.Dtos.Actividades;

namespace SA.ClubDeLeones.Application.Interfaces.Servicios;

public interface IActividadServicio
{
    Task<ActividadDto?> ObtenerPorIdAsync(Guid id);
    Task<IReadOnlyList<ActividadDto>> ObtenerTodosAsync();
    Task<IReadOnlyList<ActividadDto>> ObtenerPorCampanaAsync(Guid campanaId);
    Task<ActividadDto> CrearAsync(CrearActividadDto dto);
    Task<ActividadDto> ActualizarAsync(Guid id, ActualizarActividadDto dto);
    Task<bool> EliminarAsync(Guid id);
}