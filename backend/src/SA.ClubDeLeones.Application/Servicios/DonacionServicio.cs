using SA.ClubDeLeones.Application.Dtos.Donaciones;
using SA.ClubDeLeones.Application.Interfaces.Servicios;
using SA.ClubDeLeones.Domain.Interfaces;
using AutoMapper;

namespace SA.ClubDeLeones.Application.Servicios;

public class DonacionServicio : IDonacionServicio
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public DonacionServicio(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<DonacionDto?> ObtenerPorIdAsync(Guid id)
    {
        var entidad = await _unitOfWork.Donaciones.ObtenerPorIdAsync(id);
        return entidad != null ? _mapper.Map<DonacionDto>(entidad) : null;
    }

    public async Task<IReadOnlyList<DonacionDto>> ObtenerTodosAsync()
    {
        var entidades = await _unitOfWork.Donaciones.ObtenerTodosAsync();
        var lista = _mapper.Map<List<DonacionDto>>(entidades);
        return lista.AsReadOnly();
    }

    public async Task<IReadOnlyList<DonacionDto>> ObtenerPorCampanaAsync(Guid campanaId)
    {
        var entidades = await _unitOfWork.Donaciones.ObtenerPorCampanaAsync(campanaId);
        var lista = _mapper.Map<List<DonacionDto>>(entidades);
        return lista.AsReadOnly();
    }

    public async Task<DonacionDto> CrearAsync(CrearDonacionDto dto)
    {
        var entidad = _mapper.Map<Domain.Entidades.Donacion>(dto);
        await _unitOfWork.Donaciones.AgregarAsync(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return _mapper.Map<DonacionDto>(entidad);
    }

    public async Task<DonacionDto> ActualizarAsync(Guid id, ActualizarDonacionDto dto)
    {
        var entidad = await _unitOfWork.Donaciones.ObtenerPorIdAsync(id)
            ?? throw new KeyNotFoundException("Donación no encontrada");

        _mapper.Map(dto, entidad);
        entidad.MarcarActualizado();
        _unitOfWork.Donaciones.Actualizar(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return _mapper.Map<DonacionDto>(entidad);
    }

    public async Task<bool> EliminarAsync(Guid id)
    {
        var entidad = await _unitOfWork.Donaciones.ObtenerPorIdAsync(id);
        if (entidad == null) return false;

        _unitOfWork.Donaciones.Eliminar(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return true;
    }
}