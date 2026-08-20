using SA.ClubDeLeones.Application.Dtos.Voluntarios;
using SA.ClubDeLeones.Application.Interfaces.Servicios;
using SA.ClubDeLeones.Domain.Interfaces;
using AutoMapper;

namespace SA.ClubDeLeones.Application.Servicios;

public class VoluntarioServicio : IVoluntarioServicio
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public VoluntarioServicio(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<VoluntarioDto?> ObtenerPorIdAsync(Guid id)
    {
        var entidad = await _unitOfWork.Voluntarios.ObtenerPorIdAsync(id);
        return entidad != null ? _mapper.Map<VoluntarioDto>(entidad) : null;
    }

    public async Task<IReadOnlyList<VoluntarioDto>> ObtenerTodosAsync()
    {
        var entidades = await _unitOfWork.Voluntarios.ObtenerTodosAsync();
        var lista = _mapper.Map<List<VoluntarioDto>>(entidades);
        return lista.AsReadOnly();
    }

    public async Task<IReadOnlyList<VoluntarioDto>> ObtenerActivosAsync()
    {
        var entidades = await _unitOfWork.Voluntarios.ObtenerPorEstadoAsync(Domain.Enums.EstadoUsuario.Activo);
        var lista = _mapper.Map<List<VoluntarioDto>>(entidades);
        return lista.AsReadOnly();
    }

    public async Task<VoluntarioDto> CrearAsync(CrearVoluntarioDto dto)
    {
        if (await _unitOfWork.Voluntarios.ExisteCedulaAsync(dto.Cedula))
            throw new InvalidOperationException("Ya existe un voluntario con esa cédula");

        var entidad = _mapper.Map<Domain.Entidades.Voluntario>(dto);
        await _unitOfWork.Voluntarios.AgregarAsync(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return _mapper.Map<VoluntarioDto>(entidad);
    }

    public async Task<VoluntarioDto> ActualizarAsync(Guid id, ActualizarVoluntarioDto dto)
    {
        var entidad = await _unitOfWork.Voluntarios.ObtenerPorIdAsync(id)
            ?? throw new KeyNotFoundException("Voluntario no encontrado");

        if (await _unitOfWork.Voluntarios.ExisteCedulaAsync(dto.Cedula, id))
            throw new InvalidOperationException("Ya existe otro voluntario con esa cédula");

        _mapper.Map(dto, entidad);
        entidad.MarcarActualizado();
        _unitOfWork.Voluntarios.Actualizar(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return _mapper.Map<VoluntarioDto>(entidad);
    }

    public async Task<bool> EliminarAsync(Guid id)
    {
        var entidad = await _unitOfWork.Voluntarios.ObtenerPorIdAsync(id);
        if (entidad == null) return false;

        _unitOfWork.Voluntarios.Eliminar(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return true;
    }

    public async Task<bool> ExisteCedulaAsync(string cedula, Guid? excluirId = null)
    {
        return await _unitOfWork.Voluntarios.ExisteCedulaAsync(cedula, excluirId);
    }
}