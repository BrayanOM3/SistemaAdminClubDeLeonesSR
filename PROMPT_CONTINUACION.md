# Prompt de Continuación - SA.ClubDeLeones

## Estado Actual del Proyecto (2026-08-25)

### ✅ Completado
- **Backend**: ASP.NET Core 9.0 Web API corriendo en `http://localhost:5000` (modo Production)
- **Base de Datos**: PostgreSQL en Docker (puerto 5432) - conectado y migraciones aplicadas
- **Frontend**: React 19 + Vite + TypeScript corriendo en `http://localhost:5173` con proxy a backend
- **Autenticación**: JWT funcionando (login admin/Admin123! retorna token válido)
- **CRUD Endpoints**: Todos probados y funcionando para 7 entidades:
  - Beneficiarios: GET, POST, PUT, DELETE ✅
  - Campañas: GET, POST, PUT, DELETE ✅
  - Voluntarios: GET, POST, PUT, DELETE ✅
  - Donaciones: GET, POST, PUT, DELETE ✅
  - Actividades: GET, POST, PUT, DELETE ✅
  - Ayudas Sociales: GET, POST, PUT, DELETE ✅
  - Usuarios: GET, POST, PUT, DELETE ✅

### 📁 Archivos Clave Modificados
- `backend/src/SA.ClubDeLeones.WebApi/Program.cs` - JSON PascalCase, FluentValidation, JWT
- `backend/src/SA.ClubDeLeones.Application/Mapeos/PerfilMapeos.cs` - ConstructUsing para records
- `backend/src/SA.ClubDeLeones.Infrastructure/Autenticacion/ServicioJwt.cs` - Role claim fix
- `backend/src/SA.ClubDeLeones.Infrastructure/Persistencia/Semillas/SemillaDatos.cs` - MarcarActualizado
- `backend/src/SA.ClubDeLeones.Infrastructure/InyeccionDependencias.cs` - Servicios registrados
- `backend/src/SA.ClubDeLeones.Domain/Common/EntidadBase.cs` - DateTimeKind.Utc
- Todas las 11 entidades - constructores protected con DateTimeKind.Utc
- Migraciones: `FechaActualizacion` nullable en todas las tablas

### ⚠️ Pendiente / Próximos Pasos
1. **Push a git**: El commit local está listo (1b96f2f) pero el push fue bloqueado por secretos en appsettings.Production.json
   - Solución: appsettings.Production.json usa `${JWT_SECRET}` como placeholder
   - .gitignore actualizado para excluir `**/appsettings.Production.json`
   - Ejecutar: `git add -A && git commit -m "..." && git push origin main`

2. **Frontend Testing**:
   - Abrir `http://localhost:5173`
   - Login con `admin` / `Admin123!`
   - Probar flujos CRUD completos desde UI
   - Verificar validaciones FluentValidation en formularios

3. **Configuración de Producción Real**:
   - Variables de entorno para JWT_SECRET, ConnectionStrings
   - Docker Compose para deployment completo
   - HTTPS/SSL certificates

### Comandos Útiles
```bash
# Backend
cd backend/src/SA.ClubDeLeones.WebApi
dotnet run --environment Production

# Frontend
cd frontend
npm run dev

# Test login
$body = '{"nombreUsuario":"admin","password":"Admin123!"}'
Invoke-RestMethod -Uri 'http://localhost:5000/api/v1/autenticacion/login' -Method Post -ContentType 'application/json' -Body $body

# Matar procesos dotnet huérfanos
Get-Process -Name "dotnet" | Stop-Process -Force
```

### Credenciales de Prueba
- **Admin**: `admin` / `Admin123!`
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173
- **Swagger**: http://localhost:5000/swagger

---

**Para continuar mañana**: Ejecutar `git push origin main` después de verificar que no hay secretos en el commit, luego abrir frontend y testear integración completa UI ↔ API.