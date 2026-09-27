import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Flame, 
  ShieldCheck, 
  Upload, 
  Camera, 
  User, 
  Lock, 
  Mail, 
  Compass, 
  Target, 
  HeartHandshake, 
  Zap,
  Globe2,
  Terminal,
  Cpu,
  Award,
  Calculator,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingViewProps {
  onLoginSucesso: (dados: { nome: string; email: string; avatarUrl: string }) => void;
  usuarioAtual: { nome: string; email?: string; avatarUrl?: string };
}

export const LandingView: React.FC<LandingViewProps> = ({ onLoginSucesso, usuarioAtual }) => {
  const [modoAuth, setModoAuth] = useState<boolean>(false);
  const [nome, setNome] = useState<string>(usuarioAtual.nome || 'Fernando Santos');
  const [email, setEmail] = useState<string>(usuarioAtual.email || 'estudante.dev@exemplo.com');
  const [senha, setSenha] = useState<string>('••••••••');
  const [avatarPreview, setAvatarPreview] = useState<string>(usuarioAtual.avatarUrl || '');
  const [arrastando, setArrastando] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const avataresPredefinidos = [
    { id: 'dev1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', label: 'Avatar 1' },
    { id: 'dev2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', label: 'Avatar 2' },
    { id: 'dev3', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', label: 'Avatar 3' },
    { id: 'dev4', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', label: 'Avatar 4' },
  ];

  const handleArquivoSelecionado = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecione um arquivo de imagem válido (PNG, JPG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setAvatarPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEntrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      alert('Por favor informe o seu nome.');
      return;
    }
    onLoginSucesso({
      nome: nome.trim(),
      email: email.trim(),
      avatarUrl: avatarPreview
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header Superior Limpo */}
      <header className="border-b border-slate-100 sticky top-0 z-30 bg-white/95 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/25">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              {/* Nome da plataforma em movimento suave */}
              <motion.div 
                className="text-2xl font-black tracking-tight flex items-center gap-1.5"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #4f46e5, #9333ea, #2563eb, #4f46e5)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                DevQuest
                <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 -webkit-text-fill-color-initial">
                  Platform
                </span>
              </motion.div>
              <p className="text-xs text-slate-500 font-medium">Plataforma Aberta de Formação em Programação</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setModoAuth(true);
                setTimeout(() => {
                  document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-indigo-600 hover:bg-indigo-50 border border-indigo-200/80 transition-all cursor-pointer"
            >
              Fazer Login
            </button>
            <button
              onClick={() => {
                setModoAuth(true);
                setTimeout(() => {
                  document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              Começar Agora
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section com Fundo Branco & Animações */}
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            Ecossistema Completo de Aprendizado Prático & Gamificado
          </motion.div>

          {/* Logotipo DevQuest em movimento destacado */}
          <div className="relative inline-block mb-6">
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-slate-900">Acelere sua Jornada no </span>
              <motion.span
                className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent font-extrabold"
                animate={{
                  filter: ['drop-shadow(0 0 0px rgba(79,70,229,0))', 'drop-shadow(0 4px 20px rgba(99,102,241,0.35))', 'drop-shadow(0 0 0px rgba(79,70,229,0))']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                DevQuest
              </motion.span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Pratique código real em <strong>HTML, CSS, JavaScript, PHP, Python e SQL</strong>. 
            Mantenha seu foco com técnica Pomodoro, suba de nível com recompensas de estudo e domine a programação sem burocracia.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              id="btn-comecar-agora"
              onClick={() => {
                setModoAuth(true);
                setTimeout(() => {
                  document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-base hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Clique aqui para começar</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#valores-objetivos"
              className="px-6 py-4 rounded-2xl border border-slate-200 text-slate-700 font-bold text-base hover:bg-slate-50 transition-all"
            >
              Conhecer Objetivos & Valores
            </a>
          </motion.div>
        </section>

        {/* Seção de Valores e Objetivos */}
        <section id="valores-objetivos" className="py-16 bg-slate-50 border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Propósito da Plataforma</h2>
              <h3 className="text-3xl font-extrabold text-slate-900">Missão, Objetivos & Valores</h3>
              <p className="text-sm text-slate-500 mt-2">Construído para qualquer pessoa que deseja aprender e se aprofundar em tecnologia com autonomia e disciplina.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Objetivo Principal */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-5 font-bold">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Nosso Objetivo</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Eliminar a paralisia do aprendizado fornecendo um ambiente prático, interativo e direto ao ponto, onde a teoria de algoritmos, web e bancos de dados se traduz imediatamente em código executado.
                </p>
                <ul className="mt-4 space-y-2 text-xs font-medium text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Prática em 5 pilares essenciais de TI
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Feedback pedagógico em tempo real
                  </li>
                </ul>
              </div>

              {/* Card 2: Valores Centrais */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-5 font-bold">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Valores Fundamentais</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Defendemos a <strong>consistência diária sobre o esforço esgotante</strong>. Aprender 25 minutos por dia através de repetição e método gera resultados superiores a maratonas desordenadas.
                </p>
                <ul className="mt-4 space-y-2 text-xs font-medium text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> Autonomia total do estudante
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> Transparência e código limpo
                  </li>
                </ul>
              </div>

              {/* Card 3: Equilíbrio e Bem-Estar */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5 font-bold">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Saúde Mental & Gamificação</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  O tempo de descanso é parte da engenharia. Nosso sistema de moedas de ouro permite resgatar pausas e pausas de lazer saudáveis como café, descanso e caminhada.
                </p>
                <ul className="mt-4 space-y-2 text-xs font-medium text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" /> Pomodoro de 25 min com pausas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" /> Recompensas por foco real
                  </li>
                </ul>
              </div>
            </div>

            {/* Tríade de Inovações Acadêmicas para ADS */}
            <div className="mt-12 pt-12 border-t border-slate-200/80">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Diferenciais Curriculares</span>
                <h4 className="text-2xl font-extrabold text-slate-900 mt-1">Ferramentas Criadas para o Aluno de ADS</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-purple-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                      <Award className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-slate-950 text-base">Simulador Oficial ENADE</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Treine questões reais de exames aplicados pelo INEP com justificativa comentada passo a passo.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono font-bold text-purple-600">
                    5 Questões Oficiais com Barema
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-slate-950 text-base">Boletim & Calculadora A1/A2</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Cadastre suas disciplinas do semestre, controle faltas e saiba quanto precisa na A2 para não ir para exame.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono font-bold text-emerald-600">
                    Cálculo Inteligente de Médias
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-cyan-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-3">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-slate-950 text-base">Grimório de Repositórios</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Acesso rápido a provas do INEP, lista da comunidade Python Brasil, documentação MDN e GitHub.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono font-bold text-cyan-600">
                    Links Diretos & Fontes Oficiais
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pilares Tecnológicos */}
        <section className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 text-center mb-8">Tecnologias Praticadas no DevQuest</h4>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> HTML5 Semântico
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> CSS3 & Flexbox
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> JavaScript ES6+
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> PHP Backend
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Python Algoritmos
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> SQL Relacional
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Login Universal & Foto */}
        <section id="auth-section" className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-indigo-900/30 via-slate-900/80 to-slate-950 pointer-events-none" />
          
          <div className="max-w-md mx-auto px-6 relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
                <User className="w-3.5 h-3.5" /> Acesso do Desenvolvedor
              </div>
              <h3 className="text-2xl font-bold text-white">Entre no seu Painel DevQuest</h3>
              <p className="text-xs text-slate-400 mt-1">Personalize com seu nome e foto para qualquer desenvolvedor ou estudante utilizar.</p>
            </div>

            <form onSubmit={handleEntrar} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 backdrop-blur-md">
              
              {/* Foto de Perfil / Upload */}
              <div className="text-center">
                <label className="block text-xs font-semibold text-slate-300 mb-2">Sua Foto de Perfil</label>
                
                <div className="flex flex-col items-center">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setArrastando(true); }}
                    onDragLeave={() => setArrastando(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setArrastando(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleArquivoSelecionado(e.dataTransfer.files[0]);
                      }
                    }}
                    className={`relative w-24 h-24 rounded-2xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center overflow-hidden transition-all group ${
                      arrastando 
                        ? 'border-indigo-400 bg-indigo-500/20' 
                        : 'border-slate-700 hover:border-indigo-500 bg-slate-900/60'
                    }`}
                  >
                    {avatarPreview ? (
                      <>
                        <img 
                          src={avatarPreview} 
                          alt="Avatar selecionado" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[10px] text-white transition-opacity font-medium">
                          <Camera className="w-4 h-4 mb-1" />
                          Trocar Foto
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-2 text-center text-slate-400 group-hover:text-indigo-300">
                        <Upload className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-medium leading-tight">Enviar foto ou arrastar</span>
                      </div>
                    )}
                  </div>
                  
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleArquivoSelecionado(e.target.files[0]);
                      }
                    }}
                  />

                  {/* Sugestões rápidas de avatares */}
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-[10px] text-slate-400">ou escolha:</span>
                    {avataresPredefinidos.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setAvatarPreview(av.url)}
                        className={`w-7 h-7 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          avatarPreview === av.url ? 'border-indigo-500 scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={av.url} alt={av.label} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nome do Desenvolvedor */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Seu Nome / Usuário</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Fernando Santos"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Email / Login */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">E-mail de Acesso</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Senha</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Botão de Entrar */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Acessar Painel de Estudos</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-500">
                Seus dados e progresso são salvos localmente no seu próprio navegador.
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* Footer Simples */}
      <footer className="border-t border-slate-100 bg-white py-8 text-center text-xs text-slate-400">
        <p>© 2026 DevQuest • Plataforma Aberta de Formação & Produtividade em Programação</p>
      </footer>
    </div>
  );
};
