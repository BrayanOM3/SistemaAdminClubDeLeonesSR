using SA.ClubDeLeones.Application.Dtos.Beneficiarios;
using SA.ClubDeLeones.Application.Interfaces.Servicios;
using SA.ClubDeLeones.Domain.Interfaces;
using AutoMapper;

namespace SA.ClubDeLeones.Application.Servicios;

public class BeneficiarioServicio : IBeneficiarioServicio
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public BeneficiarioServicio(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<BeneficiarioDto?> ObtenerPorIdAsync(Guid id)
    {
        var entidad = await _unitOfWork.Beneficiarios.ObtenerPorIdAsync(id);
        return entidad != null ? _mapper.Map<BeneficiarioDto>(entidad) : null;
    }

    public async Task<IReadOnlyList<BeneficiarioDto>> ObtenerTodosAsync()
    {
        var entidades = await _unitOfWork.Beneficiarios.ObtenerTodosAsync();
        var lista = _mapper.Map<List<BeneficiarioDto>>(entidades);
        return lista.AsReadOnly();
    }

    public async Task<IReadOnlyList<BeneficiarioDto>> ObtenerActivosAsync()
    {
        var entidades = await _unitOfWork.Beneficiarios.ObtenerPorEstadoAsync(Domain.Enums.EstadoBeneficiario.Activo);
        var lista = _mapper.Map<List<BeneficiarioDto>>(entidades);
        return lista.AsReadOnly();
    }

    public async Task<BeneficiarioDto> CrearAsync(CrearBeneficiarioDto dto)
    {
        if (await _unitOfWork.Beneficiarios.ExisteCedulaAsync(dto.Cedula))
            throw new InvalidOperationException("Ya existe un beneficiario con esa cédula");

        var entidad = _mapper.Map<Domain.Entidades.Beneficiario>(dto);
        await _unitOfWork.Beneficiarios.AgregarAsync(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return _mapper.Map<BeneficiarioDto>(entidad);
    }

    public async Task<BeneficiarioDto> ActualizarAsync(Guid id, ActualizarBeneficiarioDto dto)
    {
        var entidad = await _unitOfWork.Beneficiarios.ObtenerPorIdAsync(id)
            ?? throw new KeyNotFoundException("Beneficiario no encontrado");

        if (await _unitOfWork.Beneficiarios.ExisteCedulaAsync(dto.Cedula, id))
            throw new InvalidOperationException("Ya existe otro beneficiario con esa cédula");

        _mapper.Map(dto, entidad);
        entidad.MarcarActualizado();
        _unitOfWork.Beneficiarios.Actualizar(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return _mapper.Map<BeneficiarioDto>(entidad);
    }

    public async Task<bool> EliminarAsync(Guid id)
    {
        var entidad = await _unitOfWork.Beneficiarios.ObtenerPorIdAsync(id);
        if (entidad == null) return false;

        _unitOfWork.Beneficiarios.Eliminar(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return true;
    }

    public async Task<bool> ExisteCedulaAsync(string cedula, Guid? excluirId = null)
    {
        return await _unitOfWork.Beneficiarios.ExisteCedulaAsync(cedula, excluirId);
    }
}