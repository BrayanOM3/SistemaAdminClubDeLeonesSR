using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SA.ClubDeLeones.Domain.Entidades;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Configuraciones;

public class VoluntarioConfiguracion : IEntityTypeConfiguration<Voluntario>
{
    public void Configure(EntityTypeBuilder<Voluntario> builder)
    {
        builder.ToTable("Voluntarios");

        builder.HasKey(v => v.Id);

        builder.Property(v => v.NombreCompleto)
            .IsRequired()
            .HasMaxLength(120);

        builder.Property(v => v.Cedula)
            .IsRequired()
            .HasMaxLength(20);

        builder.HasIndex(v => v.Cedula)
            .IsUnique();

        builder.Property(v => v.Telefono)
            .HasMaxLength(20);

        builder.Property(v => v.Correo)
            .HasMaxLength(100);

        builder.Property(v => v.FechaIngreso)
            .IsRequired()
            .HasColumnType("date");

        builder.Property(v => v.Disponibilidad)
            .HasMaxLength(200);

        builder.Property(v => v.Especialidad)
            .HasMaxLength(200);

        builder.Property(v => v.FechaCreacion)
            .IsRequired();

        builder.Property(v => v.FechaActualizacion)
            .IsRequired(false);

        builder.Property(v => v.Estado)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(20);

        // Relaciones
        builder.HasOne(v => v.Usuario)
            .WithOne(u => u.Voluntario)
            .HasForeignKey<Usuario>(u => u.VoluntarioId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(v => v.DonacionesRegistradas)
            .WithOne(d => d.Voluntario)
            .HasForeignKey(d => d.VoluntarioId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(v => v.AyudasEntregadas)
            .WithOne(a => a.Voluntario)
            .HasForeignKey(a => a.VoluntarioId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(v => v.Campanas)
            .WithOne(cv => cv.Voluntario)
            .HasForeignKey(cv => cv.VoluntarioId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(v => v.Actividades)
            .WithOne(av => av.Voluntario)
            .HasForeignKey(av => av.VoluntarioId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}