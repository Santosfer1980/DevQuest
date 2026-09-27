import React from 'react';
import { 
  GraduationCap, 
  Flame, 
  Coins, 
  LayoutGrid, 
  Code2, 
  Terminal, 
  BookOpen, 
  ShoppingBag, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  Layers,
  LogOut,
  FolderGit2,
  FolderDown,
  Calculator,
  Globe,
  Award
} from 'lucide-react';
import { TabType, EstadoJogo } from '../types';

interface SidebarProps {
  tabAtual: TabType;
  setTabAtual: (tab: TabType) => void;
  estado: EstadoJogo;
  onResetarDados: () => void;
  onLogout?: () => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  onAbrirPainelAcademico?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  tabAtual,
  setTabAtual,
  estado,
  onResetarDados,
  onLogout,
  isOpenMobile,
  setIsOpenMobile,
  onAbrirPainelAcademico
}) => {
  const percentualXp = Math.min(Math.round((estado.xp / estado.xpLimite) * 100), 100);
  const totalConcluidos = estado.desafios.filter(d => d.concluido).length;

  const obterIniciais = (nome: string) => {
    if (!nome) return 'DQ';
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  };

  const navItems: { id: TabType; label: string; sublabel: string; icon: React.ReactNode; badge?: string }[] = [
    { 
      id: 'dashboard', 
      label: 'Portal Acadêmico', 
      sublabel: 'Visão geral e metas diárias',
      icon: <LayoutGrid className="w-4 h-4" /> 
    },
    { 
      id: 'trilhas', 
      label: 'Trilhas Curriculares', 
      sublabel: 'HTML, CSS, JS, PHP, Python, SQL',
      icon: <Code2 className="w-4 h-4" />,
      badge: `${totalConcluidos}/${estado.desafios.length}` 
    },
    { 
      id: 'simulado', 
      label: 'Simulado ENADE ADS', 
      sublabel: 'Questões oficiais comentadas',
      icon: <Award className="w-4 h-4 text-purple-400" />,
      badge: 'Oficial'
    },
    { 
      id: 'academico', 
      label: 'Boletim & Médias', 
      sublabel: 'Calculadora A1/A2 e faltas',
      icon: <Calculator className="w-4 h-4 text-emerald-400" />,
      badge: 'ADS'
    },
    { 
      id: 'recursos', 
      label: 'Recursos & Repositórios', 
      sublabel: 'INEP, Python Brasil, MDN',
      icon: <Globe className="w-4 h-4 text-cyan-400" />,
      badge: 'Links'
    },
    { 
      id: 'quiz', 
      label: 'Arena Conceitual', 
      sublabel: 'Desafios teóricos e POO',
      icon: <Terminal className="w-4 h-4" />,
      badge: estado.quizRespondido ? '100%' : 'Ativo'
    },
    { 
      id: 'historia', 
      label: 'Biblioteca & Livros', 
      sublabel: 'Ancestrais e referências clássicas',
      icon: <BookOpen className="w-4 h-4" /> 
    },
    { 
      id: 'loja', 
      label: 'Recompensas de Foco', 
      sublabel: 'Incentivos de produtividade',
      icon: <ShoppingBag className="w-4 h-4" /> 
    },
    { 
      id: 'github', 
      label: 'GitHub & Repositório', 
      sublabel: 'Terminal e sincronização',
      icon: <FolderGit2 className="w-4 h-4 text-emerald-400" />,
      badge: 'Git'
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-slate-900 border-r border-slate-800/80 flex flex-col justify-between p-5 transition-transform duration-300 ease-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Logo & Portal Branding */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                  DevQuest <span className="text-indigo-400 font-semibold text-xs px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">ADS</span>
                </h1>
                <p className="text-[11px] text-slate-400 font-medium">Plataforma Acadêmica de TI</p>
              </div>
            </div>
          </div>

          {/* Perfil do Estudante */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-xl p-3 flex items-center gap-3 transition-all duration-200 hover:border-slate-700">
            {estado.avatarUrl ? (
              <img 
                src={estado.avatarUrl} 
                alt={estado.usuarioNome}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-cover border border-indigo-500/40 shrink-0 shadow-xs" 
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs">
                {obterIniciais(estado.usuarioNome)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white truncate">{estado.usuarioNome}</h4>
                <span className="text-[10px] font-bold font-mono text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                  Nv. {estado.nivel}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" /> {estado.usuarioEmail || 'Desenvolvedor DevQuest'}
              </p>
            </div>
          </div>

          {/* Gamificação: Ofensiva, XP e Moedas */}
          <div className="space-y-2">
            {/* XP Bar */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-400">Progresso Curricular</span>
                <span className="font-mono font-bold text-indigo-300">{estado.xp} / {estado.xpLimite} XP</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 rounded-full"
                  style={{ width: `${percentualXp}%` }}
                />
              </div>
            </div>

            {/* Quick counters */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-2.5 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium leading-none">Ofensiva</p>
                  <p className="text-xs font-bold text-white font-mono mt-0.5">{estado.streak} dias</p>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-2.5 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                  <Coins className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium leading-none">Gold</p>
                  <p className="text-xs font-bold text-amber-400 font-mono mt-0.5">{estado.gold}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links do Portal */}
          <nav className="space-y-1 pt-1">
            <span className="text-[10px] font-bold tracking-wider text-slate-500 px-2 uppercase">Menu Principal</span>
            {navItems.map(item => {
              const isActive = tabAtual === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => {
                    setTabAtual(item.id);
                    setIsOpenMobile(false);
                  }}
                  className={`w-full group flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600/15 border border-indigo-500/30 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60 hover:translate-x-1 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`p-1.5 rounded-lg transition-colors ${
                      isActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-white'
                    }`}>
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-none">{item.label}</p>
                      <p className="text-[10px] text-slate-500 truncate mt-1">{item.sublabel}</p>
                    </div>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      isActive ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Botão de Destaque: Explorador da Pasta Acadêmica */}
            {onAbrirPainelAcademico && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    onAbrirPainelAcademico();
                    setIsOpenMobile(false);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-300 hover:text-white transition-all duration-200 cursor-pointer group shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="p-1.5 rounded-lg bg-emerald-600 text-white group-hover:scale-105 transition-transform">
                      <FolderDown className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-none text-white">Pasta /academico</p>
                      <p className="text-[10px] text-emerald-400/80 truncate mt-1">Ver arquivos & Baixar</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Abrir
                  </span>
                </button>
              </div>
            )}
          </nav>
        </div>

        {/* Footer com controle acadêmico e Logout */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-xl bg-slate-950/40 hover:bg-slate-800/80 border border-slate-800 cursor-pointer"
            >
              <span className="flex items-center gap-2 text-[11px] font-medium">
                <LogOut className="w-3.5 h-3.5 text-indigo-400" />
                Trocar Perfil / Início
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Sair</span>
            </button>
          )}

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <button
              onClick={() => {
                if (window.confirm('Deseja reiniciar seu histórico acadêmico e restaurar o estado inicial?')) {
                  onResetarDados();
                }
              }}
              className="flex items-center gap-1.5 text-slate-500 hover:text-rose-400 transition-colors py-1 px-2 rounded-lg hover:bg-slate-800/60 cursor-pointer"
              title="Restaurar dados iniciais"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="text-[11px]">Reiniciar</span>
            </button>
            <span className="text-[10px] font-mono text-slate-600">DevQuest Platform</span>
          </div>
        </div>
      </aside>
    </>
  );
};
