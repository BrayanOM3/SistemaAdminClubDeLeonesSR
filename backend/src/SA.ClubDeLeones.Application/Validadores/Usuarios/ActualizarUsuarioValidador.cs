using FluentValidation;
using SA.ClubDeLeones.Application.Dtos.Usuarios;
using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Application.Validadores.Usuarios;

public class ActualizarUsuarioValidador : AbstractValidator<ActualizarUsuarioDto>
{
    public ActualizarUsuarioValidador()
    {
        RuleFor(x => x.NombreUsuario)
            .NotEmpty().WithMessage("El nombre de usuario es obligatorio")
            .MaximumLength(50).WithMessage("El nombre de usuario no puede exceder 50 caracteres");

        RuleFor(x => x.Correo)
            .NotEmpty().WithMessage("El correo es obligatorio")
            .MaximumLength(100).WithMessage("El correo no puede exceder 100 caracteres")
            .EmailAddress().WithMessage("El formato del correo no es válido");

        RuleFor(x => x.Rol)
            .IsInEnum().WithMessage("El rol no es válido");

        RuleFor(x => x.Estado)
            .IsInEnum().WithMessage("El estado no es válido");

        RuleFor(x => x.VoluntarioId)
            .NotEmpty().WithMessage("El voluntario es obligatorio cuando se proporciona")
            .When(x => x.VoluntarioId.HasValue);
    }
}