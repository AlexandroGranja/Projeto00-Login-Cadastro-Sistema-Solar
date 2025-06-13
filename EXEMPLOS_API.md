# Exemplos de Uso da API

Este arquivo contém exemplos práticos de como usar a API do backend.

## 🔧 Testando com curl

### 1. Cadastrar um novo usuário
```bash
curl -X POST http://localhost:5001/api/cadastro \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Santos",
    "email": "maria@exemplo.com",
    "senha": "minhasenha123",
    "confirma_senha": "minhasenha123",
    "data_nascimento": "1995-03-15",
    "estado": "RJ"
  }'
```

**Resposta esperada:**
```json
{
  "sucesso": true,
  "mensagem": "Usuário cadastrado com sucesso!",
  "usuario": {
    "id": 1,
    "nome": "Maria Santos",
    "email": "maria@exemplo.com",
    "data_nascimento": "1995-03-15",
    "estado": "RJ",
    "data_criacao": "2025-06-13T13:30:37.051989"
  }
}
```

### 2. Fazer login
```bash
curl -X POST http://localhost:5001/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@exemplo.com",
    "senha": "minhasenha123"
  }'
```

**Resposta esperada:**
```json
{
  "sucesso": true,
  "mensagem": "Login realizado com sucesso!",
  "usuario": {
    "id": 1,
    "nome": "Maria Santos",
    "email": "maria@exemplo.com",
    "data_nascimento": "1995-03-15",
    "estado": "RJ",
    "data_criacao": "2025-06-13T13:30:37.051989"
  }
}
```

### 3. Listar todos os usuários
```bash
curl -X GET http://localhost:5001/api/usuarios
```

### 4. Obter usuário específico
```bash
curl -X GET http://localhost:5001/api/usuario/1
```

## 🚫 Exemplos de Erros

### Cadastro com email já existente
```bash
curl -X POST http://localhost:5001/api/cadastro \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "maria@exemplo.com",
    "senha": "123456",
    "confirma_senha": "123456"
  }'
```

**Resposta:**
```json
{
  "erro": "Email já cadastrado"
}
```

### Login com credenciais incorretas
```bash
curl -X POST http://localhost:5001/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@exemplo.com",
    "senha": "senhaerrada"
  }'
```

**Resposta:**
```json
{
  "erro": "Email ou senha incorretos"
}
```

### Cadastro com senhas diferentes
```bash
curl -X POST http://localhost:5001/api/cadastro \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pedro Costa",
    "email": "pedro@exemplo.com",
    "senha": "123456",
    "confirma_senha": "654321"
  }'
```

**Resposta:**
```json
{
  "erro": "Senhas não coincidem"
}
```

## 💻 Usando com JavaScript (Frontend)

### Função para cadastrar usuário
```javascript
async function cadastrarUsuario(dadosUsuario) {
    try {
        const response = await fetch('/api/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosUsuario)
        });
        
        const resultado = await response.json();
        
        if (response.ok) {
            console.log('Usuário cadastrado:', resultado.usuario);
            return { sucesso: true, dados: resultado };
        } else {
            console.error('Erro no cadastro:', resultado.erro);
            return { sucesso: false, erro: resultado.erro };
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        return { sucesso: false, erro: 'Erro de conexão' };
    }
}

// Exemplo de uso
const novoUsuario = {
    nome: "Ana Silva",
    email: "ana@exemplo.com",
    senha: "123456",
    confirma_senha: "123456",
    data_nascimento: "1992-07-20",
    estado: "MG"
};

cadastrarUsuario(novoUsuario).then(resultado => {
    if (resultado.sucesso) {
        alert('Cadastro realizado com sucesso!');
    } else {
        alert('Erro: ' + resultado.erro);
    }
});
```

### Função para fazer login
```javascript
async function fazerLogin(email, senha) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha })
        });
        
        const resultado = await response.json();
        
        if (response.ok) {
            console.log('Login realizado:', resultado.usuario);
            // Salvar dados do usuário no localStorage ou sessionStorage
            localStorage.setItem('usuario', JSON.stringify(resultado.usuario));
            return { sucesso: true, usuario: resultado.usuario };
        } else {
            console.error('Erro no login:', resultado.erro);
            return { sucesso: false, erro: resultado.erro };
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        return { sucesso: false, erro: 'Erro de conexão' };
    }
}

// Exemplo de uso
fazerLogin("ana@exemplo.com", "123456").then(resultado => {
    if (resultado.sucesso) {
        alert('Login realizado com sucesso!');
        // Redirecionar para dashboard ou área logada
        window.location.href = '/dashboard';
    } else {
        alert('Erro: ' + resultado.erro);
    }
});
```

## 🔍 Validações Implementadas

### Campos obrigatórios
- Nome (não pode estar vazio)
- Email (formato válido)
- Senha (mínimo 6 caracteres)
- Confirmação de senha (deve coincidir)

### Campos opcionais
- Data de nascimento (formato YYYY-MM-DD)
- Estado (código de 2 letras)

### Validações de negócio
- Email único no sistema
- Senhas devem coincidir
- Email deve ter formato válido
- Senha deve ter pelo menos 6 caracteres

