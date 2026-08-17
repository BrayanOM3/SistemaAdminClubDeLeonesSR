using Microsoft.EntityFrameworkCore;
using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Interfaces;
using SA.ClubDeLeones.Infrastructure.Persistencia;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Repositorios;

public class UsuarioRepositorio : RepositorioBase<Usuario>, IUsuarioRepositorio
{
    public UsuarioRepositorio(AppDbContext context) : base(context) { }

    public async Task<Usuario?> ObtenerPorNombreUsuarioAsync(string nombreUsuario, CancellationToken ct = default)
    {
        return await _dbSet.FirstOrDefaultAsync(u => u.NombreUsuario == nombreUsuario, ct);
    }

    public async Task<bool> ExisteNombreUsuarioAsync(string nombreUsuario, Guid? excluirId = null, CancellationToken ct = default)
    {
        if (excluirId.HasValue)
            return await _dbSet.AnyAsync(u => u.NombreUsuario == nombreUsuario && u.Id != excluirId.Value, ct);
        return await _dbSet.AnyAsync(u => u.NombreUsuario == nombreUsuario, ct);
    }

    public async Task<bool> ExisteCorreoAsync(string correo, Guid? excluirId = null, CancellationToken ct = default)
    {
        if (excluirId.HasValue)
            return await _dbSet.AnyAsync(u => u.Correo == correo && u.Id != excluirId.Value, ct);
        return await _dbSet.AnyAsync(u => u.Correo == correo, ct);
    }

    public async Task<bool> ExisteVoluntarioAsync(Guid voluntarioId, Guid? excluirUsuarioId = null, CancellationToken ct = default)
    {
        if (excluirUsuarioId.HasValue)
            return await _dbSet.AnyAsync(u => u.VoluntarioId == voluntarioId && u.Id != excluirUsuarioId.Value, ct);
        return await _dbSet.AnyAsync(u => u.VoluntarioId == voluntarioId, ct);
    }
}