using SA.ClubDeLeones.Application.Dtos.Autenticacion;
using SA.ClubDeLeones.Application.Interfaces.Servicios;
using SA.ClubDeLeones.Domain.Interfaces;
using SA.ClubDeLeones.Domain.Entidades;

namespace SA.ClubDeLeones.Application.Servicios;

public class AutenticacionServicio : IAutenticacionServicio
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IEncriptadorPassword _encriptador;
    private readonly IServicioJwt _servicioJwt;

    public AutenticacionServicio(
        IUnitOfWork unitOfWork,
        IEncriptadorPassword encriptador,
        IServicioJwt servicioJwt)
    {
        _unitOfWork = unitOfWork;
        _encriptador = encriptador;
        _servicioJwt = servicioJwt;
    }

    public async Task<IniciarSesionRespuestaDto?> IniciarSesionAsync(IniciarSesionRequestDto dto)
    {
        var usuario = await _unitOfWork.Usuarios.ObtenerPorNombreUsuarioAsync(dto.NombreUsuario);
        if (usuario == null)
            return null;

        if (usuario.Estado != SA.ClubDeLeones.Domain.Enums.EstadoUsuario.Activo)
            return null;

        if (!_encriptador.Verificar(dto.Password, usuario.PasswordHash))
            return null;

        var token = _servicioJwt.GenerarToken(usuario);

        string? nombreVoluntario = null;
        if (usuario.Voluntario != null)
        {
            nombreVoluntario = usuario.Voluntario.NombreCompleto;
        }

        return new IniciarSesionRespuestaDto(
            Token: token,
            UsuarioId: usuario.Id,
            NombreUsuario: usuario.NombreUsuario,
            Correo: usuario.Correo,
            Rol: usuario.Rol,
            VoluntarioId: usuario.VoluntarioId,
            NombreVoluntario: nombreVoluntario
        );
    }

    public async Task<bool> ValidarTokenAsync(string token)
    {
        var principal = _servicioJwt.ValidarToken(token);
        if (principal == null)
            return false;

        var usuarioIdClaim = principal.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        if (usuarioIdClaim == null || !Guid.TryParse(usuarioIdClaim.Value, out var usuarioId))
            return false;

        var usuario = await _unitOfWork.Usuarios.ObtenerPorIdAsync(usuarioId);
        return usuario != null && usuario.Estado == SA.ClubDeLeones.Domain.Enums.EstadoUsuario.Activo;
    }
}