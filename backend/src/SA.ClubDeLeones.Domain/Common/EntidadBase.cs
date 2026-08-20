namespace SA.ClubDeLeones.Domain.Common;

public abstract class EntidadBase
{
    public Guid Id { get; protected set; } = Guid.NewGuid();
    public DateTime FechaCreacion { get; protected set; } = DateTime.UtcNow;
    public DateTime? FechaActualizacion { get; protected set; } = DateTime.UtcNow;

    public void MarcarActualizado() => FechaActualizacion = DateTime.UtcNow;

    public override bool Equals(object? obj)
    {
        if (obj is not EntidadBase otra) return false;
        if (ReferenceEquals(this, otra)) return true;
        return Id == otra.Id;
    }

    public override int GetHashCode() => Id.GetHashCode();

    public static bool operator ==(EntidadBase? a, EntidadBase? b)
    {
        if (a is null && b is null) return true;
        if (a is null || b is null) return false;
        return a.Equals(b);
    }

    public static bool operator !=(EntidadBase? a, EntidadBase? b) => !(a == b);
}