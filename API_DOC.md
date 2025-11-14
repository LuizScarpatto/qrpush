# 📖 Documentação da API QRPUSH

## 🔐 Autenticação

### POST /api/auth/register
**Body**
{
  "name": "Maria",
  "email": "maria@test.com",
  "password": "123456"
}
**Resposta**
{
  "id": 1,
  "name": "Maria",
  "email": "maria@test.com"
}

### POST /api/auth/login
**Body**
{
  "name": "Maria",
  "email": "maria@test.com",
  "password": "123456"
}
**Resposta**
{
  "id": 1,
  "name": "Maria",
  "email": "maria@test.com"
}

# 📲 QR Codes

## POST /api/qrcode/create

**Body**
{
  "name": "Maria",
  "email": "maria@test.com",
  "password": "123456"
}

**Resposta**
{
  "id": 1,
  "name": "Maria",
  "email": "maria@test.com"
}

