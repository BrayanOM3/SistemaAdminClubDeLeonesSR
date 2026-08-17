using Microsoft.EntityFrameworkCore;
using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Interfaces;
using SA.ClubDeLeones.Infrastructure.Persistencia;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Repositorios;

public class VoluntarioRepositorio : RepositorioBase<Voluntario>, IRepositorio<Voluntario>
{
    public VoluntarioRepositorio(AppDbContext context) : base(context) { }

    public async Task<IReadOnlyList<Voluntario>> ObtenerPorEstadoAsync(
        SA.ClubDeLeones.Domain.Enums.EstadoUsuario estado,
        CancellationToken ct = default)
    {
        return await _dbSet.Where(v => v.Estado == estado).ToListAsync(ct);
    }

    public async Task<bool> ExisteCedulaAsync(string cedula, Guid? excluirId = null, CancellationToken ct = default)
    {
        if (excluirId.HasValue)
            return await _dbSet.AnyAsync(v => v.Cedula == cedula && v.Id != excluirId.Value, ct);
        return await _dbSet.AnyAsync(v => v.Cedula == cedula, ct);
    }
}