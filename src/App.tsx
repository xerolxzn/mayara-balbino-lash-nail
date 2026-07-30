import React, { useState, useEffect } from 'react';
import { 
  Menu, X, MapPin, Clock, CheckCircle2, Star, Instagram, ArrowRight, 
  ShieldCheck, Heart, Sparkles, CheckCheck, ChevronDown, 
  Copy, Navigation, ExternalLink, Phone, ZoomIn, Eye, Award
} from 'lucide-react';

// ==========================================
// DADOS PRINCIPAIS DO NEGÓCIO
// ==========================================
const DADOS = {
  nome: "Mayara Balbino",
  titulo: "Nail & Lash Designer",
  whatsappNumero: "5546999332697",
  whatsappFormatado: "(46) 99933-2697",
  whatsappLinkPadrao: "https://wa.me/5546999332697?text=Ol%C3%A1%20Mayara!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.",
  instagram: "mayarabalbino",
  instagramLink: "https://instagram.com/mayarabalbino",
  endereco: "R. Genésio Moreschi, 303 - Colombo, PR",
  wazeLink: "https://waze.com/ul?q=Rua+Genesio+Moreschi+303+Colombo",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Rua+Genesio+Moreschi+303+Colombo+PR",
  horarios: "Segunda, Terça e Quinta: 09h às 19h"
};

const FALLBACK_IMAGE_LASH = "/portfolio/lash01.jpeg";
const FALLBACK_IMAGE_NAIL = "/portfolio/nail01.jpeg";

const getWhatsAppLink = (servicoNome?: string) => {
  if (!servicoNome) return DADOS.whatsappLinkPadrao;
  const texto = encodeURIComponent(`Olá Mayara! Gostaria de agendar um horário para: ${servicoNome}.`);
  return `https://wa.me/${DADOS.whatsappNumero}?text=${texto}`;
};

// ==========================================
// PORTFÓLIO DE TRABALHOS REAIS DE MAYARA BALBINO
// ==========================================
interface PortfolioItem {
  id: number;
  categoria: 'lashes' | 'nails';
  categoriaNome: string;
  titulo: string;
  descricao: string;
  imagem: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Cílios (4 fotos reais)
  {
    id: 1,
    categoria: 'lashes',
    categoriaNome: 'Extensão de Cílios',
    titulo: 'Efeito Fox Eye & Leveza',
    descricao: 'Acabamento elegante e alinhamento preciso sem pesar os fios naturais.',
    imagem: '/portfolio/lash01.jpeg'
  },
  {
    id: 2,
    categoria: 'lashes',
    categoriaNome: 'Extensão de Cílios',
    titulo: 'Volume Russo Refinado',
    descricao: 'Densidade na medida certa com fios ultra macios e hipoalergênicos.',
    imagem: '/portfolio/lash02.jpeg'
  },
  {
    id: 3,
    categoria: 'lashes',
    categoriaNome: 'Extensão de Cílios',
    titulo: 'Efeito Híbrido Natural',
    descricao: 'Mistura perfeita entre isolamento clássico e leques suaves.',
    imagem: '/portfolio/lash03.jpeg'
  },
  {
    id: 4,
    categoria: 'lashes',
    categoriaNome: 'Extensão de Cílios',
    titulo: 'Cílios Efeito Glamour',
    descricao: 'Olhar marcante, retenção de até 4 semanas e biossegurança.',
    imagem: '/portfolio/lash04.jpeg'
  },
  // Unhas (4 fotos reais)
  {
    id: 5,
    categoria: 'nails',
    categoriaNome: 'Nail Design',
    titulo: 'Alongamento em Gel Natural',
    descricao: 'Estrutura resistente com curvatura C perfeita e acabamento realista.',
    imagem: '/portfolio/nail01.jpeg'
  },
  {
    id: 6,
    categoria: 'nails',
    categoriaNome: 'Nail Design',
    titulo: 'Banho de Gel & Brilho Intenso',
    descricao: 'Proteção contra quebra com blindagem de alta durabilidade.',
    imagem: '/portfolio/nail04.jpeg'
  },
  {
    id: 7,
    categoria: 'nails',
    categoriaNome: 'Nail Design',
    titulo: 'Esmaltação em Gel Elegante',
    descricao: 'Cor impecável que não descasca e mantém o brilho espelhado.',
    imagem: '/portfolio/nail09.jpeg'
  },
  {
    id: 8,
    categoria: 'nails',
    categoriaNome: 'Nail Design',
    titulo: 'Francesinha Definitiva',
    descricao: 'Delicadeza com traços finos e acabamento de alta precisão.',
    imagem: '/portfolio/nail13.jpeg'
  }
];

// ==========================================
// SERVIÇOS & VALORES
// ==========================================
interface Servico {
  nome: string;
  preco: string;
  duracao: string;
  destaque?: boolean;
  desc: string;
  tags: string[];
}

const SERVICOS_LASH: Servico[] = [
  { 
    nome: "Extensão de Cílios", 
    preco: "170,00", 
    duracao: "2h00min",
    destaque: true, 
    desc: "Aplicação minuciosa fio a fio com materiais importados e colas hipoalergênicas certificadas. Mapeamento personalizado para valorizar o formato dos seus olhos. Retenção média de 3 a 4 semanas.",
    tags: ["Retenção Superior", "Isolamento Correto", "Efeito Personalizado"]
  }
];

const SERVICOS_NAIL: Servico[] = [
  { 
    nome: "Alongamento em Gel", 
    preco: "170,00", 
    duracao: "2h15min",
    destaque: true, 
    desc: "Construção de estrutura resistente e natural com géis de alta tecnologia. Curvatura C perfeita, lixamento técnico e durabilidade extraordinária.",
    tags: ["Resistência Extrema", "Curvatura C", "Mais Vendido"]
  },
  { 
    nome: "Banho de Gel", 
    preco: "120,00", 
    duracao: "1h30min",
    desc: "Camada protetora reforçada sobre a unha natural. Fortalece contra quebras e descamações mantendo o crescimento natural saudável.",
    tags: ["Fortalecimento", "Brilho Intenso"]
  },
  { 
    nome: "Esmaltação em Gel", 
    preco: "70,00", 
    duracao: "1h00min",
    desc: "Cor vibrante com secagem imediata em cabine LED/UV. Não descasca nem arranha, mantendo a aparência de recém-feita por semanas.",
    tags: ["Secagem Rápida", "Sem Rasuras"]
  },
  { 
    nome: "Pé e Mão Completo", 
    preco: "65,00", 
    duracao: "1h30min",
    desc: "Cuidado higiênico e estético completo para pés e mãos, cutilagem funda ou superficial conforme preferência e esmaltação perfeita.",
    tags: ["Cuidado Completo", "Conforto"]
  },
  { 
    nome: "Pé (Cuticulagem e Esmaltação)", 
    preco: "45,00", 
    duracao: "45min",
    desc: "Higienização, lixamento, cutilagem delicada e hidratação das cutículas dos pés.",
    tags: ["Acabamento Limpo"]
  },
  { 
    nome: "Mão (Cuticulagem e Esmaltação)", 
    preco: "35,00", 
    duracao: "45min",
    desc: "Cuidado delicado das mãos com formato simétrico e esmaltação tradicional duradoura.",
    tags: ["Delicadeza"]
  }
];

// ==========================================
// FAQ DATA
// ==========================================
const FAQ_ITEMS = [
  {
    pergunta: "Quanto tempo dura a extensão de cílios?",
    resposta: "Com o isolamento e acoplagem corretos que realizamos, a extensão dura de 3 a 4 semanas. Recomendamos a manutenção entre 15 a 21 dias para manter a densidade e a beleza do olhar sempre renovadas."
  },
  {
    pergunta: "O banho de gel ou alongamento estraga as unhas naturais?",
    resposta: "Não! O gel em si não danifica a unha natural. O dano ocorre apenas quando há remoção incorreta (arrancada à força) ou lixamento agressivo da placa ungueal. Aqui utilizamos técnicas de remoção química e mecânica seguras, preservando a integridade da sua unha."
  },
  {
    pergunta: "Como funciona o agendamento de horários?",
    resposta: "Os atendimentos são exclusivamente com horário marcado para garantir que você tenha um atendimento calmo, pontual e sem filas. O agendamento é feito de forma rápida pelo nosso WhatsApp."
  },
  {
    pergunta: "Quais são as formas de pagamento aceitas no Studio?",
    resposta: "Aceitamos PIX, cartões de crédito e débito (com opção de parcelamento para procedimentos combinados) e dinheiro."
  },
  {
    pergunta: "Onde o Studio está localizado em Colombo?",
    resposta: "Estamos localizados na R. Genésio Moreschi, 303, no bairro Guaraituba em Colombo, PR. Um espaço aconchegante, climatizado e de fácil acesso com estacionamento tranquilo na região."
  }
];

// ==========================================
// COMPONENTES AUXILIARES
// ==========================================
const ParticlesBackground = () => {
  const [particles, setParticles] = useState<{ id: number; left: string; size: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 2}px`,
      duration: `${Math.random() * 12 + 16}s`,
      delay: `${Math.random() * 6}s`
    }));
    setParticles(items);
  }, []);

  return (
    <div className="particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay
          }}
        />
      ))}
    </div>
  );
};

// ==========================================
// APLICAÇÃO PRINCIPAL
// ==========================================
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'todos' | 'lashes' | 'nails'>('todos');
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen || selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen, selectedImage]);

  const copyAddress = () => {
    navigator.clipboard.writeText(DADOS.endereco);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredPortfolio = activeTab === 'todos' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.categoria === activeTab);

  const navLinks = [
    { name: "Portfólio", href: "#portfolio" },
    { name: "Serviços", href: "#servicos" },
    { name: "Diferenciais", href: "#diferenciais" },
    { name: "Sobre", href: "#sobre" },
    { name: "Depoimentos", href: "#depoimentos" },
    { name: "FAQ", href: "#faq" },
    { name: "Localização", href: "#endereco" }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white selection:bg-[#E093A3] selection:text-white">
      
      {/* --- HEADER FIXO LUXO --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          
          {/* Logo Brand Script (Great Vibes White) */}
          <a href="#" className="flex flex-col group py-1">
            <span className="font-greatvibes text-3xl sm:text-4xl font-normal text-white group-hover:text-[#E093A3] transition-colors leading-none tracking-wide">
              {DADOS.nome}
            </span>
            <span className="text-[9px] sm:text-[10px] font-montserrat tracking-[3px] uppercase text-[#E093A3] mt-1">
              {DADOS.titulo}
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xs font-montserrat tracking-[2px] uppercase text-gray-300 hover:text-[#E093A3] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#E093A3] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
            <a 
              href={DADOS.whatsappLinkPadrao} 
              target="_blank" 
              rel="noreferrer" 
              className="bg-gradient-to-r from-[#E093A3] to-[#F2C4CE] text-[#0D0D0D] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase hover:shadow-[0_0_20px_rgba(224,147,163,0.4)] hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <Phone size={14} />
              Agendar Horário
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/5 transition-colors focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir Menu"
          >
            {isMenuOpen ? <X size={26} strokeWidth={1.8} /> : <Menu size={26} strokeWidth={1.8} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-[60px] bg-[#0D0D0D]/95 backdrop-blur-xl z-50 flex flex-col p-6 lg:hidden border-t border-[#E093A3]/20 animate-fadeIn">
            <div className="flex flex-col gap-4 max-w-sm mx-auto w-full my-auto">
              <div className="text-center mb-2">
                <span className="text-xs font-montserrat tracking-[3px] text-[#E093A3] uppercase">Navegação</span>
              </div>
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-base font-montserrat tracking-[2px] uppercase text-white hover:text-[#E093A3] text-center py-3 border-b border-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={DADOS.whatsappLinkPadrao} 
                target="_blank" 
                rel="noreferrer" 
                onClick={() => setIsMenuOpen(false)}
                className="mt-6 bg-[#E093A3] text-[#0D0D0D] text-center px-6 py-4 rounded-full text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(224,147,163,0.3)]"
              >
                <Phone size={18} />
                Agendar via WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden bg-radial-glow">
        <ParticlesBackground />
        
        {/* Soft Ambient Light Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#E093A3]/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E093A3]/30 bg-[#E093A3]/10 text-[#E093A3] text-xs font-semibold tracking-[2px] uppercase mb-8 backdrop-blur-md animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#E093A3] animate-ping"></span>
            📍 Studio em Colombo, PR • Vagas Disponíveis
          </div>
          
          {/* Main Headline */}
          <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.2] mb-6 text-white max-w-3xl">
            Cílios e unhas que revelam o{' '}
            <span className="font-greatvibes text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#E093A3] font-normal italic lowercase inline-block px-1">
              melhor de você.
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-10 max-w-2xl leading-relaxed font-montserrat">
            Mais de <strong className="text-white font-semibold">10 anos de experiência</strong> em extensão de cílios e nail design em Colombo, PR. Atendimento exclusivo com hora marcada, técnica cuidadosa e resultado impecável que dura.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full sm:w-auto">
            <a 
              href={DADOS.whatsappLinkPadrao} 
              target="_blank" 
              rel="noreferrer" 
              className="w-full sm:w-auto bg-[#E093A3] text-[#0D0D0D] px-8 py-4 rounded-full font-semibold tracking-widest uppercase hover:bg-[#F2C4CE] hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(224,147,163,0.35)] text-sm"
            >
              <span>Agendar Meu Horário</span>
              <ArrowRight size={18} strokeWidth={2} />
            </a>
            
            <a 
              href="#portfolio" 
              className="w-full sm:w-auto glass-card text-white px-7 py-4 rounded-full font-semibold tracking-widest uppercase hover:border-[#E093A3]/50 transition-all flex items-center justify-center gap-2 text-xs"
            >
              <Eye size={16} className="text-[#E093A3]" />
              <span>Ver Portfólio</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-200/90 font-montserrat bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
            <span>⚡ Atendimentos exclusivamente com horário marcado</span>
          </div>

        </div>
      </section>

      {/* --- STATS & TRUST BADGES --- */}
      <section className="relative z-20 -mt-6 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="glass-card rounded-2xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-[#E093A3]/30">
          <div className="flex flex-col items-center justify-center gap-1">
            <Award className="text-[#E093A3] mb-1" size={28} strokeWidth={1.5} />
            <span className="font-playfair text-2xl sm:text-3xl font-bold text-white">+10 Anos</span>
            <span className="text-[11px] text-gray-400 font-montserrat uppercase tracking-wider">De Experiência</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Heart className="text-[#E093A3] mb-1" size={28} strokeWidth={1.5} />
            <span className="font-playfair text-2xl sm:text-3xl font-bold text-white">+500</span>
            <span className="text-[11px] text-gray-400 font-montserrat uppercase tracking-wider">Clientes Satisfeitas</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <ShieldCheck className="text-[#E093A3] mb-1" size={28} strokeWidth={1.5} />
            <span className="font-playfair text-2xl sm:text-3xl font-bold text-white">100%</span>
            <span className="text-[11px] text-gray-400 font-montserrat uppercase tracking-wider">Biossegurança</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Star className="text-[#E093A3] mb-1 fill-[#E093A3]" size={28} strokeWidth={1.5} />
            <span className="font-playfair text-2xl sm:text-3xl font-bold text-white">Alta</span>
            <span className="text-[11px] text-gray-400 font-montserrat uppercase tracking-wider">Satisfação & Fidelidade</span>
          </div>
        </div>
      </section>

      {/* --- PORTFÓLIO DE TRABALHOS --- */}
      <section id="portfolio" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-12">
          <span className="text-xs font-montserrat tracking-[4px] uppercase text-[#E093A3] block mb-2">Resultados Reais</span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">Nosso Portfólio</h2>
          <p className="text-gray-400 text-sm sm:text-base font-montserrat max-w-xl mx-auto">
            Confira alguns dos nossos trabalhos de extensão de cílios e nail design realizados no Studio Mayara Balbino.
          </p>
        </div>

        {/* Tab Filter Controls */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
          <button 
            onClick={() => setActiveTab('todos')}
            className={`px-6 py-2.5 rounded-full text-xs font-montserrat font-semibold tracking-wider uppercase transition-all ${
              activeTab === 'todos' 
                ? 'bg-[#E093A3] text-[#0D0D0D] shadow-[0_0_15px_rgba(224,147,163,0.3)]' 
                : 'glass-card text-gray-300 hover:text-white hover:border-[#E093A3]/40'
            }`}
          >
            Todos ({PORTFOLIO_ITEMS.length})
          </button>
          <button 
            onClick={() => setActiveTab('lashes')}
            className={`px-6 py-2.5 rounded-full text-xs font-montserrat font-semibold tracking-wider uppercase transition-all ${
              activeTab === 'lashes' 
                ? 'bg-[#E093A3] text-[#0D0D0D] shadow-[0_0_15px_rgba(224,147,163,0.3)]' 
                : 'glass-card text-gray-300 hover:text-white hover:border-[#E093A3]/40'
            }`}
          >
            Cílios (4)
          </button>
          <button 
            onClick={() => setActiveTab('nails')}
            className={`px-6 py-2.5 rounded-full text-xs font-montserrat font-semibold tracking-wider uppercase transition-all ${
              activeTab === 'nails' 
                ? 'bg-[#E093A3] text-[#0D0D0D] shadow-[0_0_15px_rgba(224,147,163,0.3)]' 
                : 'glass-card text-gray-300 hover:text-white hover:border-[#E093A3]/40'
            }`}
          >
            Unhas (4)
          </button>
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPortfolio.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedImage(item)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden glass-card cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(224,147,163,0.2)]"
            >
              <img 
                src={item.imagem} 
                alt={item.titulo} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = item.categoria === 'lashes' ? FALLBACK_IMAGE_LASH : FALLBACK_IMAGE_NAIL;
                }}
              />
              
              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

              {/* Tag Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#0D0D0D]/70 backdrop-blur-md border border-[#E093A3]/30 text-[10px] font-montserrat font-semibold tracking-wider text-[#E093A3] uppercase">
                  {item.categoriaNome}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0D0D0D]/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn size={16} />
              </div>

              {/* Content Box */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-playfair text-lg font-bold text-white group-hover:text-[#E093A3] transition-colors mb-1">
                  {item.titulo}
                </h3>
                <p className="text-xs text-gray-300 font-montserrat line-clamp-2 leading-relaxed opacity-90">
                  {item.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-3xl w-full glass-card rounded-3xl overflow-hidden border border-[#E093A3]/40 shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0D0D0D]/80 border border-white/20 flex items-center justify-center text-white hover:bg-[#E093A3] hover:text-[#0D0D0D] transition-all"
            >
              <X size={20} />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
              <img 
                src={selectedImage.imagem} 
                alt={selectedImage.titulo} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = selectedImage.categoria === 'lashes' ? FALLBACK_IMAGE_LASH : FALLBACK_IMAGE_NAIL;
                }}
              />
            </div>

            {/* Modal Details */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-[#141414]">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#E093A3]/10 border border-[#E093A3]/30 text-[#E093A3] text-xs font-semibold tracking-wider uppercase mb-4">
                  {selectedImage.categoriaNome}
                </span>
                <h3 className="font-playfair text-2xl font-bold text-white mb-3">
                  {selectedImage.titulo}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-montserrat">
                  {selectedImage.descricao}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                <a 
                  href={getWhatsAppLink(selectedImage.titulo)} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full bg-[#E093A3] text-[#0D0D0D] py-3.5 rounded-full text-center font-montserrat font-semibold text-xs tracking-wider uppercase hover:bg-[#F2C4CE] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(224,147,163,0.3)]"
                >
                  <Phone size={16} />
                  Quero um resultado assim
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- SERVIÇOS & TABELA DE VALORES --- */}
      <section id="servicos" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <span className="text-xs font-montserrat tracking-[4px] uppercase text-[#E093A3] block mb-2">Transparência & Qualidade</span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">Nossos Serviços</h2>
          <p className="text-gray-400 text-sm sm:text-base font-montserrat max-w-xl mx-auto">
            Procedimentos realizados com técnicas modernas e produtos de alto padrão.
          </p>
        </div>

        {/* Categoria 1: Lash Extension */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#E093A3]/20">
            <Sparkles className="text-[#E093A3]" size={24} />
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white">Extensão de Cílios</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {SERVICOS_LASH.map((servico, idx) => (
              <div 
                key={idx} 
                className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row justify-between lg:items-center gap-6 border-l-4 border-l-[#E093A3] relative overflow-hidden"
              >
                {servico.destaque && (
                  <div className="absolute top-0 right-0 bg-[#E093A3] text-[#0D0D0D] text-[10px] font-montserrat font-bold tracking-widest uppercase px-4 py-1 rounded-bl-xl shadow-md">
                    Destaque do Studio
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h4 className="font-playfair text-xl sm:text-2xl font-bold text-white">{servico.nome}</h4>
                    <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      <Clock size={12} className="text-[#E093A3]" /> {servico.duracao}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 font-montserrat max-w-2xl">
                    {servico.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {servico.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-montserrat tracking-wider uppercase bg-[#E093A3]/10 text-[#E093A3] px-3 py-1 rounded-full border border-[#E093A3]/20">
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0 shrink-0">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] font-montserrat text-gray-400 uppercase tracking-widest block">Investimento</span>
                    <span className="font-playfair text-3xl font-bold text-[#E093A3]">R$ {servico.preco}</span>
                  </div>
                  
                  <a 
                    href={getWhatsAppLink(servico.nome)} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full sm:w-auto bg-[#E093A3] text-[#0D0D0D] px-6 py-3 rounded-full font-montserrat font-semibold text-xs tracking-wider uppercase hover:bg-[#F2C4CE] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(224,147,163,0.3)]"
                  >
                    <span>Reservar Horário</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categoria 2: Nail Design */}
        <div>
          <div className="flex items-center gap-3 mb-8 pb-3 border-b border-[#E093A3]/20">
            <Heart className="text-[#E093A3]" size={24} />
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white">Nail Design</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICOS_NAIL.map((servico, idx) => (
              <div 
                key={idx} 
                className={`glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-[#E093A3]/40 ${
                  servico.destaque ? 'border-l-4 border-l-[#E093A3]' : ''
                }`}
              >
                {servico.destaque && (
                  <span className="absolute top-0 right-0 bg-[#E093A3] text-[#0D0D0D] text-[9px] font-montserrat font-bold tracking-widest uppercase px-3 py-1 rounded-bl-lg">
                    Mais Pedido
                  </span>
                )}

                <div>
                  <div className="flex justify-between items-start mb-3 pr-12">
                    <div>
                      <h4 className="font-playfair text-lg font-bold text-white mb-1">{servico.nome}</h4>
                      <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                        <Clock size={11} className="text-[#E093A3]" /> {servico.duracao}
                      </span>
                    </div>
                  </div>

                  {servico.desc && (
                    <p className="text-gray-300 text-xs leading-relaxed mb-4 font-montserrat">
                      {servico.desc}
                    </p>
                  )}

                  {servico.tags && servico.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {servico.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-montserrat tracking-wider uppercase bg-white/5 text-gray-300 px-2.5 py-0.5 rounded-full border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <div className="font-playfair text-xl font-bold text-[#E093A3]">
                    R$ {servico.preco}
                  </div>
                  
                  <a 
                    href={getWhatsAppLink(servico.nome)} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="glass-card hover:bg-[#E093A3] hover:text-[#0D0D0D] text-[#E093A3] px-4 py-2 rounded-full font-montserrat font-semibold text-[11px] tracking-wider uppercase transition-all flex items-center gap-1.5"
                  >
                    <span>Agendar</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <a 
            href={DADOS.whatsappLinkPadrao} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-3 bg-[#E093A3] text-[#0D0D0D] px-9 py-4 rounded-full font-montserrat font-semibold text-xs tracking-widest uppercase hover:bg-[#F2C4CE] hover:scale-105 transition-all shadow-[0_0_25px_rgba(224,147,163,0.3)]"
          >
            <Phone size={16} />
            <span>Falar Diretamente no WhatsApp</span>
          </a>
        </div>
      </section>

      {/* --- DIFERENCIAIS DO STUDIO --- */}
      <section id="diferenciais" className="py-24 px-4 sm:px-6 bg-[#141414] border-y border-white/5 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-montserrat tracking-[4px] uppercase text-[#E093A3] block mb-2">Por que escolher o Studio</span>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Nossos Diferenciais</h2>
            <p className="text-gray-400 text-sm sm:text-base font-montserrat max-w-xl mx-auto">
              Cada detalhe é pensado para proporcionar uma experiência confortável, segura e memorável.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Clock size={32} strokeWidth={1.5} />,
                title: "Pontualidade & Hora Marcada",
                desc: "Seu tempo é precioso. Atendimento individualizado e rigorosamente pontual, sem filas de espera."
              },
              {
                icon: <ShieldCheck size={32} strokeWidth={1.5} />,
                title: "Biossegurança Rigorosa",
                desc: "Uso de autoclaves, materiais 100% esterilizados e descartáveis de uso único para sua total proteção."
              },
              {
                icon: <Award size={32} strokeWidth={1.5} />,
                title: "10+ Anos de Prática",
                desc: "Técnica sólida aperfeiçoada ao longo de uma década, garantindo máxima retenção e acabamento impecável."
              },
              {
                icon: <Sparkles size={32} strokeWidth={1.5} />,
                title: "Cílios e Unhas no Mesmo Lugar",
                desc: "Praticidade de renovar o olhar e as mãos com quem domina com maestria os dois segmentos da beleza."
              }
            ].map((dif, idx) => (
              <div 
                key={idx} 
                className="glass-card rounded-2xl p-8 text-center flex flex-col items-center hover:border-[#E093A3]/50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#E093A3]/20 to-[#E093A3]/5 border border-[#E093A3]/30 flex items-center justify-center text-[#E093A3] mb-6 group-hover:scale-110 transition-transform">
                  {dif.icon}
                </div>
                <h3 className="font-playfair text-lg font-bold text-white mb-3 group-hover:text-[#E093A3] transition-colors">{dif.title}</h3>
                <p className="text-xs text-gray-300 font-montserrat leading-relaxed">{dif.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOBRE MAYARA BALBINO --- */}
      <section id="sobre" className="py-24 px-4 sm:px-6 relative overflow-hidden scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 md:p-16 relative overflow-hidden border border-[#E093A3]/20 shadow-2xl">
            
            {/* Watermark Background Decorative Text */}
            <div className="absolute -right-6 -bottom-12 text-[200px] sm:text-[320px] font-greatvibes text-white/[0.02] leading-none select-none pointer-events-none">
              Mayara
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Lado Esquerdo - Título e Experiência */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2">
                  <div className="w-8 h-[2px] bg-[#E093A3]"></div>
                  <span className="text-[#E093A3] text-xs font-montserrat tracking-widest uppercase">Sobre Mim</span>
                </div>
                
                <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  Olá, me chamo <br />
                  <span className="text-[#E093A3] font-greatvibes text-4xl sm:text-6xl italic font-normal">{DADOS.nome}</span>.
                </h2>
                
                <p className="text-gray-400 font-montserrat text-sm italic">
                  Especialista apaixonada pela arte de elevar a autoestima feminina desde 2014.
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="font-playfair text-2xl font-bold text-[#E093A3] block">+10</span>
                    <span className="text-[10px] font-montserrat uppercase text-gray-400 tracking-wider">Anos de Carreira</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="font-playfair text-2xl font-bold text-[#E093A3] block">Colombo</span>
                    <span className="text-[10px] font-montserrat uppercase text-gray-400 tracking-wider">Paraná</span>
                  </div>
                </div>
              </div>
              
              {/* Lado Direito - História e Compromissos */}
              <div className="lg:col-span-7 space-y-6">
                <p className="text-gray-300 text-sm sm:text-base font-montserrat leading-relaxed">
                  Dedico minha jornada profissional em Colombo a entregar mais do que procedimentos estéticos: entrego confiança, praticidade e bem-estar para o seu dia a dia.
                </p>
                <p className="text-gray-300 text-sm sm:text-base font-montserrat leading-relaxed">
                  Trabalho com técnicas de extensão de cílios com isolamento perfeito e saúde dos fios mantida intacta, além de nail design com curvatura C refinada e durabilidade real.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {[
                    "Procedimentos indolores e confortáveis",
                    "Materiais importados e hipoalergênicos",
                    "Atendimento atencioso e sem pressa",
                    "Garantia de retenção e durabilidade"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                      <CheckCircle2 className="text-[#E093A3] shrink-0" size={18} />
                      <span className="text-xs font-montserrat text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- DEPOIMENTOS DAS CLIENTES (ESTILO WHATSAPP REALISTA) --- */}
      <section id="depoimentos" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <span className="text-xs font-montserrat tracking-[4px] uppercase text-[#E093A3] block mb-2">Opinião de quem conhece</span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">O Que Dizem Nossas Clientes</h2>
          <p className="text-gray-400 text-sm sm:text-base font-montserrat max-w-xl mx-auto">
            Mensagens reais recebidas no nosso WhatsApp após os atendimentos.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden bg-[#121212]">
          
          {/* Background Micro Dots Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#E093A3 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

          <div className="flex flex-col gap-6 max-w-2xl mx-auto relative z-10">
            {[
              { 
                nome: "Ana Paula G.", 
                tempo: "14:32", 
                texto: "May, passando pra te agradecer de coração! Meus cílios continuam perfeitos após 3 semanas. Ficou mega confortável e nem sinto que estou usando extensão. Você arrasa demais! 😍✨" 
              },
              { 
                nome: "Juliana M.", 
                tempo: "10:15", 
                texto: "Gente, minhas unhas duraram 25 dias intactas! 😱 Fiz o alongamento em gel com você e me surpreendi com a resistência e a delicadeza do acabamento. Já quero deixar marcada minha manutenção!" 
              },
              { 
                nome: "Camila R.", 
                tempo: "18:40", 
                texto: "Atendimento maravilhoso e super pontual. O espaço é uma delícia e o resultado ficou exatamente como eu queria. Amei muito! ❤️" 
              }
            ].map((msg, idx) => (
              <div key={idx} className="flex flex-col gap-1.5 w-full sm:w-[90%] self-start">
                <span className="text-xs font-montserrat text-[#E093A3] font-semibold ml-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E093A3]"></span> {msg.nome}
                </span>
                
                <div className="bg-[#1E1E1E] border border-white/10 p-5 rounded-2xl rounded-tl-none relative shadow-lg">
                  <p className="text-sm sm:text-base text-gray-100 font-montserrat leading-relaxed pr-8 whitespace-pre-wrap">
                    {msg.texto}
                  </p>
                  
                  <div className="flex items-center justify-end gap-1.5 mt-2">
                    <span className="text-[10px] text-gray-500 font-montserrat">{msg.tempo}</span>
                    <CheckCheck size={16} className="text-[#53BDEB]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-montserrat text-gray-400">
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={16} className="fill-amber-400" />
              <Star size={16} className="fill-amber-400" />
              <Star size={16} className="fill-amber-400" />
              <Star size={16} className="fill-amber-400" />
              <Star size={16} className="fill-amber-400" />
            </div>
            <span><strong>100% de Aprovação</strong> — Depoimentos autênticos enviados via WhatsApp</span>
          </div>

        </div>
      </section>

      {/* --- DÚVIDAS FREQUENTES (FAQ) --- */}
      <section id="faq" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <span className="text-xs font-montserrat tracking-[4px] uppercase text-[#E093A3] block mb-2">Tire suas dúvidas</span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">Perguntas Frequentes</h2>
          <p className="text-gray-400 text-sm font-montserrat">
            Tudo o que você precisa saber antes de realizar seu agendamento.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="glass-card rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button 
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="font-playfair text-base sm:text-lg font-bold text-white hover:text-[#E093A3] transition-colors">
                    {item.pergunta}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`text-[#E093A3] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm text-gray-300 font-montserrat leading-relaxed border-t border-white/5 animate-fadeIn">
                    {item.resposta}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* --- LOCALIZAÇÃO & HORÁRIOS --- */}
      <section id="endereco" className="py-24 px-4 sm:px-6 bg-[#141414] border-t border-white/5 scroll-mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Informações do Studio */}
          <div>
            <span className="text-xs font-montserrat tracking-[4px] uppercase text-[#E093A3] block mb-2">Venha nos conhecer</span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-8">Localização do Studio</h2>

            <div className="space-y-6 mb-8">
              
              {/* Card Endereço */}
              <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E093A3]/10 border border-[#E093A3]/30 flex items-center justify-center shrink-0 text-[#E093A3]">
                  <MapPin size={22} />
                </div>
                <div className="flex-1">
                  <h4 className="font-playfair text-lg font-bold text-white mb-1">Endereço</h4>
                  <p className="text-sm text-gray-300 font-montserrat leading-relaxed mb-3">
                    {DADOS.endereco}
                  </p>
                  
                  <button 
                    onClick={copyAddress} 
                    className="inline-flex items-center gap-2 text-xs font-montserrat text-[#E093A3] hover:underline"
                  >
                    <Copy size={14} />
                    <span>{copied ? "✓ Endereço Copiado!" : "Copiar Endereço"}</span>
                  </button>
                </div>
              </div>

              {/* Card Horários */}
              <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E093A3]/10 border border-[#E093A3]/30 flex items-center justify-center shrink-0 text-[#E093A3]">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="font-playfair text-lg font-bold text-white mb-1">Horários de Atendimento</h4>
                  <p className="text-sm text-gray-300 font-montserrat leading-relaxed">
                    {DADOS.horarios}
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-montserrat text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    ● Atendimentos com hora marcada
                  </span>
                </div>
              </div>

            </div>

            {/* Navigation App Links */}
            <div className="flex flex-wrap gap-4">
              <a 
                href={DADOS.mapsLink} 
                target="_blank" 
                rel="noreferrer" 
                className="flex-1 min-w-[160px] bg-[#E093A3] text-[#0D0D0D] py-3.5 px-6 rounded-full font-montserrat font-semibold text-xs tracking-wider uppercase hover:bg-[#F2C4CE] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Navigation size={16} />
                Abrir no Google Maps
              </a>
              <a 
                href={DADOS.wazeLink} 
                target="_blank" 
                rel="noreferrer" 
                className="flex-1 min-w-[160px] glass-card text-white py-3.5 px-6 rounded-full font-montserrat font-semibold text-xs tracking-wider uppercase hover:border-[#E093A3]/50 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink size={16} className="text-[#E093A3]" />
                Abrir no Waze
              </a>
            </div>
          </div>

          {/* Iframe Mapa Interativo */}
          <div className="h-[420px] rounded-3xl overflow-hidden glass-card border border-[#E093A3]/30 shadow-2xl relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.3456382092147!2d-49.19163232371901!3d-25.326207828456636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce9d08e58a74b%3A0xc62b719001b978d2!2sR.%20Gen%C3%A9sio%20Moreschi%2C%20303%20-%20Guaraituba%2C%20Colombo%20-%20PR%2C%2083410-000!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5e0!3m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de localização do Studio Mayara Balbino"
            ></iframe>
          </div>

        </div>
      </section>

      {/* --- INSTAGRAM CALLOUT --- */}
      <section className="py-20 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#E093A3]/30 shadow-2xl relative overflow-hidden">
          <Instagram size={48} strokeWidth={1.2} className="text-[#E093A3] mx-auto mb-6 animate-pulse" />
          
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-3">
            Acompanhe no Instagram
          </h2>
          
          <p className="text-gray-300 text-sm sm:text-base font-montserrat mb-8 max-w-md mx-auto">
            Confira novos resultados diários, dicas de cuidados e bastidores no perfil oficial.
          </p>
          
          <a 
            href={DADOS.instagramLink} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E093A3] to-[#F2C4CE] text-[#0D0D0D] px-8 py-3.5 rounded-full font-montserrat font-semibold text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-[0_0_20px_rgba(224,147,163,0.3)]"
          >
            <span>@{DADOS.instagram}</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* --- FOOTER COMPLETO --- */}
      <footer className="border-t border-[#E093A3]/20 bg-[#0A0A0A] pt-16 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 text-center md:text-left">
          
          {/* Coluna 1: Marca */}
          <div>
            <p className="font-playfair text-2xl font-bold text-white mb-2">{DADOS.nome}</p>
            <p className="text-xs font-montserrat text-[#E093A3] tracking-[2px] uppercase mb-4">{DADOS.titulo}</p>
            <p className="text-xs text-gray-400 font-montserrat leading-relaxed max-w-xs">
              Extensão de cílios e nail design com excelência, biossegurança e atendimento exclusivo em Colombo, PR.
            </p>
          </div>

          {/* Coluna 2: Contato & Endereço */}
          <div>
            <h4 className="font-montserrat font-semibold text-white mb-4 uppercase tracking-widest text-xs">Endereço & Contato</h4>
            <p className="text-xs text-gray-300 font-montserrat mb-2 leading-relaxed">{DADOS.endereco}</p>
            <p className="text-xs text-gray-300 font-montserrat mb-2">WhatsApp: {DADOS.whatsappFormatado}</p>
            <p className="text-xs text-gray-300 font-montserrat">Instagram: @{DADOS.instagram}</p>
          </div>

          {/* Coluna 3: Horários */}
          <div>
            <h4 className="font-montserrat font-semibold text-white mb-4 uppercase tracking-widest text-xs">Horários de Atendimento</h4>
            <p className="text-xs text-gray-300 font-montserrat mb-2">{DADOS.horarios}</p>
            <p className="text-[11px] text-amber-300/80 font-montserrat">⚠️ Somente com horário agendado antecipadamente.</p>
          </div>

        </div>

        <div className="max-w-6xl mx-auto text-center border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-500 font-montserrat">
            © {new Date().getFullYear()} {DADOS.nome}. Todos os direitos reservados.
          </p>
          <p className="text-[10px] text-gray-500 font-montserrat tracking-wider uppercase">
            Designed for Luxury Beauty
          </p>
        </div>
      </footer>

      {/* --- BOTÃO FLUTUANTE WHATSAPP (DESKTOP E MOBILE) --- */}
      <a 
        href={DADOS.whatsappLinkPadrao}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_25px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Agendar via WhatsApp"
      >
        <span className="absolute -top-10 right-0 bg-[#0D0D0D] text-[#25D366] text-[11px] font-montserrat font-bold px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-[#25D366]/40 pointer-events-none shadow-md">
          Falar no WhatsApp
        </span>
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>

    </div>
  );
}
