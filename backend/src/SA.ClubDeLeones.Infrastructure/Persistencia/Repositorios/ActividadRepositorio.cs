using Microsoft.EntityFrameworkCore;
using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Interfaces;
using SA.ClubDeLeones.Infrastructure.Persistencia;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Repositorios;

public class ActividadRepositorio : RepositorioBase<Actividad>, IActividadRepositorio
{
    public ActividadRepositorio(AppDbContext context) : base(context) { }

    public override async Task<IReadOnlyList<Actividad>> ObtenerTodosAsync(CancellationToken ct = default)
    {
        // Eager load de Campaña para poblar el nombre de la campaña en los DTOs y reportes.
        return await _dbSet
            .Include(a => a.Campana)
            .ToListAsync(ct);
    }

    public async Task<IReadOnlyList<Actividad>> ObtenerPorCampanaAsync(Guid campanaId, CancellationToken ct = default)
    {
        return await _dbSet.Where(a => a.CampanaId == campanaId).ToListAsync(ct);
    }
}