import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Terminal,
  Upload,
  Camera,
  FileText,
  Download,
  FolderDown,
  Sparkles
} from 'lucide-react';

interface LandingViewProps {
  onLoginSucesso: (dados: { nome: string; email: string; avatarUrl: string }) => void;
  usuarioAtual: { nome: string; email?: string; avatarUrl?: string };
}

export const LandingView: React.FC<LandingViewProps> = ({ onLoginSucesso, usuarioAtual }) => {
  const [nome, setNome] = useState<string>(usuarioAtual.nome || 'Fernando Santos');
  const [email, setEmail] = useState<string>(usuarioAtual.email || 'fernando.dev@exemplo.com');
  const [senha, setSenha] = useState<string>('••••••••');
  const [avatarPreview, setAvatarPreview] = useState<string>(usuarioAtual.avatarUrl || '');
  const [arrastando, setArrastando] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      alert('Por favor informe o seu nome de usuário.');
      return;
    }
    onLoginSucesso({
      nome: nome.trim(),
      email: email.trim(),
      avatarUrl: avatarPreview
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBaixarPDFDirect = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/DevQuest_Documentacao_Capitulos_01_ao_06.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'DevQuest_Documentacao_Capitulos_01_ao_06.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      window.open('/documento.html', '_blank');
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-[#0d0e12] text-[#e0e2e8] font-mono flex items-center justify-center p-3 sm:p-6 lg:p-10 selection:bg-[#00ffaa] selection:text-[#0d0e12]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at center, rgba(13, 14, 18, 0.82) 0%, rgba(13, 14, 18, 0.95) 100%),
          url('/bg_cyber.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Container Principal do Terminal - Variation 3 */}
      <div className="w-full max-w-[1400px] min-h-[90vh] bg-[#16181d] border-2 border-[rgba(224,226,232,0.12)] flex flex-col justify-between shadow-2xl relative overflow-hidden">
        
        {/* System Bar */}
        <div className="h-10 bg-[rgba(224,226,232,0.06)] border-b border-[rgba(224,226,232,0.12)] px-4 flex items-center justify-between select-none shrink-0">
          <div className="font-['DotGothic16',sans-serif] text-sm sm:text-base text-[#00ffaa] flex items-center gap-2 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#00ffaa] animate-pulse"></span>
            SYSTEM_EXEC: DevQuest_Platform.exe // ADS_2026
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[rgba(224,226,232,0.3)]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#00ffaa] shadow-[0_0_8px_#00ffaa]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[rgba(224,226,232,0.3)]"></div>
          </div>
        </div>

        {/* Content Layout (Main + Sidebar) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_420px] overflow-hidden">
          
          {/* Main View */}
          <div className="p-6 sm:p-10 lg:p-12 overflow-y-auto border-b lg:border-b-0 lg:border-r border-[rgba(224,226,232,0.12)] space-y-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00ffaa] mb-3 block">
                // INITIALIZING MODULE_01
              </span>
              
              <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight uppercase text-white mb-6">
                Acelere sua Jornada no <span className="text-[#00ffaa] underline decoration-[rgba(0,255,170,0.4)] decoration-4 underline-offset-8">DevQuest</span>
              </h1>
              
              <p className="text-base sm:text-lg text-[rgba(224,226,232,0.7)] max-w-2xl leading-relaxed mb-8 font-mono">
                Pratique código real em <strong className="text-white">HTML, CSS, JavaScript, PHP, Python e SQL</strong>. Ecossistema completo de aprendizado prático & gamificado para dominar a programação com simulador oficial ENADE e apoio curricular.
              </p>

              {/* Button Stack */}
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => {
                    onLoginSucesso({
                      nome: nome || 'Fernando Santos',
                      email: email || 'fernando.fernando.santos@uni9.edu.br',
                      avatarUrl: avatarPreview || ''
                    });
                  }}
                  className="px-6 py-3.5 bg-[#00ffaa] text-[#0d0e12] font-bold uppercase text-xs sm:text-sm tracking-wider transition-all duration-200 hover:shadow-[0_0_20px_#00ffaa] hover:-translate-y-0.5 cursor-pointer font-mono"
                >
                  Começar Agora (Entrar no App)_
                </button>
                <button 
                  onClick={() => scrollToSection('objetivos-grid')}
                  className="px-6 py-3.5 border border-[#00ffaa] text-[#00ffaa] bg-transparent font-bold uppercase text-xs sm:text-sm tracking-wider transition-all duration-200 hover:bg-[rgba(0,255,170,0.1)] hover:shadow-[0_0_15px_rgba(0,255,170,0.4)] hover:-translate-y-0.5 cursor-pointer font-mono"
                >
                  Conhecer Objetivos_
                </button>
                <button
                  type="button"
                  onClick={handleBaixarPDFDirect}
                  className="px-5 py-3.5 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400 text-indigo-200 hover:text-white text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                >
                  <Download className="w-4 h-4 text-[#00ffaa]" />
                  <span>BAIXAR PDF OFICIAL (Caps. 01 ao 06)</span>
                </button>
              </div>
            </div>

            {/* Card Grid */}
            <div id="objetivos-grid" className="pt-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[rgba(224,226,232,0.5)] block mb-4">
                // ARQUITETURA DE VALORES & DIRETRIZES
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-[rgba(224,226,232,0.12)] p-5 bg-[rgba(255,255,255,0.02)] hover:border-[#00ffaa] transition-colors group">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#00ffaa] mb-2 block font-bold">
                    [01] Missão
                  </span>
                  <h3 className="font-['Syne',sans-serif] text-lg font-bold text-[#00ffaa] mb-1.5 transition-colors">
                    Foco Prático
                  </h3>
                  <p className="text-xs text-[rgba(224,226,232,0.7)] leading-relaxed">
                    Eliminar a paralisia do aprendizado fornecendo um ambiente interativo onde a teoria de algoritmos e banco de dados se traduz imediatamente em código executado.
                  </p>
                </div>

                <div className="border border-[rgba(224,226,232,0.12)] p-5 bg-[rgba(255,255,255,0.02)] hover:border-[#00ffaa] transition-colors group">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#00ffaa] mb-2 block font-bold">
                    [02] Valores
                  </span>
                  <h3 className="font-['Syne',sans-serif] text-lg font-bold text-[#00ffaa] mb-1.5 transition-colors">
                    Consistência
                  </h3>
                  <p className="text-xs text-[rgba(224,226,232,0.7)] leading-relaxed">
                    Aprendizado diário com sessões de 25 minutos gera fixação neurológica superior a maratonas desordenadas e exaustivas.
                  </p>
                </div>

                <div className="border border-[rgba(224,226,232,0.12)] p-5 bg-[rgba(255,255,255,0.02)] hover:border-[#00ffaa] transition-colors group">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#00ffaa] mb-2 block font-bold">
                    [03] Saúde
                  </span>
                  <h3 className="font-['Syne',sans-serif] text-lg font-bold text-[#00ffaa] mb-1.5 transition-colors">
                    Mental Health
                  </h3>
                  <p className="text-xs text-[rgba(224,226,232,0.7)] leading-relaxed">
                    Técnica Pomodoro integrada com sistema de moedas virtuais para resgatar pausas de hidratação e lazer consciente sem culpa.
                  </p>
                </div>

                <div className="border border-[rgba(224,226,232,0.12)] p-5 bg-[rgba(255,255,255,0.02)] hover:border-[#00ffaa] transition-colors group">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#00ffaa] mb-2 block font-bold">
                    [04] ADS
                  </span>
                  <h3 className="font-['Syne',sans-serif] text-lg font-bold text-[#00ffaa] mb-1.5 transition-colors">
                    Exames Oficiais
                  </h3>
                  <p className="text-xs text-[rgba(224,226,232,0.7)] leading-relaxed">
                    Simulador oficial do ENADE com questões comentadas do INEP e calculadora preditiva de médias A1/A2 desenhada para alunos de tecnologia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar View (Auth Panel + Tech Stack) */}
          <div className="p-6 sm:p-8 bg-[rgba(0,0,0,0.3)] overflow-y-auto flex flex-col justify-between space-y-6">
            
            {/* Auth Panel */}
            <div className="bg-[#000] border border-[#00ffaa] p-6 shadow-[0_0_20px_rgba(0,255,170,0.1)]">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#00ffaa] font-bold block mb-4">
                // ACESSO DO DESENVOLVEDOR
              </span>

              <form onSubmit={handleEntrar} className="space-y-4">
                {/* Avatar upload terminal-style */}
                <div className="flex items-center gap-3 pb-3 border-b border-[rgba(224,226,232,0.1)]">
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
                    className={`w-14 h-14 border border-dashed flex items-center justify-center cursor-pointer overflow-hidden transition-all shrink-0 ${
                      arrastando 
                        ? 'border-[#00ffaa] bg-[rgba(0,255,170,0.15)]' 
                        : 'border-[rgba(224,226,232,0.3)] hover:border-[#00ffaa] bg-[#111]'
                    }`}
                  >
                    {avatarPreview ? (
                      <img 
                        src={avatarPreview} 
                        alt="Avatar" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <Upload className="w-5 h-5 text-[rgba(224,226,232,0.5)]" />
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white uppercase">Foto de Perfil</p>
                    <p className="text-[10px] text-[rgba(224,226,232,0.5)]">Clique ou arraste uma imagem</p>
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
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[rgba(224,226,232,0.6)] mb-1.5 font-bold tracking-wider">
                    USER_NAME
                  </label>
                  <input 
                    id="input-username"
                    type="text" 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite seu nome completo"
                    required
                    className="w-full bg-[#111] border border-[rgba(224,226,232,0.2)] focus:border-[#00ffaa] focus:outline-none p-3 text-sm text-white font-mono transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[rgba(224,226,232,0.6)] mb-1.5 font-bold tracking-wider">
                    SYS_EMAIL
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="estudante.dev@exemplo.com"
                    required
                    className="w-full bg-[#111] border border-[rgba(224,226,232,0.2)] focus:border-[#00ffaa] focus:outline-none p-3 text-sm text-white font-mono transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[rgba(224,226,232,0.6)] mb-1.5 font-bold tracking-wider">
                    ENCRYPT_KEY
                  </label>
                  <input 
                    type="password" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full bg-[#111] border border-[rgba(224,226,232,0.2)] focus:border-[#00ffaa] focus:outline-none p-3 text-sm text-white font-mono transition-colors"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-[#00ffaa] text-[#0d0e12] font-bold uppercase text-xs tracking-wider transition-all duration-200 hover:shadow-[0_0_20px_#00ffaa] hover:-translate-y-0.5 cursor-pointer font-mono mt-2"
                >
                  Exec_Acessar_
                </button>
              </form>
            </div>

            {/* Core Tech Stack */}
            <div className="border border-[rgba(224,226,232,0.12)] p-4 bg-[#111]">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#00ffaa] font-bold block mb-3">
                Core_Tech_Stack
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#00ffaa]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00ffaa] shrink-0 shadow-[0_0_6px_#00ffaa]"></div>
                  <span className="font-semibold">HTML5 Semântico</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00ffaa] shrink-0 shadow-[0_0_6px_#00ffaa]"></div>
                  <span className="font-semibold">CSS3 & Flexbox</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00ffaa] shrink-0 shadow-[0_0_6px_#00ffaa]"></div>
                  <span className="font-semibold">JavaScript ES6+</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00ffaa] shrink-0 shadow-[0_0_6px_#00ffaa]"></div>
                  <span className="font-semibold">PHP Backend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00ffaa] shrink-0 shadow-[0_0_6px_#00ffaa]"></div>
                  <span className="font-semibold">Python Algoritmos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00ffaa] shrink-0 shadow-[0_0_6px_#00ffaa]"></div>
                  <span className="font-semibold">SQL Relacional</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="h-10 px-4 sm:px-6 bg-[rgba(0,0,0,0.5)] border-t border-[rgba(224,226,232,0.12)] text-[10px] text-[rgba(224,226,232,0.5)] flex items-center justify-between font-mono shrink-0">
          <span className="text-[#00ffaa] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffaa]"></span>
            RUNNING: V2.6_ADS
          </span>
          <span className="truncate ml-2">
            © 2026 DEVQUEST // PLATAFORMA ABERTA DE FORMAÇÃO
          </span>
        </footer>

      </div>
    </div>
  );
};
