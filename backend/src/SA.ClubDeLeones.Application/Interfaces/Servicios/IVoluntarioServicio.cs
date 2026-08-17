using SA.ClubDeLeones.Application.Dtos.Voluntarios;

namespace SA.ClubDeLeones.Application.Interfaces.Servicios;

public interface IVoluntarioServicio
{
    Task<VoluntarioDto?> ObtenerPorIdAsync(Guid id);
    Task<IReadOnlyList<VoluntarioDto>> ObtenerTodosAsync();
    Task<IReadOnlyList<VoluntarioDto>> ObtenerActivosAsync();
    Task<VoluntarioDto> CrearAsync(CrearVoluntarioDto dto);
    Task<VoluntarioDto> ActualizarAsync(Guid id, ActualizarVoluntarioDto dto);
    Task<bool> EliminarAsync(Guid id);
    Task<bool> ExisteCedulaAsync(string cedula, Guid? excluirId = null);
}