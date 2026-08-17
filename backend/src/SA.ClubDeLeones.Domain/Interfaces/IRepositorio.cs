using System.Linq.Expressions;

namespace SA.ClubDeLeones.Domain.Interfaces;

public interface IRepositorio<T> where T : class
{
    Task<T?> ObtenerPorIdAsync(Guid id, CancellationToken ct = default);
    Task<IReadOnlyList<T>> ObtenerTodosAsync(CancellationToken ct = default);
    Task<IReadOnlyList<T>> ObtenerAsync(Expression<Func<T, bool>> predicado, CancellationToken ct = default);
    Task<T> AgregarAsync(T entidad, CancellationToken ct = default);
    Task ActualizarAsync(T entidad, CancellationToken ct = default);
    Task EliminarAsync(T entidad, CancellationToken ct = default);
    Task<bool> ExisteAsync(Expression<Func<T, bool>> predicado, CancellationToken ct = default);
    Task<int> ContarAsync(Expression<Func<T, bool>>? predicado = null, CancellationToken ct = default);
}