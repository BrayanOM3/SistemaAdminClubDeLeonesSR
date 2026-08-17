using Microsoft.EntityFrameworkCore;
using SA.ClubDeLeones.Domain.Interfaces;
using SA.ClubDeLeones.Infrastructure.Persistencia;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Repositorios;

public class RepositorioBase<T> : IRepositorio<T> where T : class
{
    protected readonly AppDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public RepositorioBase(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task<T?> ObtenerPorIdAsync(Guid id, CancellationToken ct = default)
    {
        return await _dbSet.FindAsync(new object[] { id }, ct);
    }

    public async Task<IReadOnlyList<T>> ObtenerTodosAsync(CancellationToken ct = default)
    {
        return await _dbSet.ToListAsync(ct);
    }

    public async Task<IReadOnlyList<T>> ObtenerAsync(
        System.Linq.Expressions.Expression<Func<T, bool>> predicado,
        CancellationToken ct = default)
    {
        return await _dbSet.Where(predicado).ToListAsync(ct);
    }

    public async Task<T> AgregarAsync(T entidad, CancellationToken ct = default)
    {
        await _dbSet.AddAsync(entidad, ct);
        return entidad;
    }

    public void Actualizar(T entidad)
    {
        _dbSet.Update(entidad);
    }

    public void Eliminar(T entidad)
    {
        _dbSet.Remove(entidad);
    }

    public async Task<bool> ExisteAsync(
        System.Linq.Expressions.Expression<Func<T, bool>> predicado,
        CancellationToken ct = default)
    {
        return await _dbSet.AnyAsync(predicado, ct);
    }

    public async Task<int> ContarAsync(
        System.Linq.Expressions.Expression<Func<T, bool>>? predicado = null,
        CancellationToken ct = default)
    {
        if (predicado == null)
            return await _dbSet.CountAsync(ct);

        return await _dbSet.CountAsync(predicado, ct);
    }
}