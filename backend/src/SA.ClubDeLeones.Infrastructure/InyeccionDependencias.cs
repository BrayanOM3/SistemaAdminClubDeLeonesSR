using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using SA.ClubDeLeones.Application.Interfaces.Servicios;
using SA.ClubDeLeones.Domain.Interfaces;
using SA.ClubDeLeones.Infrastructure.Autenticacion;
using SA.ClubDeLeones.Infrastructure.Exportacion;
using SA.ClubDeLeones.Infrastructure.Persistencia;
using SA.ClubDeLeones.Infrastructure.Persistencia.Repositorios;
using SA.ClubDeLeones.Infrastructure.Persistencia.Semillas;

namespace SA.ClubDeLeones.Infrastructure;

public static class InyeccionDependencias
{
    public static IServiceCollection AddInfraestructura(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' no encontrada.");

        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(connectionString));

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        services.AddScoped(typeof(IRepositorio<>), typeof(RepositorioBase<>));
        services.AddScoped<BeneficiarioRepositorio>();
        services.AddScoped<AyudaSocialRepositorio>();
        services.AddScoped<CampanaRepositorio>();
        services.AddScoped<DonacionRepositorio>();
        services.AddScoped<VoluntarioRepositorio>();
        services.AddScoped<UsuarioRepositorio>();
        services.AddScoped<ActividadRepositorio>();

        services.AddScoped<IEncriptadorPassword, EncriptadorPassword>();
        services.AddScoped<IServicioJwt, ServicioJwt>();

        services.Configure<JwtOpciones>(configuration.GetSection("Jwt"));

        services.AddSingleton(resolver =>
            resolver.GetRequiredService<IOptions<JwtOpciones>>().Value);

        services.AddScoped<IServicioExcel, ServicioExcel>();
        services.AddScoped<IServicioPdf, ServicioPdf>();

        return services;
    }

    public static async Task InicializarBaseDatosAsync(this IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        await context.Database.MigrateAsync();

        SemillaDatos.Inicializar(context);
    }
}