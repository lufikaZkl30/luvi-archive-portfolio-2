import { toolGroups } from '../data/tools'
import './ToolsWorkstation.css'

const tools = toolGroups.flatMap(group => group.tools)
const toolRows = [tools, [...tools].reverse()]

function ToolPill({ tool }) {
  return <span className="tool-pill">
    <span className={`tool-pill-icon ${tool.icon ? '' : 'is-concept-icon'}`} aria-hidden="true">
      {tool.icon ? <img src={tool.icon} alt="" loading="lazy" /> : tool.symbol}
    </span>
    <span>{tool.name}</span>
  </span>
}

export default function ToolsWorkstation() {
  return <section className="toolkit-section" id="archive" aria-labelledby="toolkit-title">
    <header className="toolkit-heading">
      <div className="toolkit-title-block">
        <p className="toolkit-eyebrow">/02 — TOOLKIT</p>
        <h2 id="toolkit-title">Tools behind<br/><em>my work.</em></h2>
      </div>
      <span className="toolkit-count">{String(tools.length).padStart(2, '0')} TOOLS</span>
    </header>

    <div className="tools-marquee" aria-label="Tools and technologies">
      {toolRows.map((row, rowIndex) => <div className={`tools-marquee-row ${rowIndex === 1 ? 'reverse' : ''}`} key={rowIndex}>
        <div className="tools-marquee-track">
          {[0, 1].map(copy => <div className="tools-marquee-content" key={copy} role={copy === 0 ? 'list' : undefined} aria-label={copy === 0 ? `Tools row ${rowIndex + 1}` : undefined} aria-hidden={copy === 1}>
            {row.map((tool, index) => <span role={copy === 0 ? 'listitem' : undefined} key={`${tool.name}-${index}`}>
              <ToolPill tool={tool} />
            </span>)}
          </div>)}
        </div>
      </div>)}
    </div>
  </section>
}
