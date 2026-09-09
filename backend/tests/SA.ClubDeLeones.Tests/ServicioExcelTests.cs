using System.IO;
using ClosedXML.Excel;
using FluentAssertions;
using SA.ClubDeLeones.Application.Dtos.Donaciones;
using SA.ClubDeLeones.Domain.Enums;
using SA.ClubDeLeones.Infrastructure.Exportacion;
using Xunit;

namespace SA.ClubDeLeones.Tests;

/// <summary>
/// Verifica que las columnas de moneda de los reportes Excel tengan ancho suficiente para el
/// valor ya formateado (₡ #,##0.00), de modo que Excel no lo muestre como "#########".
/// </summary>
public class ServicioExcelTests
{
    // Montos grandes idénticos en forma a los de la base de datos (incluido el que truncaba).
    private static readonly DonacionDto[] Datos =
    {
        new(Guid.NewGuid(), "Carlos Alberto Rodríguez Mora", TipoDonacion.Monetaria, 25000m,
            "Donación para canastas navideñas", new DateTime(2025, 12, 1), "REC-001", null,
            "Campaña Navidad Solidaria 2025", null, "Ana Piedra"),
        new(Guid.NewGuid(), "María Elena González Jiménez", TipoDonacion.Monetaria, 19_450_000m,
            "Donación mayor (el valor que truncaba)", new DateTime(2025, 12, 5), "REC-002", null,
            "Campaña Navidad Solidaria 2025", null, "Ana Piedra"),
        new(Guid.NewGuid(), "Laura Beatriz Jiménez Araya", TipoDonacion.Monetaria, 9_999_999.99m,
            "Aportación con decimales", new DateTime(2026, 1, 10), "REC-003", null,
            "Útiles Escolares 2025", null, "Roberto Méndez"),
        new(Guid.NewGuid(), "Roberto Antonio Méndez Quesada", TipoDonacion.EnEspecie, null,
            "Donación en especie: útiles escolares", new DateTime(2026, 1, 15), "REC-004", null,
            "Útiles Escolares 2025", null, "Roberto Méndez"),
    };

    [Fact]
    public void Columna_Monto_Cubre_El_Valor_Formateado()
    {
        var bytes = new ServicioExcel().GenerarReporteDonaciones(Datos);

        using var wb = new XLWorkbook(new MemoryStream(bytes));
        var hoja = wb.Worksheet("Donaciones");

        // "Monto" es la columna 3. El texto formateado más ancho es "₡ 19.450.000,00" (17 caracteres).
        var ancho = hoja.Column(3).Width;
        var montoFormateado = "₡ 19.450.000,00";

        ancho.Should().BeGreaterThanOrEqualTo(montoFormateado.Length,
            "el ancho debe cubrir el monto ya formateado (símbolo + separadores + decimales), "
            + $"no el número plano; se obtuvo {ancho} y el texto visible mide {montoFormateado.Length} caracteres");
    }
}
