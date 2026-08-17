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
        CreateMap<Beneficiario, BeneficiarioDto>();
        CreateMap<CrearBeneficiarioDto, Beneficiario>();
        CreateMap<ActualizarBeneficiarioDto, Beneficiario>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.FechaActualizacion, opt => opt.Ignore());

        CreateMap<AyudaSocial, AyudaSocialDto>();
        CreateMap<CrearAyudaSocialDto, AyudaSocial>();
        CreateMap<ActualizarAyudaSocialDto, AyudaSocial>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.FechaActualizacion, opt => opt.Ignore());

        CreateMap<Campana, CampanaDto>()
            .ForMember(dest => dest.MontoRecaudado, opt => opt.MapFrom(src => src.MontoRecaudado));
        CreateMap<CrearCampanaDto, Campana>();
        CreateMap<ActualizarCampanaDto, Campana>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.FechaActualizacion, opt => opt.Ignore())
            .ForMember(dest => dest.MontoRecaudado, opt => opt.Ignore());

        CreateMap<Donacion, DonacionDto>();
        CreateMap<CrearDonacionDto, Donacion>();
        CreateMap<ActualizarDonacionDto, Donacion>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.FechaActualizacion, opt => opt.Ignore());

        CreateMap<Voluntario, VoluntarioDto>()
            .ForMember(dest => dest.TieneUsuario, opt => opt.MapFrom(src => src.Usuario != null));
        CreateMap<CrearVoluntarioDto, Voluntario>();
        CreateMap<ActualizarVoluntarioDto, Voluntario>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.FechaCreacion, opt => opt.Ignore())
            .ForMember(dest => dest.FechaActualizacion, opt => opt.Ignore());

        CreateMap<Usuario, UsuarioDto>()
            .ForMember(dest => dest.NombreVoluntario, opt => opt.MapFrom(src => src.Voluntario != null ? src.Voluntario.NombreCompleto : null));
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
            .ForMember(dest => dest.NombreCampana, opt => opt.MapFrom(src => src.Campana != null ? src.Campana.Nombre : null));
        CreateMap<CrearActividadDto, Actividad>();
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