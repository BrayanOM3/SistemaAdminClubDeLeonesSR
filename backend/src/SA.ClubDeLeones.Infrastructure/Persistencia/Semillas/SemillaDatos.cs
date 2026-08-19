using BCrypt.Net;
using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Semillas;

public static class SemillaDatos
{
    public static void Inicializar(AppDbContext context)
    {
        if (context.Usuarios.Any()) return;

        var passwordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!");

        var admin = new Usuario(
            nombreUsuario: "admin",
            correo: "admin@clubdeleones.org",
            passwordHash: passwordHash,
            rol: RolUsuario.Administrador
        );
        admin.MarcarActualizado();

        context.Usuarios.Add(admin);
        context.SaveChanges();
    }
}