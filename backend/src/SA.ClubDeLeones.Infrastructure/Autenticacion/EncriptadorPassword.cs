using BCrypt.Net;
using SA.ClubDeLeones.Application.Interfaces.Servicios;

namespace SA.ClubDeLeones.Infrastructure.Autenticacion;

public sealed class EncriptadorPassword : IEncriptadorPassword
{
    public string Encriptar(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool Verificar(string password, string passwordHash)
    {
        return BCrypt.Net.BCrypt.Verify(password, passwordHash);
    }
}