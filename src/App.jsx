import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, AudioLines, Braces, Check, Code2, Command, ExternalLink, Folder, FolderOpen, Github, Layers3, Menu, Moon, Sparkles, X } from 'lucide-react'

const archives = [
  {
    id: 'about', code: 'FILE_001', tab: 'IDENTITY', title: 'A little about me',
    kicker: 'THE PERSON BEHIND THE PIXELS',
    description: 'I’m Luvi Asakura — an Information Technology student exploring the space between thoughtful interfaces and useful AI. I enjoy turning ideas into digital experiences that feel clear, human, and a little unexpected.',
    tags: ['UI/UX DESIGN', 'FRONTEND', 'GENERATIVE AI'],
    tone: 'paper', number: '01',
  },
  {
    id: 'projects', code: 'FILE_002', tab: 'SELECTED WORK', title: 'Projects & experiments',
    kicker: 'BUILT WITH CURIOSITY',
    description: 'A collection of interface explorations, small web builds, and AI experiments. Each project is a chance to learn by making.',
    tags: ['AI / NLP', 'WEB DESIGN', 'DEVELOPMENT'],
    tone: 'blue', number: '02',
  },
  {
    id: 'skills', code: 'FILE_003', tab: 'TOOLKIT', title: 'Tools I work with',
    kicker: 'A WORK IN PROGRESS',
    description: 'A practical toolkit for shaping an idea, designing its interface, and bringing it to life on the web.',
    tags: ['DESIGN SYSTEMS', 'PROTOTYPING', 'BUILDING'],
    tone: 'olive', number: '03',
  },
  {
    id: 'experience', code: 'FILE_004', tab: 'FIELD NOTES', title: 'Experience & learning',
    kicker: 'LEARNING BY DOING',
    description: 'Project-based learning, collaborative builds, and hands-on experiments have helped me connect design decisions with implementation.',
    tags: ['INTERNSHIP', 'COLLABORATION', 'CONTINUOUS LEARNING'],
    tone: 'rust', number: '04',
  },
  {
    id: 'contact', code: 'FILE_005', tab: 'OPEN CHANNEL', title: 'Let’s make something',
    kicker: 'CURRENTLY OPEN TO OPPORTUNITIES',
    description: 'Have a thoughtful project, an internship opportunity, or an idea you want to explore? I’d love to hear from you.',
    tags: ['LET’S CONNECT', 'COLLABORATE', 'SAY HELLO'],
    tone: 'black', number: '05',
  },
]

const projects = [
  { title: 'MindEase', category: 'AI CHATBOT / WEB', year: '2026', code: 'EXP_014', tone: 'project-mind', description: 'A calm, approachable AI chat experience for emotional reflection, designed around a supportive conversational flow.', stack: ['HTML', 'CSS', 'JavaScript', 'Express', 'Gemini API'], link: 'https://github.com/lufikaZkl30/MindEase-ChatBot-Real', status: 'AI EXPERIMENT' },
  { title: 'YT Emotion Analyzer', category: 'NLP / DATA VISUALIZATION', year: '2025', code: 'EXP_011', tone: 'project-yt', description: 'An experiment in understanding the sentiment of YouTube comments through text processing and a visual dashboard.', stack: ['Python', 'NLP', 'Flask', 'Chart.js'], link: 'https://github.com', status: 'NLP EXPERIMENT' },
  { title: 'AksaBuku', category: 'WEB DESIGN / BOOKSTORE', year: '2023', code: 'WEB_006', tone: 'project-book', description: 'A library management and bookstore interface concept focused on helping users discover books through a clear dashboard.', stack: ['UI/UX', 'EJS', 'CSS', 'JavaScript'], link: 'https://github.com', status: 'WEB PROJECT' },
  { title: 'West Kalimantan Website', category: 'WEB DESIGN / CULTURE', year: '2025', code: 'WEB_009', tone: 'project-kal', description: 'A Figma interface exploration for presenting regional information in an approachable, easy-to-navigate format.', stack: ['Figma', 'UI Design', 'Prototyping'], link: 'https://github.com', status: 'DESIGN STUDY' },
  { title: 'TMII Front-End Recreate', category: 'FRONTEND / RECREATION', year: '2025', code: 'WEB_010', tone: 'project-tmii', description: 'A front-end recreation exercise focused on layout, visual hierarchy, and responsive web implementation.', stack: ['HTML', 'CSS', 'JavaScript'], link: 'https://github.com', status: 'FRONTEND STUDY' },
]

const skills = [
  ['DESIGN', 'Figma', 'Canva', 'UI/UX Design', 'Wireframing', 'Prototyping'],
  ['FRONTEND', 'HTML', 'CSS', 'JavaScript', 'React (learning)', 'Tailwind CSS (learning)'],
  ['AI & DATA', 'Python basics', 'NLP concepts', 'Prompt design', 'API integration', 'Data visualization'],
]

function FolderTab({ item, active, onClick, index }) {
  return <button className={`archive-tab tab-${item.tone} ${active ? 'is-active' : ''}`} onClick={onClick} style={{ '--tab-index': index }} aria-expanded={active}>
    <span className="tab-topline"><span>{item.code}</span><span className="tab-dot" /></span>
    <span className="tab-label">{item.tab}</span>
    <span className="tab-number">{item.number}</span>
    <span className="tab-edge" />
  </button>
}

function ProjectCard({ project, index }) {
  return <article className="project-card" style={{ '--project-index': index }}>
    <div className={`project-art ${project.tone}`}>
      <div className="art-top"><span>{project.code}</span><span>{project.year}</span></div>
      {project.tone === 'project-mind' && <div className="mind-orbit"><span /><span /><span /><b>ME</b></div>}
      {project.tone === 'project-yt' && <div className="pixel-grid">{Array.from({ length: 30 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>}
      {project.tone === 'project-book' && <div className="book-stack"><i /><i /><i /><b>AKSA<br/>BUKU</b></div>}
      {project.tone === 'project-kal' && <div className="map-lines"><i /><i /><i /><b>WEST<br/>KALIMANTAN</b></div>}
      {project.tone === 'project-tmii' && <div className="tmii-shape"><i /><i /><b>TMII</b></div>}
      <span className="art-status">{project.status}</span>
    </div>
    <div className="project-info">
      <div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
      <a className="project-link" href={project.link} target="_blank" rel="noreferrer">Explore project <ArrowUpRight size={15}/></a>
    </div>
  </article>
}

function App() {
  const [active, setActive] = useState('projects')
  const [opened, setOpened] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const update = () => setClock(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' }).format(new Date()))
    update()
    const timer = setInterval(update, 60000)
    return () => clearInterval(timer)
  }, [])

  const activeItem = archives.find(item => item.id === active) || archives[1]
  const chooseArchive = (id) => {
    setActive(id)
    setOpened(true)
    setMobileNav(false)
    document.getElementById('archive-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return <div className="site-shell">
    <div className="grain" aria-hidden="true" />
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Luvi Asakura home"><span className="brand-mark">LA</span><span>LUVI ASAKURA<span className="brand-sub">DIGITAL ARCHIVE / 2026</span></span></a>
      <nav className={mobileNav ? 'nav-open' : ''}>
        <a href="#archive" onClick={() => setMobileNav(false)}>Archive</a>
        <a href="#work" onClick={() => setMobileNav(false)}>Selected work</a>
        <a href="#contact" onClick={() => { setActive('contact'); setMobileNav(false) }}>Contact <ArrowUpRight size={12}/></a>
      </nav>
      <div className="topbar-right"><span className="status"><i/> AVAILABLE FOR OPPORTUNITIES</span><button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle menu">{mobileNav ? <X/> : <Menu/>}</button></div>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-index"><span>PERSONAL PORTFOLIO</span><span>001 — 005</span></div>
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={13}/> DESIGN MEETS INTELLIGENCE</p>
          <h1>Curiosity,<br/><em>filed</em> into form<span className="hero-period">.</span></h1>
          <div className="hero-bottom">
            <p className="hero-description">I’m Luvi — a Junior AI Engineer & Web Designer exploring thoughtful interfaces, creative code, and human-centered AI.</p>
            <a href="#archive" className="round-link" aria-label="Explore archive"><ArrowDownRight size={22}/></a>
          </div>
        </div>
        <div className="hero-side-note"><span>FIG. 01</span><span>AN ONGOING STUDY<br/>OF DIGITAL THINGS</span></div>
        <div className="hero-stamp"><span>DESIGN</span><span>×</span><span>TECH</span><span>×</span><span>HUMAN</span></div>
      </section>

      <section className="archive-section" id="archive">
        <div className="section-heading">
          <div><p className="eyebrow">/ INDEX & DIRECTORY</p><h2>Browse the archive<span>.</span></h2></div>
          <p className="section-note">Five folders. A few different sides of the same curiosity.<br/>Select a file to open its contents.</p>
        </div>
        <div className="archive-workspace">
          <div className="folder-stack" role="tablist" aria-label="Portfolio archive folders">
            {archives.map((item, index) => <FolderTab key={item.id} item={item} index={index} active={active === item.id} onClick={() => chooseArchive(item.id)} />)}
            <div className="stack-base"><span>LUVI_ARCHIVE</span><span>EST. 2023 — PRESENT</span></div>
          </div>
          <div className={`archive-paper ${opened ? 'paper-open' : ''}`} id="archive-content" key={active}>
            <div className="paper-header"><span><FolderOpen size={14}/> {activeItem.code} / {activeItem.tab}</span><span>CLASSIFIED: PUBLIC</span></div>
            <div className="paper-main">
              <p className="eyebrow">{activeItem.kicker}</p>
              <h3>{activeItem.title}<span>.</span></h3>
              <p className="paper-description">{activeItem.description}</p>
              {active === 'projects' && <div className="mini-projects">{projects.slice(0, 3).map((project, i) => <button key={project.title} onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}><span className="mini-code">{project.code}</span><span>{project.title}</span><ArrowUpRight size={14}/></button>)}</div>}
              {active === 'skills' && <div className="skill-columns">{skills.map(([group, ...items]) => <div key={group}><b>{group}</b>{items.map(skill => <span key={skill}>{skill}</span>)}</div>)}</div>}
              {active === 'experience' && <div className="timeline"><div><span>FEB — MAY 2026</span><b>Web Developer Intern · VINIX7</b><p>Project-based learning and website development, including frontend implementation and responsive layouts.</p></div><div><span>2025 — PRESENT</span><b>Independent AI & Web Projects</b><p>Exploring NLP, AI chat experiences, interface design, and practical web development.</p></div></div>}
              {active === 'contact' && <a className="contact-email" href="mailto:hello@luvi.example">Start a conversation <ArrowUpRight size={16}/></a>}
              <div className="paper-tags">{activeItem.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
            <div className="paper-footer"><span>LUVI ASAKURA / PERSONAL ARCHIVE</span><span>PAGE {activeItem.number} OF 05</span></div>
          </div>
        </div>
        <p className="archive-caption"><span><Command size={12}/> TIP: SELECT A TAB TO OPEN A FOLDER</span><span>INDEX REF. LA-2026</span></p>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div><p className="eyebrow">/ RECENT FILES</p><h2>Selected work<span>.</span></h2></div>
          <p className="section-note">Small experiments, real learning.<br/>Some links are placeholders — replace them with your final repositories.</p>
        </div>
        <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index}/>)}</div>
      </section>

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
