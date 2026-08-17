using SA.ClubDeLeones.Application.Dtos.Beneficiarios;

namespace SA.ClubDeLeones.Application.Interfaces.Servicios;

public interface IBeneficiarioServicio
{
    Task<BeneficiarioDto?> ObtenerPorIdAsync(Guid id);
    Task<IReadOnlyList<BeneficiarioDto>> ObtenerTodosAsync();
    Task<IReadOnlyList<BeneficiarioDto>> ObtenerActivosAsync();
    Task<BeneficiarioDto> CrearAsync(CrearBeneficiarioDto dto);
    Task<BeneficiarioDto> ActualizarAsync(Guid id, ActualizarBeneficiarioDto dto);
    Task<bool> EliminarAsync(Guid id);
    Task<bool> ExisteCedulaAsync(string cedula, Guid? excluirId = null);
}