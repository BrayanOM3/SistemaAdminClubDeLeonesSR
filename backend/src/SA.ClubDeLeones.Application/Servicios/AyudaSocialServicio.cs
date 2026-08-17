using SA.ClubDeLeones.Application.Dtos.AyudasSociales;
using SA.ClubDeLeones.Application.Interfaces.Servicios;
using SA.ClubDeLeones.Domain.Interfaces;
using AutoMapper;

namespace SA.ClubDeLeones.Application.Servicios;

public class AyudaSocialServicio : IAyudaSocialServicio
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public AyudaSocialServicio(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<AyudaSocialDto?> ObtenerPorIdAsync(Guid id)
    {
        var entidad = await _unitOfWork.AyudasSociales.ObtenerPorIdAsync(id);
        return entidad != null ? _mapper.Map<AyudaSocialDto>(entidad) : null;
    }

    public async Task<IReadOnlyList<AyudaSocialDto>> ObtenerTodosAsync()
    {
        var entidades = await _unitOfWork.AyudasSociales.ObtenerTodosAsync();
        return _mapper.Map<IReadOnlyList<AyudaSocialDto>>(entidades);
    }

    public async Task<IReadOnlyList<AyudaSocialDto>> ObtenerPorBeneficiarioAsync(Guid beneficiarioId)
    {
        var entidades = await _unitOfWork.AyudasSociales.ObtenerPorBeneficiarioAsync(beneficiarioId);
        return _mapper.Map<IReadOnlyList<AyudaSocialDto>>(entidades);
    }

    public async Task<IReadOnlyList<AyudaSocialDto>> ObtenerPorCampanaAsync(Guid campanaId)
    {
        var entidades = await _unitOfWork.AyudasSociales.ObtenerPorCampanaAsync(campanaId);
        return _mapper.Map<IReadOnlyList<AyudaSocialDto>>(entidades);
    }

    public async Task<AyudaSocialDto> CrearAsync(CrearAyudaSocialDto dto)
    {
        var entidad = _mapper.Map<Domain.Entidades.AyudaSocial>(dto);
        await _unitOfWork.AyudasSociales.AgregarAsync(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return _mapper.Map<AyudaSocialDto>(entidad);
    }

    public async Task<AyudaSocialDto> ActualizarAsync(Guid id, ActualizarAyudaSocialDto dto)
    {
        var entidad = await _unitOfWork.AyudasSociales.ObtenerPorIdAsync(id)
            ?? throw new KeyNotFoundException("Ayuda social no encontrada");

        _mapper.Map(dto, entidad);
        entidad.MarcarActualizado();
        _unitOfWork.AyudasSociales.Actualizar(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return _mapper.Map<AyudaSocialDto>(entidad);
    }

    public async Task<bool> EliminarAsync(Guid id)
    {
        var entidad = await _unitOfWork.AyudasSociales.ObtenerPorIdAsync(id);
        if (entidad == null) return false;

        _unitOfWork.AyudasSociales.Eliminar(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return true;
    }
}