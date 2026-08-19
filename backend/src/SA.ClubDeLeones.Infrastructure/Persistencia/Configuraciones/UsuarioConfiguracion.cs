using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SA.ClubDeLeones.Domain.Entidades;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Configuraciones;

public class UsuarioConfiguracion : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        builder.ToTable("Usuarios");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.NombreUsuario)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasIndex(u => u.NombreUsuario)
            .IsUnique();

        builder.Property(u => u.Correo)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasIndex(u => u.Correo)
            .IsUnique();

        builder.Property(u => u.PasswordHash)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(u => u.Rol)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(u => u.Estado)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(u => u.VoluntarioId);

        builder.Property(u => u.FechaCreacion)
            .IsRequired();

        builder.Property(u => u.FechaActualizacion)
            .IsRequired(false);

        // Relación 1:0/1 con Voluntario
        builder.HasOne(u => u.Voluntario)
            .WithOne(v => v.Usuario)
            .HasForeignKey<Usuario>(u => u.VoluntarioId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}