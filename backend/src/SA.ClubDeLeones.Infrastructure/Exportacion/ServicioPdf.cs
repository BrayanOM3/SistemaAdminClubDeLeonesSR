using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using SA.ClubDeLeones.Application.Interfaces.Servicios;
using System.Reflection;
using System.Collections.Generic;

namespace SA.ClubDeLeones.Infrastructure.Exportacion;

public sealed class ServicioPdf : IServicioPdf
{
    public byte[] GenerarReporteBeneficiarios(IEnumerable<object> datos, string titulo = "Reporte de Beneficiarios")
    {
        return GenerarReporteGenerico(datos, titulo, new[]
        {
            ("Id", "ID"),
            ("NombreCompleto", "Nombre Completo"),
            ("Cedula", "Cédula"),
            ("FechaNacimiento", "Fecha Nacimiento"),
            ("Telefono", "Teléfono"),
            ("Correo", "Correo"),
            ("Direccion", "Dirección"),
            ("EstadoCivil", "Estado Civil"),
            ("SituacionNecesidad", "Situación Necesidad"),
            ("FechaRegistro", "Fecha Registro"),
            ("Estado", "Estado"),
            ("Observaciones", "Observaciones")
        });
    }

    public byte[] GenerarReporteDonaciones(IEnumerable<object> datos, string titulo = "Reporte de Donaciones")
    {
        return GenerarReporteGenerico(datos, titulo, new[]
        {
            ("Id", "ID"),
            ("DonanteNombre", "Donante"),
            ("Tipo", "Tipo"),
            ("Monto", "Monto"),
            ("Descripcion", "Descripción"),
            ("Fecha", "Fecha"),
            ("ReciboNumero", "Número Recibo"),
            ("CampanaId", "Campaña"),
            ("VoluntarioId", "Voluntario")
        });
    }

    public byte[] GenerarReporteCampanas(IEnumerable<object> datos, string titulo = "Reporte de Campañas")
    {
        return GenerarReporteGenerico(datos, titulo, new[]
        {
            ("Id", "ID"),
            ("Nombre", "Nombre"),
            ("Descripcion", "Descripción"),
            ("FechaInicio", "Fecha Inicio"),
            ("FechaFin", "Fecha Fin"),
            ("ObjetivoMonto", "Objetivo Monto"),
            ("Estado", "Estado"),
            ("Tipo", "Tipo")
        });
    }

    public byte[] GenerarReporteVoluntarios(IEnumerable<object> datos, string titulo = "Reporte de Voluntarios")
    {
        return GenerarReporteGenerico(datos, titulo, new[]
        {
            ("Id", "ID"),
            ("NombreCompleto", "Nombre Completo"),
            ("Cedula", "Cédula"),
            ("Telefono", "Teléfono"),
            ("Correo", "Correo"),
            ("FechaIngreso", "Fecha Ingreso"),
            ("Disponibilidad", "Disponibilidad"),
            ("Especialidad", "Especialidad"),
            ("Estado", "Estado")
        });
    }

    private byte[] GenerarReporteGenerico(IEnumerable<object> datos, string titulo, (string propiedad, string encabezado)[] columnas)
    {
        QuestPDF.Settings.License = LicenseType.Community;

        var listaDatos = datos.ToList();

        return Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(30);
                page.Size(PageSizes.A4.Landscape());
                page.PageColor(Colors.White);
                page.DefaultTextStyle(x => x.FontSize(8).FontFamily(Fonts.Calibri));

                page.Header().Element(header =>
                {
                    header.Column(col =>
                    {
                        col.Item().Text(titulo).FontSize(16).Bold().FontColor(Colors.Blue.Darken2).AlignCenter();
                        col.Item().Text($"Generado: {DateTime.Now:dd/MM/yyyy HH:mm}").FontSize(10).FontColor(Colors.Grey.Darken1).AlignCenter();
                        col.Item().Text($"Total registros: {listaDatos.Count}").FontSize(10).FontColor(Colors.Grey.Darken1).AlignCenter();
                        col.Item().PaddingTop(5).LineHorizontal(1).LineColor(Colors.Blue.Darken2);
                    });
                });

                page.Content().Element(content =>
                {
                    if (listaDatos.Count == 0)
                    {
                        content.AlignCenter().Text("No hay datos para mostrar").FontSize(12).FontColor(Colors.Grey.Medium);
                        return;
                    }

                    content.Table(table =>
                    {
                        table.ColumnsDefinition(columnsDef =>
                        {
                            foreach (var _ in columnas)
                            {
                                columnsDef.RelativeColumn();
                            }
                        });

                        // Header
                        table.Header(header =>
                        {
                            foreach (var (_, encabezado) in columnas)
                            {
                                header.Cell().Element(cell => EstiloCeldaEncabezado(cell, encabezado));
                            }
                        });

                        // Rows
                        var filaPar = false;
                        foreach (var item in listaDatos)
                        {
                            foreach (var (propiedad, _) in columnas)
                            {
                                var valor = ObtenerValorPropiedad(item, propiedad);
                                table.Cell().Element(c => EstiloCeldaDato(c, valor, filaPar));
                            }
                            filaPar = !filaPar;
                        }
                    });
                });

                page.Footer().AlignCenter().Text(text =>
                {
                    text.Span("Página ").FontSize(8);
                    text.CurrentPageNumber().FontSize(8);
                    text.Span(" de ").FontSize(8);
                    text.TotalPages().FontSize(8);
                });
            });
        }).GeneratePdf();
    }

    private static void EstiloCeldaEncabezado(IContainer cell, string texto)
    {
        cell.Background(Colors.Blue.Darken2)
          .Padding(4)
          .BorderBottom(1)
          .BorderColor(Colors.Blue.Darken4)
          .Text(texto)
          .FontSize(8)
          .Bold()
          .FontColor(Colors.White)
          .AlignCenter();
    }

    private static void EstiloCeldaDato(IContainer cell, string? valor, bool filaPar)
    {
        cell.Padding(3)
          .BorderBottom(0.5f)
          .BorderColor(Colors.Grey.Lighten2)
          .Background(filaPar ? Colors.Grey.Lighten4 : Colors.White)
          .Text(valor ?? string.Empty)
          .FontSize(7)
          .FontColor(Colors.Grey.Darken3);
    }

    private static string? ObtenerValorPropiedad(object obj, string nombrePropiedad)
    {
        var prop = obj.GetType().GetProperty(nombrePropiedad, BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
        if (prop == null) return null;

        var valor = prop.GetValue(obj);
        if (valor == null) return null;

        return valor switch
        {
            DateTime dt => dt.ToString("dd/MM/yyyy"),
            DateOnly doOnly => doOnly.ToString("dd/MM/yyyy"),
            decimal d => d.ToString("N2"),
            Guid g => g.ToString()[..8].ToUpper(),
            Enum e => e.ToString(),
            _ => valor.ToString()
        };
    }
}