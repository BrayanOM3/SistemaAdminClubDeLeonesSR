using SA.ClubDeLeones.Application.Dtos.Campanas;
using SA.ClubDeLeones.Application.Interfaces.Servicios;
using SA.ClubDeLeones.Domain.Interfaces;
using AutoMapper;

namespace SA.ClubDeLeones.Application.Servicios;

public class CampanaServicio : ICampanaServicio
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CampanaServicio(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<CampanaDto?> ObtenerPorIdAsync(Guid id)
    {
        var entidad = await _unitOfWork.Campanas.ObtenerPorIdAsync(id);
        return entidad != null ? _mapper.Map<CampanaDto>(entidad) : null;
    }

    public async Task<IReadOnlyList<CampanaDto>> ObtenerTodosAsync()
    {
        var entidades = await _unitOfWork.Campanas.ObtenerTodosAsync();
        return _mapper.Map<IReadOnlyList<CampanaDto>>(entidades);
    }

    public async Task<IReadOnlyList<CampanaDto>> ObtenerActivasAsync()
    {
        var entidades = await _unitOfWork.Campanas.ObtenerPorEstadoAsync(Domain.Enums.EstadoCampana.Activa);
        return _mapper.Map<IReadOnlyList<CampanaDto>>(entidades);
    }

    public async Task<CampanaDto> CrearAsync(CrearCampanaDto dto)
    {
        var entidad = _mapper.Map<Domain.Entidades.Campana>(dto);
        await _unitOfWork.Campanas.AgregarAsync(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return _mapper.Map<CampanaDto>(entidad);
    }

    public async Task<CampanaDto> ActualizarAsync(Guid id, ActualizarCampanaDto dto)
    {
        var entidad = await _unitOfWork.Campanas.ObtenerPorIdAsync(id)
            ?? throw new KeyNotFoundException("Campaña no encontrada");

        _mapper.Map(dto, entidad);
        entidad.FechaActualizacion = DateTime.UtcNow;
        _unitOfWork.Campanas.Actualizar(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return _mapper.Map<CampanaDto>(entidad);
    }

    public async Task<bool> EliminarAsync(Guid id)
    {
        var entidad = await _unitOfWork.Campanas.ObtenerPorIdAsync(id);
        if (entidad == null) return false;

        _unitOfWork.Campanas.Eliminar(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return true;
    }

    public async Task<decimal> ObtenerMontoRecaudadoAsync(Guid campanaId)
    {
        var donaciones = await _unitOfWork.Donaciones.ObtenerPorCampanaAsync(campanaId);
        return donaciones.Where(d => d.Tipo == Domain.Enums.TipoDonacion.Monetaria).Sum(d => d.Monto ?? 0);
    }
}