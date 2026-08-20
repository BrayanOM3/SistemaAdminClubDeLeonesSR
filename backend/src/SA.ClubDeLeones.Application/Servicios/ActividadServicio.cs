using SA.ClubDeLeones.Application.Dtos.Actividades;
using SA.ClubDeLeones.Application.Interfaces.Servicios;
using SA.ClubDeLeones.Domain.Interfaces;
using AutoMapper;

namespace SA.ClubDeLeones.Application.Servicios;

public class ActividadServicio : IActividadServicio
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ActividadServicio(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ActividadDto?> ObtenerPorIdAsync(Guid id)
    {
        var entidad = await _unitOfWork.Actividades.ObtenerPorIdAsync(id);
        return entidad != null ? _mapper.Map<ActividadDto>(entidad) : null;
    }

    public async Task<IReadOnlyList<ActividadDto>> ObtenerTodosAsync()
    {
        var entidades = await _unitOfWork.Actividades.ObtenerTodosAsync();
        var lista = _mapper.Map<List<ActividadDto>>(entidades);
        return lista.AsReadOnly();
    }

    public async Task<IReadOnlyList<ActividadDto>> ObtenerPorCampanaAsync(Guid campanaId)
    {
        var entidades = await _unitOfWork.Actividades.ObtenerPorCampanaAsync(campanaId);
        var lista = _mapper.Map<List<ActividadDto>>(entidades);
        return lista.AsReadOnly();
    }

    public async Task<ActividadDto> CrearAsync(CrearActividadDto dto)
    {
        var entidad = _mapper.Map<Domain.Entidades.Actividad>(dto);
        await _unitOfWork.Actividades.AgregarAsync(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return _mapper.Map<ActividadDto>(entidad);
    }

    public async Task<ActividadDto> ActualizarAsync(Guid id, ActualizarActividadDto dto)
    {
        var entidad = await _unitOfWork.Actividades.ObtenerPorIdAsync(id)
            ?? throw new KeyNotFoundException("Actividad no encontrada");

        _mapper.Map(dto, entidad);
        entidad.MarcarActualizado();
        _unitOfWork.Actividades.Actualizar(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return _mapper.Map<ActividadDto>(entidad);
    }

    public async Task<bool> EliminarAsync(Guid id)
    {
        var entidad = await _unitOfWork.Actividades.ObtenerPorIdAsync(id);
        if (entidad == null) return false;

        _unitOfWork.Actividades.Eliminar(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return true;
    }
}