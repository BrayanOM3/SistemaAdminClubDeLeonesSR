namespace SA.ClubDeLeones.Application.Interfaces.Servicios;

public interface IEncriptadorPassword
{
    string Encriptar(string password);
    bool Verificar(string password, string passwordHash);
}

public interface IServicioJwt
{
    string GenerarToken(SA.ClubDeLeones.Domain.Entidades.Usuario usuario);
    System.Security.Claims.ClaimsPrincipal? ValidarToken(string token);
}