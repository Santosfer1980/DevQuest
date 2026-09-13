import React, { useState } from 'react';
import { 
  ScrollText, 
  BookOpen, 
  Sparkles, 
  Calendar,
  CheckCircle2,
  BookmarkCheck,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EstadoJogo } from '../types';
import { MARCOS_HISTORICOS, LIVROS_RECOMENDADOS } from '../data/initialData';

interface HistoriaViewProps {
  estado: EstadoJogo;
  onAtualizarEstado: (novoEstado: Partial<EstadoJogo>) => void;
  onVerificarLevelUp: (xpGanho: number) => void;
}

export const HistoriaView: React.FC<HistoriaViewProps> = ({
  estado,
  onAtualizarEstado,
  onVerificarLevelUp
}) => {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('Todas');

  const concluirHistoria = () => {
    if (estado.historiaLida) return;
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    onAtualizarEstado({
      historiaLida: true,
      xp: estado.xp + 30,
      gold: estado.gold + 15
    });
    onVerificarLevelUp(30);
  };

  const lerLivro = (idLivro: number, xpRecompensa: number) => {
    if (estado.livrosLidos.includes(idLivro)) return;
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });
    const novosLivros = [...estado.livrosLidos, idLivro];
    onAtualizarEstado({
      livrosLidos: novosLivros,
      xp: estado.xp + xpRecompensa,
      gold: estado.gold + 10
    });
    onVerificarLevelUp(xpRecompensa);
  };

  const marcosFiltrados = categoriaAtiva === 'Todas'
    ? MARCOS_HISTORICOS
    : MARCOS_HISTORICOS.filter(m => m.categoria === categoriaAtiva);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Editorial Header */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <GraduationCap className="w-4 h-4" />
              <span>História da Computação & Referências Bibliográficas</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              A Biblioteca dos Ancestrais e Livros Clássicos
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Compreenda as origens históricas das linguagens da sua grade (C, SQL, Python, PHP) e as referências de literatura indispensáveis recomendadas para formação em ADS.
            </p>
          </div>

          <button
            onClick={concluirHistoria}
            disabled={estado.historiaLida}
            className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all duration-200 shrink-0 cursor-pointer ${
              estado.historiaLida
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-cyan-500 hover:bg-cyan-400 hover:scale-105 text-slate-950 shadow-md shadow-cyan-500/20'
            }`}
          >
            {estado.historiaLida ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Leitura Histórica Concluída (+30 XP)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Concluir Leitura Histórica (+30 XP)</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Linha do Tempo */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ScrollText className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-bold text-white">Linha do Tempo dos Mestres da Computação</h2>
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            {['Todas', 'Fundamentos', 'Linguagens', 'Bancos de Dados'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  categoriaAtiva === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid dos Pioneiros com Efeito de Hover Físico */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marcosFiltrados.map(marco => (
            <div
              key={marco.id}
              className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between space-y-3 cursor-pointer group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {marco.ano}
                  </span>
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-semibold">
                    {marco.categoria}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {marco.figura}
                  </h3>
                  <p className="text-xs text-indigo-400 font-medium italic mt-0.5">
                    "{marco.tituloHeroico}"
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {marco.descricao}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono flex items-center justify-between">
                <span>Marco Acadêmico</span>
                <span className="text-cyan-400 text-[10px]">Histórico</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Livros Recomendados com Efeito de Hover Físico */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Livros e Grimórios Essenciais de ADS</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {estado.livrosLidos.length}/{LIVROS_RECOMENDADOS.length} Lidos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LIVROS_RECOMENDADOS.map(livro => {
            const jaLeu = estado.livrosLidos.includes(livro.id);

            return (
              <div
                key={livro.id}
                className={`bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5 cursor-pointer ${
                  jaLeu ? 'border-emerald-500/40 bg-emerald-950/15' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="text-3xl p-2 rounded-xl bg-slate-950 border border-slate-800 inline-block">
                    {livro.icone}
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">{livro.titulo}</h3>
                  <p className="text-xs text-slate-400 font-medium">{livro.autor}</p>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {livro.sinopse}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <button
                    onClick={() => lerLivro(livro.id, livro.xpRecompensa)}
                    disabled={jaLeu}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                      jaLeu
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:scale-105'
                    }`}
                  >
                    {jaLeu ? (
                      <>
                        <BookmarkCheck className="w-3.5 h-3.5" />
                        <span>Grimório Lido (+{livro.xpRecompensa} XP)</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Marcar Leitura (+{livro.xpRecompensa} XP)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
