#Pagina De Login e Cadastro

Este é uma Pagina De login e Cadastro Com Um Sistema De Backend Básico Em Python/Flask

## 🚀 Funcionalidades Implementadas

### Backend (API)
- **Cadastro de usuários** com validações completas
- **Login de usuários** com autenticação segura
- **Criptografia de senhas** usando hash seguro
- **Validação de email** com regex
- **Validação de dados** em todas as rotas
- **Suporte a CORS** para integração frontend-backend
- **Banco de dados SQLite** para persistência
- **Tratamento de erros** robusto

### Frontend Integrado
- **Design original preservado** - nenhuma alteração visual
- **Animações mantidas** - todas as transições funcionam
- **Integração com API** - formulários conectados ao backend
- **Mensagens de feedback** - sucesso e erro exibidos ao usuário
- **Validação client-side** - experiência de usuário aprimorada

## 📋 Campos do Cadastro

- **Nome completo** (obrigatório)
- **Email** (obrigatório, validado)
- **Data de nascimento** (opcional)
- **Estado** (opcional, lista completa do Brasil)
- **Senha** (obrigatório, mínimo 6 caracteres)
- **Confirmação de senha** (obrigatório, deve coincidir)

## 🔧 Como Usar

### 1. Iniciar o Servidor
```bash
cd backend_login_cadastro
source venv/bin/activate
python src/main.py
```

O servidor iniciará na porta 5001: `http://localhost:5001`

### 2. Acessar a Aplicação
- Abra o navegador em `http://localhost:5001`
- Use os formulários de login e cadastro normalmente
- Todas as animações e o design original estão preservados

### 3. Testar a API Diretamente

#### Cadastrar usuário:
```bash
curl -X POST http://localhost:5001/api/cadastro \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@teste.com",
    "senha": "123456",
    "confirma_senha": "123456",
    "data_nascimento": "1990-01-01",
    "estado": "SP"
  }'
```

#### Fazer login:
```bash
curl -X POST http://localhost:5001/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@teste.com",
    "senha": "123456"
  }'
```

#### Listar usuários:
```bash
curl -X GET http://localhost:5001/api/usuarios
```

## 🛡️ Segurança Implementada

- **Senhas criptografadas** com Werkzeug Security
- **Validação de entrada** em todas as rotas
- **Sanitização de dados** (trim, lowercase para emails)
- **Verificação de email único** no cadastro
- **Tratamento seguro de erros** sem exposição de dados sensíveis

## 📁 Estrutura do Projeto

```
backend_login_cadastro/
├── src/
│   ├── models/
│   │   └── user.py          # Modelo de usuário com validações
│   ├── routes/
│   │   └── user.py          # Rotas de login e cadastro
│   ├── static/              # Arquivos do frontend
│   │   ├── index.html       # Página principal (seu design)
│   │   ├── style.css        # Estilos originais
│   │   └── script.js        # JavaScript integrado
│   ├── database/
│   │   └── app.db           # Banco SQLite
│   └── main.py              # Aplicação principal Flask
├── venv/                    # Ambiente virtual Python
└── requirements.txt         # Dependências
```

## 🔄 Rotas da API

- `POST /api/cadastro` - Cadastrar novo usuário
- `POST /api/login` - Fazer login
- `GET /api/usuarios` - Listar todos os usuários
- `GET /api/usuario/<id>` - Obter usuário específico

## 📝 Respostas da API

### Sucesso no Cadastro:
```json
{
  "sucesso": true,
  "mensagem": "Usuário cadastrado com sucesso!",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@teste.com",
    "data_nascimento": "1990-01-01",
    "estado": "SP",
    "data_criacao": "2025-06-13T13:30:37.051989"
  }
}
```

### Sucesso no Login:
```json
{
  "sucesso": true,
  "mensagem": "Login realizado com sucesso!",
  "usuario": { ... }
}
```

### Erro:
```json
{
  "erro": "Email já cadastrado"
}
```

## 🎨 Design Preservado

- ✅ Todas as animações espaciais mantidas
- ✅ Estrelas e elementos visuais funcionando
- ✅ Transições entre formulários preservadas
- ✅ Cores e layout originais
- ✅ Responsividade mantida

## 🚀 Próximos Passos Sugeridos

1. **Autenticação com JWT** - Para sessões mais robustas
2. **Recuperação de senha** - Envio por email
3. **Perfil de usuário** - Página para editar dados
4. **Dashboard** - Área logada para usuários
5. **Deploy em produção** - Heroku, Railway, etc.

## 📞 Suporte

O backend está totalmente funcional e integrado com seu frontend. Todas as validações estão implementadas e o sistema está pronto para uso em desenvolvimento ou produção.

