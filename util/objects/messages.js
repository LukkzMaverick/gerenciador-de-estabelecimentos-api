const MESSAGES = {
    'INTERNAL_SERVER_ERROR': 'Internal Server Error',
    "DATABASE_ERROR": "Erro ao gravar informações no banco de dados. Tente novamente mais tarde.",
    'EMAIL_ALREADY_REGISTERED': 'Esse email já foi cadastrado.',
    'INVALID_TOKEN' : 'Token Inválido',
    'INCORRECT_EMAIL_OR_PASSWORD': 'Email ou Senha Incorretos!',
    'PASSWORD_TOO_SHORT' : 'Por favor, insira uma senha com 6 ou mais caracteres.', 
    'VALID_EMAIL' : 'Por favor, insira um email válido.',
    'WITHOUT_TOKEN' : 'Token não enviado',
    'NAME_REQUIRED': 'Nome é um campo obrigatório',
    'NAME_MUST_BE_A_STRING': 'O campo nome precisa ser do tipo String',
    '404_ESTABELECIMENTO': 'Id Inválido, estabelecimento não encontrado!',
    '404_LOCALIZACOES': 'Não foram encontradas localizações para este usuário',
    'ESTABELECIMENTO_EMPTY_LIST': 'Lista de estabelecimentos vazia'
}

module.exports = MESSAGES
