import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldAlert, 
  Terminal as TerminalIcon, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  Flame, 
  HelpCircle, 
  Zap, 
  Sparkles, 
  RefreshCw,
  Eye,
  ShieldCheck,
  Cpu,
  Sword,
  Shield,
  Layers,
  FileCode,
  KeyRound,
  Play,
  RotateCcw,
  FileText,
  Printer,
  Award,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EstadoJogo } from '../types';

export interface DesafioHacking {
  id: string;
  categoria: 'Red Team (Ataque)' | 'Blue Team (Defesa)';
  topicoOwasp: string;
  dificuldade: 'Iniciante' | 'Intermediário' | 'Avançado';
  titulo: string;
  descricao: string;
  cenarioVulneravel: string;
  comandoExemplo: string;
  respostaEsperada: string[];
  solucaoDefesa: string;
  explicacaoDidatica: string;
  dicas: string[];
  xpBase: number;
  goldBase: number;
}

export const DESAFIOS_HACKING: DesafioHacking[] = [
  {
    id: 'sqli_01',
    categoria: 'Red Team (Ataque)',
    topicoOwasp: 'A03:2021 - Injection (SQLi)',
    dificuldade: 'Iniciante',
    titulo: 'SQL Injection: Bypass de Autenticação (Login)',
    descricao: 'A tela de login do portal de notas concatena diretamente as variáveis $email e $senha na query SQL sem sanitização. Use uma injeção booleana clássica para fechar a aspa e forçar a query a retornar TRUE, autenticando sem saber a senha.',
    cenarioVulneravel: `SELECT * FROM usuarios WHERE email = '$email' AND senha = '$senha';`,
    comandoExemplo: `inject ' OR '1'='1`,
    respostaEsperada: [
      "' OR '1'='1", 
      "admin' OR '1'='1", 
      "' or '1'='1", 
      "' OR 1=1 --", 
      "' or 1=1 --",
      "inject ' OR '1'='1",
      "inject ' or '1'='1"
    ],
    solucaoDefesa: `// Defesa Blue Team com PDO Prepared Statements (PHP 8):\n$stmt = $pdo->prepare('SELECT id, nome, hash_senha FROM usuarios WHERE email = :email');\n$stmt->execute(['email' => $email]);\n$user = $stmt->fetch();\nif ($user && password_verify($senha, $user['hash_senha'])) { /* Logado com Segurança */ }`,
    explicacaoDidatica: 'Ao inserir "\' OR \'1\'=\'1", a expressão "AND senha = ..." é ignorada e a cláusula OR torna a condição global sempre verdadeira, retornando o primeiro registro da tabela (geralmente o administrador).',
    dicas: [
      "Dica 1: Pense em fechar a aspa simples (') que delimita o valor na string da query.",
      "Dica 2: Adicione uma cláusula 'OR' acompanhada de uma igualdade sempre verdadeira (ex: '1'='1').",
      "Dica 3: Digite exatamente: inject ' OR '1'='1"
    ],
    xpBase: 250,
    goldBase: 50
  },
  {
    id: 'xss_01',
    categoria: 'Red Team (Ataque)',
    topicoOwasp: 'A03:2021 - Cross-Site Scripting (Reflected XSS)',
    dificuldade: 'Iniciante',
    titulo: 'Reflected XSS: Execução de Script no Navegador',
    descricao: 'O campo de busca de artigos da biblioteca imprime o termo pesquisado na página com innerHTML sem codificação HTML. Injete uma tag <script> com alert() para provar que códigos arbitrários podem ser executados no cliente.',
    cenarioVulneravel: `document.getElementById('resultado').innerHTML = "Buscando por: " + termoBuscado;`,
    comandoExemplo: `inject <script>alert('pwned')</script>`,
    respostaEsperada: [
      "<script>alert(1)</script>",
      "<script>alert('xss')</script>",
      "<script>alert('pwned')</script>",
      "<script>alert()</script>",
      "<img src=x onerror=alert(1)>",
      "inject <script>alert('pwned')</script>",
      "inject <script>alert(1)</script>"
    ],
    solucaoDefesa: `// Defesa Blue Team:\n// 1. No DOM puro: usar textContent em vez de innerHTML\nelemento.textContent = "Buscando por: " + termoBuscado;\n// 2. No React 19: o escape é nativo em tags JSX: <span>{termoBuscado}</span>\n// 3. No PHP: htmlspecialchars($termo, ENT_QUOTES, 'UTF-8');`,
    explicacaoDidatica: 'Quando dados do usuário são renderizados como HTML puro, o motor do navegador executa o script injetado, permitindo roubo de cookies de sessão (document.cookie) e sequestro de conta (Session Hijacking).',
    dicas: [
      "Dica 1: O navegador interpreta tags se não forem convertidas em entidades HTML (&lt; &gt;).",
      "Dica 2: Crie uma tag <script> chamando a função alert().",
      "Dica 3: Digite exatamente: inject <script>alert('pwned')</script>"
    ],
    xpBase: 200,
    goldBase: 40
  },
  {
    id: 'crypto_01',
    categoria: 'Red Team (Ataque)',
    topicoOwasp: 'A02:2021 - Cryptographic Failures',
    dificuldade: 'Intermediário',
    titulo: 'Quebra de Senha em Texto Claro / Hash Fraco',
    descricao: 'O banco de dados acadêmico legado armazenava as senhas dos docentes usando o algoritmo MD5 obsoleto sem salt. O hash capturado de um coordenador é "5f4dcc3b5aa765d61d8327deb882cf99". Descubra a senha correspondente.',
    cenarioVulneravel: `// Armazenamento inseguro:\n$hash = md5($senhaDigitada); // VULNERÁVEL A RAINBOW TABLES!`,
    comandoExemplo: `inject password`,
    respostaEsperada: [
      "password", 
      "senha: password",
      "inject password"
    ],
    solucaoDefesa: `// Defesa Blue Team com Bcrypt / Argon2ID no PHP 8:\n$hashSeguro = password_hash($senha, PASSWORD_ARGON2ID);\n// Verificação segura em tempo constante:\npassword_verify($senhaDigitada, $hashSeguro);`,
    explicacaoDidatica: 'Hashes rápidos e sem salt como MD5 e SHA1 são facilmente quebrados em segundos através de tabelas pré-computadas (Rainbow Tables). Padrões modernos como Bcrypt e Argon2ID utilizam custo computacional ajustável e salts aleatórios.',
    dicas: [
      "Dica 1: Este é o hash MD5 da palavra em inglês mais usada no mundo para 'senha'.",
      "Dica 2: A palavra tem 8 letras e começa com 'pass'.",
      "Dica 3: Digite: inject password"
    ],
    xpBase: 250,
    goldBase: 50
  },
  {
    id: 'blue_sqli',
    categoria: 'Blue Team (Defesa)',
    topicoOwasp: 'A03:2021 - Prepared Statements & Parameter Binding',
    dificuldade: 'Intermediário',
    titulo: 'Defesa Blue Team: Parametrização com PDO em PHP',
    descricao: 'Como engenheiro de segurança defensiva, você deve refatorar um script vulnerável de consulta de notas. Identifique o método crucial da classe PDO que separa o plano de compilação da query dos dados do usuário.',
    cenarioVulneravel: `$query = "SELECT * FROM notas WHERE ra = " . $_GET['ra'];\n$conn->query($query); // VULNERÁVEL!`,
    comandoExemplo: `prepare`,
    respostaEsperada: [
      "prepare", 
      "$pdo->prepare", 
      "prepare()", 
      "prepared statements", 
      "prepare statement",
      "pdo::prepare"
    ],
    solucaoDefesa: `// Código 100% Blindado:\n$stmt = $pdo->prepare('SELECT * FROM notas WHERE ra = :ra');\n$stmt->bindValue(':ra', $ra, PDO::PARAM_STR);\n$stmt->execute();`,
    explicacaoDidatica: 'O método PDO::prepare envia a estrutura do comando SQL previamente ao banco. Quando os parâmetros chegam depois com execute(), eles são tratados unicamente como literais, neutralizando qualquer caractere como aspas simples.',
    dicas: [
      "Dica 1: Em inglês, a palavra significa 'preparar'.",
      "Dica 2: É o método base do objeto PDO para criar um PDOStatement.",
      "Dica 3: Digite: prepare"
    ],
    xpBase: 300,
    goldBase: 60
  },
  {
    id: 'idor_01',
    categoria: 'Red Team (Ataque)',
    topicoOwasp: 'A01:2021 - Broken Access Control (IDOR)',
    dificuldade: 'Avançado',
    titulo: 'IDOR: Insecure Direct Object References',
    descricao: 'A API de histórico escolar consulta os boletins pela URL sem checar se o token da sessão é o proprietário do RA: GET /api/boletim?aluno_id=105. Manipule o parâmetro para acessar a ficha do aluno número 101.',
    cenarioVulneravel: `// Endpoint vulnerável:\napp.get('/api/boletim', (req, res) => {\n  const id = req.query.aluno_id; // Falta verificar se req.user.id === id!\n  db.query('SELECT * FROM notas WHERE aluno_id = ?', [id]);\n});`,
    comandoExemplo: `inject aluno_id=101`,
    respostaEsperada: [
      "aluno_id=101", 
      "?aluno_id=101", 
      "inject aluno_id=101", 
      "101",
      "inject 101"
    ],
    solucaoDefesa: `// Defesa Blue Team com RBAC (Controle de Acesso):\nif (req.user.id !== req.query.aluno_id && req.user.role !== 'PROFESSOR') {\n  return res.status(403).json({ error: 'Acesso Proibido - Violação de Propriedade' });\n}`,
    explicacaoDidatica: 'IDOR acontece quando uma aplicação utiliza chaves primárias sequenciais expostas diretamente na URL ou corpo da requisição sem verificar se o usuário autenticado possui autorização legítima sobre aquele registro.',
    dicas: [
      "Dica 1: Altere o número do identificador do aluno diretamente no parâmetro da URL.",
      "Dica 2: O alvo é a ficha do aluno número 101.",
      "Dica 3: Digite: inject aluno_id=101"
    ],
    xpBase: 350,
    goldBase: 70
  }
];

interface CyberShieldViewProps {
  estado: EstadoJogo;
  onAtualizarEstado: (novo: Partial<EstadoJogo>) => void;
  onVerificarLevelUp: () => void;
}

export const CyberShieldView: React.FC<CyberShieldViewProps> = ({
  estado,
  onAtualizarEstado,
  onVerificarLevelUp
}) => {
  const [subAbaAtiva, setSubAbaAtiva] = useState<'terminal' | 'documentacao'>('terminal');
  const [desafioIndex, setDesafioIndex] = useState<number>(0);
  const [modoFiltro, setModoFiltro] = useState<'TODOS' | 'Red Team' | 'Blue Team'>('TODOS');
  const [inputComando, setInputComando] = useState<string>('');
  const [historicoTerminal, setHistoricoTerminal] = useState<string[]>([
    '======================================================================',
    '⚡ DEVQUEST CYBERSHIELD OS v3.0 [HACKING ÉTICO & OWASP TOP 10] ⚡',
    '======================================================================',
    'Ambiente Sandboxed Isolado • Modos Red Team (Ofensivo) & Blue Team (Defesa)',
    'Digite "help" para ver os comandos CLI suportados ou use os atalhos rápidos.',
    'Status do Sistema: OPERACIONAL // NENHUM DADO REAL É AFETADO.',
    '----------------------------------------------------------------------'
  ]);
  const [dicasAbertas, setDicasAbertas] = useState<number>(0);
  const [concluidos, setConcluidos] = useState<string[]>(['sqli_01']);
  const [mostrarGuiaOwasp, setMostrarGuiaOwasp] = useState<boolean>(false);
  const [alertaSucesso, setAlertaSucesso] = useState<string | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const desafioAtual = DESAFIOS_HACKING[desafioIndex];

  // Auto-scroll do terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [historicoTerminal]);

  const abrirProximaDica = () => {
    if (dicasAbertas < desafioAtual.dicas.length) {
      const novaQtd = dicasAbertas + 1;
      setDicasAbertas(novaQtd);
      const penalidade = novaQtd * 15;
      setHistoricoTerminal(prev => [
        ...prev,
        `💡 [ORÁCULO - DICA ${novaQtd}/${desafioAtual.dicas.length}]: ${desafioAtual.dicas[novaQtd - 1]}`,
        `⚠️  [INFO]: Penalidade acumulada de XP no desafio atual: -${penalidade}%`
      ]);
    }
  };

  const executarComandoTexto = (comandoBruto: string) => {
    const comando = comandoBruto.trim();
    if (!comando) return;

    setHistoricoTerminal(prev => [...prev, `operator@cybershield:~$ ${comando}`]);

    const cmdLower = comando.toLowerCase();

    // 1. HELP
    if (cmdLower === 'help') {
      setHistoricoTerminal(prev => [
        ...prev,
        '📖 COMANDOS DO TERMINAL CYBERSHIELD:',
        '  scan                 - Varredura de portas e serviços abertos (Nmap Sandbox)',
        '  analyze              - Análise estática de vulnerabilidades no código (SAST)',
        '  inject [payload]     - Injeta exploit contra o alvo (ex: inject \' OR \'1\'=\'1)',
        '  firewall --block [ip]- Aplica regra ativa de bloqueio iptables (Blue Team)',
        '  hints (ou dica)      - Revela a próxima dica do Oráculo (-15% XP)',
        '  status               - Exibe métricas de invasão e pontuação de segurança',
        '  clear                - Limpa a tela do terminal'
      ]);
      return;
    }

    // 2. CLEAR
    if (cmdLower === 'clear') {
      setHistoricoTerminal(['[TERMINAL LIMPO] - Sandbox pronto para novas instruções.']);
      return;
    }

    // 3. HINTS
    if (cmdLower === 'hints' || cmdLower === 'dica') {
      abrirProximaDica();
      return;
    }

    // 4. STATUS
    if (cmdLower === 'status') {
      setHistoricoTerminal(prev => [
        ...prev,
        `📊 STATUS DA MISSÃO:`,
        `  Desafio Atual: ${desafioAtual.titulo}`,
        `  Categoria: ${desafioAtual.categoria}`,
        `  Dicas Utilizadas: ${dicasAbertas}/${desafioAtual.dicas.length} (-${dicasAbertas * 15}% XP)`,
        `  Desafios Resolvidos: ${concluidos.length}/${DESAFIOS_HACKING.length}`
      ]);
      return;
    }

    // 5. SCAN
    if (cmdLower === 'scan') {
      setHistoricoTerminal(prev => [
        ...prev,
        '[+] Iniciando varredura com nmap-sandbox v7.9...',
        '[*] Host: biblioteca.uni9.local (192.168.10.45)',
        '[+] Porta 80/tcp   ABERTA  - Apache/2.4.52 (Ubuntu Linux)',
        '[+] Porta 443/tcp  ABERTA  - OpenSSL/3.0.2',
        '[+] Porta 3306/tcp FILTRADA - MySQL 8.0 Database Engine',
        `[!] ALERTA: Endpoint associado ao desafio "${desafioAtual.titulo}" não possui WAF ativo!`
      ]);
      return;
    }

    // 6. ANALYZE
    if (cmdLower === 'analyze') {
      setHistoricoTerminal(prev => [
        ...prev,
        '[+] Executando Static Application Security Testing (SAST)...',
        `[*] Alvo em Auditoria: ${desafioAtual.titulo}`,
        `[*] Classificação OWASP: ${desafioAtual.topicoOwasp}`,
        `[*] Código Inspecionado: ${desafioAtual.cenarioVulneravel}`,
        `[*] Diagnóstico: ${desafioAtual.explicacaoDidatica}`
      ]);
      return;
    }

    // 7. FIREWALL
    if (cmdLower.startsWith('firewall --block')) {
      const ip = comando.split(' ')[2] || '192.168.1.100';
      setHistoricoTerminal(prev => [
        ...prev,
        `🛡️ [BLUE TEAM]: Regra iptables aplicada: REJECT tcp from ${ip} to port 80/443`,
        `[SUCESSO]: Tráfego ofensivo do IP ${ip} bloqueado com sucesso na camada de rede!`
      ]);
      return;
    }

    // 8. PROCESSAMENTO DO EXPLOIT / RESPOSTA
    let payload = comando;
    if (cmdLower.startsWith('inject ')) {
      payload = comando.slice(7).trim();
    }

    const normalizado = payload.toLowerCase().replace(/\s+/g, ' ');
    const acertou = desafioAtual.respostaEsperada.some(r => 
      normalizado.includes(r.toLowerCase()) || normalizado === r.toLowerCase()
    );

    if (acertou) {
      if (!concluidos.includes(desafioAtual.id)) {
        // Cálculo de pontuação com penalidade por dica (-15% por dica)
        const fatorPenalidade = Math.max(0.25, 1 - (dicasAbertas * 0.15));
        const xpGanho = Math.round(desafioAtual.xpBase * fatorPenalidade);
        const goldGanho = desafioAtual.goldBase;

        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 }
        });

        setConcluidos(prev => [...prev, desafioAtual.id]);
        onAtualizarEstado({
          xp: estado.xp + xpGanho,
          gold: estado.gold + goldGanho
        });
        onVerificarLevelUp();

        setAlertaSucesso(`+${xpGanho} XP e +${goldGanho} Gold conquistados!`);
        setTimeout(() => setAlertaSucesso(null), 5000);

        setHistoricoTerminal(prev => [
          ...prev,
          `======================================================================`,
          `✅ [PWNED / PATCHED!] SUCESSO ABSOLUTO NA EXECUÇÃO!`,
          `======================================================================`,
          `Vulnerabilidade validada: ${desafioAtual.topicoOwasp}`,
          `Pontuação: +${xpGanho} XP (${dicasAbertas > 0 ? `com -${dicasAbertas * 15}% de penalidade por ${dicasAbertas} dica(s)` : '100% de aproveitamento!'}) e +${goldGanho} Gold!`,
          `----------------------------------------------------------------------`,
          `🔒 CÓDIGO DA SOLUÇÃO DEFENSIVA (BLUE TEAM):`,
          desafioAtual.solucaoDefesa,
          `----------------------------------------------------------------------`,
          `💡 EXPLICAÇÃO PEDAGÓGICA:`,
          desafioAtual.explicacaoDidatica,
          `======================================================================`
        ]);
      } else {
        setHistoricoTerminal(prev => [
          ...prev,
          `ℹ️ [INFO]: Você já completou este desafio com sucesso anteriormente! O exploit foi validado novamente.`
        ]);
      }
    } else {
      setHistoricoTerminal(prev => [
        ...prev,
        `❌ [FALHA]: O comando/payload submetido não explorou ou não mitigou a vulnerabilidade.`,
        `💡 DICA: Digite "hints" para receber uma pista do Oráculo ou "analyze" para auditar o código.`
      ]);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    executarComandoTexto(inputComando);
    setInputComando('');
  };

  // Filtragem dos desafios
  const desafiosFiltrados = DESAFIOS_HACKING.filter(d => {
    if (modoFiltro === 'TODOS') return true;
    return d.categoria.includes(modoFiltro);
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-mono selection:bg-[#00ffaa] selection:text-black">
      
      {/* Alerta de Sucesso Flutuante */}
      {alertaSucesso && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-slate-950 font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border-2 border-emerald-300">
          <Sparkles className="w-5 h-5" />
          <span>{alertaSucesso}</span>
        </div>
      )}

      {/* Hero Header Cyberpunk */}
      <section className="bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-slate-950 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                // CYBERSHIELD LAB • v3.0_EXPANDED_SECURITY
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                SANDBOX ISOLADO
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                OWASP TOP 10
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 shrink-0" />
              <span>CyberShield: Laboratório de Hacking Ético</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Treinamento prático em <b>Segurança Ofensiva (Red Team)</b> e <b>Segurança Defensiva (Blue Team)</b>.
              Aprenda como invasores exploram falhas de SQL Injection, Cross-Site Scripting (XSS), Criptografia e IDOR,
              e aprenda como engenheiros seniores escrevem código imune a vulnerabilidades.
            </p>
          </div>

          {/* Quick Metrics & Sub-Tabs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            {/* Seletor de Visão: Laboratório vs Documentação Oficial */}
            <div className="bg-slate-950/90 p-1 rounded-xl border border-emerald-500/30 flex items-center gap-1">
              <button
                onClick={() => setSubAbaAtiva('terminal')}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  subAbaAtiva === 'terminal'
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_#10b981]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>Laboratório CLI</span>
              </button>

              <button
                onClick={() => setSubAbaAtiva('documentacao')}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  subAbaAtiva === 'documentacao'
                    ? 'bg-indigo-600 text-white shadow-[0_0_12px_#6366f1]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Documentação PDF</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-2.5 text-center flex-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Fases Concluídas</span>
                <span className="text-lg font-bold text-emerald-400 mt-0.5 block">
                  {concluidos.length} / {DESAFIOS_HACKING.length}
                </span>
              </div>

              <button
                onClick={() => setMostrarGuiaOwasp(!mostrarGuiaOwasp)}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Cpu className="w-4 h-4" />
                <span>{mostrarGuiaOwasp ? 'Fechar Guia' : 'OWASP'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filtros de Equipe (Red Team / Blue Team) */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold mr-1">Filtrar por:</span>
            <button
              onClick={() => setModoFiltro('TODOS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                modoFiltro === 'TODOS'
                  ? 'bg-slate-200 text-slate-950 border-white'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              Todos ({DESAFIOS_HACKING.length})
            </button>
            <button
              onClick={() => setModoFiltro('Red Team')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                modoFiltro === 'Red Team'
                  ? 'bg-red-500 text-white border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                  : 'bg-slate-950 text-red-400 border-red-500/30 hover:bg-red-500/10'
              }`}
            >
              <Sword className="w-3.5 h-3.5" />
              <span>Red Team (Ataque)</span>
            </button>
            <button
              onClick={() => setModoFiltro('Blue Team')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                modoFiltro === 'Blue Team'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                  : 'bg-slate-950 text-blue-400 border-blue-500/30 hover:bg-blue-500/10'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Blue Team (Defesa)</span>
            </button>
          </div>

          <span className="text-[11px] text-emerald-400 font-bold">
            ⚡ 100% Compatível com Diretrizes ABNT & UNINOVE
          </span>
        </div>

        {/* Abas dos Desafios com Progressão de Fases Desbloqueáveis */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin">
          {desafiosFiltrados.map((d, indexNaLista) => {
            const idxReal = DESAFIOS_HACKING.findIndex(item => item.id === d.id);
            const isAtivo = idxReal === desafioIndex;
            const isResolvido = concluidos.includes(d.id);
            const isRed = d.categoria.includes('Red');

            // Regra de Desbloqueio Progressivo:
            // O primeiro desafio está sempre liberado. Os seguintes só liberam se o anterior foi concluído!
            const isDesbloqueado = idxReal === 0 || concluidos.includes(DESAFIOS_HACKING[idxReal - 1].id);

            return (
              <button
                key={d.id}
                disabled={!isDesbloqueado}
                onClick={() => {
                  if (isDesbloqueado) {
                    setDesafioIndex(idxReal);
                    setDicasAbertas(0);
                  }
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all shrink-0 border ${
                  !isDesbloqueado
                    ? 'opacity-40 bg-slate-950/40 text-slate-500 border-slate-800/60 cursor-not-allowed'
                    : isAtivo
                    ? isRed 
                      ? 'bg-red-600 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)] cursor-pointer'
                      : 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer'
                    : 'bg-slate-950/80 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700 cursor-pointer'
                }`}
                title={!isDesbloqueado ? 'Conclua a fase anterior para desbloquear esta!' : ''}
              >
                {!isDesbloqueado ? (
                  <Lock className="w-4 h-4 text-slate-500" />
                ) : isResolvido ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isRed ? (
                  <Sword className="w-3.5 h-3.5 text-red-400" />
                ) : (
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                )}
                <span>
                  Fase 0{idxReal + 1}: {d.titulo.split(':')[0]}
                </span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                  !isDesbloqueado
                    ? 'bg-slate-800 text-slate-500'
                    : d.dificuldade === 'Iniciante' 
                    ? 'bg-emerald-500/20 text-emerald-300' 
                    : d.dificuldade === 'Intermediário' 
                    ? 'bg-amber-500/20 text-amber-300' 
                    : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {!isDesbloqueado ? 'Bloqueado' : d.dificuldade}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Guia Rápido OWASP Top 10 Retrátil */}
      {mostrarGuiaOwasp && (
        <section className="bg-slate-900 border-2 border-cyan-500/50 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Cpu className="w-5 h-5" />
              <span>GUIA OWASP TOP 10 • REFERÊNCIA PARA DESENVOLVEDORES WEB</span>
            </div>
            <span className="text-[10px] text-slate-400">Open Web Application Security Project</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
              <span className="text-red-400 font-bold block">A01: Broken Access Control</span>
              <p className="text-slate-400 leading-relaxed">
                Falhas onde usuários comuns conseguem alterar IDs em URLs (IDOR) e visualizar boletins ou dados confidenciais de outros alunos.
              </p>
            </div>
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block">A02: Cryptographic Failures</span>
              <p className="text-slate-400 leading-relaxed">
                Armazenamento de senhas em texto puro ou algoritmos fracos (MD5/SHA1). Exige uso de Argon2ID ou Bcrypt com salt.
              </p>
            </div>
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block">A03: Injection (SQLi & XSS)</span>
              <p className="text-slate-400 leading-relaxed">
                Inserção de operadores SQL (' OR '1'='1) ou tags HTML (&lt;script&gt;) para manipular o interpretador de comandos.
              </p>
            </div>
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
              <span className="text-purple-400 font-bold block">A07: Identification & Auth</span>
              <p className="text-slate-400 leading-relaxed">
                Ausência de bloqueio por força bruta (Rate Limiting), senhas fracas padrão e sessões que não expiram após logout.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CONTEÚDO CONDICIONAL: LABORATÓRIO CLI vs DOCUMENTAÇÃO OFICIAL PDF */}
      {subAbaAtiva === 'terminal' ? (
        /* Grid Principal: Missão & Alvo Vulnerável vs Terminal Retro */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LADO ESQUERDO: Painel do Desafio (5 Colunas) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                desafioAtual.categoria.includes('Red')
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
              }`}>
                {desafioAtual.categoria}
              </span>
              <span className="text-xs text-slate-400">
                Recompensa: <b className="text-emerald-400">+{desafioAtual.xpBase} XP</b> • <b className="text-amber-400">+{desafioAtual.goldBase} G</b>
              </span>
            </div>

            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                {desafioAtual.topicoOwasp}
              </span>
              <h2 className="text-lg font-bold text-white mt-1 leading-snug">
                {desafioAtual.titulo}
              </h2>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {desafioAtual.descricao}
            </p>

            {/* Código Vulnerável */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-red-400" />
                <span>Cenário / Código Vulnerável no Alvo:</span>
              </span>
              <div className="p-3.5 bg-black/80 rounded-xl border border-red-500/30 text-red-300 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
                <code>{desafioAtual.cenarioVulneravel}</code>
              </div>
            </div>

            {/* Sistema de Dicas da Lâmpada (Oráculo com Penalidade -15%) */}
            <div className="pt-3 border-t border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" />
                  <span>Dicas do Oráculo ({dicasAbertas}/{desafioAtual.dicas.length})</span>
                </span>
                <span className="text-[10px] text-amber-300/80 font-mono">
                  {dicasAbertas > 0 ? `Penalidade: -${dicasAbertas * 15}% XP` : 'Custo: -15% por dica'}
                </span>
              </div>

              {dicasAbertas > 0 && (
                <div className="space-y-1.5">
                  {desafioAtual.dicas.slice(0, dicasAbertas).map((dica, dIdx) => (
                    <div key={dIdx} className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl text-xs text-amber-200 leading-relaxed">
                      {dica}
                    </div>
                  ))}
                </div>
              )}

              {dicasAbertas < desafioAtual.dicas.length ? (
                <button
                  onClick={abrirProximaDica}
                  className="w-full py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>Liberar Dica #{dicasAbertas + 1} (-15% de XP)</span>
                </button>
              ) : (
                <div className="text-[11px] text-center text-slate-500 py-1 font-mono">
                  Todas as dicas deste desafio foram reveladas.
                </div>
              )}
            </div>

            {/* Botões de Ação Rápida */}
            <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
              <button
                onClick={() => executarComandoTexto('scan')}
                className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <span>scan</span>
              </button>
              <button
                onClick={() => executarComandoTexto('analyze')}
                className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <span>analyze</span>
              </button>
              <button
                onClick={() => setInputComando(desafioAtual.comandoExemplo)}
                className="w-full py-2 px-3 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Copiar Exemplo para Terminal</span>
              </button>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: Terminal Retro Cyberpunk (7 Colunas) */}
        <div className="lg:col-span-7 flex flex-col bg-black/95 border-2 border-emerald-500/50 rounded-2xl shadow-[0_0_35px_rgba(16,185,129,0.2)] overflow-hidden">
          
          {/* Topbar do Terminal */}
          <div className="h-11 bg-slate-900 border-b border-emerald-500/30 px-4 flex items-center justify-between select-none">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <TerminalIcon className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>terminal_sandbox_v3.sh [ADS_UNINOVE]</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => executarComandoTexto('clear')}
                className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 cursor-pointer"
                title="Limpar terminal"
              >
                clear
              </button>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
            </div>
          </div>

          {/* Área de Logs e Saída do Terminal */}
          <div className="p-4 flex-1 h-[420px] overflow-y-auto space-y-2 text-xs font-mono text-emerald-400 leading-relaxed selection:bg-emerald-400 selection:text-black scrollbar-thin">
            {historicoTerminal.map((linha, lIdx) => {
              const isErro = linha.includes('[FALHA]');
              const isSucesso = linha.includes('[SUCESSO]') || linha.includes('[PWNED');
              const isOraculo = linha.includes('[ORÁCULO');

              return (
                <div 
                  key={lIdx} 
                  className={`whitespace-pre-wrap ${
                    isErro ? 'text-red-400 font-bold' : isSucesso ? 'text-emerald-300 font-bold' : isOraculo ? 'text-amber-300 font-medium' : ''
                  }`}
                >
                  {linha}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Barra de Instrução Rápida */}
          <div className="px-4 py-1.5 bg-slate-900/60 border-t border-emerald-500/20 flex items-center justify-between text-[10px] text-slate-400">
            <span>Dica: Use <b>inject [payload]</b> para submeter sua solução.</span>
            <span>Comandos: scan, analyze, hints, help</span>
          </div>

          {/* Formulário de Input do Terminal */}
          <form 
            onSubmit={handleSubmitForm} 
            className="p-3 bg-slate-950 border-t border-emerald-500/30 flex items-center gap-2"
          >
            <span className="text-emerald-400 text-xs font-bold select-none shrink-0">
              operator@cybershield:~$
            </span>
            <input 
              type="text"
              value={inputComando}
              onChange={(e) => setInputComando(e.target.value)}
              placeholder="Digite scan, analyze ou seu payload (ex: inject ' OR '1'='1)..."
              className="flex-1 bg-transparent border-none outline-none text-xs text-emerald-300 placeholder-emerald-800 font-mono focus:ring-0"
              autoFocus
            />
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-[0_0_12px_#10b981] hover:scale-105 shrink-0"
            >
              Executar_
            </button>
          </form>
        </div>
      </div>
    ) : (
      /* ABA DA DOCUMENTAÇÃO TÉCNICO-CIENTÍFICA (CYBERSHIELD EXPANDIDO V3.0) */
      <div className="space-y-6">
        {/* Header de Ação da Documentação */}
        <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Documentação Oficial de Escopo • UNINOVE
              </span>
              <h2 className="text-base font-bold text-white mt-0.5">
                CyberShield: Laboratório de Hacking Ético & OWASP Top 10
              </h2>
              <p className="text-xs text-slate-400">
                Documento em conformidade com as normas ABNT e diretrizes da disciplina.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#00ffaa] hover:bg-[#00dd99] text-[#0d0e12] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_#00ffaa]"
            >
              <Printer className="w-4 h-4" />
              <span>Salvar em PDF (Ctrl + P)</span>
            </button>
          </div>
        </div>

        {/* Folha Formal em Formato ABNT */}
        <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-12 md:p-16 shadow-2xl space-y-10 border border-slate-200 font-sans leading-relaxed selection:bg-indigo-500 selection:text-white print:p-0 print:shadow-none print:border-none">
          
          {/* CAPA FORMAL */}
          <div className="text-center border-b border-slate-200 pb-10 space-y-6">
            <div className="space-y-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 font-mono">
              <p>Universidade Nove de Julho – UNINOVE</p>
              <p className="text-slate-500 font-medium">Diretoria de Ciências Exatas e Tecnologia da Informação</p>
              <p className="text-slate-500 font-medium">Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas (ADS)</p>
            </div>

            <div className="py-6 space-y-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-indigo-900 tracking-tight uppercase leading-snug">
                DevQuest – Documentação Técnica do Escopo de Expansões
              </h1>
              <p className="text-sm sm:text-base font-semibold text-slate-600">
                ESPECIFICAÇÃO DO MÓDULO CYBERSHIELD: LABORATÓRIO DE HACKING ÉTICO & OWASP TOP 10<br />
                <span className="text-indigo-600 font-bold font-mono">(Versão v3.0_EXPANDED_SECURITY • Progressão de Fases Desbloqueáveis)</span>
              </p>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 space-y-2 pt-2 font-mono">
              <p><strong>Disciplina:</strong> Desenvolvimento para Internet / Implementação e Testes de Software</p>
              <p><strong>Docente Responsável:</strong> Prof. Leandro Oliveira da Silva</p>
              <div className="pt-2">
                <p className="font-bold text-slate-900">Autor do Projeto:</p>
                <p className="text-indigo-950 font-extrabold text-base">Fernando Santos – RA: 119841655489</p>
              </div>
              <p className="pt-3 text-xs font-medium text-slate-500">São Paulo – SP | 2026</p>
            </div>
          </div>

          {/* SEÇÃO 1: VISÃO GERAL */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-indigo-900 uppercase border-b-2 border-indigo-900 pb-1">
              1. Visão Geral do Escopo Expandido
            </h2>
            <p className="text-sm text-slate-700 text-justify indent-8">
              Esta documentação detalha a especificação técnica e funcional de todas as novas expansões e recursos avançados adicionados ao projeto DevQuest. O objetivo principal é enriquecer a experiência pedagógica, garantir acessibilidade total, proporcionar conformidade estrita com legislações de dados (LGPD) e introduzir o ensino prático de cibersegurança em um ambiente controlado.
            </p>
          </section>

          {/* SEÇÃO 2: MATRIZ DE NOVAS FUNCIONALIDADES */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-indigo-900 uppercase border-b-2 border-indigo-900 pb-1">
              2. Matriz de Novas Funcionalidades e Requisitos Técnicos
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-300">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                  <tr>
                    <th className="p-3 border-r border-slate-300 w-1/4">Módulo / Recurso</th>
                    <th className="p-3 border-r border-slate-300 w-1/2">Descrição Técnica e Operacional</th>
                    <th className="p-3 w-1/4">Objetivo Pedagógico / Conformidade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-300 text-indigo-900">CyberShield / HackQuest</td>
                    <td className="p-3 border-r border-slate-300">Terminal CLI interativo em estilo Retro Cyberpunk com modos Red Team (Ataque) e Blue Team (Defesa/Patch) e suporte a comandos como scan, analyze e inject.</td>
                    <td className="p-3">Introduzir práticas de Hacking Ético e segurança da informação baseadas nas diretrizes do OWASP Top 10.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-300 text-indigo-900">Dicas do Oráculo (Lâmpada)</td>
                    <td className="p-3 border-r border-slate-300">Sistema progressivo de dicas acionado por um botão com ícone de lâmpada. Cada dica revelada aplica um desconto proporcional de 15% na recompensa final de XP.</td>
                    <td className="p-3">Oferecer um andaime pedagógico que reduz o bloqueio no aprendizado sem comprometer o desafio do jogo.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-300 text-indigo-900">Progressão de Fases Desbloqueáveis</td>
                    <td className="p-3 border-r border-slate-300">Navegação sequencial de missões onde a conclusão com sucesso de uma fase libera imediatamente o acesso à próxima etapa pedagógica.</td>
                    <td className="p-3">Garantir consolidação do conhecimento em degraus graduais de dificuldade, evitando que o aluno pule etapas fundamentais.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-300 text-indigo-900">Conformidade LGPD (Kill-Switch)</td>
                    <td className="p-3 border-r border-slate-300">Painel de gestão de privacidade com encriptação no LocalStorage, utilitário de exportação de dados em JSON e o botão "Kill-Switch" para expurgo definitivo dos dados.</td>
                    <td className="p-3">Atender integralmente ao Artigo 18 da Lei nº 13.709/2018 (Direito à Eliminação e Portabilidade).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border-r border-slate-300 text-indigo-900">Acessibilidade WCAG 2.1 AA</td>
                    <td className="p-3 border-r border-slate-300">Navegação 100% via teclado sem armadilhas de foco, suporte completo a leitores de tela via atributos ARIA e alternador de tema para Alto Contraste.</td>
                    <td className="p-3">Garantir a inclusão de todos os estudantes conforme os parâmetros de acessibilidade digital.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SEÇÃO 3: ESPECIFICAÇÃO DO CYBERSHIELD */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-indigo-900 uppercase border-b-2 border-indigo-900 pb-1">
              3. Especificação Detalhada do Módulo CyberShield / HackQuest
            </h2>
            <p className="text-sm text-slate-700 text-justify indent-8">
              O módulo CyberShield / HackQuest funciona como um terminal virtual isolado que emula testes de vulnerabilidade sem riscos à infraestrutura real.
            </p>

            <h3 className="text-sm font-bold text-slate-900">3.1 Modos de Operação</h3>
            <ul className="text-sm text-slate-700 space-y-1.5 list-disc list-inside">
              <li><strong>Red Team (Modo Ofensivo):</strong> O aluno assume o papel de um hacker ético encarregado de identificar e explorar vulnerabilidades simuladas (ex: bypass de autenticação via SQL Injection ou roubo de sessão via Reflected XSS).</li>
              <li><strong>Blue Team (Modo Defensivo):</strong> O aluno atua na defesa, analisando logs de auditoria e aplicando correções diretamente no código-fonte (ex: substituindo concatenação de queries por Prepared Statements e binding de parâmetros via PDO).</li>
            </ul>

            <h3 className="text-sm font-bold text-slate-900">3.2 Comandos Suportados no Terminal CLI</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-100 rounded border border-slate-300">
                <b className="text-indigo-900">scan:</b> Realiza a varredura das portas e serviços expostos na aplicação alvo.
              </div>
              <div className="p-2.5 bg-slate-100 rounded border border-slate-300">
                <b className="text-indigo-900">analyze:</b> Examina trechos de código em busca de brechas listadas no OWASP Top 10.
              </div>
              <div className="p-2.5 bg-slate-100 rounded border border-slate-300">
                <b className="text-indigo-900">inject [payload]:</b> Tenta executar uma injeção de comandos ou SQL no parâmetro vulnerável.
              </div>
              <div className="p-2.5 bg-slate-100 rounded border border-slate-300">
                <b className="text-indigo-900">firewall --block [ip]:</b> Aplica regras de bloqueio no ambiente de defesa.
              </div>
              <div className="p-2.5 bg-slate-100 rounded border border-slate-300">
                <b className="text-indigo-900">hints:</b> Exibe a lista de dicas disponíveis e o custo em XP.
              </div>
              <div className="p-2.5 bg-slate-100 rounded border border-slate-300">
                <b className="text-indigo-900">clear:</b> Limpa o histórico de comandos da tela do terminal.
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-900">3.3 Guia Técnico OWASP Top 10 Integrado</h3>
            <ul className="text-sm text-slate-700 space-y-1.5 list-disc list-inside">
              <li><strong>A01: SQL Injection (SQLi):</strong> Injeção de trechos SQL maliciosos para burlar autenticação.</li>
              <li><strong>A03: Cross-Site Scripting (XSS):</strong> Injeção de scripts no navegador do cliente por falta de sanitização.</li>
              <li><strong>A02: Criptografia Falha:</strong> Armazenamento de credenciais em texto plano sem uso de hashing forte com salt (ex: bcrypt ou Argon2ID).</li>
              <li><strong>A01: IDOR (Broken Access Control):</strong> Referência direta a objetos inseguros sem checagem de permissão de usuário (ex: acesso a dados de outros alunos alterando o parâmetro na URL).</li>
            </ul>
          </section>

          {/* SEÇÃO 4: REGRAS DE NEGÓCIO */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-indigo-900 uppercase border-b-2 border-indigo-900 pb-1">
              4. Regras de Negócio e Fórmulas Matemáticas
            </h2>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <h4 className="font-bold text-slate-900">4.1 Recálculo de XP com Penalidade Pedagógica por Dica</h4>
                <p className="text-xs text-slate-600">Para equilibrar o uso de ajudas sem desestimular o raciocínio, o sistema aplica a seguinte regra:</p>
                <p className="font-mono font-bold text-indigo-950 text-xs bg-white p-2 rounded border border-slate-300">
                  XP_Final = XP_Base * (1 - (QuantidadeDicasUsadas * 0.15))
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <h4 className="font-bold text-slate-900">4.2 Calculadora Preditiva de Média Semestral</h4>
                <p className="text-xs text-slate-600">Para calcular a nota mínima necessária na avaliação A2 ou na Prova Substitutiva:</p>
                <p className="font-mono font-bold text-indigo-950 text-xs bg-white p-2 rounded border border-slate-300">
                  NotaA2_Necessaria = (6.0 * 2) - NotaA1
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <h4 className="font-bold text-slate-900">4.3 Alerta de Assiduidade Presencial (MEC)</h4>
                <p className="text-xs text-slate-600">O sistema dispara um alerta imediato de risco de reprovação caso o percentual de faltas exceda o limite legal de 25% da carga horária total da disciplina:</p>
                <p className="font-mono font-bold text-indigo-950 text-xs bg-white p-2 rounded border border-slate-300">
                  PercentualFaltas = (Faltas / CargaHorariaTotal) * 100
                </p>
              </div>
            </div>
          </section>

          {/* SEÇÃO 5: PLANO DE TESTES */}
          <section className="space-y-4">
            <h2 className="text-base font-bold text-indigo-900 uppercase border-b-2 border-indigo-900 pb-1">
              5. Plano de Testes das Novas Funcionalidades
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-300">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                  <tr>
                    <th className="p-2.5 border-r border-slate-300">Identificador</th>
                    <th className="p-2.5 border-r border-slate-300">Caso de Teste</th>
                    <th className="p-2.5 border-r border-slate-300">Entrada / Cenário</th>
                    <th className="p-2.5">Resultado Esperado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-2.5 font-bold font-mono border-r border-slate-300 text-indigo-900">TU-SEC-01</td>
                    <td className="p-2.5 border-r border-slate-300">Cálculo de XP com 2 dicas utilizadas</td>
                    <td className="p-2.5 font-mono border-r border-slate-300">XP Base = 200, Dicas = 2</td>
                    <td className="p-2.5 font-bold text-emerald-700">XP Final calculado em 140 (desconto de 30%).</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold font-mono border-r border-slate-300 text-indigo-900">TI-SEC-01</td>
                    <td className="p-2.5 border-r border-slate-300">Exploração de SQL Injection no CyberShield</td>
                    <td className="p-2.5 font-mono border-r border-slate-300">Comando: inject ' OR '1'='1</td>
                    <td className="p-2.5 font-bold text-emerald-700">Bypass confirmado, disparo de confetes e desbloqueio da Fase 02.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold font-mono border-r border-slate-300 text-indigo-900">TI-LGPD-01</td>
                    <td className="p-2.5 border-r border-slate-300">Acionamento do Kill-Switch de Expurgo</td>
                    <td className="p-2.5 border-r border-slate-300">Clique no botão de confirmação de exclusão</td>
                    <td className="p-2.5 font-bold text-emerald-700">Remoção completa do LocalStorage e redirecionamento para a tela inicial.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold font-mono border-r border-slate-300 text-indigo-900">TI-ACC-01</td>
                    <td className="p-2.5 border-r border-slate-300">Navegação por Teclado na Árvore de Fases</td>
                    <td className="p-2.5 border-r border-slate-300">Uso da tecla Tab e setas nos nós de fase</td>
                    <td className="p-2.5 font-bold text-emerald-700">Destaque de foco visível em alto contraste e abertura do nó correspondente.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    )}
  </div>
);
};
