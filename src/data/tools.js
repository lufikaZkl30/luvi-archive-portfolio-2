import canvaIcon from '../assets/tool-icons/canva.svg'
import cssIcon from '../assets/tool-icons/css3.svg'
import figmaIcon from '../assets/tool-icons/figma.svg'
import gitIcon from '../assets/tool-icons/git.svg'
import githubIcon from '../assets/tool-icons/github.svg'
import htmlIcon from '../assets/tool-icons/html5.svg'
import javascriptIcon from '../assets/tool-icons/javascript.svg'
import nodeIcon from '../assets/tool-icons/nodedotjs.svg'
import pythonIcon from '../assets/tool-icons/python.svg'
import reactIcon from '../assets/tool-icons/react.svg'
import tailwindIcon from '../assets/tool-icons/tailwindcss.svg'
import vscodeIcon from '../assets/tool-icons/vscode.svg'

export const toolGroups = [
  {
    id: 'design',
    title: 'DESIGN',
    description: 'Shaping visual direction and interface structure.',
    tools: [
      { name: 'Figma', type: 'DESIGN APP', icon: figmaIcon, symbol: 'Fg', purpose: 'Interface design and interactive prototyping.', status: 'FAMILIAR' },
      { name: 'Canva', type: 'DESIGN APP', icon: canvaIcon, symbol: 'Ca', purpose: 'Creating visual assets and presentation materials.', status: 'FAMILIAR' },
    ],
  },
  {
    id: 'frontend',
    title: 'FRONTEND',
    description: 'Building interfaces for the web.',
    tools: [
      { name: 'HTML', type: 'MARKUP', icon: htmlIcon, symbol: '</>', purpose: 'Structuring accessible web content.', status: 'FAMILIAR' },
      { name: 'CSS', type: 'STYLESHEET', icon: cssIcon, symbol: '#', purpose: 'Styling layouts, components, and responsive pages.', status: 'FAMILIAR' },
      { name: 'JavaScript', type: 'LANGUAGE', icon: javascriptIcon, symbol: 'JS', purpose: 'Adding behavior and interactivity to web projects.', status: 'FAMILIAR' },
      { name: 'React', type: 'UI LIBRARY', icon: reactIcon, symbol: 'Re', purpose: 'Composing interfaces from reusable components.', status: 'LEARNING' },
      { name: 'Tailwind CSS', type: 'CSS FRAMEWORK', icon: tailwindIcon, symbol: 'Tw', purpose: 'Building interfaces with utility-first styling.', status: 'LEARNING' },
    ],
  },
  {
    id: 'ai-data',
    title: 'AI & DATA',
    description: 'Exploring language, analysis, and useful AI workflows.',
    tools: [
      { name: 'Python basics', type: 'LANGUAGE', icon: pythonIcon, symbol: 'Py', purpose: 'Writing introductory scripts and experiments.', status: 'LEARNING' },
      { name: 'NLP concepts', type: 'FIELD / CONCEPT', symbol: 'NLP', purpose: 'Learning how computers work with human language.', status: 'EXPLORING' },
      { name: 'Sentiment analysis', type: 'ANALYSIS CONCEPT', symbol: 'S/A', purpose: 'Exploring how text can be classified by sentiment.', status: 'EXPLORING' },
      { name: 'API integration', type: 'DEVELOPMENT PRACTICE', symbol: 'API', purpose: 'Connecting applications to external services.', status: 'LEARNING' },
      { name: 'Data visualization', type: 'DATA PRACTICE', symbol: 'D/V', purpose: 'Presenting patterns and results in visual form.', status: 'LEARNING' },
    ],
  },
  {
    id: 'development-tools',
    title: 'DEVELOPMENT TOOLS',
    description: 'Everyday tools for writing, tracking, and shipping code.',
    tools: [
      { name: 'Git', type: 'VERSION CONTROL', icon: gitIcon, symbol: 'Gi', purpose: 'Tracking changes as projects evolve.', status: 'FAMILIAR' },
      { name: 'GitHub', type: 'CODE HOSTING', icon: githubIcon, symbol: 'Gh', purpose: 'Hosting repositories and sharing project work.', status: 'FAMILIAR' },
      { name: 'VS Code', type: 'CODE EDITOR', icon: vscodeIcon, symbol: 'VS', purpose: 'Editing code and working across project files.', status: 'FAMILIAR' },
      { name: 'Node.js', type: 'JAVASCRIPT RUNTIME', icon: nodeIcon, symbol: 'Nd', purpose: 'Running JavaScript tools and server-side projects.', status: 'LEARNING' },
    ],
  },
]
