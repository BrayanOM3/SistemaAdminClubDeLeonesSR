using Microsoft.EntityFrameworkCore;
using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Interfaces;
using SA.ClubDeLeones.Infrastructure.Persistencia;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Repositorios;

public class ActividadRepositorio : RepositorioBase<Actividad>, IRepositorio<Actividad>
{
    public ActividadRepositorio(AppDbContext context) : base(context) { }

    public async Task<IReadOnlyList<Actividad>> ObtenerPorCampanaAsync(Guid campanaId, CancellationToken ct = default)
    {
        return await _dbSet.Where(a => a.CampanaId == campanaId).ToListAsync(ct);
    }
}