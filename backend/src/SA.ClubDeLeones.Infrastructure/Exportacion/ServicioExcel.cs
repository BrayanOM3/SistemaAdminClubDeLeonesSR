using ClosedXML.Excel;
using SA.ClubDeLeones.Application.Dtos.AyudasSociales;
using SA.ClubDeLeones.Application.Dtos.Beneficiarios;
using SA.ClubDeLeones.Application.Dtos.Campanas;
using SA.ClubDeLeones.Application.Dtos.Donaciones;
using SA.ClubDeLeones.Application.Dtos.Voluntarios;
using SA.ClubDeLeones.Application.Dtos.Actividades;
using SA.ClubDeLeones.Application.Interfaces.Servicios;
using System.Globalization;
using System.IO;

namespace SA.ClubDeLeones.Infrastructure.Exportacion;

/// <summary>Indica el tipo de celda para aplicar el formato numérico/fecha correcto en Excel.</summary>
public enum TipoColumnaExcel
{
    Texto,
    Fecha,   // dd/mm/yyyy
    Moneda   // ₡ #,##0.00
}

/// <summary>
/// Define una columna de un reporte Excel de forma tipada: título, cómo obtener el valor y
/// opciones de formato (moneda/fecha) y coloreado de fondo según el valor.
/// </summary>
public sealed class ColumnaExcel<T>
{
    public required string Titulo { get; init; }
    public required Func<T, object?> ObtenerValor { get; init; }
    public TipoColumnaExcel Tipo { get; init; } = TipoColumnaExcel.Texto;

    /// <summary>Devuelve un color html ("#RRGGBB") para el fondo de la celda según la fila, o null para sin color.</summary>
    public Func<T, string?>? ColorFondo { get; init; }
}

/// <summary>
/// Genera archivos .xlsx con formato profesional: encabezado azul institucional, autofiltro,
/// fila de encabezados congelada, anchos ajustados al contenido, moneda en colones y fechas dd/mm/yyyy.
/// </summary>
public sealed class ServicioExcel : IServicioExcel
{
    // Azul Lions institucional, según el manual de marca.
    private const string ColorInstitucional = "#00338D";
    private const string ColorTextoEncabezado = "#FFFFFF";
    private const string ColorBorde = "#D9DEE8";
    private const string FormatoMoneda = "₡ #,##0.00";
    private const string FormatoFecha = "dd/mm/yyyy";
    private const double AnchoColumnaMin = 8;
    private const double AnchoColumnaMax = 45;
    // Cultura de Costa Rica para reproducir el separador de miles/decimales del formato de moneda.
    private static readonly CultureInfo CulturaColones = CultureInfo.GetCultureInfo("es-CR");

    public byte[] GenerarReporteBeneficiarios(IEnumerable<BeneficiarioDto> datos)
    {
        ColumnaExcel<BeneficiarioDto>[] columnas =
        {
            new() { Titulo = "Nombre completo", ObtenerValor = f => f.NombreCompleto },
            new() { Titulo = "Cédula", ObtenerValor = f => f.Cedula },
            new() { Titulo = "Fecha de nacimiento", ObtenerValor = f => f.FechaNacimiento, Tipo = TipoColumnaExcel.Fecha },
            new() { Titulo = "Teléfono", ObtenerValor = f => f.Telefono },
            new() { Titulo = "Correo", ObtenerValor = f => f.Correo },
            new() { Titulo = "Dirección", ObtenerValor = f => f.Direccion },
            new() { Titulo = "Estado civil", ObtenerValor = f => f.EstadoCivil.ToString() },
            new() { Titulo = "Situación de necesidad", ObtenerValor = f => f.SituacionNecesidad },
            new() { Titulo = "Fecha registro", ObtenerValor = f => f.FechaRegistro, Tipo = TipoColumnaExcel.Fecha },
            new() { Titulo = "Estado", ObtenerValor = f => f.Estado.ToString(), ColorFondo = f => ColorEstado(f.Estado.ToString()) },
        };

        return GenerarReporte(datos, "Beneficiarios", columnas);
    }

    public byte[] GenerarReporteDonaciones(IEnumerable<DonacionDto> datos)
    {
        ColumnaExcel<DonacionDto>[] columnas =
        {
            new() { Titulo = "Donante", ObtenerValor = f => f.DonanteNombre },
            new() { Titulo = "Tipo", ObtenerValor = f => f.Tipo.ToString() },
            new() { Titulo = "Monto", ObtenerValor = f => f.Monto, Tipo = TipoColumnaExcel.Moneda },
            new() { Titulo = "Descripción", ObtenerValor = f => f.Descripcion },
            new() { Titulo = "Fecha", ObtenerValor = f => f.Fecha, Tipo = TipoColumnaExcel.Fecha },
            new() { Titulo = "Recibo", ObtenerValor = f => f.ReciboNumero },
            new() { Titulo = "Campaña", ObtenerValor = f => f.NombreCampana },
            new() { Titulo = "Voluntario", ObtenerValor = f => f.NombreVoluntario },
        };

        return GenerarReporte(datos, "Donaciones", columnas);
    }

    public byte[] GenerarReporteCampanas(IEnumerable<CampanaDto> datos)
    {
        ColumnaExcel<CampanaDto>[] columnas =
        {
            new() { Titulo = "Nombre", ObtenerValor = f => f.Nombre },
            new() { Titulo = "Descripción", ObtenerValor = f => f.Descripcion },
            new() { Titulo = "Fecha inicio", ObtenerValor = f => f.FechaInicio, Tipo = TipoColumnaExcel.Fecha },
            new() { Titulo = "Fecha fin", ObtenerValor = f => f.FechaFin, Tipo = TipoColumnaExcel.Fecha },
            new() { Titulo = "Objetivo", ObtenerValor = f => f.ObjetivoMonto, Tipo = TipoColumnaExcel.Moneda },
            new() { Titulo = "Recaudado", ObtenerValor = f => f.MontoRecaudado, Tipo = TipoColumnaExcel.Moneda },
            new() { Titulo = "Estado", ObtenerValor = f => f.Estado.ToString(), ColorFondo = f => ColorEstado(f.Estado.ToString()) },
            new() { Titulo = "Tipo", ObtenerValor = f => f.Tipo.ToString() },
        };

        return GenerarReporte(datos, "Campañas", columnas);
    }

    public byte[] GenerarReporteVoluntarios(IEnumerable<VoluntarioDto> datos)
    {
        ColumnaExcel<VoluntarioDto>[] columnas =
        {
            new() { Titulo = "Nombre completo", ObtenerValor = f => f.NombreCompleto },
            new() { Titulo = "Cédula", ObtenerValor = f => f.Cedula },
            new() { Titulo = "Teléfono", ObtenerValor = f => f.Telefono },
            new() { Titulo = "Correo", ObtenerValor = f => f.Correo },
            new() { Titulo = "Fecha ingreso", ObtenerValor = f => f.FechaIngreso, Tipo = TipoColumnaExcel.Fecha },
            new() { Titulo = "Disponibilidad", ObtenerValor = f => f.Disponibilidad },
            new() { Titulo = "Especialidad", ObtenerValor = f => f.Especialidad },
            new() { Titulo = "Estado", ObtenerValor = f => f.Estado.ToString(), ColorFondo = f => ColorEstado(f.Estado.ToString()) },
        };

        return GenerarReporte(datos, "Voluntarios", columnas);
    }

    public byte[] GenerarReporteAyudasSociales(IEnumerable<AyudaSocialDto> datos)
    {
        ColumnaExcel<AyudaSocialDto>[] columnas =
        {
            new() { Titulo = "Beneficiario", ObtenerValor = f => f.NombreBeneficiario },
            new() { Titulo = "Tipo", ObtenerValor = f => f.Tipo.ToString() },
            new() { Titulo = "Descripción", ObtenerValor = f => f.Descripcion },
            new() { Titulo = "Monto", ObtenerValor = f => f.Monto, Tipo = TipoColumnaExcel.Moneda },
            new() { Titulo = "Fecha entrega", ObtenerValor = f => f.FechaEntrega, Tipo = TipoColumnaExcel.Fecha },
            new() { Titulo = "Estado", ObtenerValor = f => f.Estado.ToString(), ColorFondo = f => ColorEstado(f.Estado.ToString()) },
            new() { Titulo = "Campaña", ObtenerValor = f => f.NombreCampana },
            new() { Titulo = "Voluntario", ObtenerValor = f => f.NombreVoluntario },
        };

        return GenerarReporte(datos, "Ayudas Sociales", columnas);
    }

    public byte[] GenerarReporteActividades(IEnumerable<ActividadDto> datos)
    {
        ColumnaExcel<ActividadDto>[] columnas =
        {
            new() { Titulo = "Nombre", ObtenerValor = f => f.Nombre },
            new() { Titulo = "Descripción", ObtenerValor = f => f.Descripcion },
            new() { Titulo = "Tipo", ObtenerValor = f => f.Tipo.ToString() },
            new() { Titulo = "Fecha", ObtenerValor = f => f.Fecha, Tipo = TipoColumnaExcel.Fecha },
            new() { Titulo = "Lugar", ObtenerValor = f => f.Lugar },
            new() { Titulo = "Campaña", ObtenerValor = f => f.NombreCampana },
        };

        return GenerarReporte(datos, "Actividades", columnas);
    }

    /// <summary>
    /// Motor común de generación de .xlsx. Aplica el formato profesional completo:
    /// encabezado azul institucional, autofiltro, congelado de encabezados, anchos al contenido
    /// y formato de moneda/fecha según el tipo de columna.
    /// </summary>
    private byte[] GenerarReporte<T>(IEnumerable<T> datos, string nombreHoja, IReadOnlyList<ColumnaExcel<T>> columnas)
    {
        using var workbook = new XLWorkbook();
        var hoja = workbook.Worksheets.Add(nombreHoja);

        // Encabezados.
        for (var i = 0; i < columnas.Count; i++)
            hoja.Cell(1, i + 1).Value = columnas[i].Titulo;

        // Datos.
        var fila = 2;
        foreach (var item in datos)
        {
            for (var i = 0; i < columnas.Count; i++)
                EscribirCelda(hoja.Cell(fila, i + 1), columnas[i], item);
            fila++;
        }

        var ultimaColumna = columnas.Count;
        var ultimaFila = Math.Max(fila - 1, 1);

        // Estilo del encabezado: fondo azul institucional, texto blanco y negrita, centrado.
        var rangoEncabezado = hoja.Range(1, 1, 1, ultimaColumna);
        rangoEncabezado.Style.Fill.BackgroundColor = XLColor.FromHtml(ColorInstitucional);
        rangoEncabezado.Style.Font.SetFontColor(XLColor.FromHtml(ColorTextoEncabezado));
        rangoEncabezado.Style.Font.SetBold();
        rangoEncabezado.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

        var rangoUsado = hoja.Range(1, 1, ultimaFila, ultimaColumna);
        rangoUsado.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
        rangoUsado.Style.Border.InsideBorder = XLBorderStyleValues.Thin;
        rangoUsado.Style.Border.OutsideBorderColor = XLColor.FromHtml(ColorBorde);
        rangoUsado.Style.Border.InsideBorderColor = XLColor.FromHtml(ColorBorde);
        rangoUsado.Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;

        // Ancho de columnas ajustado al contenido. El autofit nativo se llama aquí, después de
        // aplicar los formatos de celda (el orden es correcto), pero ClosedXML no mide el texto
        // formateado de las celdas numéricas: por eso las columnas de moneda quedaban angostas y
        // Excel las mostraba como "#########". Recalibramos esas columnas con el ancho del valor
        // ya formateado y dejamos el resto al autofit.
        hoja.Columns().AdjustToContents();
        AjustarAnchoColumnasMonetarias(hoja, ultimaFila, columnas);
        foreach (var columna in hoja.ColumnsUsed())
        {
            if (columna.Width < AnchoColumnaMin) columna.Width = AnchoColumnaMin;
            if (columna.Width > AnchoColumnaMax) columna.Width = AnchoColumnaMax;
        }

        // Filtrar y ordenar desde el encabezado, y mantener la fila de encabezados visible.
        hoja.Range(1, 1, ultimaFila, ultimaColumna).SetAutoFilter();
        hoja.SheetView.FreezeRows(1);

        using var stream = new MemoryStream();
        workbook.SaveAs(stream);
        return stream.ToArray();
    }

    /// <summary>Escribe el valor en la celda con el tipo y formato correspondiente (moneda/fecha/texto) y el color de fondo opcional.</summary>
    private static void EscribirCelda<T>(IXLCell celda, ColumnaExcel<T> columna, T fila)
    {
        var valor = columna.ObtenerValor(fila);

        if (columna.Tipo == TipoColumnaExcel.Moneda)
        {
            if (valor is decimal monto) celda.Value = monto;
            else if (valor is double doble) celda.Value = doble;
            else if (valor is int entero) celda.Value = entero;
            else if (valor is long largo) celda.Value = largo;
            else if (valor is not null && decimal.TryParse(valor.ToString(), out var parseado)) celda.Value = parseado;
            else { celda.Value = string.Empty; return; }

            celda.Style.NumberFormat.Format = FormatoMoneda;
            return;
        }

        if (columna.Tipo == TipoColumnaExcel.Fecha)
        {
            if (valor is DateTime fecha) celda.Value = fecha;
            else if (valor is DateOnly dateOnly) celda.Value = dateOnly.ToDateTime(TimeOnly.MinValue);
            else if (valor is DateTimeOffset offset) celda.Value = offset.DateTime;
            else if (valor is not null && DateTime.TryParse(valor.ToString(), out var fechaParseada)) celda.Value = fechaParseada;
            else { celda.Value = string.Empty; return; }

            celda.Style.NumberFormat.Format = FormatoFecha;
            return;
        }

        celda.Value = valor?.ToString() ?? string.Empty;

        if (columna.ColorFondo is { } colorFondo)
        {
            var hex = colorFondo(fila);
            if (!string.IsNullOrEmpty(hex))
                celda.Style.Fill.BackgroundColor = XLColor.FromHtml(hex);
        }
    }

    /// <summary>
    /// Recalcula el ancho de las columnas de moneda para que el valor formateado (₡ #,##0.00,
    /// con símbolo, separadores de miles y decimales) quepa completo en la celda.
    /// </summary>
    private static void AjustarAnchoColumnasMonetarias<T>(
        IXLWorksheet hoja, int ultimaFila, IReadOnlyList<ColumnaExcel<T>> columnas)
    {
        for (var i = 0; i < columnas.Count; i++)
        {
            if (columnas[i].Tipo != TipoColumnaExcel.Moneda) continue;

            var numeroColumna = i + 1;
            // El ancho mínimo es el del encabezado (ej. "Objetivo"), aunque ningún dato lo supere.
            var anchoMax = EstimarAnchoTexto(columnas[i].Titulo, esMoneda: false);
            for (var fila = 2; fila <= ultimaFila; fila++)
            {
                var celda = hoja.Cell(fila, numeroColumna);
                if (!celda.Value.IsNumber) continue;

                // Texto visible según el formato "₡ #,##0.00" con separadores es-CR (ej. "₡ 1.234.567,89").
                var texto = FormatoMoneda[..1] + " " + celda.GetDouble().ToString("N2", CulturaColones);
                var ancho = EstimarAnchoTexto(texto, esMoneda: true);
                if (ancho > anchoMax) anchoMax = ancho;
            }

            if (hoja.Column(numeroColumna).Width < anchoMax)
                hoja.Column(numeroColumna).Width = anchoMax;
        }
    }

    /// <summary>
    /// Estima el ancho de columna que ocupa un texto. En Excel una unidad de ancho equivale
    /// aproximadamente a un carácter de la fuente por defecto (Calibri 11); la moneda añade un
    /// símbolo ancho (₡) y separadores, por eso se le aplica un pequeño margen.
    /// </summary>
    private static double EstimarAnchoTexto(string texto, bool esMoneda)
    {
        var factor = esMoneda ? 1.12 : 1.0;
        return texto.Length * factor + 1.0;
    }

    /// <summary>Color de fondo suave según el estado, para que la columna "Estado" se lea de un vistazo.</summary>
    private static string? ColorEstado(string? estado) => estado?.Trim() switch
    {
        "Entregada" or "Activa" or "Activo" => "#E6F4EA",
        "Pendiente" or "Planificada" => "#FFF3CD",
        "Cancelada" => "#F9DADA",
        "Finalizada" or "Inactivo" => "#EAEAEF",
        _ => null
    };
}