using SA.ClubDeLeones.Application.Dtos.Autenticacion;

namespace SA.ClubDeLeones.Application.Interfaces.Servicios;

public interface IAutenticacionServicio
{
    Task<IniciarSesionRespuestaDto?> IniciarSesionAsync(IniciarSesionRequestDto dto);
    Task<bool> ValidarTokenAsync(string token);
}