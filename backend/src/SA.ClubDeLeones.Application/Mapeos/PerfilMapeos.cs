using AutoMapper;
using SA.ClubDeLeones.Application.Dtos.Actividades;
using SA.ClubDeLeones.Application.Dtos.AyudasSociales;
using SA.ClubDeLeones.Application.Dtos.Beneficiarios;
using SA.ClubDeLeones.Application.Dtos.Campanas;
using SA.ClubDeLeones.Application.Dtos.Donaciones;
using SA.ClubDeLeones.Application.Dtos.Usuarios;
using SA.ClubDeLeones.Application.Dtos.Voluntarios;
using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Entidades.Relaciones;

namespace SA.ClubDeLeones.Application.Mapeos;

public class PerfilMapeos : Profile
{
    public PerfilMapeos()
    {
        CreateMap<Beneficiario, BeneficiarioDto>()
            .ConstructUsing(src => new BeneficiarioDto(
                src.Id,
                src.NombreCompleto,
                src.Cedula,
                src.FechaNacimiento,
                src.Telefono,
                src.Correo,
                src.Direccion,
                src.EstadoCivil,
                src.SituacionNecesidad,
                src.FechaCreacion,
                src.Estado,
                src.Observaciones
            ));
        CreateMap<CrearBeneficiarioDto, Beneficiario>();
        CreateMap<ActualizarBeneficiarioDto, Beneficiario>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.FechaActualizacion, opt => opt.Ignore());

        CreateMap<AyudaSocial, AyudaSocialDto>()
            .ConstructUsing(src => new AyudaSocialDto(
                src.Id,
                src.BeneficiarioId,
                src.Beneficiario != null ? src.Beneficiario.NombreCompleto : string.Empty,
                src.Tipo,
                src.Descripcion,
                src.Monto,
                src.FechaEntrega,
                src.CampanaId,
                src.Campana != null ? src.Campana.Nombre : null,
                src.VoluntarioId,
                src.Voluntario != null ? src.Voluntario.NombreCompleto : null,
                src.Estado
            ));
        CreateMap<CrearAyudaSocialDto, AyudaSocial>();
        CreateMap<ActualizarAyudaSocialDto, AyudaSocial>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.FechaActualizacion, opt => opt.Ignore());

        CreateMap<Campana, CampanaDto>()
            .ConstructUsing(src => new CampanaDto(
                src.Id,
                src.Nombre,
                src.Descripcion,
                src.FechaInicio,
                src.FechaFin,
                src.ObjetivoMonto,
                src.Estado,
                src.Tipo,
                src.MontoRecaudado
            ));
        CreateMap<CrearCampanaDto, Campana>()
            .ConstructUsing(src => new Campana(
                src.Nombre,
                src.Descripcion,
                src.FechaInicio,
                src.Tipo,
                src.FechaFin,
                src.ObjetivoMonto
            ));
        CreateMap<ActualizarCampanaDto, Campana>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.FechaActualizacion, opt => opt.Ignore())
            .ForMember(dest => dest.MontoRecaudado, opt => opt.Ignore());

        CreateMap<Donacion, DonacionDto>()
            .ConstructUsing(src => new DonacionDto(
                src.Id,
                src.DonanteNombre,
                src.Tipo,
                src.Monto,
                src.Descripcion,
                src.Fecha,
                src.ReciboNumero,
                src.CampanaId,
                src.Campana != null ? src.Campana.Nombre : null,
                src.VoluntarioId,
                src.Voluntario != null ? src.Voluntario.NombreCompleto : null
            ));
        CreateMap<CrearDonacionDto, Donacion>()
            .ConstructUsing(src => new Donacion(
                src.DonanteNombre,
                src.Tipo,
                DateTime.SpecifyKind(src.Fecha, DateTimeKind.Utc),
                src.Monto,
                src.Descripcion,
                src.ReciboNumero,
                src.CampanaId,
                src.VoluntarioId
            ));
        CreateMap<ActualizarDonacionDto, Donacion>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.FechaActualizacion, opt => opt.Ignore());

        CreateMap<Voluntario, VoluntarioDto>()
            .ConstructUsing(src => new VoluntarioDto(
                src.Id,
                src.NombreCompleto,
                src.Cedula,
                src.Telefono,
                src.Correo,
                src.FechaIngreso,
                src.Disponibilidad,
                src.Especialidad,
                src.Estado,
                src.Usuario != null
            ));
        CreateMap<CrearVoluntarioDto, Voluntario>()
            .ConstructUsing(src => new Voluntario(
                src.NombreCompleto,
                src.Cedula,
                src.FechaIngreso,
                src.Telefono,
                src.Correo,
                src.Disponibilidad,
                src.Especialidad
            ));
        CreateMap<ActualizarVoluntarioDto, Voluntario>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.FechaActualizacion, opt => opt.Ignore());

        CreateMap<Usuario, UsuarioDto>()
            .ForMember(dest => dest.NombreVoluntario, opt => opt.MapFrom(src => src.Voluntario != null ? src.Voluntario.NombreCompleto : null))
            .ConstructUsing(src => new UsuarioDto(
                src.Id,
                src.NombreUsuario,
                src.Correo,
                src.Rol,
                src.Estado,
                src.VoluntarioId,
                src.Voluntario != null ? src.Voluntario.NombreCompleto : null
            ));
        CreateMap<CrearUsuarioDto, Usuario>()
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.FechaActualizacion, opt => opt.Ignore());
        CreateMap<ActualizarUsuarioDto, Usuario>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.FechaActualizacion, opt => opt.Ignore())
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore());

        CreateMap<Actividad, ActividadDto>()
            .ConstructUsing(src => new ActividadDto(
                src.Id,
                src.Nombre,
                src.Descripcion,
                src.Tipo,
                src.Fecha,
                src.Lugar,
                src.CampanaId,
                src.Campana != null ? src.Campana.Nombre : null
            ));
        CreateMap<CrearActividadDto, Actividad>()
            .ConstructUsing(src => new Actividad(
                src.Nombre,
                src.Descripcion,
                src.Tipo,
                DateTime.SpecifyKind(src.Fecha, DateTimeKind.Utc),
                src.Lugar,
                src.CampanaId
            ));
        CreateMap<ActualizarActividadDto, Actividad>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.FechaActualizacion, opt => opt.Ignore());

        CreateMap<CampanaBeneficiario, CampanaBeneficiario>();
        CreateMap<CampanaVoluntario, CampanaVoluntario>();
        CreateMap<ActividadBeneficiario, ActividadBeneficiario>();
        CreateMap<ActividadVoluntario, ActividadVoluntario>();
    }
}