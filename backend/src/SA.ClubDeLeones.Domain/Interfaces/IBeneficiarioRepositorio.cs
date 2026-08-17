using SA.ClubDeLeones.Domain.Entidades;

namespace SA.ClubDeLeones.Domain.Interfaces;

public interface IBeneficiarioRepositorio : IRepositorio<Beneficiario>
{
    Task<IReadOnlyList<Beneficiario>> ObtenerPorEstadoAsync(Enums.EstadoBeneficiario estado, CancellationToken ct = default);
    Task<bool> ExisteCedulaAsync(string cedula, Guid? excluirId = null, CancellationToken ct = default);
}

public interface IAyudaSocialRepositorio : IRepositorio<AyudaSocial>
{
    Task<IReadOnlyList<AyudaSocial>> ObtenerPorBeneficiarioAsync(Guid beneficiarioId, CancellationToken ct = default);
    Task<IReadOnlyList<AyudaSocial>> ObtenerPorCampanaAsync(Guid campanaId, CancellationToken ct = default);
}

public interface ICampanaRepositorio : IRepositorio<Campana>
{
    Task<IReadOnlyList<Campana>> ObtenerActivasAsync(CancellationToken ct = default);
    Task<decimal> ObtenerMontoRecaudadoAsync(Guid campanaId, CancellationToken ct = default);
}

public interface IDonacionRepositorio : IRepositorio<Donacion>
{
    Task<IReadOnlyList<Donacion>> ObtenerPorCampanaAsync(Guid campanaId, CancellationToken ct = default);
}

public interface IVoluntarioRepositorio : IRepositorio<Voluntario>
{
    Task<IReadOnlyList<Voluntario>> ObtenerPorEstadoAsync(Enums.EstadoUsuario estado, CancellationToken ct = default);
    Task<bool> ExisteCedulaAsync(string cedula, Guid? excluirId = null, CancellationToken ct = default);
}

public interface IUsuarioRepositorio : IRepositorio<Usuario>
{
    Task<Usuario?> ObtenerPorNombreUsuarioAsync(string nombreUsuario, CancellationToken ct = default);
    Task<bool> ExisteNombreUsuarioAsync(string nombreUsuario, Guid? excluirId = null, CancellationToken ct = default);
    Task<bool> ExisteCorreoAsync(string correo, Guid? excluirId = null, CancellationToken ct = default);
    Task<bool> ExisteVoluntarioAsync(Guid voluntarioId, Guid? excluirUsuarioId = null, CancellationToken ct = default);
}

public interface IActividadRepositorio : IRepositorio<Actividad>
{
    Task<IReadOnlyList<Actividad>> ObtenerPorCampanaAsync(Guid campanaId, CancellationToken ct = default);
}