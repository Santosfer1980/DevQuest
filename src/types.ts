export type TabType = 'dashboard' | 'trilhas' | 'quiz' | 'historia' | 'loja';

export type LinguagemId = 'html_css' | 'javascript' | 'php' | 'python' | 'sql';

export interface TrilhaInfo {
  id: LinguagemId;
  nome: string;
  sigla: string;
  area: 'Frontend' | 'Backend' | 'Banco de Dados';
  cor: string;
  descricao: string;
  nivelRequerido: number;
}

export interface Missao {
  id: number;
  texto: string;
  concluida: boolean;
  xpRecompensa: number;
  goldRecompensa: number;
}

export interface DesafioCodigo {
  id: string;
  linguagem: LinguagemId;
  numero: number;
  titulo: string;
  enunciado: string;
  codigoPadrao?: string;
  codigoCorreto: string;
  dicaPedagogica: string;
  exemploSaida?: string;
  recompensaXP: number;
  recompensaGold: number;
  concluido: boolean;
  disponivel: boolean;
}

export interface QuestaoQuiz {
  id: number;
  pergunta: string;
  categoria: string;
  linguagemRelacionada?: string;
  opcoes: {
    texto: string;
    correta: boolean;
  }[];
  explicacao: string;
  recompensaGold: number;
  recompensaXP: number;
}

export interface MarcoHistorico {
  id: number;
  titulo: string;
  figura: string;
  ano: string;
  tituloHeroico: string;
  descricao: string;
  categoria: 'Fundamentos' | 'Linguagens' | 'Bancos de Dados';
}

export interface LivroRecomendado {
  id: number;
  titulo: string;
  autor: string;
  sinopse: string;
  icone: string;
  xpRecompensa: number;
}

export interface RecompensaLoja {
  id: number;
  emoji: string;
  nome: string;
  custo: number;
  categoria?: string;
}

export interface HistoricoResgate {
  id: string;
  data: string;
  nome: string;
  custo: number;
  status: 'Aprovado' | 'Consumido';
}

export interface EstadoJogo {
  usuarioNome: string;
  usuarioEmail?: string;
  avatarUrl?: string;
  isAuthenticated: boolean;
  nivel: number;
  xp: number;
  xpLimite: number;
  gold: number;
  streak: number;
  notasBloco: string;
  historiaLida: boolean;
  livrosLidos: number[];
  missoes: Missao[];
  recompensas: RecompensaLoja[];
  historicoResgates: HistoricoResgate[];
  quizHP: number;
  quizRespondido: boolean;
  questoesRespondidas: number[];
  desafios: DesafioCodigo[];
}

