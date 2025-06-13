from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from src.models.user import User, db
from datetime import datetime
import re

user_bp = Blueprint('user', __name__)

def validar_email(email):
    """Valida formato do email"""
    padrao = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(padrao, email) is not None

def validar_senha(senha):
    """Valida se a senha tem pelo menos 6 caracteres"""
    return len(senha) >= 6

@user_bp.route('/cadastro', methods=['POST', 'OPTIONS'])
@cross_origin()
def cadastro():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.json
        
        # Validações básicas
        if not data:
            return jsonify({'erro': 'Dados não fornecidos'}), 400
        
        nome = data.get('nome', '').strip()
        email = data.get('email', '').strip().lower()
        senha = data.get('senha', '')
        confirma_senha = data.get('confirma_senha', '')
        data_nascimento = data.get('data_nascimento')
        estado = data.get('estado', '').strip()
        
        # Validar campos obrigatórios
        if not nome:
            return jsonify({'erro': 'Nome é obrigatório'}), 400
        
        if not email:
            return jsonify({'erro': 'Email é obrigatório'}), 400
        
        if not validar_email(email):
            return jsonify({'erro': 'Email inválido'}), 400
        
        if not senha:
            return jsonify({'erro': 'Senha é obrigatória'}), 400
        
        if not validar_senha(senha):
            return jsonify({'erro': 'Senha deve ter pelo menos 6 caracteres'}), 400
        
        if senha != confirma_senha:
            return jsonify({'erro': 'Senhas não coincidem'}), 400
        
        # Verificar se email já existe
        usuario_existente = User.query.filter_by(email=email).first()
        if usuario_existente:
            return jsonify({'erro': 'Email já cadastrado'}), 400
        
        # Processar data de nascimento
        data_nasc_obj = None
        if data_nascimento:
            try:
                data_nasc_obj = datetime.strptime(data_nascimento, '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'erro': 'Data de nascimento inválida'}), 400
        
        # Criar novo usuário
        novo_usuario = User(
            nome=nome,
            email=email,
            data_nascimento=data_nasc_obj,
            estado=estado if estado else None
        )
        novo_usuario.set_senha(senha)
        
        db.session.add(novo_usuario)
        db.session.commit()
        
        return jsonify({
            'sucesso': True,
            'mensagem': 'Usuário cadastrado com sucesso!',
            'usuario': novo_usuario.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'erro': f'Erro interno do servidor: {str(e)}'}), 500

@user_bp.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin()
def login():
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.json
        
        if not data:
            return jsonify({'erro': 'Dados não fornecidos'}), 400
        
        email = data.get('email', '').strip().lower()
        senha = data.get('senha', '')
        
        # Validar campos obrigatórios
        if not email:
            return jsonify({'erro': 'Email é obrigatório'}), 400
        
        if not senha:
            return jsonify({'erro': 'Senha é obrigatória'}), 400
        
        # Buscar usuário
        usuario = User.query.filter_by(email=email).first()
        
        if not usuario or not usuario.check_senha(senha):
            return jsonify({'erro': 'Email ou senha incorretos'}), 401
        
        return jsonify({
            'sucesso': True,
            'mensagem': 'Login realizado com sucesso!',
            'usuario': usuario.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'erro': f'Erro interno do servidor: {str(e)}'}), 500

# Rotas auxiliares para gerenciamento
@user_bp.route('/usuarios', methods=['GET'])
@cross_origin()
def listar_usuarios():
    """Lista todos os usuários (para fins de teste)"""
    try:
        usuarios = User.query.all()
        return jsonify([usuario.to_dict() for usuario in usuarios])
    except Exception as e:
        return jsonify({'erro': f'Erro interno do servidor: {str(e)}'}), 500

@user_bp.route('/usuario/<int:user_id>', methods=['GET'])
@cross_origin()
def obter_usuario(user_id):
    """Obtém um usuário específico"""
    try:
        usuario = User.query.get_or_404(user_id)
        return jsonify(usuario.to_dict())
    except Exception as e:
        return jsonify({'erro': f'Erro interno do servidor: {str(e)}'}), 500
