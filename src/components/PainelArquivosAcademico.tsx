import React, { useState } from 'react';
import { 
  Folder, 
  FolderOpen, 
  FileCode, 
  Download, 
  Copy, 
  Check, 
  X, 
  ChevronRight, 
  ChevronDown,
  Sparkles,
  Package,
  Terminal,
  FileText
} from 'lucide-react';
import JSZip from 'jszip';
import { ARQUIVOS_ACADEMICO } from '../data/arquivosAcademico';

interface PainelArquivosAcademicoProps {
  aberto: boolean;
  onFechar: () => void;
}

export const PainelArquivosAcademico: React.FC<PainelArquivosAcademicoProps> = ({
  aberto,
  onFechar
}) => {
  const [arquivoSelecionado, setArquivoSelecionado] = useState<string>('banco.sql');
  const [copiado, setCopiado] = useState<boolean>(false);
  const [baixandoZip, setBaixandoZip] = useState<boolean>(false);
  const [pastaAberta, setPastaAberta] = useState<boolean>(true);

  if (!aberto) return null;

  const conteudoAtual = ARQUIVOS_ACADEMICO[arquivoSelecionado as keyof typeof ARQUIVOS_ACADEMICO] || '';

  const baixarArquivoIndividual = (nome: string, conteudo: string) => {
    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nome;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const baixarTudoZip = () => {
    try {
      setBaixandoZip(true);
      const a = document.createElement('a');
      a.href = '/devquest_academico.zip';
      a.download = 'devquest_academico.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => setBaixandoZip(false), 1000);
    } catch (e) {
      console.error(e);
      setBaixandoZip(false);
    }
  };

  const copiarConteudo = () => {
    navigator.clipboard.writeText(conteudoAtual);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const getIconeLinguagem = (nome: string) => {
    if (nome.endsWith('.sql')) return <span className="text-amber-400 font-bold text-[10px]">SQL</span>;
    if (nome.endsWith('.php')) return <span className="text-indigo-400 font-bold text-[10px]">PHP</span>;
    if (nome.endsWith('.py')) return <span className="text-emerald-400 font-bold text-[10px]">PY</span>;
    if (nome.endsWith('.js')) return <span className="text-yellow-400 font-bold text-[10px]">JS</span>;
    if (nome.endsWith('.html')) return <span className="text-orange-400 font-bold text-[10px]">HTML</span>;
    if (nome.endsWith('.css')) return <span className="text-blue-400 font-bold text-[10px]">CSS</span>;
    if (nome.endsWith('.bat')) return <span className="text-rose-400 font-bold text-[10px]">BAT</span>;
    return <FileText className="w-3.5 h-3.5 text-slate-400" />;
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[540px] md:w-[620px] bg-slate-950/95 backdrop-blur-xl border-l border-emerald-500/30 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Cabeçalho do Painel Lateral */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Pasta do Projeto:</span>
              <span className="font-mono text-emerald-400">/academico</span>
            </h3>
            <p className="text-xs text-slate-400">Baixe arquivos individuais ou a pasta completa em ZIP</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={baixarTudoZip}
            disabled={baixandoZip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 cursor-pointer disabled:opacity-50"
            title="Baixar todos os arquivos compactados em um arquivo .zip"
          >
            {baixandoZip ? (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">Baixar Tudo (.ZIP)</span>
          </button>

          <button
            onClick={onFechar}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            title="Fechar painel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Corpo dividido: Árvore à esquerda / Pré-visualização à direita */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Árvore de Diretórios Lateral */}
        <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-slate-800/80 bg-slate-900/30 p-3 overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2 flex items-center justify-between">
            <span>Arquivos do Projeto</span>
            <span className="text-emerald-400 font-mono text-[10px]">{Object.keys(ARQUIVOS_ACADEMICO).length} arquivos</span>
          </div>

          {/* Pasta raiz "academico" */}
          <div className="space-y-1">
            <button
              onClick={() => setPastaAberta(!pastaAberta)}
              className="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-800/60 rounded-lg transition-all text-left cursor-pointer"
            >
              {pastaAberta ? <ChevronDown className="w-3.5 h-3.5 text-emerald-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              {pastaAberta ? <FolderOpen className="w-4 h-4 text-emerald-400" /> : <Folder className="w-4 h-4 text-emerald-400" />}
              <span>academico/</span>
            </button>

            {pastaAberta && (
              <div className="pl-4 space-y-0.5 border-l border-slate-800 ml-3">
                {Object.keys(ARQUIVOS_ACADEMICO).map((nome) => {
                  const isSelected = arquivoSelecionado === nome;
                  return (
                    <div
                      key={nome}
                      className={`group flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                      onClick={() => setArquivoSelecionado(nome)}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        {getIconeLinguagem(nome)}
                        <span className="truncate">{nome}</span>
                      </div>

                      {/* Botão de download direto do arquivo */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          baixarArquivoIndividual(nome, ARQUIVOS_ACADEMICO[nome as keyof typeof ARQUIVOS_ACADEMICO]);
                        }}
                        className="opacity-0 group-hover:opacity-100 hover:text-emerald-400 p-1 rounded transition-opacity"
                        title={`Baixar ${nome}`}
                      >
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 px-2 space-y-1">
            <span className="text-[10px] text-slate-500 block">Dica para o XAMPP:</span>
            <span className="text-[11px] text-slate-400 font-mono block">C:\xampp\htdocs\devquest_academico</span>
          </div>
        </div>

        {/* Pré-visualização do Arquivo Selecionado */}
        <div className="flex-1 flex flex-col bg-slate-950/80 overflow-hidden">
          {/* Barra do Arquivo Atual */}
          <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
            <div className="flex items-center gap-2 font-mono text-xs text-white">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-emerald-300">{arquivoSelecionado}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copiarConteudo}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-all cursor-pointer"
                title="Copiar código para a área de transferência"
              >
                {copiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiado ? 'Copiado!' : 'Copiar'}</span>
              </button>

              <button
                onClick={() => baixarArquivoIndividual(arquivoSelecionado, conteudoAtual)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer"
                title={`Baixar ${arquivoSelecionado}`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar</span>
              </button>
            </div>
          </div>

          {/* Código do Arquivo */}
          <div className="flex-1 p-4 overflow-auto font-mono text-xs text-slate-300 bg-slate-950 select-all leading-relaxed whitespace-pre">
            {conteudoAtual}
          </div>
        </div>
      </div>
    </div>
  );
};
