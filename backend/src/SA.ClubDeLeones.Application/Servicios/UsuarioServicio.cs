using SA.ClubDeLeones.Application.Dtos.Usuarios;
using SA.ClubDeLeones.Application.Interfaces.Servicios;
using SA.ClubDeLeones.Domain.Interfaces;
using AutoMapper;

namespace SA.ClubDeLeones.Application.Servicios;

public class UsuarioServicio : IUsuarioServicio
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IEncriptadorPassword _encriptador;

    public UsuarioServicio(IUnitOfWork unitOfWork, IMapper mapper, IEncriptadorPassword encriptador)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _encriptador = encriptador;
    }

    public async Task<UsuarioDto?> ObtenerPorIdAsync(Guid id)
    {
        var entidad = await _unitOfWork.Usuarios.ObtenerPorIdAsync(id);
        return entidad != null ? _mapper.Map<UsuarioDto>(entidad) : null;
    }

    public async Task<IReadOnlyList<UsuarioDto>> ObtenerTodosAsync()
    {
        var entidades = await _unitOfWork.Usuarios.ObtenerTodosAsync();
        return _mapper.Map<IReadOnlyList<UsuarioDto>>(entidades);
    }

    public async Task<UsuarioDto?> ObtenerPorNombreUsuarioAsync(string nombreUsuario)
    {
        var entidad = await _unitOfWork.Usuarios.ObtenerPorNombreUsuarioAsync(nombreUsuario);
        return entidad != null ? _mapper.Map<UsuarioDto>(entidad) : null;
    }

    public async Task<UsuarioDto> CrearAsync(CrearUsuarioDto dto)
    {
        if (await _unitOfWork.Usuarios.ExisteNombreUsuarioAsync(dto.NombreUsuario))
            throw new InvalidOperationException("Ya existe un usuario con ese nombre de usuario");

        if (await _unitOfWork.Usuarios.ExisteCorreoAsync(dto.Correo))
            throw new InvalidOperationException("Ya existe un usuario con ese correo");

        if (dto.VoluntarioId.HasValue)
        {
            var voluntario = await _unitOfWork.Voluntarios.ObtenerPorIdAsync(dto.VoluntarioId.Value);
            if (voluntario == null)
                throw new InvalidOperationException("El voluntario especificado no existe");

            if (await _unitOfWork.Usuarios.ExisteVoluntarioAsync(dto.VoluntarioId.Value))
                throw new InvalidOperationException("El voluntario ya tiene un usuario asociado");
        }

        var passwordHash = _encriptador.Encriptar(dto.Password);
        var entidad = new Domain.Entidades.Usuario(
            nombreUsuario: dto.NombreUsuario,
            correo: dto.Correo,
            passwordHash: passwordHash,
            rol: dto.Rol,
            voluntarioId: dto.VoluntarioId
        );

        await _unitOfWork.Usuarios.AgregarAsync(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return _mapper.Map<UsuarioDto>(entidad);
    }

    public async Task<UsuarioDto> ActualizarAsync(Guid id, ActualizarUsuarioDto dto)
    {
        var entidad = await _unitOfWork.Usuarios.ObtenerPorIdAsync(id)
            ?? throw new KeyNotFoundException("Usuario no encontrado");

        if (await _unitOfWork.Usuarios.ExisteNombreUsuarioAsync(dto.NombreUsuario, id))
            throw new InvalidOperationException("Ya existe otro usuario con ese nombre de usuario");

        if (await _unitOfWork.Usuarios.ExisteCorreoAsync(dto.Correo, id))
            throw new InvalidOperationException("Ya existe otro usuario con ese correo");

        if (dto.VoluntarioId.HasValue)
        {
            var voluntario = await _unitOfWork.Voluntarios.ObtenerPorIdAsync(dto.VoluntarioId.Value);
            if (voluntario == null)
                throw new InvalidOperationException("El voluntario especificado no existe");

            if (await _unitOfWork.Usuarios.ExisteVoluntarioAsync(dto.VoluntarioId.Value, id))
                throw new InvalidOperationException("El voluntario ya tiene otro usuario asociado");
        }

        _mapper.Map(dto, entidad);
        entidad.FechaActualizacion = DateTime.UtcNow;
        _unitOfWork.Usuarios.Actualizar(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return _mapper.Map<UsuarioDto>(entidad);
    }

    public async Task<bool> EliminarAsync(Guid id)
    {
        var entidad = await _unitOfWork.Usuarios.ObtenerPorIdAsync(id);
        if (entidad == null) return false;

        _unitOfWork.Usuarios.Eliminar(entidad);
        await _unitOfWork.GuardarCambiosAsync();
        return true;
    }

    public async Task<bool> ExisteNombreUsuarioAsync(string nombreUsuario, Guid? excluirId = null)
    {
        return await _unitOfWork.Usuarios.ExisteNombreUsuarioAsync(nombreUsuario, excluirId);
    }

    public async Task<bool> ExisteCorreoAsync(string correo, Guid? excluirId = null)
    {
        return await _unitOfWork.Usuarios.ExisteCorreoAsync(correo, excluirId);
    }
}