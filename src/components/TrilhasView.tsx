import React, { useState } from 'react';
import { 
  CheckCircle, 
  Lock, 
  Play, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Lightbulb, 
  Terminal as TerminalIcon, 
  Code2, 
  Check, 
  Sparkles,
  ChevronRight,
  Database,
  Server,
  FileCode,
  Braces,
  Globe,
  Table
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EstadoJogo, DesafioCodigo, LinguagemId } from '../types';
import { TRILHAS_DISPONIVEIS } from '../data/initialData';

interface TrilhasViewProps {
  estado: EstadoJogo;
  onAtualizarEstado: (novoEstado: Partial<EstadoJogo>) => void;
  onCompletarMissao: (id: number) => void;
  onVerificarLevelUp: (xpGanho: number) => void;
}

interface LinhaConsole {
  id: string;
  texto: string;
  tipo: 'info' | 'success' | 'error' | 'muted';
}

export const TrilhasView: React.FC<TrilhasViewProps> = ({
  estado,
  onAtualizarEstado,
  onCompletarMissao,
  onVerificarLevelUp
}) => {
  const [linguagemAtiva, setLinguagemAtiva] = useState<LinguagemId>('html_css');

  // Filtra desafios da linguagem ativa
  const desafiosDaLinguagem = estado.desafios.filter(d => d.linguagem === linguagemAtiva);

  // Desafio selecionado
  const [desafioSelecionado, setDesafioSelecionado] = useState<DesafioCodigo>(
    desafiosDaLinguagem[0] || estado.desafios[0]
  );

  const [codigo, setCodigo] = useState<string>(
    desafioSelecionado?.codigoPadrao || desafioSelecionado?.codigoCorreto || ''
  );
  const [mostrarDica, setMostrarDica] = useState<boolean>(false);
  const [executando, setExecutando] = useState<boolean>(false);
  const [terminalExpandido, setTerminalExpandido] = useState<boolean>(false);
  const [resultadoTabelaSQL, setResultadoTabelaSQL] = useState<any[] | null>(null);

  const [linhasConsole, setLinhasConsole] = useState<LinhaConsole[]>([
    { id: '1', texto: '>>> Compilador/Interpretador pronto. Selecione o exercício e digite seu código.', tipo: 'info' }
  ]);

  const trocarLinguagem = (ling: LinguagemId) => {
    setLinguagemAtiva(ling);
    const desafios = estado.desafios.filter(d => d.linguagem === ling);
    if (desafios.length > 0) {
      const primeiro = desafios.find(d => d.disponivel && !d.concluido) || desafios[0];
      setDesafioSelecionado(primeiro);
      setCodigo(primeiro.codigoPadrao || (primeiro.concluido ? primeiro.codigoCorreto : ''));
      setMostrarDica(false);
      setResultadoTabelaSQL(null);
      setLinhasConsole([
        { id: Date.now().toString(), texto: `>>> Trilha ativada: ${TRILHAS_DISPONIVEIS.find(t => t.id === ling)?.nome}`, tipo: 'info' }
      ]);
    }
  };

  const selecionarDesafio = (desafio: DesafioCodigo) => {
    if (!desafio.disponivel && !desafio.concluido) return;
    setDesafioSelecionado(desafio);
    setCodigo(desafio.concluido ? desafio.codigoCorreto : (desafio.codigoPadrao || ''));
    setMostrarDica(false);
    setResultadoTabelaSQL(null);
    setLinhasConsole(prev => [
      ...prev,
      { id: Date.now().toString(), texto: `>>> Exercício carregado: ${desafio.titulo}`, tipo: 'info' }
    ]);
  };

  const executarCodigo = () => {
    setExecutando(true);
    const codigoLimpo = codigo.trim();

    setLinhasConsole(prev => [
      ...prev,
      { id: Date.now().toString(), texto: `$ executar --target=${linguagemAtiva} main`, tipo: 'info' },
      { id: (Date.now() + 1).toString(), texto: '[INFO] Validando sintaxe léxica e execução...', tipo: 'muted' }
    ]);

    setTimeout(() => {
      // Normalização inteligente para conferência de sintaxe
      const normalizar = (str: string) => 
        str
          .replace(/["']/g, '"')
          .replace(/;\s*$/, '')
          .replace(/\s+/g, ' ')
          .replace(/\s*=\s*/g, '=')
          .replace(/\s*:\s*/g, ':')
          .replace(/\s*>\s*/g, '>')
          .replace(/\s*<\s*/g, '<')
          .trim()
          .toLowerCase();

      const digitadoNormalizado = normalizar(codigoLimpo);
      const gabaritoNormalizado = normalizar(desafioSelecionado.codigoCorreto);

      const estaCorreto = 
        digitadoNormalizado === gabaritoNormalizado ||
        digitadoNormalizado.includes(gabaritoNormalizado) ||
        codigoLimpo.replace(/["'\s;]/g, '').toLowerCase() === desafioSelecionado.codigoCorreto.replace(/["'\s;]/g, '').toLowerCase();

      if (estaCorreto) {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 }
        });

        // Simulação especial de tabela SQL caso seja SQL
        if (linguagemAtiva === 'sql') {
          setResultadoTabelaSQL([
            { id: 1, nome: 'Carlos Silva', curso: 'ADS', nota: 8.5 },
            { id: 2, nome: 'Mariana Costa', curso: 'ADS', nota: 9.0 },
            { id: 3, nome: 'Fernando Santos', curso: 'ADS', nota: 9.5 }
          ]);
        }

        setLinhasConsole(prev => [
          ...prev,
          { id: Date.now().toString(), texto: '[OK] Sucesso! Código atendeu integralmente aos requisitos.', tipo: 'success' },
          { id: (Date.now() + 1).toString(), texto: `>>> Saída: ${desafioSelecionado.exemploSaida || 'Executado com êxito'}`, tipo: 'success' },
          { id: (Date.now() + 2).toString(), texto: `>>> Recompensas: +${desafioSelecionado.recompensaXP} XP | +${desafioSelecionado.recompensaGold} Gold 🪙`, tipo: 'success' }
        ]);

        if (!desafioSelecionado.concluido) {
          const novosDesafios = estado.desafios.map((d, index) => {
            if (d.id === desafioSelecionado.id) {
              return { ...d, concluido: true };
            }
            // Destrava o próximo desafio da mesma linguagem
            const indexAtual = desafiosDaLinguagem.findIndex(item => item.id === desafioSelecionado.id);
            if (indexAtual !== -1 && indexAtual + 1 < desafiosDaLinguagem.length) {
              if (d.id === desafiosDaLinguagem[indexAtual + 1].id) {
                return { ...d, disponivel: true };
              }
            }
            return d;
          });

          onAtualizarEstado({
            desafios: novosDesafios,
            gold: estado.gold + desafioSelecionado.recompensaGold,
            xp: estado.xp + desafioSelecionado.recompensaXP
          });

          onCompletarMissao(3);
          onVerificarLevelUp(desafioSelecionado.recompensaXP);
          setDesafioSelecionado(prev => ({ ...prev, concluido: true }));
        }
      } else {
        setLinhasConsole(prev => [
          ...prev,
          { id: Date.now().toString(), texto: '[ERRO] A saída ou sintaxe difere do padrão esperado.', tipo: 'error' },
          { id: (Date.now() + 1).toString(), texto: `[💡 DICA DO PROFESSOR] ${desafioSelecionado.dicaPedagogica}`, tipo: 'info' },
          { id: (Date.now() + 2).toString(), texto: `[EXEMPLO ESPERADO] ${desafioSelecionado.codigoCorreto}`, tipo: 'muted' }
        ]);
      }
      setExecutando(false);
    }, 500);
  };

  const trilhaAtual = TRILHAS_DISPONIVEIS.find(t => t.id === linguagemAtiva)!;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Editorial Header - Trilhas Curriculares */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
              <Code2 className="w-4 h-4" />
              <span>Matriz Curricular de Programação • 5 Disciplinas</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Trilhas de Aprendizado Prático
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Pratique os conceitos fundamentais exigidos pelo mercado e pela faculdade. 
              Alterne entre as linguagens abaixo para praticar syntax, lógica, queries e regras no sandbox interativo.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 shrink-0 text-right">
            <p className="text-[11px] font-semibold text-slate-400 uppercase">Trilha Ativa</p>
            <p className="text-base font-bold text-white font-mono mt-0.5" style={{ color: trilhaAtual.cor }}>
              {trilhaAtual.nome}
            </p>
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              Área: {trilhaAtual.area}
            </p>
          </div>
        </div>

        {/* Seletor de Linguagens - 5 Pilares Acadêmicos */}
        <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {TRILHAS_DISPONIVEIS.map(trilha => {
            const isAtiva = linguagemAtiva === trilha.id;
            const itens = estado.desafios.filter(d => d.linguagem === trilha.id);
            const concluidos = itens.filter(d => d.concluido).length;

            return (
              <button
                key={trilha.id}
                onClick={() => trocarLinguagem(trilha.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2 group ${
                  isAtiva
                    ? 'bg-slate-800/90 border-indigo-500/50 shadow-md shadow-indigo-500/10 -translate-y-1'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700 hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span 
                    className="text-xs font-black px-2 py-0.5 rounded font-mono"
                    style={{ backgroundColor: `${trilha.cor}20`, color: trilha.cor }}
                  >
                    {trilha.sigla}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 font-bold">
                    {concluidos}/{itens.length}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {trilha.nome}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{trilha.area}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid Principal: Lista de Exercícios + Editor Interativo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Coluna Esquerda: Lista de Desafios da Disciplina (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 transition-all duration-300 hover:border-slate-700">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-400" />
                <span>Desafios de {trilhaAtual.sigla}</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {desafiosDaLinguagem.filter(d => d.concluido).length}/{desafiosDaLinguagem.length}
              </span>
            </div>

            <div className="space-y-2">
              {desafiosDaLinguagem.map((desafio, idx) => {
                const isSelected = desafioSelecionado?.id === desafio.id;
                const isConcluido = desafio.concluido;
                const isDisponivel = desafio.disponivel;

                return (
                  <div
                    key={desafio.id}
                    onClick={() => selecionarDesafio(desafio)}
                    className={`w-full p-3 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500/60 shadow-md shadow-indigo-500/10 -translate-y-0.5'
                        : isConcluido
                        ? 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:-translate-y-0.5'
                        : isDisponivel
                        ? 'bg-slate-950/40 border-slate-800/60 hover:border-slate-700 hover:-translate-y-0.5'
                        : 'bg-slate-950/20 border-slate-900/50 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                        isConcluido
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : isDisponivel
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : 'bg-slate-800 text-slate-600'
                      }`}>
                        {isConcluido ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                      </div>
                      <span className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {desafio.titulo}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[11px] shrink-0">
                      <span className="text-amber-400 font-bold">+{desafio.recompensaGold}🪙</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-xs text-slate-400 space-y-1.5">
            <p className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Dica Acadêmica:
            </p>
            <p className="leading-relaxed">
              Complete todos os desafios de cada linguagem para desbloquear conquistas do semestre e subir de nível no curso.
            </p>
          </div>
        </div>

        {/* Coluna Direita: Editor & Visualizador (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {desafioSelecionado && (
            <>
              {/* Enunciado do Desafio */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 transition-all duration-300 hover:border-slate-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: trilhaAtual.cor }}
                    />
                    <h3 className="text-sm font-bold text-white">{desafioSelecionado.titulo}</h3>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                      +{desafioSelecionado.recompensaGold} Gold
                    </span>
                    <span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-bold">
                      +{desafioSelecionado.recompensaXP} XP
                    </span>
                  </div>
                </div>

                <div 
                  className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 font-normal [&>code]:bg-slate-800 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:font-mono [&>code]:text-indigo-300"
                  dangerouslySetInnerHTML={{ __html: desafioSelecionado.enunciado }}
                />

                <div>
                  <button
                    onClick={() => setMostrarDica(!mostrarDica)}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{mostrarDica ? 'Ocultar Orientação' : 'Dica de Sintaxe & Resolução'}</span>
                  </button>

                  {mostrarDica && (
                    <div className="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed font-mono">
                      {desafioSelecionado.dicaPedagogica}
                    </div>
                  )}
                </div>
              </div>

              {/* Janela de Código / Editor */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-slate-700">
                <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-slate-400 ml-2 font-medium">
                      {linguagemAtiva === 'html_css' ? 'index.html' :
                       linguagemAtiva === 'javascript' ? 'script.js' :
                       linguagemAtiva === 'php' ? 'index.php' :
                       linguagemAtiva === 'python' ? 'main.py' :
                       'query.sql'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-semibold uppercase">
                    {trilhaAtual.nome}
                  </span>
                </div>

                <div className="flex font-mono text-xs bg-slate-950">
                  <div className="py-3.5 px-3 bg-slate-900/30 text-slate-600 select-none text-right border-r border-slate-800/80 leading-relaxed font-mono">
                    1<br/>2<br/>3<br/>4<br/>5
                  </div>
                  <textarea
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder="// Escreva sua solução aqui..."
                    rows={5}
                    spellCheck={false}
                    className="flex-1 bg-transparent text-emerald-400 p-3.5 focus:outline-none placeholder-slate-700 leading-relaxed resize-none font-mono"
                  />
                </div>

                {/* Barra de Ações do Editor */}
                <div className="bg-slate-900/70 p-3 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setCodigo(desafioSelecionado.codigoPadrao || '')}
                    className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white bg-slate-800/70 hover:bg-slate-800 transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar</span>
                  </button>

                  <div className="flex items-center gap-2.5">
                    {desafioSelecionado.concluido && (
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 font-mono">
                        <CheckCircle className="w-3.5 h-3.5" /> Concluído
                      </span>
                    )}
                    <button
                      onClick={executarCodigo}
                      disabled={executando || !codigo.trim()}
                      className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 transition-all duration-200 hover:scale-105 shadow-md shadow-emerald-500/10 flex items-center gap-2 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>{executando ? 'Testando...' : 'Executar e Validar'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabela de Retorno SQL (Se aplicável) */}
              {resultadoTabelaSQL && (
                <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-4 space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold">
                    <Table className="w-4 h-4" />
                    <span>Resultado da Consulta Relacional SQL</span>
                  </div>
                  <table className="w-full text-left border border-slate-800">
                    <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-2 border-b border-slate-800">ID</th>
                        <th className="p-2 border-b border-slate-800">Nome</th>
                        <th className="p-2 border-b border-slate-800">Curso</th>
                        <th className="p-2 border-b border-slate-800">Nota</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-slate-200">
                      {resultadoTabelaSQL.map(row => (
                        <tr key={row.id}>
                          <td className="p-2 font-bold">{row.id}</td>
                          <td className="p-2">{row.nome}</td>
                          <td className="p-2">{row.curso}</td>
                          <td className="p-2 text-emerald-400 font-bold">{row.nota}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Terminal Simulator Console */}
              <div className={`bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-mono text-xs transition-all duration-300 hover:border-slate-700 ${
                terminalExpandido ? 'fixed inset-6 z-50 flex flex-col shadow-2xl bg-slate-950/95 backdrop-blur-md' : ''
              }`}>
                <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-semibold text-[11px]">CONSOLE DE SAÍDA ACADÊMICO</span>
                  </div>
                  <button
                    onClick={() => setTerminalExpandido(!terminalExpandido)}
                    className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-800 cursor-pointer"
                    title={terminalExpandido ? 'Restaurar tamanho' : 'Maximizar'}
                  >
                    {terminalExpandido ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className={`p-4 space-y-1.5 overflow-y-auto ${terminalExpandido ? 'flex-1' : 'max-h-44'}`}>
                  {linhasConsole.map(linha => (
                    <div 
                      key={linha.id}
                      className={`leading-relaxed ${
                        linha.tipo === 'success' ? 'text-emerald-400 font-semibold' :
                        linha.tipo === 'error' ? 'text-rose-400 font-semibold' :
                        linha.tipo === 'info' ? 'text-cyan-400' : 'text-slate-500'
                      }`}
                    >
                      {linha.texto}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
