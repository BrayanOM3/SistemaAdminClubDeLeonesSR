using Microsoft.EntityFrameworkCore;
using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Interfaces;
using SA.ClubDeLeones.Infrastructure.Persistencia;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Repositorios;

public class BeneficiarioRepositorio : RepositorioBase<Beneficiario>, IRepositorio<Beneficiario>
{
    public BeneficiarioRepositorio(AppDbContext context) : base(context) { }

    public async Task<IReadOnlyList<Beneficiario>> ObtenerPorEstadoAsync(
        SA.ClubDeLeones.Domain.Enums.EstadoBeneficiario estado,
        CancellationToken ct = default)
    {
        return await _dbSet.Where(b => b.Estado == estado).ToListAsync(ct);
    }

    public async Task<bool> ExisteCedulaAsync(string cedula, Guid? excluirId = null, CancellationToken ct = default)
    {
        if (excluirId.HasValue)
            return await _dbSet.AnyAsync(b => b.Cedula == cedula && b.Id != excluirId.Value, ct);
        return await _dbSet.AnyAsync(b => b.Cedula == cedula, ct);
    }
}