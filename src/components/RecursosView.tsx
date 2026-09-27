import React, { useState } from 'react';
import { 
  GraduationCap, 
  ExternalLink, 
  BookOpen, 
  Code2, 
  Database, 
  Globe, 
  Terminal, 
  Server, 
  FolderGit2, 
  Check, 
  Copy,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { RECURSOS_REPOSITORIOS } from '../data/recursosAcademico';
import { RecursoRepositorio } from '../types';

export const RecursosView: React.FC = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('Todas');
  const [linkCopiado, setLinkCopiado] = useState<string | null>(null);

  const categorias = ['Todas', 'Provas & Gabaritos', 'Exercícios Oficiais', 'Documentação Oficial', 'Repositórios GitHub'];

  const recursosFiltrados = categoriaAtiva === 'Todas'
    ? RECURSOS_REPOSITORIOS
    : RECURSOS_REPOSITORIOS.filter(r => r.categoria === categoriaAtiva);

  const copiarLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setLinkCopiado(id);
    setTimeout(() => setLinkCopiado(null), 2000);
  };

  const getIcone = (iconeNome: string) => {
    switch (iconeNome) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-indigo-400" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-emerald-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-amber-400" />;
      case 'Database': return <Database className="w-5 h-5 text-cyan-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-sky-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-rose-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'Server': return <Server className="w-5 h-5 text-purple-400" />;
      default: return <FolderGit2 className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Editorial Header */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Globe className="w-4 h-4" />
              <span>Grimório Acadêmico • Repositórios e Links Oficiais</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Central de Recursos & Repositórios
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Curadoria de links oficiais para o estudante de <b>Análise e Desenvolvimento de Sistemas</b>. 
              Acesse provas e gabaritos oficiais do INEP/ENADE, a lista clássica da comunidade Python Brasil, documentações da Mozilla (MDN) e repositórios abertos no GitHub.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 shrink-0 text-center">
            <span className="text-xs text-slate-400 font-semibold block">Total de Recursos</span>
            <span className="text-2xl font-black text-cyan-400 font-mono mt-0.5 block">{RECURSOS_REPOSITORIOS.length} Links</span>
            <span className="text-[10px] text-emerald-400 font-mono mt-1 block">Verificados & Oficiais</span>
          </div>
        </div>

        {/* Filtro de Categorias */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap gap-2">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoriaAtiva === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Lista de Recursos em Cards Estilizados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recursosFiltrados.map(recurso => (
          <div
            key={recurso.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-lg hover:shadow-cyan-500/5 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                  {getIcone(recurso.icone)}
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-950 text-cyan-400 border border-slate-800">
                  {recurso.tag}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  {recurso.categoria}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                  {recurso.titulo}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {recurso.descricao}
                </p>
              </div>
            </div>

            {/* Ações: Abrir e Copiar Link */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <button
                onClick={() => copiarLink(recurso.url, recurso.id)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {linkCopiado === recurso.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar URL</span>
                  </>
                )}
              </button>

              <a
                href={recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 font-bold text-xs flex items-center gap-1.5 border border-cyan-500/30 transition-all cursor-pointer"
              >
                <span>Acessar Fonte Oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
