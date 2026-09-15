import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Instagram, Menu, X } from 'lucide-react';

const images = {
  hero: '/images/training/Football_Basics_onder_nachtlicht.png',
  training: '/images/training/PXL_20250910_131029577.jpg',
  skills: '/images/training/PXL_20251001_134832706.MP.jpg',
  philosophy: '/images/training/PXL_20251019_093221285_(1).jpg',
  cta: '/images/training/PXL_20251105_144426083.MP_(1).jpg',
};

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Training', href: '#training' },
  { label: 'Over Football Basics', href: '#over-ons' },
  { label: 'Prijzen', href: '#prijzen' },
  { label: 'Contact', href: '#contact' },
];

const trainingCards = [
  { eyebrow: '01 / techniek', title: 'Techniektraining', description: 'De basis voor iedere voetballer. Train je balcontrole, passing, eerste aanname, techniek en beweging.', image: images.training },
  { eyebrow: '02 / persoonlijk', title: 'Individuele training', description: 'Alle aandacht voor jouw ontwikkeling. Persoonlijke training afgestemd op de speler.', image: images.philosophy },
  { eyebrow: '03 / samen', title: 'Teamtraining', description: 'Samen beter worden. Extra techniek en ontwikkeling voor een volledig team.', image: images.cta },
];

const skillWords = [
  { word: 'Control.', detail: 'Voel de bal.', image: images.skills },
  { word: 'Pass.', detail: 'Speel vooruit.', image: images.training },
  { word: 'Move.', detail: 'Blijf in beweging.', image: images.philosophy },
  { word: 'Create.', detail: 'Zie de ruimte.', image: images.cta },
  { word: 'Play.', detail: 'Maak plezier.', image: images.hero },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand-lockup ${compact ? 'brand-lockup-footer' : ''}`} href="#home" aria-label="Football Basics home">
      <img className="brand-logo-full" src="/images/branding/ChatGPT_Image_14_sep_2026,_22_18_33.png" alt="Football Basics" />
      <img className="brand-logo-crest" src="/images/branding/ChatGPT_Image_14_sep_2026,_22_19_36.png" alt="Football Basics" />
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [philosophyVisible, setPhilosophyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const section = document.querySelector('.philosophy');
    if (!section) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setPhilosophyVisible(true);
    }, { threshold: 0.3 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(max-width: 850px)').matches) return;
    const panels = Array.from(document.querySelectorAll<HTMLElement>('.skill-panel'));
    if (!panels.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-active', entry.isIntersecting && entry.intersectionRatio > 0.5);
      });
    }, { threshold: [0.5, 0.7], rootMargin: '-20% 0px -20% 0px' });
    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Hoofdnavigatie">{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
          <a className="nav-cta" href="#proeftraining">Proeftraining <ArrowRight size={16} /></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'} aria-expanded={menuOpen}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>{navItems.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}<ArrowRight size={18} /></a>)}<a className="mobile-menu-cta" href="#proeftraining" onClick={closeMenu}>Gratis proeftraining <ArrowRight size={18} /></a></div>
      </header>

      <main>
        <section className="hero" id="home">
          <img className="hero-image" src={images.hero} alt="Football Basics voetbalvlag op een kunstgrasveld" />
          <div className="hero-overlay" />
          <div className="hero-content page-width"><p className="kicker light"><span /> Het begint bij de basis</p><h1>More skills.<br /><em>More fun.</em></h1><p className="hero-intro">Beter aan de bal.<br />Meer vertrouwen.<br />Meer plezier in het spel.</p><div className="hero-actions"><a className="button button-red" href="#proeftraining">Gratis proeftraining <ArrowRight size={18} /></a><a className="text-link light" href="#training">Bekijk de trainingen <ArrowDownRight size={18} /></a></div></div>
          <div className="scroll-cue"><span /> Scroll om te ontdekken</div>
        </section>

        <section className={`philosophy section-black ${philosophyVisible ? 'is-revealed' : ''}`} id="over-ons"><div className="page-width philosophy-grid"><div className="section-index">01 <span>—</span> de basis</div><div className="philosophy-copy"><h2>Better starts<br /><em>with the basics.</em></h2><div className="philosophy-lines"><p>Een betere aanname.<br />Een strakkere pass.<br />Meer controle over de bal.<br />Een actie durven maken.</p><p className="philosophy-lead">Hoe meer je met een bal kunt,<br />hoe leuker voetbal wordt.</p></div></div></div><div className="red-rule" /></section>

        <section className="training section-black" id="training"><div className="page-width"><div className="section-heading split-heading"><div><p className="kicker"><span /> Trainingen</p><h2>Train<br /><em>with us.</em></h2></div><p className="section-intro">Voor spelers die beter willen worden<br className="desktop-only" /> door te trainen op de basics.</p></div><div className="training-grid">{trainingCards.map((card, index) => <a href="#proeftraining" className={`training-card training-card-${index + 1}`} key={card.title}><img src={card.image} alt={card.title} loading="lazy" /><div className="card-overlay" /><div className="card-content"><p className="card-eyebrow">{card.eyebrow}</p><h3>{card.title}</h3><p>{card.description}</p><span className="card-arrow"><ArrowUpRight size={24} /></span></div><span className="card-red-line" /></a>)}</div></div></section>

        <section className="skills-section section-black"><div className="page-width skills-top"><p className="kicker"><span /> The skills experience</p><p className="skills-note">Vijf dingen die alles veranderen<br />wanneer je ze beheerst.</p></div><div className="skills-track">{skillWords.map((skill, index) => <article className="skill-panel" data-index={index} tabIndex={0} key={skill.word}><img src={skill.image} alt="Voetbaltraining" loading="lazy" /><div className="skill-panel-overlay" /><div className="skill-panel-content"><span>0{index + 1}</span><h2>{skill.word}</h2><p>{index === 0 ? 'Beheers de bal.' : index === 1 ? 'Speel met intentie.' : index === 2 ? 'Blijf in beweging.' : index === 3 ? 'Benut de ruimte.' : 'Geniet van het spel.'}</p></div></article>)}</div><div className="skills-principle"><span className="principle-line" /><p>Jij bepaalt wat de bal doet.<br /><em>Niet andersom.</em></p></div></section>

        <section className="practical section-cream" id="prijzen"><div className="page-width practical-grid"><div className="practical-title"><p className="kicker dark"><span /> Praktisch</p><h2>Trainen bij<br /><em>Football Basics.</em></h2><p>Geen gedoe. Gewoon lekker trainen, beter worden en met meer plezier spelen.</p></div><div className="schedule-wrap"><div className="schedule-row"><div><strong>Woensdag</strong><span>16:00 – 17:00</span></div><p>Techniektraining</p></div><div className="schedule-row"><div><strong>Zondag</strong><span>11:00 – 12:30</span></div><p>Techniektraining<br /><small>Forum Sport / Voorburg</small></p></div><div className="price-line"><span>Techniektraining vanaf</span><strong>€16 <small>per training</small></strong></div><div className="practical-actions"><a className="button button-dark" href="#training">Bekijk trainingen <ArrowRight size={17} /></a><a className="text-link dark" href="#contact">Bekijk prijzen <ArrowRight size={16} /></a></div></div></div></section>

        <section className="numbers section-black"><div className="page-width"><div className="numbers-heading"><p className="kicker"><span /> Football Basics in numbers</p><p>Precies tellen doen we niet.<br />Wel altijd doortrainen.</p></div><div className="numbers-grid"><div><strong>Veel</strong><span>spelers<br />getraind</span></div><div><strong>Veel</strong><span>trainingen<br />gegeven</span></div><div><strong>Heel veel</strong><span>regendruppels</span></div><div><strong>Ontelbare</strong><span>balcontacten</span></div><div><strong>Net te weinig</strong><span>ballen in de kruising</span></div></div></div></section>

        <section className="statement-image"><img src={images.philosophy} alt="Speler op het voetbalveld tijdens training" loading="lazy" /><div className="statement-overlay" /><div className="statement-content page-width"><p className="kicker light"><span /> Waarom we trainen</p><h2>More skills.<br /><em>More fun.</em></h2><p className="statement-small">Dat is geen slogan.<br />Het is waarom we trainen.</p><p className="statement-body">Meer techniek geeft een speler meer mogelijkheden.<br />Meer mogelijkheden geven vertrouwen.<br />En met vertrouwen wordt voetbal simpelweg leuker.</p></div></section>

        <section className="final-cta" id="proeftraining"><img src={images.cta} alt="Voetbal op een veld tijdens de training" loading="lazy" /><div className="final-overlay" /><div className="final-content page-width"><p className="kicker light"><span /> Klaar om te spelen?</p><h2>Ready<br /><em>to play?</em></h2><p>Kom gewoon een keer meetrainen.<br />Ontdek tijdens een gratis proeftraining<br className="mobile-only" /> of Football Basics bij jou past.</p><a className="button button-red" href="mailto:info@footballbasics.nl">Plan een gratis proeftraining <ArrowRight size={18} /></a></div></section>
      </main>

      <footer className="site-footer" id="contact"><div className="page-width footer-grid"><div><Logo compact /><p className="footer-note">More skills, more fun.</p></div><div className="footer-nav"><p className="footer-label">Menu</p><a href="#training">Training</a><a href="#prijzen">Prijzen</a><a href="#proeftraining">Proeftraining</a><a href="#contact">Contact</a></div><div className="footer-social"><p className="footer-label">Volg ons</p><a href="https://www.instagram.com" target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a></div></div><div className="page-width footer-bottom"><span>© 2025 Football Basics</span><div><a href="#contact">Privacy</a><a href="#contact">Algemene voorwaarden</a></div></div></footer>
    </div>
  );
}

export default App;
