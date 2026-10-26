import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, AudioLines, ExternalLink, Github, Menu, Sparkles, X } from 'lucide-react'
import profilePhoto from './img/lufika.webp'
import ProjectsGallery from './components/ProjectsGallery'
import CertificatesGallery from './components/CertificatesGallery'
import ToolsWorkstation from './components/ToolsWorkstation'
import { certificates } from './data/certificates'
import { projects } from './data/projects'

function App() {
  const [mobileNav, setMobileNav] = useState(false)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const update = () => setClock(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' }).format(new Date()))
    update()
    const timer = setInterval(update, 60000)
    return () => clearInterval(timer)
  }, [])

  return <div className="site-shell">
    <div className="grain" aria-hidden="true" />
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Luvi Asakura home"><span className="brand-mark">LA</span><span>LUVI ASAKURA<span className="brand-sub">DIGITAL ARCHIVE / 2026</span></span></a>
      <nav className={mobileNav ? 'nav-open' : ''}>
        <a href="#about" onClick={() => setMobileNav(false)}>About</a>
        <a href="#archive" onClick={() => setMobileNav(false)}>Toolkit</a>
        <a href="#work" onClick={() => setMobileNav(false)}>Selected work</a>
        <a href="#certificates" onClick={() => setMobileNav(false)}>Certificates</a>
        <a href="#contact" onClick={() => setMobileNav(false)}>Contact <ArrowUpRight size={12}/></a>
      </nav>
      <div className="topbar-right"><span className="status"><i/> AVAILABLE FOR OPPORTUNITIES</span><button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle menu">{mobileNav ? <X/> : <Menu/>}</button></div>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-index"><span>PERSONAL PORTFOLIO</span><span>001 — 004</span></div>
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={13}/> DESIGN MEETS INTELLIGENCE</p>
          <h1>Curiosity,<br/><em>filed</em> into form<span className="hero-period">.</span></h1>
          <div className="hero-bottom">
            <p className="hero-description">I’m Lufika Ayu Fatimah — a Junior AI Engineer & Web Designer exploring thoughtful interfaces, creative code, and human-centered AI.</p>
            <a href="#archive" className="round-link" aria-label="Explore archive"><ArrowDownRight size={22}/></a>
          </div>
        </div>
        <div className="hero-side-note"><span>FIG. 01</span><span>AN ONGOING STUDY<br/>OF DIGITAL THINGS</span></div>
        <div className="hero-stamp"><span>DESIGN</span><span>×</span><span>TECH</span><span>×</span><span>HUMAN</span></div>
      </section>

      <section className="about-section" id="about">
        <div className="section-heading">
          <div><p className="eyebrow">/ ABOUT THE AUTHOR</p><h2>A little about me<span>.</span></h2></div>
          <p className="section-note">The person behind the pixels.<br/>A curious mind, always learning.</p>
        </div>
        <div className="about-card">
          <div className="about-index"><span>PERSONAL FILE</span><b>001</b><span>LUVI ASAKURA<br/>BEKASI, INDONESIA</span></div>
          <figure className="about-photo">
            <img src={profilePhoto} alt="Luvi Asakura" width="640" height="1152" loading="lazy" decoding="async" />
            <figcaption>FIG. 01 / LUVI</figcaption>
          </figure>
          <div className="about-copy">
            <p className="eyebrow">HELLO, I’M LUVI</p>
            <p className="about-intro">An Information Technology student exploring the space between thoughtful interfaces and useful AI.</p>
            <p className="about-description">I enjoy turning ideas into digital experiences that feel clear, human, and a little unexpected. From shaping an interface in Figma to bringing it to life on the web, I’m happiest when I’m learning by making.</p>
            <div className="about-tags"><span>UI/UX DESIGN</span><span>FRONTEND</span><span>GENERATIVE AI</span></div>
          </div>
        </div>
      </section>

      <ToolsWorkstation />

      <ProjectsGallery projects={projects} />

      <CertificatesGallery certificates={certificates} />

      <section className="manifesto">
        <div className="manifesto-left"><p className="eyebrow">/ WORKING PRINCIPLE</p><h2>Make it useful.<br/><em>Make it feel.</em></h2></div>
        <div className="manifesto-right"><AudioLines size={24}/><p>Good digital work lives somewhere between logic and feeling. I’m interested in the space where clear design makes complex technology easier to approach.</p><span>NOTE_005 — IN PROGRESS</span></div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-top"><p className="eyebrow">/ END OF FILE? NOT QUITE.</p><span>STATUS: OPEN TO CONNECTIONS</span></div>
        <h2>Have a good<br/><em>question?</em></h2>
        <div className="contact-bottom"><p>Let’s talk about design, AI, web projects, or the next thing worth figuring out.</p><a href="mailto:hello@luvi.example" className="contact-button">GET IN TOUCH <ArrowUpRight size={16}/></a></div>
      </section>
    </main>

    <footer className="footer">
      <a className="brand footer-brand" href="#top"><span className="brand-mark">LA</span><span>LUVI ASAKURA<span className="brand-sub">DIGITAL ARCHIVE / 2026</span></span></a>
      <div className="footer-center"><span>DESIGNED WITH CURIOSITY</span><span>BEKASI, INDONESIA · {clock || '--:--'} WIB</span></div>
      <div className="footer-links"><a href="https://github.com/lufikaZkl30" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a href="mailto:hello@luvi.example" aria-label="Email"><ExternalLink size={16}/></a><span>© 2026</span></div>
    </footer>
  </div>
}

export default App
