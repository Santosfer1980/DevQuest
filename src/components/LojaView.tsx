import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Coins, 
  History, 
  X, 
  Sparkles,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EstadoJogo, RecompensaLoja } from '../types';

interface LojaViewProps {
  estado: EstadoJogo;
  onAtualizarEstado: (novoEstado: Partial<EstadoJogo>) => void;
  onCompletarMissao: (id: number) => void;
}

export const LojaView: React.FC<LojaViewProps> = ({
  estado,
  onAtualizarEstado,
  onCompletarMissao
}) => {
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [novoEmoji, setNovoEmoji] = useState<string>('☕');
  const [novoNome, setNovoNome] = useState<string>('');
  const [novoCusto, setNovoCusto] = useState<number>(40);
  const [novaCategoria, setNovaCategoria] = useState<string>('Pausa');
  const [mensagemFeedback, setMensagemFeedback] = useState<{ id: number; texto: string; erro?: boolean } | null>(null);

  const resgatarRecompensa = (item: RecompensaLoja) => {
    if (estado.gold < item.custo) {
      setMensagemFeedback({
        id: item.id,
        texto: 'Saldo de Gold insuficiente!',
        erro: true
      });
      setTimeout(() => setMensagemFeedback(null), 2000);
      return;
    }

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    const agora = new Date();
    const dataStr = `${agora.toLocaleDateString('pt-BR')} - ${agora.getHours().toString().padStart(2, '0')}:${agora.getMinutes().toString().padStart(2, '0')}`;

    const novoHistorico = [
      {
        id: `resg-${Date.now()}`,
        data: dataStr,
        nome: item.nome,
        custo: item.custo,
        status: 'Consumido' as const
      },
      ...estado.historicoResgates
    ];

    onAtualizarEstado({
      gold: estado.gold - item.custo,
      historicoResgates: novoHistorico
    });

    onCompletarMissao(2);

    setMensagemFeedback({
      id: item.id,
      texto: 'Recompensa Aprovada! Desfrute sua pausa saudável ☕'
    });
    setTimeout(() => setMensagemFeedback(null), 2500);
  };

  const handleCriarRecompensa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome.trim()) return;

    const nova: RecompensaLoja = {
      id: Date.now(),
      emoji: novoEmoji,
      nome: novoNome.trim(),
      custo: Number(novoCusto),
      categoria: novaCategoria
    };

    onAtualizarEstado({
      recompensas: [...estado.recompensas, nova]
    });

    setModalAberto(false);
    setNovoNome('');
    setNovoCusto(40);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Editorial Header */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <GraduationCap className="w-4 h-4" />
              <span>Saúde Mental & Produtividade no Estudo</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Loja de Auto-Recompensas e Bem-Estar
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Equilibre a carga acadêmica com pausas regenerativas. Converta o Gold conquistado ao resolver exercícios de código e ciclos de Pomodoro em momentos saudáveis de lazer na sua rotina real.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Saldo do Estudante</p>
                <p className="text-lg font-black text-amber-400 font-mono">{estado.gold} GOLD</p>
              </div>
            </div>

            <button
              onClick={() => setModalAberto(true)}
              className="px-4 py-3 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 hover:scale-105 text-slate-950 transition-all duration-200 flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Incentivo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid de Recompensas com Efeito de Hover Físico */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            Incentivos Disponíveis
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            {estado.recompensas.length} Opções
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {estado.recompensas.map(item => {
            const feedback = mensagemFeedback?.id === item.id ? mensagemFeedback : null;
            const podeComprar = estado.gold >= item.custo;

            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    {item.emoji}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.nome}</h3>
                    {item.categoria && (
                      <span className="text-[10px] uppercase font-mono text-slate-400">
                        {item.categoria}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 font-mono font-bold text-amber-400 text-sm">
                    <Coins className="w-4 h-4" />
                    <span>{item.custo} <small className="text-[10px]">GOLD</small></span>
                  </div>

                  <button
                    onClick={() => resgatarRecompensa(item)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      podeComprar
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 hover:scale-105'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Resgatar
                  </button>
                </div>

                {feedback && (
                  <div className={`text-xs font-semibold p-2 rounded-lg text-center ${
                    feedback.erro ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {feedback.texto}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Extrato de Resgates */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-slate-400" />
            Extrato de Pausas Produtivas Conquistadas
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            {estado.historicoResgates.length} Registros
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-700">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-mono uppercase text-[10px]">
              <tr>
                <th className="p-3.5">Data / Hora</th>
                <th className="p-3.5">Atividade Resgatada</th>
                <th className="p-3.5">Investimento (🪙)</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {estado.historicoResgates.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-500">
                    Nenhum resgate registrado. Realize exercícios nas trilhas para acumular Gold!
                  </td>
                </tr>
              ) : (
                estado.historicoResgates.map(resgate => (
                  <tr key={resgate.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 text-slate-400 font-mono text-[11px]">{resgate.data}</td>
                    <td className="p-3.5 font-bold text-white">{resgate.nome}</td>
                    <td className="p-3.5 font-mono font-bold text-amber-400">-{resgate.custo} Gold</td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {resgate.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Cadastro */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Cadastrar Auto-Recompensa
              </h3>
              <button
                onClick={() => setModalAberto(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCriarRecompensa} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Ícone / Emoji da Atividade:</label>
                <div className="grid grid-cols-6 gap-2">
                  {['☕', '🎮', '📺', '🍫', '🚶‍♂️', '😴', '🍕', '📖', '🎧', '🍦', '🚲', '🧘'].map(emoji => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setNovoEmoji(emoji)}
                      className={`p-2 rounded-xl text-xl border transition-all cursor-pointer ${
                        novoEmoji === emoji
                          ? 'bg-amber-500/20 border-amber-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Título do Incentivo:</label>
                <input
                  type="text"
                  required
                  maxLength={40}
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  placeholder="Ex: 30 minutos jogando videogame"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Preço em Gold (🪙):</label>
                  <input
                    type="number"
                    min={10}
                    max={500}
                    required
                    value={novoCusto}
                    onChange={(e) => setNovoCusto(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Categoria:</label>
                  <select
                    value={novaCategoria}
                    onChange={(e) => setNovaCategoria(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Pausa">Pausa</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Alimento">Alimento</option>
                    <option value="Saúde">Saúde</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="px-4 py-2.5 rounded-xl font-semibold text-slate-400 hover:text-white bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
