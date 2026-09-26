import React, { useState } from 'react';
import { 
  GitBranch, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  FolderGit2, 
  Cloud, 
  Monitor, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  FileText, 
  Code2, 
  HelpCircle,
  Share2,
  GraduationCap,
  Database,
  Download,
  Play,
  CheckCircle2
} from 'lucide-react';
import JSZip from 'jszip';
import { ARQUIVOS_ACADEMICO } from '../data/arquivosAcademico';
import { EstadoJogo } from '../types';

interface GithubHubViewProps {
  estado: EstadoJogo;
}

export const GithubHubView: React.FC<GithubHubViewProps> = ({ estado }) => {
  const [copiadoIndex, setCopiadoIndex] = useState<number | null>(null);
  const [copiadoGeral, setCopiadoGeral] = useState<string | null>(null);
  const [secaoAtiva, setSecaoAtiva] = useState<'comandos' | 'arquitetura' | 'readme' | 'academico'>('comandos');
  const [baixandoZip, setBaixandoZip] = useState<boolean>(false);
  const [downloadConcluido, setDownloadConcluido] = useState<boolean>(false);

  const repoUrl = 'https://github.com/Santosfer1980/DevQuest';
  const cloneUrl = 'https://github.com/Santosfer1980/DevQuest.git';

  const baixarPastaZip = () => {
    try {
      setBaixandoZip(true);
      const a = document.createElement('a');
      a.href = '/devquest_academico.zip';
      a.download = 'devquest_academico.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloadConcluido(true);
      setTimeout(() => {
        setBaixandoZip(false);
        setDownloadConcluido(false);
      }, 2000);
    } catch (e) {
      console.error('Erro ao baixar:', e);
      setBaixandoZip(false);
    }
  };

  const copiarTexto = (texto: string, id: string | number) => {
    navigator.clipboard.writeText(texto);
    if (typeof id === 'number') {
      setCopiadoIndex(id);
      setTimeout(() => setCopiadoIndex(null), 2000);
    } else {
      setCopiadoGeral(id);
      setTimeout(() => setCopiadoGeral(null), 2000);
    }
  };

  const comandosGit = [
    {
      titulo: '1. Baixar o projeto pela 1ª vez no PC',
      descricao: 'Cria a pasta DevQuest no seu computador com todo o código do repositório.',
      comando: `git clone ${cloneUrl}`,
      badge: 'Feito 1 vez'
    },
    {
      titulo: '2. Entrar na pasta do projeto',
      descricao: 'Navega o terminal para dentro da pasta clonada.',
      comando: 'cd DevQuest',
      badge: 'Navegação'
    },
    {
      titulo: '3. Puxar as atualizações da nuvem (Sincronizar)',
      descricao: 'Baixa para o seu computador tudo o que foi atualizado no AI Studio ou no GitHub.',
      comando: 'git pull',
      badge: 'Sincronizar'
    },
    {
      titulo: '4. Instalar as bibliotecas necessárias',
      descricao: 'Instala o React, Tailwind, ícones e ferramentas do projeto.',
      comando: 'npm install',
      badge: 'Dependências'
    },
    {
      titulo: '5. Iniciar o DevQuest localmente',
      descricao: 'Liga o servidor no seu computador para abrir em http://localhost:3000.',
      comando: 'npm run dev',
      badge: 'Rodar no PC'
    },
    {
      titulo: '6. Salvar e enviar suas alterações para o GitHub',
      descricao: 'Adiciona seus arquivos editados, grava um commit e sobe para o repositório na nuvem.',
      comando: 'git add .\ngit commit -m "feat: minhas melhorias no DevQuest"\ngit push origin main',
      badge: 'Enviar ao Git'
    }
  ];

  const conteudoReadme = `# 🚀 DevQuest Platform

> Plataforma Gamificada de Aprendizado Prático em Tecnologia & Análise e Desenvolvimento de Sistemas (ADS)

Repositório Oficial: https://github.com/Santosfer1980/DevQuest

## 🌟 Pilares Curriculares
- HTML & CSS (Estrutura e Estilo)
- JavaScript (Interatividade e Algoritmos)
- PHP (Backend e POO)
- Python (Lógica Computacional e Automação)
- SQL (Banco de Dados Relacional)

## 💻 Como Rodar na sua Máquina
1. git clone https://github.com/Santosfer1980/DevQuest.git
2. cd DevQuest
3. npm install
4. npm run dev
5. Acesse http://localhost:3000 no navegador

## 🔄 Como Sincronizar com as novidades
git pull`;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Banner Principal de Conexão com GitHub */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/70 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Sincronizado com GitHub (Branch main)
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20">
                Santosfer1980 / DevQuest
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <FolderGit2 className="w-8 h-8 text-indigo-400 shrink-0" />
              Repositório & Terminal Git
            </h1>

            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              O código do DevQuest está versionado no seu GitHub oficial. Você pode rodar a aplicação localmente no seu computador ou sincronizar alterações em tempo real entre o Google AI Studio e o seu PC.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md hover:shadow-indigo-600/30 cursor-pointer"
            >
              <span>Ver no GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => copiarTexto(cloneUrl, 'clone-btn')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all cursor-pointer"
            >
              {copiadoGeral === 'clone-btn' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">URL Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copiar URL do Clone</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Input visual com URL do repositório */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 flex items-center justify-between font-mono text-xs text-slate-300 overflow-x-auto">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="text-slate-500">origem:</span>
              <span className="text-white font-bold">{repoUrl}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 ml-2 shrink-0">
              Ativo
            </span>
          </div>
        </div>
      </div>

      {/* Navegação de Abas do Hub */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setSecaoAtiva('comandos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            secaoAtiva === 'comandos'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Comandos Rápidos do Terminal</span>
        </button>

        <button
          onClick={() => setSecaoAtiva('arquitetura')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            secaoAtiva === 'arquitetura'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Como Funciona o Ciclo de Sincronização</span>
        </button>

        <button
          onClick={() => setSecaoAtiva('readme')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            secaoAtiva === 'readme'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Documentação (README.md)</span>
        </button>

        <button
          onClick={() => setSecaoAtiva('academico')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            secaoAtiva === 'academico'
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span>Versão Faculdade (PHP, Python, SQL)</span>
        </button>
      </div>

      {/* SEÇÃO 1: Comandos Rápidos */}
      {secaoAtiva === 'comandos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              Guia Prático de Terminal (Copie e Cole com 1 Clique)
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              Execute estes comandos no seu PowerShell ou Prompt
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comandosGit.map((item, index) => (
              <div 
                key={index}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {item.titulo}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/80">
                  <div className="relative bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs text-emerald-400 flex items-center justify-between group-hover:border-slate-700">
                    <pre className="whitespace-pre-wrap select-all overflow-x-auto text-[11px] leading-relaxed">
                      {item.comando}
                    </pre>
                    <button
                      onClick={() => copiarTexto(item.comando, index)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                      title="Copiar comando"
                    >
                      {copiadoIndex === index ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEÇÃO 2: Como Funciona a Sincronização */}
      {secaoAtiva === 'arquitetura' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-indigo-400" />
              Onde o código está e como os dados viajam:
            </h3>

            {/* Diagrama Visual */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              {/* Card 1: Google AI Studio */}
              <div className="bg-slate-950 border border-indigo-500/30 rounded-2xl p-5 text-center space-y-3 relative">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Google AI Studio</h4>
                  <p className="text-xs text-indigo-300 font-mono mt-0.5">Ambiente Cloud</p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Onde nós conversamos e implementamos os novos recursos do DevQuest.
                </p>
              </div>

              {/* Card 2: GitHub Repository */}
              <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 text-center space-y-3 relative">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                  <FolderGit2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">GitHub (Nuvem)</h4>
                  <p className="text-xs text-emerald-300 font-mono mt-0.5">Santosfer1980 / DevQuest</p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Repositório central seguro. O AI Studio atualiza aqui automaticamente a cada entrega!
                </p>
              </div>

              {/* Card 3: Seu Computador Local */}
              <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 text-center space-y-3 relative">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mx-auto">
                  <Monitor className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Seu Computador (Local)</h4>
                  <p className="text-xs text-purple-300 font-mono mt-0.5">localhost:3000</p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Onde você roda no seu terminal com Node.js e visualiza o sistema offline.
                </p>
              </div>
            </div>

            {/* Dica de Ouro */}
            <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 flex items-start gap-3.5">
              <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-white">Regra de Ouro do Desenvolvedor:</h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Quando nós fizermos melhorias aqui no DevQuest, o GitHub já recebe as novidades. No seu computador, basta digitar <code className="text-amber-300 font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded">git pull</code> para puxar tudo o que mudou na hora!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEÇÃO 3: Documentação README */}
      {secaoAtiva === 'readme' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              Arquivo README.md Oficial do Repositório
            </h3>
            <button
              onClick={() => copiarTexto(conteudoReadme, 'readme-copy')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              {copiadoGeral === 'readme-copy' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar Markdown</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
            {conteudoReadme}
          </div>
        </div>
      )}

      {/* SEÇÃO 4: Versão Faculdade (PHP, Python, SQL, JS, HTML, CSS) */}
      {secaoAtiva === 'academico' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Pasta: /academico (Pronta para o XAMPP)
                </span>
                <h3 className="text-lg font-bold text-white">
                  Versão Oficial para Entrega Acadêmica e Professores
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Atende 100% aos requisitos de linguagens puras da grade de Análise e Desenvolvimento de Sistemas (ADS).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={baixarPastaZip}
                  disabled={baixandoZip}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-lg hover:shadow-emerald-600/30 cursor-pointer disabled:opacity-50"
                >
                  {baixandoZip ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Empacotando ZIP...</span>
                    </>
                  ) : downloadConcluido ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Download Concluído!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Baixar Pasta Acadêmico (.ZIP)</span>
                    </>
                  )}
                </button>

                <span className="text-xs bg-slate-800 text-slate-300 px-3 py-2 rounded-xl border border-slate-700 font-mono">
                  C:\xampp\htdocs\devquest_academico
                </span>
              </div>
            </div>

            {/* Grid dos 7 Arquivos Gerados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
                    <Database className="w-4 h-4 text-amber-400" />
                    <span>banco.sql</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase">SQL</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Criação do banco de dados <code className="text-amber-300 font-mono">devquest_db</code>, tabelas relacionais com Foreign Keys (<code className="text-slate-300">usuarios</code>, <code className="text-slate-300">desafios</code>, <code className="text-slate-300">tentativas</code>) e inserts de carga inicial.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    <span>conexao.php</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase">PHP / PDO</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Conexão segura orientada a objetos usando PHP Data Objects (PDO) com tratamento de exceções (try/catch) para o MySQL do XAMPP.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    <span>api_desafios.php</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase">PHP Backend</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  API que busca os desafios no banco (GET) e valida com Prepared Statements a submissão de código dos alunos, gravando o XP (POST).
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span>validador_codigo.py</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">Python</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Módulo de suporte acadêmico com análise de sintaxe de código via árvore sintática (AST) e relatório estatístico de desempenho dos alunos em JSON.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
                    <FileText className="w-4 h-4 text-orange-400" />
                    <span>index.html</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold uppercase">HTML5 Puro</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interface semântica completa com cabeçalho, barra lateral, botões de linguagens, editor de código e painel de Pomodoro.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>style.css</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase">CSS3 Puro</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Estilização sem dependências externas, com tema escuro, variáveis CSS (:root), layout responsivo e flexbox.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
                    <Code2 className="w-4 h-4 text-yellow-400" />
                    <span>app.js</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-bold uppercase">JavaScript Puro</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Gerenciamento do DOM em Vanilla JS, requisições AJAX/Fetch para o PHP, temporizador de Pomodoro em tempo real e atualização de placar de XP.
                </p>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 space-y-2 md:col-span-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-300 font-bold">
                    <Play className="w-4 h-4 text-emerald-400" />
                    <span>setup_instalador.py & instalar.bat (Instaladores Automáticos)</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase">Novo • 1 Clique</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Script automatizador em Python que você roda direto no seu computador. Ele verifica a versão do Python, instala dependências via pip, detecta automaticamente a pasta do XAMPP (<code className="text-amber-300 font-mono">C:\xampp\htdocs</code>) e copia todos os arquivos da faculdade para lá sem nenhum esforço manual!
                </p>
              </div>
            </div>

            {/* Como Rodar no XAMPP */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Como rodar e instalar no seu computador em 2 passos:
                </h4>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Via Terminal ou 2 Cliques
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px]">1</span>
                    <span>Puxar para a sua máquina</span>
                  </div>
                  <p className="text-xs text-slate-400">Abra o terminal na pasta do DevQuest e rode:</p>
                  <pre className="bg-slate-950 p-2 rounded text-[11px] font-mono text-emerald-400 select-all">git pull</pre>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">2</span>
                    <span>Instalar Automaticamente</span>
                  </div>
                  <p className="text-xs text-slate-400">Entre na pasta academico e execute:</p>
                  <pre className="bg-slate-950 p-2 rounded text-[11px] font-mono text-emerald-400 select-all">cd academico&#10;python setup_instalador.py</pre>
                  <p className="text-[10px] text-slate-500">(Ou dê 2 cliques no arquivo <strong>instalar.bat</strong> no Windows!)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
