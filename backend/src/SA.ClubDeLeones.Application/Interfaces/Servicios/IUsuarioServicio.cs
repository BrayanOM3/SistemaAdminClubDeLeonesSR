using SA.ClubDeLeones.Application.Dtos.Usuarios;

namespace SA.ClubDeLeones.Application.Interfaces.Servicios;

public interface IUsuarioServicio
{
    Task<UsuarioDto?> ObtenerPorIdAsync(Guid id);
    Task<IReadOnlyList<UsuarioDto>> ObtenerTodosAsync();
    Task<UsuarioDto?> ObtenerPorNombreUsuarioAsync(string nombreUsuario);
    Task<UsuarioDto> CrearAsync(CrearUsuarioDto dto);
    Task<UsuarioDto> ActualizarAsync(Guid id, ActualizarUsuarioDto dto);
    Task<bool> EliminarAsync(Guid id);
    Task<bool> ExisteNombreUsuarioAsync(string nombreUsuario, Guid? excluirId = null);
    Task<bool> ExisteCorreoAsync(string correo, Guid? excluirId = null);
}