import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  CheckCircle2, ChevronRight, Monitor, Award, Users,
  TrendingUp, BookOpen, Code2, PenTool, Briefcase, LineChart, ArrowRight,
  Sparkles, Globe, Zap, GraduationCap,
} from 'lucide-react';

/* ─── Hero photo collage — étudiants africains noirs ────────────── */
const COL1 = [
  {
    url: 'https://i.pinimg.com/736x/3a/21/05/3a21056d0c7ecee88d38c2529f3abad8.jpg',
    bg: '#F59E0B',
    h: 'h-[380px]',
  },
  {
    url: 'https://i.pinimg.com/736x/b2/db/0b/b2db0be191eaf907636fa3a784ca6c89.jpg',
    bg: '#EF4444',
    h: 'h-[420px]',
  },
];

const COL2 = [
  {
    url: 'https://i.pinimg.com/1200x/bd/f7/75/bdf775b3d21740d3f3488c20d6899e5b.jpg',
    bg: '#6366F1',
    h: 'h-[440px]',
  },
  {
    url: 'https://i.pinimg.com/1200x/bc/46/90/bc46905c94e19ce19fdda2634a904741.jpg',
    bg: '#8B5CF6',
    h: 'h-[340px]',
  },
];

const COL3 = [
  {
    url: 'https://i.pinimg.com/736x/c3/3c/3a/c33c3a89c519dc548fbbbcbb5969f2f7.jpg',
    bg: '#10B981',
    h: 'h-[360px]',
  },
  {
    url: 'https://i.pinimg.com/736x/3f/f1/aa/3ff1aa2267e64dcfb68fb5551e4f75d5.jpg',
    bg: '#0EA5E9',
    h: 'h-[400px]',
  },
];

/* ─── Programs ───────────────────────────────────────────────────── */
const PROGRAMS = [
  {
    title: 'Licence Design UI/UX',
    badge: 'Créatif',
    badgeColor: 'bg-amber-50 text-amber-700 border border-amber-200',
    icon: <PenTool size={22} />,
    iconBg: 'bg-amber-50 text-amber-600',
    desc: 'Concevez des expériences utilisateurs exceptionnelles. Maîtrisez le Design Thinking, Figma et les principes d\'accessibilité.',
    features: ['Design Thinking & Wireframing', 'Prototypage Figma avancé'],
    price: '300 000',
  },
  {
    title: 'Master Ingénierie Logicielle',
    badge: 'Tech',
    badgeColor: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    icon: <Code2 size={22} />,
    iconBg: 'bg-indigo-50 text-indigo-600',
    desc: 'Devenez architecte logiciel. Fullstack, DevOps, Cloud et microservices. Les compétences les plus demandées du marché.',
    features: ['Java, Python, Node.js', 'Architecture Cloud & DevOps'],
    price: '450 000',
  },
  {
    title: 'MBA Finance d\'Entreprise',
    badge: 'Business',
    badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    icon: <LineChart size={22} />,
    iconBg: 'bg-emerald-50 text-emerald-600',
    desc: 'Expertise en analyse financière, audit, contrôle de gestion et stratégie d\'investissement pour les marchés africains.',
    features: ['Modélisation financière', 'Gestion des risques'],
    price: '550 000',
  },
  {
    title: 'Master Management Stratégique',
    badge: 'Leadership',
    badgeColor: 'bg-violet-50 text-violet-700 border border-violet-200',
    icon: <Briefcase size={22} />,
    iconBg: 'bg-violet-50 text-violet-600',
    desc: 'Développez votre leadership pour piloter des équipes et des projets d\'envergure internationale avec impact.',
    features: ['Gestion de projet Agile', 'Stratégie d\'entreprise'],
    price: '480 000',
  },
  {
    title: 'Bachelor Design Graphique',
    badge: 'Art',
    badgeColor: 'bg-rose-50 text-rose-700 border border-rose-200',
    icon: <PenTool size={22} />,
    iconBg: 'bg-rose-50 text-rose-600',
    desc: 'Communication visuelle, identité de marque et outils créatifs numériques. Du concept à la réalisation finale.',
    features: ['Adobe Suite complète', 'Motion Design & Branding'],
    price: '320 000',
  },
  {
    title: 'Licence Développement Web',
    badge: 'Code',
    badgeColor: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
    icon: <BookOpen size={22} />,
    iconBg: 'bg-cyan-50 text-cyan-600',
    desc: 'Les fondamentaux solides du web. HTML5, CSS3, JavaScript, React et bases de données pour créer des apps modernes.',
    features: ['React, Node.js, bases SQL', 'Projets professionnels réels'],
    price: '350 000',
  },
];

/* ─── Avantages ──────────────────────────────────────────────────── */
const AVANTAGES = [
  {
    icon: <Monitor size={24} />,
    iconBg: 'bg-indigo-50 text-indigo-600',
    title: 'Plateforme Intuitive',
    desc: 'Accédez à vos cours, notes et paiements depuis n\'importe où. Interface pensée pour les étudiants africains.',
  },
  {
    icon: <Award size={24} />,
    iconBg: 'bg-amber-50 text-amber-600',
    title: 'Diplômes Reconnus',
    desc: 'Formations créditées ECTS, reconnues par l\'État et validées par les employeurs des meilleures entreprises.',
  },
  {
    icon: <Users size={24} />,
    iconBg: 'bg-emerald-50 text-emerald-600',
    title: 'Mentorat Expert',
    desc: 'Suivi personnalisé par des professionnels actifs. Un mentor dédié pour chaque étudiant tout au long du cursus.',
  },
  {
    icon: <TrendingUp size={24} />,
    iconBg: 'bg-violet-50 text-violet-600',
    title: 'Insertion Professionnelle',
    desc: '92% de nos diplômés trouvent un poste dans les 3 mois. Réseau de 150+ partenaires employeurs actifs.',
  },
];

/* ─── Photo Column ───────────────────────────────────────────────── */
interface Photo { url: string; bg: string; h: string }
function PhotoColumn({ photos, offsetTop = false }: { photos: Photo[]; offsetTop?: boolean }) {
  return (
    <div className={`flex flex-col gap-5 ${offsetTop ? 'mt-16' : ''}`}>
      {photos.map((p, i) => (
        <div
          key={i}
          className={`rounded-[80px] overflow-hidden ${p.h} w-full shrink-0`}
          style={{ backgroundColor: p.bg }}
        >
          <img
            src={p.url}
            alt="Étudiant"
            className="w-full h-full object-cover object-top"
          />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full bg-white overflow-x-hidden">

      {/* ═══ HERO ════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-6">
        {/* Subtle gradient blobs */}
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-indigo-100/60 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] bg-violet-100/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_580px] gap-8 xl:gap-10 items-center py-6">

          {/* LEFT — texte */}
          <div className="flex flex-col gap-6 max-w-xl lg:max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-widest"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Rentrée 2025-2026 — Inscriptions ouvertes
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-5xl md:text-6xl xl:text-7xl font-display font-bold text-slate-900 leading-[1.06] tracking-tight"
            >
              Formez les <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">Leaders</span> de Demain.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-slate-500 text-base md:text-lg leading-relaxed max-w-xl"
            >
              Une université digitale d'excellence. Formations certifiées, corps professoral expert
              et réseau d'alumni international pour propulser votre carrière.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200 hover:-translate-y-0.5"
              >
                S'inscrire maintenant <ArrowRight size={16} />
              </Link>
              <a
                href="#filieres"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-600 border border-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200"
              >
                Découvrir les filières
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              {['Licence BAC+3', 'Master BAC+5', 'MBA Executive', 'Cours du soir'].map((cat) => (
                <span key={cat} className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 border border-slate-200 text-slate-500">
                  {cat}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — collage photos étudiants africains */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.3 }}
            className="hidden lg:grid grid-cols-3 gap-5 relative z-[60]"
          >
            <PhotoColumn photos={COL1} />
            <PhotoColumn photos={COL2} offsetTop />
            <PhotoColumn photos={COL3} />
          </motion.div>

        </div>
      </section>

      {/* ═══ STATS BAR ══════════════════════════════════════════════ */}
      <section className="border-y border-slate-200 bg-slate-50/80 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '5 000+', label: 'Étudiants actifs' },
            { value: '98%', label: 'Taux de réussite' },
            { value: '6', label: 'Filières d\'élite' },
            { value: '150+', label: 'Partenaires emploi' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <p className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ PROGRAMMES ═════════════════════════════════════════════ */}
      <section id="filieres" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-indigo-600 font-semibold uppercase tracking-widest text-xs">Nos Programmes</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-3 mb-4">
              Choisissez votre voie d'excellence
            </h2>
            <p className="text-slate-500 leading-relaxed">
              Des cursus adaptés aux besoins du marché africain et international, du Design à la Finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map((prog, i) => (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100/60"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${prog.iconBg}`}>
                    {prog.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${prog.badgeColor}`}>
                    {prog.badge}
                  </span>
                </div>
                <h3 className="text-base font-display font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {prog.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">{prog.desc}</p>
                <div className="space-y-1.5 mb-5">
                  {prog.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-500">
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-auto">
                  <span className="text-base font-bold text-slate-900 font-display">
                    {prog.price} <span className="text-slate-400 font-normal text-xs">FCFA/an</span>
                  </span>
                  <Link to="/register" className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                    Postuler <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AVANTAGES ══════════════════════════════════════════════ */}
      <section id="avantages" className="py-24 px-6 bg-slate-50/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <span className="text-indigo-600 font-semibold uppercase tracking-widest text-xs">Pourquoi SCHOOLAP ?</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-3 mb-4 leading-tight">
              Une pédagogie innovante tournée vers l'avenir.
            </h2>
            <p className="text-slate-500 mb-10 leading-relaxed">
              SCHOOLAP réinvente l'expérience universitaire avec une plateforme tout-en-un qui simplifie chaque étape de votre parcours académique.
            </p>
            <div className="space-y-6">
              {AVANTAGES.map((av, i) => (
                <motion.div
                  key={av.title}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.09 }}
                  className="flex gap-4"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${av.iconBg}`}>
                    {av.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-slate-900 mb-1">{av.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{av.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Illustration visuelle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 flex flex-col justify-between"
          >
            {/* Decorative circles */}
            <div className="absolute top-[-40px] right-[-40px] w-[200px] h-[200px] bg-white/10 rounded-full" />
            <div className="absolute bottom-[-60px] left-[-30px] w-[250px] h-[250px] bg-white/5 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-white/5 rounded-full blur-sm" />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-white/90 font-display font-bold text-lg">SCHOOLAP</p>
                  <p className="text-white/60 text-xs">Université Digitale</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4">
              {[
                { icon: <Sparkles size={20} />, label: 'IA Adaptive', value: 'Apprentissage personnalisé' },
                { icon: <Globe size={20} />, label: 'Global', value: '15+ pays connectés' },
                { icon: <Zap size={20} />, label: 'Certifié', value: 'Diplômes ECTS' },
                { icon: <BookOpen size={20} />, label: 'Bibliothèque', value: '2 000+ ressources' },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="text-white/80 mb-2">{item.icon}</div>
                  <p className="text-white font-semibold text-sm mb-0.5">{item.label}</p>
                  <p className="text-white/60 text-xs">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + n)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">+5 000 étudiants</p>
                  <p className="text-white/60 text-xs">rejoints cette année</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-3xl px-8 py-14"
          >
            <span className="text-indigo-600 font-semibold uppercase tracking-widest text-xs">Rejoignez-nous</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-3 mb-4">
              Prêt à commencer votre aventure ?
            </h2>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto leading-relaxed">
              Plus de 5 000 étudiants ont déjà choisi SCHOOLAP. La rentrée 2025-2026 est ouverte. Rejoignez la prochaine génération de leaders africains.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200 hover:-translate-y-0.5"
              >
                Commencer l'inscription <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm text-slate-600 border border-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200"
              >
                Déjà inscrit ? Se connecter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
