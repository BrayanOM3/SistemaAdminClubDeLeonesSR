using SA.ClubDeLeones.Domain.Entidades;

namespace SA.ClubDeLeones.Domain.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IRepositorio<Beneficiario> Beneficiarios { get; }
    IRepositorio<AyudaSocial> AyudasSociales { get; }
    IRepositorio<Campana> Campanas { get; }
    IRepositorio<Donacion> Donaciones { get; }
    IRepositorio<Voluntario> Voluntarios { get; }
    IRepositorio<Usuario> Usuarios { get; }
    IRepositorio<Actividad> Actividades { get; }

    IRepositorio<T> Repositorio<T>() where T : class;
    Task<int> GuardarCambiosAsync(CancellationToken ct = default);
}
