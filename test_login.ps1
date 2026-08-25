Start-Sleep 5
$body = '{"nombreUsuario":"admin","password":"Admin123!"}'
$response = Invoke-RestMethod -Uri 'http://localhost:5000/api/v1/autenticacion/login' -Method Post -ContentType 'application/json' -Body $body
$response