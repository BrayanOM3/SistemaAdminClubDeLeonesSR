namespace SA.ClubDeLeones.Application.Exceptions;

/// <summary>
/// Representa un conflicto de negocio (por ejemplo, intentar eliminar una entidad
/// que tiene registros dependientes referenciándola). Se mapea a HTTP 409 Conflict.
/// </summary>
public class ConflictoEntidadException : Exception
{
    public ConflictoEntidadException(string mensaje)
        : base(mensaje)
    {
    }

    public ConflictoEntidadException(string mensaje, Exception innerException)
        : base(mensaje, innerException)
    {
    }
}
