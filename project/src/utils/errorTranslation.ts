const supabaseErrorMap: Record<string, { title: string; message: string; suggestion: string }> = {
  'Invalid login credentials': {
    title: 'Credenciais invalidas',
    message: 'E-mail ou senha incorretos.',
    suggestion: 'Verifique suas credenciais e tente novamente.',
  },
  'Email not confirmed': {
    title: 'E-mail nao confirmado',
    message: 'Seu e-mail ainda nao foi verificado.',
    suggestion: 'Verifique sua caixa de entrada e clique no link de confirmacao.',
  },
  'User already registered': {
    title: 'Usuario ja cadastrado',
    message: 'Ja existe uma conta com este e-mail.',
    suggestion: 'Tente fazer login ou use outro e-mail.',
  },
  'Password should be at least 6 characters': {
    title: 'Senha muito curta',
    message: 'A senha deve ter pelo menos 6 caracteres.',
    suggestion: 'Escolha uma senha mais longa e segura.',
  },
  'No user data returned': {
    title: 'Erro de autenticacao',
    message: 'Nao foi possivel recuperar os dados do usuario.',
    suggestion: 'Tente novamente em alguns instantes.',
  },
  'An error occurred': {
    title: 'Erro inesperado',
    message: 'Ocorreu um erro ao processar sua solicitacao.',
    suggestion: 'Tente novamente. Se o problema persistir, contate o suporte.',
  },
  'Failed to fetch': {
    title: 'Erro de conexao',
    message: 'Nao foi possivel conectar ao servidor.',
    suggestion: 'Verifique sua conexao com a internet e tente novamente.',
  },
  'JWT expired': {
    title: 'Sessao expirada',
    message: 'Sua sessao expirou por inatividade.',
    suggestion: 'Faca login novamente para continuar.',
  },
  'rate limit': {
    title: 'Muitas tentativas',
    message: 'Voce fez muitas tentativas em pouco tempo.',
    suggestion: 'Aguarde alguns minutos antes de tentar novamente.',
  },
};

const postgresCodeMap: Record<string, string> = {
  '23505': 'Registro duplicado: ja existe um registro com estes dados.',
  '23502': 'Campos obrigatorios nao foram preenchidos.',
  '23503': 'Referencia invalida: o registro relacionado nao existe.',
  '22P02': 'Formato invalido: verifique se os campos estao preenchidos corretamente.',
  '42501': 'Voce nao tem permissao para realizar esta acao.',
  'PGRST116': 'Nenhum registro encontrado com os criterios informados.',
  'PGRST301': 'Erro de conexao com o banco de dados.',
};

export function translateSupabaseError(error: string | { message?: string; code?: string }): string {
  if (typeof error === 'string') {
    for (const [key, value] of Object.entries(supabaseErrorMap)) {
      if (error.toLowerCase().includes(key.toLowerCase())) {
        return value.message;
      }
    }
    return error;
  }

  if (error.code && postgresCodeMap[error.code]) {
    return postgresCodeMap[error.code];
  }

  if (error.message) {
    return translateSupabaseError(error.message);
  }

  return 'Ocorreu um erro inesperado. Tente novamente.';
}

export function getErrorDetails(error: string | { message?: string; code?: string }) {
  const message = typeof error === 'string' ? error : error.message || '';

  for (const [key, value] of Object.entries(supabaseErrorMap)) {
    if (message.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  return {
    title: 'Erro',
    message: translateSupabaseError(error),
    suggestion: 'Se o problema persistir, contate o suporte.',
  };
}
