using SA.ClubDeLeones.Domain.Entidades;

namespace SA.ClubDeLeones.Domain.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IBeneficiarioRepositorio Beneficiarios { get; }
    IAyudaSocialRepositorio AyudasSociales { get; }
    ICampanaRepositorio Campanas { get; }
    IDonacionRepositorio Donaciones { get; }
    IVoluntarioRepositorio Voluntarios { get; }
    IUsuarioRepositorio Usuarios { get; }
    IActividadRepositorio Actividades { get; }

    IRepositorio<T> Repositorio<T>() where T : class;
    Task<int> GuardarCambiosAsync(CancellationToken ct = default);
}
