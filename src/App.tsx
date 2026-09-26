import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Coins, 
  Flame, 
  Sparkles, 
  X,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TabType, EstadoJogo } from './types';
import { ESTADO_INICIAL } from './data/initialData';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { TrilhasView } from './components/TrilhasView';
import { QuizView } from './components/QuizView';
import { HistoriaView } from './components/HistoriaView';
import { LojaView } from './components/LojaView';
import { LandingView } from './components/LandingView';
import { GithubHubView } from './components/GithubHubView';
import { PainelArquivosAcademico } from './components/PainelArquivosAcademico';
import { FolderDown } from 'lucide-react';

const STORAGE_KEY = 'devquest_plus_academico_v3';

export default function App() {
  const [estado, setEstado] = useState<EstadoJogo>(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) {
        return JSON.parse(salvo);
      }
    } catch (e) {
      console.error('Falha ao carregar estado do localStorage', e);
    }
    return ESTADO_INICIAL;
  });

  const [tabAtual, setTabAtual] = useState<TabType>('dashboard');
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [modalLevelUp, setModalLevelUp] = useState<number | null>(null);
  const [painelArquivosAberto, setPainelArquivosAberto] = useState<boolean>(false);

  // Sincroniza com localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
    } catch (e) {
      console.error('Falha ao salvar estado no localStorage', e);
    }
  }, [estado]);

  const atualizarEstado = (novo: Partial<EstadoJogo>) => {
    setEstado(prev => ({
      ...prev,
      ...novo
    }));
  };

  const verificarLevelUp = (xpGanho: number) => {
    setEstado(prev => {
      let novoXp = prev.xp;
      let novoNivel = prev.nivel;
      let novoLimite = prev.xpLimite;
      let subiu = false;

      if (novoXp >= novoLimite) {
        novoXp -= novoLimite;
        novoNivel += 1;
        novoLimite = Math.floor(novoLimite * 1.35);
        subiu = true;
      }

      if (subiu) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
        setModalLevelUp(novoNivel);
      }

      return {
        ...prev,
        xp: novoXp,
        nivel: novoNivel,
        xpLimite: novoLimite
      };
    });
  };

  const completarMissao = (idMissao: number) => {
    setEstado(prev => {
      const missao = prev.missoes.find(m => m.id === idMissao);
      if (missao && !missao.concluida) {
        const novoGold = prev.gold + missao.goldRecompensa;
        const novoXp = prev.xp + missao.xpRecompensa;
        const novasMissoes = prev.missoes.map(m => 
          m.id === idMissao ? { ...m, concluida: true } : m
        );

        let novoNivel = prev.nivel;
        let novoLimite = prev.xpLimite;
        let xpFinal = novoXp;

        if (xpFinal >= novoLimite) {
          xpFinal -= novoLimite;
          novoNivel += 1;
          novoLimite = Math.floor(novoLimite * 1.35);
          confetti({ particleCount: 100, spread: 70 });
          setModalLevelUp(novoNivel);
        }

        return {
          ...prev,
          gold: novoGold,
          xp: xpFinal,
          nivel: novoNivel,
          xpLimite: novoLimite,
          missoes: novasMissoes
        };
      }
      return prev;
    });
  };

  const resetarProgresso = () => {
    setEstado(ESTADO_INICIAL);
    localStorage.removeItem(STORAGE_KEY);
    alert('Histórico acadêmico resetado para o estado inicial da faculdade.');
  };

  const handleLoginSucesso = (dados: { nome: string; email: string; avatarUrl: string }) => {
    setEstado(prev => ({
      ...prev,
      usuarioNome: dados.nome,
      usuarioEmail: dados.email,
      avatarUrl: dados.avatarUrl,
      isAuthenticated: true
    }));
  };

  const handleLogout = () => {
    setEstado(prev => ({
      ...prev,
      isAuthenticated: false
    }));
  };

  // Se não estiver autenticado, exibe a nova Landing Page com apresentação, valores e login
  if (!estado.isAuthenticated) {
    return (
      <LandingView
        onLoginSucesso={handleLoginSucesso}
        usuarioAtual={{
          nome: estado.usuarioNome,
          email: estado.usuarioEmail,
          avatarUrl: estado.avatarUrl
        }}
      />
    );
  }

  const titulosPorAba: Record<TabType, { titulo: string; trilha: string }> = {
    dashboard: { titulo: 'Painel Geral do Estudante', trilha: 'Portal Acadêmico' },
    trilhas: { titulo: 'Trilhas Práticas (HTML, CSS, JS, PHP, Python, SQL)', trilha: 'Prática de Programação' },
    quiz: { titulo: 'Arena Conceitual e Avaliação Formativa', trilha: 'Teoria & POO' },
    historia: { titulo: 'Biblioteca dos Pioneiros e Literatura Clássica', trilha: 'História & Livros' },
    loja: { titulo: 'Incentivos de Foco e Bem-Estar', trilha: 'Saúde Mental' },
    github: { titulo: 'Repositório GitHub & Terminal Git', trilha: 'Versionamento & DevOps' }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row antialiased selection:bg-indigo-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        tabAtual={tabAtual}
        setTabAtual={setTabAtual}
        estado={estado}
        onResetarDados={resetarProgresso}
        onLogout={handleLogout}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
        onAbrirPainelAcademico={() => setPainelArquivosAberto(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpenMobile(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden cursor-pointer"
              aria-label="Abrir menu lateral"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <span>ADS</span>
                <span>/</span>
                <span className="text-indigo-400 font-semibold">{titulosPorAba[tabAtual].trilha}</span>
              </div>
              <h2 className="text-sm font-bold text-white leading-tight">
                {titulosPorAba[tabAtual].titulo}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Botão de Destaque Superior: Pasta da Faculdade */}
            <button
              onClick={() => setPainelArquivosAberto(true)}
              className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-xs"
              title="Abrir explorador de arquivos da pasta acadêmica"
            >
              <FolderDown className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Pasta /academico</span>
            </button>

            {/* Quick stats pills in topbar */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs font-bold text-amber-400 transition-all hover:border-slate-700">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>{estado.streak}d</span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs font-bold text-amber-400 transition-all hover:border-slate-700">
              <Coins className="w-3.5 h-3.5" />
              <span>{estado.gold}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-xl font-mono text-xs font-bold text-indigo-300 transition-all hover:border-indigo-500/40">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Nv. {estado.nivel}</span>
            </div>
          </div>
        </header>

        {/* Dynamic View Container */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {tabAtual === 'dashboard' && (
            <DashboardView
              estado={estado}
              onAtualizarEstado={atualizarEstado}
              onCompletarMissao={completarMissao}
              onNavegarPara={setTabAtual}
            />
          )}

          {tabAtual === 'trilhas' && (
            <TrilhasView
              estado={estado}
              onAtualizarEstado={atualizarEstado}
              onCompletarMissao={completarMissao}
              onVerificarLevelUp={verificarLevelUp}
            />
          )}

          {tabAtual === 'quiz' && (
            <QuizView
              estado={estado}
              onAtualizarEstado={atualizarEstado}
              onVerificarLevelUp={verificarLevelUp}
            />
          )}

          {tabAtual === 'historia' && (
            <HistoriaView
              estado={estado}
              onAtualizarEstado={atualizarEstado}
              onVerificarLevelUp={verificarLevelUp}
            />
          )}

          {tabAtual === 'loja' && (
            <LojaView
              estado={estado}
              onAtualizarEstado={atualizarEstado}
              onCompletarMissao={completarMissao}
            />
          )}

          {tabAtual === 'github' && (
            <GithubHubView
              estado={estado}
            />
          )}
        </main>
      </div>

      {/* Level Up Celebratory Modal */}
      {modalLevelUp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl relative">
            <button
              onClick={() => setModalLevelUp(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mx-auto shadow-lg">
              <GraduationCap className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                Evolução Curricular
              </span>
              <h3 className="text-2xl font-black text-white">
                Nível {modalLevelUp} Conquistado!
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Parabéns! Sua dedicação aos exercícios de programação (HTML, CSS, JS, PHP, Python e SQL) rendeu um novo nível acadêmico.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setModalLevelUp(null)}
                className="w-full py-3 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md cursor-pointer"
              >
                Continuar Jornada
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explorador Lateral de Arquivos da Pasta Acadêmica */}
      <PainelArquivosAcademico
        aberto={painelArquivosAberto}
        onFechar={() => setPainelArquivosAberto(false)}
      />
    </div>
  );
}
