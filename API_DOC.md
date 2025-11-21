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
  "email": "maria@test.com",
  "password": "123456"
}

**Resposta**

{
  "id": 1,
  "name": "Maria",
  "email": "maria@test.com"
}

## 📲 QR Codes

### POST /api/qrcode/create

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

### GET /api/qrcode/:id

**Body**

{
  "id": 1,
  "user_id": 1,
  "title": "Cardápio Digital",
  "content": "https://meurestaurante.com/cardapio",
  "color": "#000000",
  "logo": "logo.png",
  "access_count": 5,
  "created_at": "2025-11-14 14:20:00"
}

**Resposta**

{
  "id": 1,
  "title": "Cardápio Digital",
  "content": "https://meurestaurante.com/cardapio",
  "qrImage": "data:image/png;base64,iVBORw0KGgoAAAANSUh..."
}

### GET /api/qrcode/:id/image

**Resposta**

{
  "id": 1,
  "title": "Cardápio Digital",
  "content": "https://meurestaurante.com/cardapio",
  "qrImage": "data:image/png;base64,iVBORw0KGgoAAAANSUh..."
}

### GET /api/qrcode/:id/imagepng

**Resposta**

**Imagem em png**

### GET /api/qrcode/user/:user_id

[
  {
    "id": 1,
    "title": "Cardápio Digital",
    "content": "https://meurestaurante.com/cardapio",
    "access_count": 5,
    "created_at": "2025-11-14 14:20:00"
  },
  {
    "id": 2,
    "title": "Portfólio",
    "content": "https://meuportfolio.com",
    "access_count": 2,
    "created_at": "2025-11-14 14:25:00"
  }
]
