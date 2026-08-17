using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Interfaces;
using SA.ClubDeLeones.Infrastructure.Persistencia.Repositorios;

namespace SA.ClubDeLeones.Infrastructure.Persistencia;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    public IRepositorio<Beneficiario> Beneficiarios { get; }
    public IRepositorio<AyudaSocial> AyudasSociales { get; }
    public IRepositorio<Campana> Campanas { get; }
    public IRepositorio<Donacion> Donaciones { get; }
    public IRepositorio<Voluntario> Voluntarios { get; }
    public IRepositorio<Usuario> Usuarios { get; }
    public IRepositorio<Actividad> Actividades { get; }

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