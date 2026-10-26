import { toolGroups } from '../data/tools'
import './ToolsWorkstation.css'

const toolCount = toolGroups.reduce((total, group) => total + group.tools.length, 0)

function ToolCard({ tool, index }) {
  const toolIndex = String(index + 1).padStart(3, '0')

  return <article className="tool-card" tabIndex={0} aria-label={`${tool.name} (${tool.type}), ${tool.status}`} aria-describedby={`tool-tip-${toolIndex}`}>
    <div className="tool-card-top">
      <span>TOOL_INDEX_{toolIndex}</span>
      <span className={`tool-status status-${tool.status.toLowerCase()}`}>{tool.status}</span>
    </div>
    <div className="tool-card-main">
      <span className={`tool-symbol ${tool.icon ? 'has-brand-icon' : 'is-concept-icon'}`} aria-hidden="true">
        {tool.icon ? <img src={tool.icon} alt="" loading="lazy" /> : tool.symbol}
      </span>
      <div className="tool-card-copy">
        <span className="tool-type">{tool.type}</span>
        <h4>{tool.name}</h4>
        <p>{tool.purpose}</p>
      </div>
    </div>
    <span className="tool-card-tooltip" id={`tool-tip-${toolIndex}`} role="tooltip">{tool.purpose} <span>— {tool.status}</span></span>
    <span className="tool-card-corner" aria-hidden="true" />
  </article>
}

export default function ToolsWorkstation() {
  let toolIndex = 0

  return <section className="toolkit-section" id="archive" aria-labelledby="toolkit-title">
    <header className="toolkit-heading">
      <div className="toolkit-title-block">
        <p className="toolkit-eyebrow">/02 — TOOLKIT <span>· DIGITAL WORKSTATION</span></p>
        <h2 id="toolkit-title">Tools behind<br/><em>my work.</em></h2>
      </div>
      <div className="toolkit-intro">
        <span>TOOLS & TECHNOLOGIES / {String(toolCount).padStart(2, '0')} ITEMS</span>
        <p>A working set of creative and technical tools for shaping ideas into thoughtful digital experiences.</p>
      </div>
    </header>

    <div className="toolkit-workspace">
      <div className="toolkit-workspace-bar">
        <span><i /> WORKSTATION / LUVI.A</span>
        <span>TOOL_INDEX_001 — {`TOOL_INDEX_${String(toolCount).padStart(3, '0')}`}</span>
        <span>{String(toolCount).padStart(2, '0')} TOOLS</span>
      </div>
      <div className="toolkit-groups">
        {toolGroups.map((group, groupIndex) => <section className="tool-group" key={group.id} aria-labelledby={`tool-group-${group.id}`}>
          <header className="tool-group-header">
            <span className="tool-group-index">0{groupIndex + 1} / 04</span>
            <div>
              <h3 id={`tool-group-${group.id}`}>{group.title}</h3>
              <p>{group.description}</p>
            </div>
            <span className="tool-group-count">{String(group.tools.length).padStart(2, '0')} ITEMS</span>
          </header>
          <div className="tool-grid">
            {group.tools.map(tool => {
              const index = toolIndex
              toolIndex += 1
              return <ToolCard key={tool.name} tool={tool} index={index} />
            })}
          </div>
        </section>)}
      </div>
      <footer className="toolkit-note">
        <span>WORKING NOTE / 002</span>
        <p>Tools are part of the process—not the outcome. They help translate curiosity into useful digital experiences.</p>
        <span>ALWAYS LEARNING <i>↗</i></span>
        <p className="toolkit-field-note"><span>FIELD NOTES / 2025—PRESENT</span> Web Developer Intern · VINIX7 (Feb—May 2026) · Independent AI & Web Projects.</p>
      </footer>
    </div>
  </section>
}
