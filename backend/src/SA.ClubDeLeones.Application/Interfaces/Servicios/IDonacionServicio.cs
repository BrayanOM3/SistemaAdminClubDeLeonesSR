using SA.ClubDeLeones.Application.Dtos.Donaciones;

namespace SA.ClubDeLeones.Application.Interfaces.Servicios;

public interface IDonacionServicio
{
    Task<DonacionDto?> ObtenerPorIdAsync(Guid id);
    Task<IReadOnlyList<DonacionDto>> ObtenerTodosAsync();
    Task<IReadOnlyList<DonacionDto>> ObtenerPorCampanaAsync(Guid campanaId);
    Task<DonacionDto> CrearAsync(CrearDonacionDto dto);
    Task<DonacionDto> ActualizarAsync(Guid id, ActualizarDonacionDto dto);
    Task<bool> EliminarAsync(Guid id);
}