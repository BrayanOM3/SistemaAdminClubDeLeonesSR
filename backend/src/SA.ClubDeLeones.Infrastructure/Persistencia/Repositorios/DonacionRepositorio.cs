using Microsoft.EntityFrameworkCore;
using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Interfaces;
using SA.ClubDeLeones.Infrastructure.Persistencia;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Repositorios;

public class DonacionRepositorio : RepositorioBase<Donacion>, IDonacionRepositorio
{
    public DonacionRepositorio(AppDbContext context) : base(context) { }

    public override async Task<IReadOnlyList<Donacion>> ObtenerTodosAsync(CancellationToken ct = default)
    {
        // Eager load de Campaña y Voluntario para poblar los nombres en los DTOs y reportes.
        return await _dbSet
            .Include(d => d.Campana)
            .Include(d => d.Voluntario)
            .ToListAsync(ct);
    }

    public async Task<IReadOnlyList<Donacion>> ObtenerPorCampanaAsync(Guid campanaId, CancellationToken ct = default)
    {
        return await _dbSet.Where(d => d.CampanaId == campanaId).ToListAsync(ct);
    }
}