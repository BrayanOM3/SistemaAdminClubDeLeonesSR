using SA.ClubDeLeones.Application.Dtos.AyudasSociales;

namespace SA.ClubDeLeones.Application.Interfaces.Servicios;

public interface IAyudaSocialServicio
{
    Task<AyudaSocialDto?> ObtenerPorIdAsync(Guid id);
    Task<IReadOnlyList<AyudaSocialDto>> ObtenerTodosAsync();
    Task<IReadOnlyList<AyudaSocialDto>> ObtenerPorBeneficiarioAsync(Guid beneficiarioId);
    Task<IReadOnlyList<AyudaSocialDto>> ObtenerPorCampanaAsync(Guid campanaId);
    Task<AyudaSocialDto> CrearAsync(CrearAyudaSocialDto dto);
    Task<AyudaSocialDto> ActualizarAsync(Guid id, ActualizarAyudaSocialDto dto);
    Task<bool> EliminarAsync(Guid id);
}