using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Interfaces;
using SA.ClubDeLeones.Infrastructure.Persistencia.Repositorios;

namespace SA.ClubDeLeones.Infrastructure.Persistencia;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    public IBeneficiarioRepositorio Beneficiarios { get; }
    public IAyudaSocialRepositorio AyudasSociales { get; }
    public ICampanaRepositorio Campanas { get; }
    public IDonacionRepositorio Donaciones { get; }
    public IVoluntarioRepositorio Voluntarios { get; }
    public IUsuarioRepositorio Usuarios { get; }
    public IActividadRepositorio Actividades { get; }

    public UnitOfWork(AppDbContext context)
    {
        _context = context;

        Beneficiarios = new BeneficiarioRepositorio(context);
        AyudasSociales = new AyudaSocialRepositorio(context);
        Campanas = new CampanaRepositorio(context);
        Donaciones = new DonacionRepositorio(context);
        Voluntarios = new VoluntarioRepositorio(context);
        Usuarios = new UsuarioRepositorio(context);
        Actividades = new ActividadRepositorio(context);
    }

    public IRepositorio<T> Repositorio<T>() where T : class
    {
        return new RepositorioBase<T>(_context);
    }

    public async Task<int> GuardarCambiosAsync(CancellationToken ct = default)
    {
        return await _context.SaveChangesAsync(ct);
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}