using BCrypt.Net;
using SA.ClubDeLeones.Domain.Entidades;
using SA.ClubDeLeones.Domain.Entidades.Relaciones;
using SA.ClubDeLeones.Domain.Enums;

namespace SA.ClubDeLeones.Infrastructure.Persistencia.Semillas;

public static class SemillaDatos
{
    public static void Inicializar(AppDbContext context)
    {
        if (context.Beneficiarios.Any()) return;

        // Crear usuario admin si no existe
        if (!context.Usuarios.Any(u => u.Correo == "admin@clubdeleones.org"))
        {
            var passwordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!");

            var admin = new Usuario(
                nombreUsuario: "admin",
                correo: "admin@clubdeleones.org",
                passwordHash: passwordHash,
                rol: RolUsuario.Administrador
            );
            admin.MarcarActualizado();

            context.Usuarios.Add(admin);
            context.SaveChanges();
        }

        // === BENEFICIARIOS (10 registros) ===
        var beneficiarios = new List<Beneficiario>
        {
            new Beneficiario(
                nombreCompleto: "María Elena González Jiménez",
                cedula: "1-0234-0567",
                direccion: "San José, San José, Barrio Escalante, 100m norte del Parque Francia",
                estadoCivil: EstadoCivil.Soltero,
                situacionNecesidad: "Madre soltera con 3 hijos menores de edad, desempleada, vive en casa de madera con piso de tierra. Necesita apoyo alimentario y medicamentos para asma de su hijo menor.",
                fechaNacimiento: new DateOnly(1988, 3, 15),
                telefono: "8823-4567",
                correo: "maria.gonzalez@email.com",
                observaciones: "Prioridad alta - familia vulnerable"
            ),
            new Beneficiario(
                nombreCompleto: "Carlos Alberto Rodríguez Mora",
                cedula: "2-0345-0678",
                direccion: "Alajuela, Alajuela Centro, 200m este de la Catedral",
                estadoCivil: EstadoCivil.Casado,
                situacionNecesidad: "Adulto mayor de 72 años, pensionado mínimo, esposa con discapacidad motriz. Viven solos, necesitan ayuda para medicamentos de presión arterial y diabetes, y adecuaciones en el hogar (rampa, barandas).",
                fechaNacimiento: new DateOnly(1952, 7, 22),
                telefono: "2434-5678",
                correo: "carlos.rodriguez@email.com",
                observaciones: "Adulto mayor - prioridad en medicamentos"
            ),
            new Beneficiario(
                nombreCompleto: "Ana Patricia Vargas Solano",
                cedula: "3-0456-0789",
                direccion: "Cartago, Paraíso, Llanos de Santa Lucía, contiguo a la Escuela",
                estadoCivil: EstadoCivil.Viudo,
                situacionNecesidad: "Viuda desde hace 2 años, 45 años, 2 hijos adolescentes. Trabaja medio tiempo en limpieza, ingreso insuficiente. La casa presenta goteras en techo y paredes con humedad. Urgente reparación de techo y apoyo con útiles escolares.",
                fechaNacimiento: new DateOnly(1979, 11, 8),
                telefono: "8567-8901",
                correo: "ana.vargas@email.com",
                observaciones: "Vivienda en mal estado - campaña techo"
            ),
            new Beneficiario(
                nombreCompleto: "José Luis Hernández Castillo",
                cedula: "4-0567-0890",
                direccion: "Heredia, San Rafael, San Josecito, 300m sur del Centro Comercial",
                estadoCivil: EstadoCivil.Soltero,
                situacionNecesidad: "Joven de 24 años con discapacidad auditiva moderada, terminado bachillerato por madurez. Busca capacitación técnica y audífonos. Vive con madre anciana que no puede trabajar.",
                fechaNacimiento: new DateOnly(2000, 5, 30),
                telefono: "8790-1234",
                correo: "jose.hernandez@email.com",
                observaciones: "Discapacidad auditiva - necesita audífonos y capacitación"
            ),
            new Beneficiario(
                nombreCompleto: "Laura Beatriz Jiménez Araya",
                cedula: "5-0678-0901",
                direccion: "Guanacaste, Liberia, Barrio Irvin, diagonal a Bomberos",
                estadoCivil: EstadoCivil.Casado,
                situacionNecesidad: "Familia de 5 personas, esposo agricultor temporero. Inestabilidad laboral por sequía. Niños de 6, 9 y 12 años. Necesitan apoyo alimentario constante, uniformes y útiles escolares. Vivienda de bloque sin terminar.",
                fechaNacimiento: new DateOnly(1985, 9, 12),
                telefono: "8654-3210",
                correo: "laura.jimenez@email.com",
                observaciones: "Familia numerosa - zona rural afectada por sequía"
            ),
            new Beneficiario(
                nombreCompleto: "Roberto Antonio Méndez Quesada",
                cedula: "6-0789-0123",
                direccion: "Puntarenas, Esparza, Espíritu Santo, 1km norte de la Iglesia",
                estadoCivil: EstadoCivil.Divorciado,
                situacionNecesidad: "Padre soltero de 38 años con custodia de hija de 8 años. Trabaja en construcción informal, ingresos variables. Necesita apoyo para matrícula y transporte escolar de la niña, además de alimentos básicos.",
                fechaNacimiento: new DateOnly(1986, 1, 25),
                telefono: "8834-5678",
                correo: "roberto.mendez@email.com",
                observaciones: "Padre soltero - apoyo educativo prioritario"
            ),
            new Beneficiario(
                nombreCompleto: "Carmen Lucía Soto Brenes",
                cedula: "7-0890-0234",
                direccion: "Limón, Limón Centro, Barrio Roosevelt, contiguo al Mercado",
                estadoCivil: EstadoCivil.Soltero,
                situacionNecesidad: "Adulto mayor de 68 años, vive sola en casa de madera. Pensión mínima. Problemas de movilidad por artrosis avanzada en rodillas. Necesita andador, medicamentos para dolor, y apoyo alimentario. Sin red familiar cercana.",
                fechaNacimiento: new DateOnly(1956, 4, 18),
                telefono: "2756-7890",
                correo: "carmen.soto@email.com",
                observaciones: "Adulto mayor sola - movilidad reducida"
            ),
            new Beneficiario(
                nombreCompleto: "Diego Fernando Ramírez Vargas",
                cedula: "8-0901-0345",
                direccion: "San José, Desamparados, San Rafael Abajo, 150m oeste del EBAIS",
                estadoCivil: EstadoCivil.Casado,
                situacionNecesidad: "Familia de 4 personas, esposa embarazada de 7 meses. Él desempleado hace 6 meses. Viven en casa prestada, necesitan apoyo para preparación de llegada del bebé (cuna, ropa, pañales) y alimentos.",
                fechaNacimiento: new DateOnly(1990, 8, 3),
                telefono: "8923-4567",
                correo: "diego.ramirez@email.com",
                observaciones: "Embarazo de alto riesgo - preparación nacimiento"
            ),
            new Beneficiario(
                nombreCompleto: "Sofía Alejandra Mora Chacón",
                cedula: "9-0123-0456",
                direccion: "Alajuela, San Ramón, Santiago, 200m sur de la Plaza de Deportes",
                estadoCivil: EstadoCivil.Soltero,
                situacionNecesidad: "Estudiante universitaria de 21 años, beca parcial. Madre con enfermedad renal crónica en diálisis. Ingresos familiares solo cubren tratamiento médico. Necesita apoyo para alimentación, transporte a citas médicas y materiales de estudio.",
                fechaNacimiento: new DateOnly(2003, 12, 20),
                telefono: "8456-7890",
                correo: "sofia.mora@email.com",
                observaciones: "Estudiante - madre en diálisis"
            ),
            new Beneficiario(
                nombreCompleto: "Jorge Eduardo Calderón Acuña",
                cedula: "1-0123-0567",
                direccion: "Cartago, La Unión, Tres Ríos, contiguo al Colegio Técnico",
                estadoCivil: EstadoCivil.Casado,
                situacionNecesidad: "Padre de familia de 42 años, técnico en refrigeración sin empleo formal hace 8 meses. Esposa ama de casa, 3 hijos en edad escolar. Vivienda propia pero con deudas de servicios básicos. Necesita apoyo alimentario y capital semilla para emprendimiento.",
                fechaNacimiento: new DateOnly(1982, 6, 14),
                telefono: "8345-6789",
                correo: "jorge.calderon@email.com",
                observaciones: "Desempleo prolongado - potencial emprendimiento"
            )
        };

        context.Beneficiarios.AddRange(beneficiarios);
        context.SaveChanges();

        // === VOLUNTARIOS (7 registros) ===
        var voluntarios = new List<Voluntario>
        {
            new Voluntario(
                nombreCompleto: "Patricia Elena Rojas Solís",
                cedula: "1-1111-1111",
                fechaIngreso: new DateOnly(2022, 3, 15),
                telefono: "8811-2233",
                correo: "patricia.rojas@clubdeleones.org",
                disponibilidad: "Fines de semana y miércoles tarde",
                especialidad: "Trabajo social comunitario"
            ),
            new Voluntario(
                nombreCompleto: "Andrés Felipe Montoya Vargas",
                cedula: "2-2222-2222",
                fechaIngreso: new DateOnly(2021, 8, 20),
                telefono: "8722-3344",
                correo: "andres.montoya@clubdeleones.org",
                disponibilidad: "Lunes, miércoles y viernes mañanas",
                especialidad: "Logística y distribución"
            ),
            new Voluntario(
                nombreCompleto: "Gabriela Sofía Arias Jiménez",
                cedula: "3-3333-3333",
                fechaIngreso: new DateOnly(2023, 1, 10),
                telefono: "8633-4455",
                correo: "gabriela.arias@clubdeleones.org",
                disponibilidad: "Martes y jueves todo el día, sábados mañana",
                especialidad: "Coordinación de campañas y eventos"
            ),
            new Voluntario(
                nombreCompleto: "Fernando José Herrera Quesada",
                cedula: "4-4444-4444",
                fechaIngreso: new DateOnly(2020, 5, 5),
                telefono: "8544-5566",
                correo: "fernando.herrera@clubdeleones.org",
                disponibilidad: "Flexible - disponible para emergencias",
                especialidad: "Construcción y reparaciones"
            ),
            new Voluntario(
                nombreCompleto: "Mariana Lucía Córdoba Brenes",
                cedula: "5-5555-5555",
                fechaIngreso: new DateOnly(2022, 11, 28),
                telefono: "8455-6677",
                correo: "mariana.cordoba@clubdeleones.org",
                disponibilidad: "Lunes a viernes 5pm-8pm, sábados 9am-1pm",
                especialidad: "Salud y primeros auxilios"
            ),
            new Voluntario(
                nombreCompleto: "Ricardo Antonio Pineda Salas",
                cedula: "6-6666-6666",
                fechaIngreso: new DateOnly(2021, 3, 12),
                telefono: "8366-7788",
                correo: "ricardo.pineda@clubdeleones.org",
                disponibilidad: "Sábados y domingos todo el día",
                especialidad: "Educación y talleres"
            ),
            new Voluntario(
                nombreCompleto: "Valeria Isabel Núñez Mora",
                cedula: "7-7777-7777",
                fechaIngreso: new DateOnly(2023, 6, 1),
                telefono: "8277-8899",
                correo: "valeria.nunez@clubdeleones.org",
                disponibilidad: "Miércoles y viernes tarde, domingos mañana",
                especialidad: "Administración y registro de donaciones"
            )
        };

        context.Voluntarios.AddRange(voluntarios);
        context.SaveChanges();

        // Guardar IDs para relaciones
        var benefIds = beneficiarios.Select(b => b.Id).ToList();
        var volIds = voluntarios.Select(v => v.Id).ToList();

        // === CAMPAÑAS (5 registros) ===
        var hoy = DateOnly.FromDateTime(DateTime.UtcNow);
        var campanas = new List<Campana>
        {
            new Campana(
                nombre: "Campaña Navidad Solidaria 2025",
                descripcion: "Recopilación y distribución de canastas navideñas, juguetes y ropa para familias vulnerables de San José y Alajuela. Meta: 200 familias beneficiadas.",
                fechaInicio: hoy.AddDays(-30),
                tipo: TipoCampana.Mixta,
                fechaFin: hoy.AddDays(30),
                objetivoMonto: 15000000m
            ),
            new Campana(
                nombre: "Techos Dignos - Reparación de Viviendas",
                descripcion: "Campaña de reparación de techos, paredes y pisos para 15 familias en situación de vivienda precaria en zonas rurales de Cartago y Heredia.",
                fechaInicio: hoy.AddDays(-10),
                tipo: TipoCampana.EnEspecie,
                fechaFin: hoy.AddDays(60),
                objetivoMonto: 25000000m
            ),
            new Campana(
                nombre: "Útiles Escolares 2025 - Educación para Todos",
                descripcion: "Entrega de paquetes de útiles escolares, uniformes y mochilas a 300 niños y niñas de familias de bajos recursos en todo el país.",
                fechaInicio: hoy.AddDays(-5),
                tipo: TipoCampana.Recaudacion,
                fechaFin: hoy.AddDays(45),
                objetivoMonto: 12000000m
            ),
            new Campana(
                nombre: "Jornada Médica Gratuita - Zona Sur",
                descripcion: "Jornadas de atención médica, dental y oftalmológica gratuita en comunidades de Pérez Zeledón y Golfito. Incluye entrega de medicamentos.",
                fechaInicio: hoy.AddDays(15),
                tipo: TipoCampana.Voluntariado,
                fechaFin: hoy.AddDays(20),
                objetivoMonto: 8000000m
            ),
            new Campana(
                nombre: "Ayuda de Emergencia - Lluvias Temporada 2025",
                descripcion: "Fondo de respuesta rápida para familias afectadas por inundaciones y deslizamientos en temporada lluviosa. Kits de emergencia, colchones, alimentos no perecibles.",
                fechaInicio: hoy.AddDays(40),
                tipo: TipoCampana.Mixta,
                fechaFin: hoy.AddDays(120),
                objetivoMonto: 30000000m
            )
        };

        // Cambiar estados de algunas campañas
        campanas[0].CambiarEstado(EstadoCampana.Activa);           // Navidad - Activa
        campanas[1].CambiarEstado(EstadoCampana.Activa);           // Techos - Activa
        campanas[2].CambiarEstado(EstadoCampana.Planificada);      // Útiles - Planificada
        campanas[3].CambiarEstado(EstadoCampana.Planificada);      // Médica - Planificada (futura)
        campanas[4].CambiarEstado(EstadoCampana.Planificada);      // Emergencia - Planificada (futura)

        context.Campanas.AddRange(campanas);
        context.SaveChanges();

        var campIds = campanas.Select(c => c.Id).ToList();

        // Relacionar voluntarios con campañas
        var campanaVoluntarios = new List<CampanaVoluntario>
        {
            new CampanaVoluntario(campIds[0], volIds[0]), // Patricia - Navidad
            new CampanaVoluntario(campIds[0], volIds[1]), // Andrés - Navidad
            new CampanaVoluntario(campIds[0], volIds[2]), // Gabriela - Navidad
            new CampanaVoluntario(campIds[1], volIds[3]), // Fernando - Techos
            new CampanaVoluntario(campIds[1], volIds[4]), // Mariana - Techos
            new CampanaVoluntario(campIds[2], volIds[5]), // Ricardo - Útiles
            new CampanaVoluntario(campIds[2], volIds[6]), // Valeria - Útiles
            new CampanaVoluntario(campIds[3], volIds[4]), // Mariana - Médica
            new CampanaVoluntario(campIds[3], volIds[5]), // Ricardo - Médica
            new CampanaVoluntario(campIds[4], volIds[1]), // Andrés - Emergencia
            new CampanaVoluntario(campIds[4], volIds[2]), // Gabriela - Emergencia
        };
        context.Set<CampanaVoluntario>().AddRange(campanaVoluntarios);

        // Relacionar beneficiarios con campañas
        var campanaBeneficiarios = new List<CampanaBeneficiario>
        {
            new CampanaBeneficiario(campIds[0], benefIds[0]), // María - Navidad
            new CampanaBeneficiario(campIds[0], benefIds[1]), // Carlos - Navidad
            new CampanaBeneficiario(campIds[0], benefIds[4]), // Laura - Navidad
            new CampanaBeneficiario(campIds[0], benefIds[6]), // Carmen - Navidad
            new CampanaBeneficiario(campIds[1], benefIds[2]), // Ana - Techos
            new CampanaBeneficiario(campIds[1], benefIds[5]), // Roberto - Techos
            new CampanaBeneficiario(campIds[2], benefIds[7]), // Diego - Útiles
            new CampanaBeneficiario(campIds[2], benefIds[8]), // Sofía - Útiles
            new CampanaBeneficiario(campIds[2], benefIds[9]), // Jorge - Útiles
        };
        context.Set<CampanaBeneficiario>().AddRange(campanaBeneficiarios);

        // === DONACIONES (18 registros) ===
        var random = new Random(42); // Seed fijo para reproducibilidad
        var donaciones = new List<Donacion>();

        // Donaciones monetarias para campaña Navidad (campIds[0])
        var donantesNavidad = new[]
        {
            ("Empresa Constructora Herrera S.A.", 2500000m),
            ("Supermercados Económicos Ltda.", 1800000m),
            ("Farmacia La Salud", 1200000m),
            ("AutoPartes Centro", 900000m),
            ("Restaurante El Fogón", 750000m),
            ("Dra. Patricia Solano", 500000m),
            ("Ing. Roberto Jiménez", 400000m),
            ("Lic. Carmen Vargas", 350000m),
            ("Anónimo", 1000000m),
            ("Anónimo", 600000m),
        };

        for (int i = 0; i < donantesNavidad.Length; i++)
        {
            var (nombre, monto) = donantesNavidad[i];
            donaciones.Add(new Donacion(
                donanteNombre: nombre,
                tipo: TipoDonacion.Monetaria,
                fecha: DateTime.UtcNow.AddDays(-random.Next(1, 30)),
                monto: monto,
                descripcion: $"Donación para Campaña Navidad Solidaria 2025",
                reciboNumero: $"REC-NAV-2025-{i+1:D4}",
                campanaId: campIds[0],
                voluntarioId: volIds[random.Next(volIds.Count)]
            ));
        }

        // Donaciones monetarias para campaña Techos (campIds[1])
        var donantesTechos = new[]
        {
            ("Ferretería El Martillo", 3200000m),
            ("Cementos Nacionales", 2500000m),
            ("Pinturas Tropical", 1500000m),
            ("Maderas San José", 1800000m),
        };

        for (int i = 0; i < donantesTechos.Length; i++)
        {
            var (nombre, monto) = donantesTechos[i];
            donaciones.Add(new Donacion(
                donanteNombre: nombre,
                tipo: TipoDonacion.Monetaria,
                fecha: DateTime.UtcNow.AddDays(-random.Next(1, 20)),
                monto: monto,
                descripcion: $"Donación para Campaña Techos Dignos",
                reciboNumero: $"REC-TEC-2025-{i+1:D4}",
                campanaId: campIds[1],
                voluntarioId: volIds[random.Next(volIds.Count)]
            ));
        }

        // Donaciones en especie para campaña Útiles (campIds[2])
        var donantesEspecie = new[]
        {
            ("Papelería El Estudiante", "200 paquetes de cuadernos, lápices, borradores"),
            ("Librería Universal", "150 mochilas escolares"),
            ("Textiles del Centro", "100 uniformes escolares talla 8-14"),
            ("Zapatos Cómodos", "80 pares de zapatos escolares"),
        };

        for (int i = 0; i < donantesEspecie.Length; i++)
        {
            var (nombre, descripcion) = donantesEspecie[i];
            donaciones.Add(new Donacion(
                donanteNombre: nombre,
                tipo: TipoDonacion.EnEspecie,
                fecha: DateTime.UtcNow.AddDays(-random.Next(1, 10)),
                descripcion: descripcion,
                campanaId: campIds[2],
                voluntarioId: volIds[random.Next(volIds.Count)]
            ));
        }

        context.Donaciones.AddRange(donaciones);
        context.SaveChanges();

        // === AYUDA SOCIAL (12 registros) ===
        var ayudas = new List<AyudaSocial>();

        var ayuda1 = new AyudaSocial(
            beneficiarioId: benefIds[0],
            tipo: TipoAyuda.Alimentos,
            descripcion: "Canasta básica navideña: arroz, frijoles, aceite, azúcar, leche, atún, fideos, galletas, dulces navideños",
            fechaEntrega: DateTime.UtcNow.AddDays(-15),
            campanaId: campIds[0],
            voluntarioId: volIds[0]
        );
        ayuda1.CambiarEstado(EstadoAyuda.Entregada);
        ayudas.Add(ayuda1);

        var ayuda2 = new AyudaSocial(
            beneficiarioId: benefIds[0],
            tipo: TipoAyuda.Medicamentos,
            descripcion: "Inhalador salbutamol 100mcg (2 unidades), espaciador, montelukast 10mg x 30 tabletas para asma del hijo menor",
            fechaEntrega: DateTime.UtcNow.AddDays(-10),
            campanaId: campIds[0],
            voluntarioId: volIds[4]
        );
        ayuda2.CambiarEstado(EstadoAyuda.Entregada);
        ayudas.Add(ayuda2);

        var ayuda3 = new AyudaSocial(
            beneficiarioId: benefIds[1],
            tipo: TipoAyuda.Medicamentos,
            descripcion: "Losartán 50mg x 90 tabletas, Metformina 850mg x 90 tabletas, Atorvastatina 20mg x 30 tabletas - tratamiento 3 meses",
            fechaEntrega: DateTime.UtcNow.AddDays(-5),
            campanaId: campIds[0],
            voluntarioId: volIds[4]
        );
        ayuda3.CambiarEstado(EstadoAyuda.Entregada);
        ayudas.Add(ayuda3);

        var ayuda4 = new AyudaSocial(
            beneficiarioId: benefIds[1],
            tipo: TipoAyuda.Vivienda,
            descripcion: "Instalación de rampa de acceso en madera tratada, barandas en pasillo y baño, asiento de ducha",
            fechaEntrega: DateTime.UtcNow.AddDays(-2),
            campanaId: campIds[1],
            voluntarioId: volIds[3]
        );
        ayuda4.CambiarEstado(EstadoAyuda.Entregada);
        ayudas.Add(ayuda4);

        ayudas.Add(new AyudaSocial(
            beneficiarioId: benefIds[2],
            tipo: TipoAyuda.Vivienda,
            descripcion: "Reparación completa de techo: cambio de 45 láminas de zinc calibre 26, impermeabilización de paredes, canaletas nuevas",
            fechaEntrega: DateTime.UtcNow.AddDays(5),
            campanaId: campIds[1],
            voluntarioId: volIds[3]
        ));

        ayudas.Add(new AyudaSocial(
            beneficiarioId: benefIds[3],
            tipo: TipoAyuda.Medicamentos,
            descripcion: "Par de audífonos digitales intracanales modelo Phonak Audeo, 2 años de garantía, incluye moldes a medida",
            fechaEntrega: DateTime.UtcNow.AddDays(10),
            campanaId: campIds[3],
            voluntarioId: volIds[4]
        ));

        var ayuda7 = new AyudaSocial(
            beneficiarioId: benefIds[4],
            tipo: TipoAyuda.Alimentos,
            descripcion: "Canasta básica mensual x 3 meses: arroz 10kg, frijoles 5kg, aceite 3L, azúcar 2kg, leche 6L, atún 12 latas, fideos 6 paquetes",
            fechaEntrega: DateTime.UtcNow.AddDays(-8),
            campanaId: campIds[0],
            voluntarioId: volIds[1]
        );
        ayuda7.CambiarEstado(EstadoAyuda.Entregada);
        ayudas.Add(ayuda7);

        ayudas.Add(new AyudaSocial(
            beneficiarioId: benefIds[4],
            tipo: TipoAyuda.Educacion,
            descripcion: "3 paquetes útiles escolares completos (cuadernos, lápices, colores, tijeras, pegamento, regla, mochila), 3 uniformes completos",
            fechaEntrega: DateTime.UtcNow.AddDays(15),
            campanaId: campIds[2],
            voluntarioId: volIds[5]
        ));

        ayudas.Add(new AyudaSocial(
            beneficiarioId: benefIds[5],
            tipo: TipoAyuda.Educacion,
            descripcion: "Matrícula anual escuela pública, uniforme completo, zapatos, mochila, útiles escolares completos para niña 8 años",
            fechaEntrega: DateTime.UtcNow.AddDays(20),
            campanaId: campIds[2],
            voluntarioId: volIds[5]
        ));

        var ayuda10 = new AyudaSocial(
            beneficiarioId: benefIds[5],
            tipo: TipoAyuda.Alimentos,
            descripcion: "Canasta básica quincenal x 2 meses",
            fechaEntrega: DateTime.UtcNow.AddDays(-3),
            campanaId: campIds[0],
            voluntarioId: volIds[1]
        );
        ayuda10.CambiarEstado(EstadoAyuda.Entregada);
        ayudas.Add(ayuda10);

        var ayuda11 = new AyudaSocial(
            beneficiarioId: benefIds[6],
            tipo: TipoAyuda.Medicamentos,
            descripcion: "Diclofenaco 75mg x 30 ampollas, Omeprazol 20mg x 60 cápsulas, Paracetamol 500mg x 60 tabletas, Vitaminas complejo B",
            fechaEntrega: DateTime.UtcNow.AddDays(-12),
            campanaId: campIds[0],
            voluntarioId: volIds[4]
        );
        ayuda11.CambiarEstado(EstadoAyuda.Entregada);
        ayudas.Add(ayuda11);

        var ayuda12 = new AyudaSocial(
            beneficiarioId: benefIds[6],
            tipo: TipoAyuda.Vestimenta,
            descripcion: "Andador de aluminio plegable con ruedas y asiento, 2 pares de zapatos ortopédicos talla 38, 3 juegos de ropa cómoda",
            fechaEntrega: DateTime.UtcNow.AddDays(-7),
            campanaId: campIds[1],
            voluntarioId: volIds[3]
        );
        ayuda12.CambiarEstado(EstadoAyuda.Entregada);
        ayudas.Add(ayuda12);

        context.AyudasSociales.AddRange(ayudas);

        // === ACTIVIDADES (6 registros) ===
        var actividades = new List<Actividad>
        {
            new Actividad(
                nombre: "Entrega Canastas Navideñas - San José",
                descripcion: "Distribución de 80 canastas navideñas en comunidades de San José: Hatillo, Alajuelita, Desamparados. Requiere 15 voluntarios.",
                tipo: TipoActividad.Evento,
                fecha: DateTime.UtcNow.AddDays(5),
                lugar: "Centro Comunitario Hatillo, San José",
                campanaId: campIds[0]
            ),
            new Actividad(
                nombre: "Entrega Canastas Navideñas - Alajuela",
                descripcion: "Distribución de 70 canastas navideñas en Alajuela Centro, San Rafael, San Ramón. Requiere 12 voluntarios.",
                tipo: TipoActividad.Evento,
                fecha: DateTime.UtcNow.AddDays(12),
                lugar: "Salón Comunal Alajuela Centro",
                campanaId: campIds[0]
            ),
            new Actividad(
                nombre: "Jornada de Reparación Techos - Cartago",
                descripcion: "Reparación de techos en 5 viviendas en Paraíso y La Unión. Trabajo en altura, requiere experiencia en construcción.",
                tipo: TipoActividad.Jornada,
                fecha: DateTime.UtcNow.AddDays(20),
                lugar: "Paraíso, Cartago - Viviendas beneficiarias",
                campanaId: campIds[1]
            ),
            new Actividad(
                nombre: "Empaque Útiles Escolares - Centro Acopio",
                descripcion: "Empaquetado de 300 kits de útiles escolares. Trabajo en cadena de montaje, apto para todos los voluntarios.",
                tipo: TipoActividad.Jornada,
                fecha: DateTime.UtcNow.AddDays(25),
                lugar: "Bodega Club de Leones, San José",
                campanaId: campIds[2]
            ),
            new Actividad(
                nombre: "Jornada Médica Pérez Zeledón",
                descripcion: "Atención médica general, dental, oftalmológica. Entrega de medicamentos. Requiere médicos, dentistas, optómetras y voluntarios logística.",
                tipo: TipoActividad.Evento,
                fecha: DateTime.UtcNow.AddDays(45),
                lugar: "EBAIS San Isidro de El General, Pérez Zeledón",
                campanaId: campIds[3]
            ),
            new Actividad(
                nombre: "Reunión Planificación Emergencia Lluvias",
                descripcion: "Reunión de coordinación para definir protocolos, puntos de acopio, rutas de distribución y contactos municipales para temporada lluviosa.",
                tipo: TipoActividad.Reunion,
                fecha: DateTime.UtcNow.AddDays(50),
                lugar: "Sede Club de Leones San Ramón, Alajuela",
                campanaId: campIds[4]
            )
        };

        context.Actividades.AddRange(actividades);
        context.SaveChanges();

        // Relacionar voluntarios con actividades
        var actividadVoluntarios = new List<ActividadVoluntario>
        {
            new ActividadVoluntario(actividades[0].Id, volIds[0]),
            new ActividadVoluntario(actividades[0].Id, volIds[1]),
            new ActividadVoluntario(actividades[0].Id, volIds[2]),
            new ActividadVoluntario(actividades[1].Id, volIds[1]),
            new ActividadVoluntario(actividades[1].Id, volIds[6]),
            new ActividadVoluntario(actividades[2].Id, volIds[3]),
            new ActividadVoluntario(actividades[2].Id, volIds[4]),
            new ActividadVoluntario(actividades[3].Id, volIds[5]),
            new ActividadVoluntario(actividades[3].Id, volIds[6]),
            new ActividadVoluntario(actividades[4].Id, volIds[4]),
            new ActividadVoluntario(actividades[4].Id, volIds[5]),
            new ActividadVoluntario(actividades[5].Id, volIds[0]),
            new ActividadVoluntario(actividades[5].Id, volIds[2]),
        };
        context.Set<ActividadVoluntario>().AddRange(actividadVoluntarios);

        // Relacionar beneficiarios con actividades
        var actividadBeneficiarios = new List<ActividadBeneficiario>
        {
            new ActividadBeneficiario(actividades[0].Id, benefIds[0]),
            new ActividadBeneficiario(actividades[0].Id, benefIds[1]),
            new ActividadBeneficiario(actividades[0].Id, benefIds[4]),
            new ActividadBeneficiario(actividades[0].Id, benefIds[6]),
            new ActividadBeneficiario(actividades[1].Id, benefIds[4]),
            new ActividadBeneficiario(actividades[1].Id, benefIds[9]),
            new ActividadBeneficiario(actividades[2].Id, benefIds[2]),
            new ActividadBeneficiario(actividades[2].Id, benefIds[5]),
            new ActividadBeneficiario(actividades[3].Id, benefIds[7]),
            new ActividadBeneficiario(actividades[3].Id, benefIds[8]),
            new ActividadBeneficiario(actividades[3].Id, benefIds[9]),
        };
        context.Set<ActividadBeneficiario>().AddRange(actividadBeneficiarios);

        context.SaveChanges();
    }
}