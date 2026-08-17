namespace SA.ClubDeLeones.Domain.Common;

public abstract class ObjetoValor : IEquatable<ObjetoValor>
{
    protected abstract IEnumerable<object?> ObtenerComponentesIgualdad();

    public bool Equals(ObjetoValor? otro)
    {
        if (otro is null) return false;
        if (ReferenceEquals(this, otro)) return true;
        if (GetType() != otro.GetType()) return false;
        return ObtenerComponentesIgualdad().SequenceEqual(otro.ObtenerComponentesIgualdad());
    }

    public override bool Equals(object? obj) => Equals(obj as ObjetoValor);

    public override int GetHashCode() => ObtenerComponentesIgualdad()
        .Aggregate(1, (hash, obj) => HashCode.Combine(hash, obj));

    public static bool operator ==(ObjetoValor? a, ObjetoValor? b)
    {
        if (a is null && b is null) return true;
        if (a is null || b is null) return false;
        return a.Equals(b);
    }

    public static bool operator !=(ObjetoValor? a, ObjetoValor? b) => !(a == b);
}