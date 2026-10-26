import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import './ProjectsGallery.css'

function ProjectArtwork({ project }) {
  return <div className={`project-art ${project.tone}`} role="img" aria-label={`${project.title} project preview`}>
    <div className="art-top"><span>{project.code}</span><span>{project.year}</span></div>
    {project.previewImage
      ? <img className="project-preview-image" src={project.previewImage} alt={`${project.title} screenshot`} />
      : <>
        {project.tone === 'project-mind' && <div className="mind-orbit"><span /><span /><span /><b>ME</b></div>}
        {project.tone === 'project-yt' && <div className="pixel-grid">{Array.from({ length: 30 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>}
        {project.tone === 'project-book' && <div className="book-stack"><i /><i /><i /><b>AKSA<br/>BUKU</b></div>}
        {project.tone === 'project-kal' && <div className="map-lines"><i /><i /><i /><b>WEST<br/>KALIMANTAN</b></div>}
        {project.tone === 'project-tmii' && <div className="tmii-shape"><i /><i /><b>TMII</b></div>}
      </>}
    {!project.previewImage && <span className="archive-placeholder-label">VISUAL PLACEHOLDER</span>}
    <span className="art-status">{project.status}</span>
  </div>
}

function ProjectCard({ project, onPreview, onOpen }) {
  return <article className="archive-display">
    <span className="archive-cord" aria-hidden="true" />
    <div className="archive-panel">
      <div className="archive-panel-top">
        <span>{project.archiveNumber}</span>
        <span className="archive-open-label">OPEN_ARCHIVE <ArrowUpRight size={11} /></span>
      </div>
      <button className="archive-preview-button" onClick={() => onPreview(project)} aria-label={`Preview ${project.title}`}>
        <ProjectArtwork project={project} />
        <span className="archive-preview-hint">PREVIEW <ArrowUpRight size={12} /></span>
      </button>
      <div className="archive-panel-info">
        <div className="archive-panel-meta"><span>{project.category}</span><span>{project.year}</span></div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="archive-tech-list" aria-label="Technologies">
          {project.stack.map(technology => <span key={technology}>{technology}</span>)}
        </div>
        <div className="archive-panel-actions">
          <button className="archive-action-primary" onClick={() => onOpen(project)}>VIEW PROJECT <ArrowUpRight size={14} /></button>
          <button className="archive-action-secondary" onClick={() => onPreview(project)}>PREVIEW</button>
        </div>
      </div>
      <span className="archive-corner archive-corner-top" aria-hidden="true" />
      <span className="archive-corner archive-corner-bottom" aria-hidden="true" />
    </div>
  </article>
}

function DetailField({ label, value }) {
  return <section className="project-detail-field">
    <h4>{label}</h4>
    <p>{value || <span className="project-detail-placeholder">Detail belum ditambahkan. Edit data project di <code>src/data/projects.js</code>.</span>}</p>
  </section>
}

function ProjectModal({ project, mode, onClose, onNavigate, canNavigate }) {
  const dialogRef = useRef(null)
  const isDetail = mode === 'detail'
  const repositoryIsPlaceholder = project.linkPlaceholder

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousActiveElement = document.activeElement
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault()
        onNavigate(event.key === 'ArrowLeft' ? -1 : 1)
      }
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), a[href]')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      if (previousActiveElement instanceof HTMLElement) previousActiveElement.focus()
    }
  }, [onClose, onNavigate])

  useEffect(() => {
    if (dialogRef.current) dialogRef.current.scrollTop = 0
  }, [project.id])

  return <div className="project-modal-backdrop" onMouseDown={event => {
    if (event.target === event.currentTarget) onClose()
  }}>
    <section className={`project-modal ${isDetail ? 'is-detail' : 'is-preview'}`} role="dialog" aria-modal="true" aria-labelledby="project-modal-title" tabIndex={-1} ref={dialogRef}>
      <header className="project-modal-header">
        <span>{project.archiveNumber} / {isDetail ? 'ARCHIVE VIEW' : 'PROJECT OVERVIEW'}</span>
        <div className="project-modal-controls">
          <button type="button" onClick={() => onNavigate(-1)} disabled={!canNavigate} aria-label="Previous project"><ArrowLeft size={17}/></button>
          <button type="button" onClick={() => onNavigate(1)} disabled={!canNavigate} aria-label="Next project"><ArrowRight size={17}/></button>
          <button type="button" onClick={onClose} aria-label={isDetail ? 'Close project detail' : 'Close project preview'}><X size={18}/></button>
        </div>
      </header>
      <div className="project-modal-content">
        <div className="project-modal-hero">
          <ProjectArtwork project={project} />
          <div className="project-modal-hero-caption"><span>{project.category}</span><span>{project.year}</span></div>
        </div>
        <div className="project-modal-overview">
          <p className="project-modal-kicker">DIGITAL ARTIFACT / {project.code}</p>
          <h2 id="project-modal-title">{project.title}<span>.</span></h2>
          <p className="project-modal-description">{project.description}</p>
          <div className="archive-tech-list">{project.stack.map(technology => <span key={technology}>{technology}</span>)}</div>
        </div>

        {isDetail ? <>
          <div className="project-detail-grid">
            <DetailField label="Problem statement" value={project.problem} />
            <DetailField label="Solution" value={project.solution} />
            <DetailField label="My role" value={project.role} />
            <DetailField label="Design & development process" value={project.process} />
            <DetailField label="Challenges" value={project.challenges} />
            <DetailField label="Learnings" value={project.learnings} />
          </div>
          <section className="project-detail-field project-feature-list">
            <h4>Project highlights</h4>
            {project.features.length
              ? <ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
              : <p><span className="project-detail-placeholder">Highlights belum ditambahkan. Edit data project di <code>src/data/projects.js</code>.</span></p>}
          </section>
          <div className="project-detail-gallery">
            {project.gallery.length > 0
              ? project.gallery.map(image => <figure key={image.src}><img src={image.src} alt={image.alt} loading="lazy" /><figcaption>{image.caption}</figcaption></figure>)
              : <p>Additional screenshots belum ditambahkan. Tambahkan file gambar dan data gallery di <code>src/data/projects.js</code>.</p>}
          </div>
          <div className="project-resource-links">
            {project.link && !repositoryIsPlaceholder
              ? <a href={project.link} target="_blank" rel="noreferrer">OPEN GITHUB <ArrowUpRight size={14}/></a>
              : <span>GITHUB LINK — ADD URL IN PROJECT DATA</span>}
            {project.liveDemo
              ? <a href={project.liveDemo} target="_blank" rel="noreferrer">OPEN LIVE DEMO <ArrowUpRight size={14}/></a>
              : <span>LIVE DEMO — NOT PROVIDED</span>}
          </div>
        </> : <div className="project-preview-notes">
          <DetailField label="Project overview" value={project.description} />
          <DetailField label="Problem statement" value={project.problem} />
          <DetailField label="My role" value={project.role} />
          <DetailField label="Project highlights" value={project.features.join(', ')} />
        </div>}

        <footer className="project-modal-footer">
          <button type="button" className="project-return-button" onClick={onClose}><ArrowLeft size={14}/> BACK TO PROJECT ARCHIVE</button>
          {!isDetail && <button type="button" className="project-open-detail-button" onClick={() => onNavigate('detail')}>OPEN ARCHIVE DETAIL <ArrowUpRight size={14}/></button>}
          {isDetail && <button type="button" className="project-open-detail-button" onClick={() => onNavigate(1)}>NEXT PROJECT <ArrowRight size={14}/></button>}
        </footer>
      </div>
    </section>
  </div>
}

export default function ProjectsGallery({ projects }) {
  const viewportRef = useRef(null)
  const dragRef = useRef(null)
  const draggedRef = useRef(false)
  const [progress, setProgress] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const selectedRef = useRef(selected)
  selectedRef.current = selected

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return undefined

    const updatePosition = () => {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth
      setProgress(maxScroll > 0 ? viewport.scrollLeft / maxScroll : 0)
      const firstCard = viewport.querySelector('.archive-display')
      if (firstCard) {
        const styles = window.getComputedStyle(viewport.querySelector('.archive-track'))
        const gap = Number.parseFloat(styles.columnGap) || 0
        const step = firstCard.getBoundingClientRect().width + gap
        setCurrentIndex(Math.min(projects.length - 1, Math.round(viewport.scrollLeft / step)))
      }
    }
    const handleHorizontalWheel = event => {
      if (event.shiftKey && event.deltaY) {
        event.preventDefault()
        viewport.scrollLeft += event.deltaY
      }
    }

    updatePosition()
    viewport.addEventListener('scroll', updatePosition, { passive: true })
    viewport.addEventListener('wheel', handleHorizontalWheel, { passive: false })
    const observer = new ResizeObserver(updatePosition)
    observer.observe(viewport)
    return () => {
      viewport.removeEventListener('scroll', updatePosition)
      viewport.removeEventListener('wheel', handleHorizontalWheel)
      observer.disconnect()
    }
  }, [projects.length])

  const moveGallery = direction => {
    const viewport = viewportRef.current
    const firstCard = viewport?.querySelector('.archive-display')
    const track = viewport?.querySelector('.archive-track')
    if (!viewport || !firstCard || !track) return
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0
    viewport.scrollBy({ left: direction * (firstCard.getBoundingClientRect().width + gap), behavior: 'smooth' })
  }

  const openProject = (project, mode) => setSelected({ project, mode })
  const closeProject = useCallback(() => setSelected(null), [])
  const navigateProject = useCallback(direction => {
    if (direction === 'detail') {
      setSelected(current => current ? { ...current, mode: 'detail' } : current)
      return
    }
    const currentIndex = projects.findIndex(project => project.id === selectedRef.current?.project.id)
    const nextIndex = (currentIndex + direction + projects.length) % projects.length
    setSelected(current => current ? { ...current, project: projects[nextIndex] } : current)
  }, [projects])

  const handlePointerDown = event => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('button, a')) return
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: event.currentTarget.scrollLeft }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = event => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return
    const delta = event.clientX - dragRef.current.startX
    if (Math.abs(delta) > 4) {
      draggedRef.current = true
      setIsDragging(true)
      event.currentTarget.scrollLeft = dragRef.current.scrollLeft - delta
    }
  }

  const handlePointerUp = event => {
    if (dragRef.current?.pointerId === event.pointerId) {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
      dragRef.current = null
      setIsDragging(false)
      window.setTimeout(() => { draggedRef.current = false }, 0)
    }
  }

  return <section className="work-section project-archive-section" id="work" aria-labelledby="project-archive-title">
    <div className="project-archive-heading">
      <div>
        <p className="project-archive-eyebrow">/03 PROJECT ARCHIVE <span>— DIGITAL ARTIFACTS</span></p>
        <h2 id="project-archive-title">Curiosity, <em>filed</em><br/>into form<span>.</span></h2>
      </div>
      <div className="project-archive-side-note">
        <span>SELECTED WORKS / 2023—2026</span>
        <p>An evolving collection of AI, web development, and interface experiments.</p>
        <span>ARCHIVE INDEX / {String(projects.length).padStart(2, '0')} FILES</span>
      </div>
    </div>
    <div className="archive-gallery-toolbar">
      <span><i /> INTERACTIVE EXHIBITION</span>
      <span>DRAG / SWIPE TO EXPLORE</span>
      <div className="archive-gallery-controls">
        <button type="button" onClick={() => moveGallery(-1)} disabled={progress <= 0.001} aria-label="Scroll projects left"><ArrowLeft size={16}/></button>
        <span>{String(currentIndex + 1).padStart(2, '0')} <i>/</i> {String(projects.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => moveGallery(1)} disabled={progress >= 0.999} aria-label="Scroll projects right"><ArrowRight size={16}/></button>
      </div>
    </div>
    <div
      className={`project-gallery-viewport ${isDragging ? 'is-dragging' : ''}`}
      ref={viewportRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClickCapture={event => {
        if (draggedRef.current) {
          event.preventDefault()
          event.stopPropagation()
        }
      }}
      role="region"
      tabIndex={0}
      aria-label="Horizontal project archive gallery"
    >
      <div className="archive-track">
        {projects.map(project => <ProjectCard key={project.id} project={project} onPreview={item => openProject(item, 'preview')} onOpen={item => openProject(item, 'detail')} />)}
      </div>
    </div>
    <div className="archive-gallery-progress" role="progressbar" aria-label="Project gallery position" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
    <div className="archive-gallery-footer"><span>END OF INDEX / KEEP EXPLORING</span><span>SCROLL POSITION <b>{String(Math.round(progress * 100)).padStart(2, '0')}%</b></span></div>
    {selected && <ProjectModal project={selected.project} mode={selected.mode} onClose={closeProject} onNavigate={navigateProject} canNavigate={projects.length > 1} />}
  </section>
}
