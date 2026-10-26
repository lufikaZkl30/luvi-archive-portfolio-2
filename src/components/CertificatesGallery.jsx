import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Award, FileText, X } from 'lucide-react'
import './CertificatesGallery.css'

function getCertificateFile(certificate) {
  return certificate.file || certificate.image
}

function isPdf(file) {
  return /\.pdf(?:$|[?#])/i.test(file)
}

function CertificateCard({ certificate, onPreview, index }) {
  const file = getCertificateFile(certificate)
  const pdf = isPdf(file)

  return <article className="certificate-card">
    <button className="certificate-card-trigger" type="button" onClick={() => onPreview(certificate)} aria-label={`Preview certificate: ${certificate.title}`}>
      <span className="certificate-card-index">CERTIFICATE / {String(index + 1).padStart(3, '0')}</span>
      <span className="certificate-card-mark">{pdf ? <FileText size={20} strokeWidth={1.4} /> : <Award size={20} strokeWidth={1.4} />}</span>
      <span className="certificate-card-info">
        <span className="certificate-card-issuer">{certificate.issuer}</span>
        <span className="certificate-card-title">{certificate.title}</span>
        <span className="certificate-card-date">{certificate.date}</span>
      </span>
      <span className="certificate-card-action">PREVIEW <ArrowUpRight size={13} /></span>
    </button>
    <span className="certificate-card-preview" aria-hidden="true">
      {pdf
        ? <iframe src={`${file}#toolbar=0&navpanes=0`} title="" tabIndex={-1} />
        : <img src={file} alt="" loading="lazy" />}
      <span>{pdf ? 'PREVIEW PDF' : 'OPEN PREVIEW'} <ArrowUpRight size={13} /></span>
    </span>
  </article>
}

export default function CertificatesGallery({ certificates }) {
  const [selected, setSelected] = useState(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (selected && !dialogRef.current?.open) dialogRef.current?.showModal()
  }, [selected])

  const closePreview = () => {
    if (dialogRef.current?.open) dialogRef.current.close()
    setSelected(null)
  }
  const selectedFile = selected ? getCertificateFile(selected) : ''
  const selectedIsPdf = selected ? isPdf(selectedFile) : false

  return <section className="certificates-section" id="certificates" aria-labelledby="certificates-title">
    <header className="certificates-heading">
      <div>
        <p className="certificates-eyebrow">/04 — LEARNING RECORD</p>
        <h2 id="certificates-title">Proof of<br/><em>curiosity.</em></h2>
      </div>
      <div className="certificates-summary">
        <span>COURSES, CERTIFICATES & MILESTONES</span>
        <p>A small archive of the things I’ve learned along the way.</p>
        <span>{String(certificates.length).padStart(2, '0')} RECORDS</span>
      </div>
    </header>

    {certificates.length
      ? <div className="certificates-grid">
        {certificates.map((certificate, index) => <CertificateCard key={certificate.id} certificate={certificate} index={index} onPreview={setSelected} />)}
      </div>
      : <div className="certificates-empty">
        <span className="certificates-empty-mark"><Award size={24} strokeWidth={1.3} /></span>
        <div>
          <span>ARCHIVE IN PROGRESS</span>
          <p>Tambahkan file PDF atau gambar ke <code>public/certificates</code>, lalu daftarkan nama file dan detailnya di <code>src/data/certificates.js</code>.</p>
        </div>
        <span className="certificates-empty-index">NO RECORDS YET</span>
      </div>}

    <dialog className="certificate-dialog" ref={dialogRef} onClose={() => setSelected(null)} onClick={event => {
      if (event.target === event.currentTarget) closePreview()
    }}>
      {selected && <>
        <header>
          <div><span>CERTIFICATE PREVIEW</span><h3>{selected.title}</h3></div>
          <button type="button" onClick={closePreview} aria-label="Close certificate preview"><X size={19} /></button>
        </header>
        {selectedIsPdf
          ? <iframe className="certificate-dialog-pdf" src={selectedFile} title={`${selected.title} certificate PDF`} />
          : <img className="certificate-dialog-image" src={selectedFile} alt={`${selected.title} certificate`} />}
        <footer>
          <span>{selected.issuer} · {selected.date}</span>
          <a href={selectedFile} target="_blank" rel="noreferrer">OPEN FILE <ArrowUpRight size={13} /></a>
        </footer>
      </>}
    </dialog>
  </section>
}
