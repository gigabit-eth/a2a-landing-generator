/**
 * HTML Generator
 * 
 * Generates the complete HTML page from components
 */

import type { AgentCard } from './types.js'
import type { Theme } from './themes/types.js'
import type { FooterOptions } from './components/footer.js'
import { darkTheme, lightTheme } from './themes/index.js'
import {
    renderHero,
    renderQuickstart,
    renderSkills,
    renderSymbols,
    renderPaymentFlow,
    renderAgentCardSection,
    renderFooter
} from './components/index.js'

export interface CustomSection {
    title: string
    content: string
}

export interface MetaOptions {
    ogImage?: string
    favicon?: string
    twitterCard?: 'summary' | 'summary_large_image'
}

export interface GeneratorOptions {
    theme?: 'dark' | 'light' | Theme
    showPaymentFlow?: boolean
    showSymbols?: boolean
    showAgentCard?: boolean
    customSections?: CustomSection[]
    footer?: FooterOptions
    meta?: MetaOptions
}

function resolveTheme(themeOption?: 'dark' | 'light' | Theme): Theme {
    if (!themeOption) return darkTheme
    if (themeOption === 'dark') return darkTheme
    if (themeOption === 'light') return lightTheme
    return themeOption
}

function generateStyles(theme: Theme): string {
    return `
    :root {
      --bg: ${theme.colors.bg};
      --surface: ${theme.colors.surface};
      --border: ${theme.colors.border};
      --text: ${theme.colors.text};
      --text-dim: ${theme.colors.textDim};
      --accent: ${theme.colors.accent};
      --accent-dim: ${theme.colors.accentDim};
      --code-bg: ${theme.colors.codeBg};
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: ${theme.fonts.body};
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
    }
    
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    header {
      text-align: center;
      padding: 4rem 0 3rem;
      border-bottom: 1px solid var(--border);
    }
    
    h1 {
      font-family: ${theme.fonts.heading};
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #fff 0%, var(--accent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .tagline {
      color: var(--text-dim);
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto 1.5rem;
    }
    
    .badges {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.8rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 999px;
      font-size: 0.85rem;
      color: var(--text-dim);
    }
    
    .badge.accent {
      border-color: var(--accent-dim);
      color: var(--accent);
    }
    
    section {
      padding: 2.5rem 0;
      border-bottom: 1px solid var(--border);
    }
    
    h2 {
      font-family: ${theme.fonts.heading};
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: var(--text);
    }
    
    h3 {
      font-family: ${theme.fonts.heading};
      font-size: 1rem;
      margin: 1.5rem 0 0.5rem;
      color: var(--text-dim);
    }
    
    pre {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1rem;
      overflow-x: auto;
      font-family: ${theme.fonts.mono};
      font-size: 0.85rem;
      line-height: 1.5;
    }
    
    code {
      font-family: ${theme.fonts.mono};
      color: var(--accent);
    }
    
    .symbol-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    
    .symbol {
      padding: 0.4rem 0.6rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 4px;
      font-family: ${theme.fonts.mono};
      font-size: 0.85rem;
      text-align: center;
    }
    
    .response-example {
      margin-top: 1rem;
    }
    
    .endpoint {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    
    .method {
      display: inline-block;
      padding: 0.2rem 0.5rem;
      background: var(--accent-dim);
      color: var(--accent);
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-right: 0.5rem;
    }
    
    .path {
      font-family: ${theme.fonts.mono};
      color: var(--text);
    }
    
    .skill-tags {
      margin-top: 0.5rem;
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .skill-tag {
      padding: 0.2rem 0.5rem;
      background: var(--border);
      border-radius: 4px;
      font-size: 0.75rem;
      color: var(--text-dim);
    }
    
    footer {
      text-align: center;
      padding: 2rem 0;
      color: var(--text-dim);
      font-size: 0.85rem;
    }
    
    a {
      color: var(--accent);
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    .copy-btn {
      float: right;
      background: var(--border);
      border: none;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      color: var(--text-dim);
      cursor: pointer;
      font-size: 0.75rem;
    }
    
    .copy-btn:hover {
      background: var(--accent-dim);
      color: var(--accent);
    }
    
    .custom-section {
      padding: 2.5rem 0;
      border-bottom: 1px solid var(--border);
    }
    
    .custom-section h2 {
      margin-bottom: 1rem;
    }
    
    .custom-section-content {
      color: var(--text-dim);
    }`
}

function generateCopyScript(): string {
    return `
    function copyCode(btn) {
      const pre = btn.parentElement;
      const code = pre.textContent.replace('Copy', '').trim();
      navigator.clipboard.writeText(code);
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy', 2000);
    }`
}

function renderCustomSections(sections?: CustomSection[]): string {
    if (!sections?.length) return ''

    return sections.map(section => `
    <section class="custom-section">
      <h2>${escapeHtml(section.title)}</h2>
      <div class="custom-section-content">${section.content}</div>
    </section>`
    ).join('')
}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

export function generateLandingPage(agentCard: AgentCard, options: GeneratorOptions = {}): string {
    const theme = resolveTheme(options.theme)
    const showPaymentFlow = options.showPaymentFlow !== false
    const showSymbols = options.showSymbols !== false
    const showAgentCard = options.showAgentCard !== false

    const ogImage = options.meta?.ogImage
    const favicon = options.meta?.favicon
    const twitterCard = options.meta?.twitterCard || 'summary_large_image'

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(agentCard.name)} - A2A Agent</title>
  <meta name="description" content="${escapeHtml(agentCard.description)}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(agentCard.name)}">
  <meta property="og:description" content="${escapeHtml(agentCard.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(agentCard.url)}">
  ${ogImage ? `<meta property="og:image" content="${escapeHtml(ogImage)}">` : ''}
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="${twitterCard}">
  <meta name="twitter:title" content="${escapeHtml(agentCard.name)}">
  <meta name="twitter:description" content="${escapeHtml(agentCard.description)}">
  ${ogImage ? `<meta name="twitter:image" content="${escapeHtml(ogImage)}">` : ''}
  
  <!-- Favicon -->
  ${favicon ? `<link rel="icon" href="${escapeHtml(favicon)}" type="image/x-icon">` : ''}
  ${favicon ? `<link rel="shortcut icon" href="${escapeHtml(favicon)}" type="image/x-icon">` : ''}
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>${generateStyles(theme)}</style>
</head>
<body>
  <div class="container">
    ${renderHero(agentCard, theme)}
    ${renderQuickstart(agentCard, theme)}
    ${showSymbols ? renderSymbols(agentCard, theme) : ''}
    ${renderSkills(agentCard, theme)}
    ${showPaymentFlow ? renderPaymentFlow(agentCard, theme) : ''}
    ${showAgentCard ? renderAgentCardSection(agentCard, theme) : ''}
    ${renderCustomSections(options.customSections)}
    ${renderFooter(options.footer)}
  </div>
  <script>${generateCopyScript()}</script>
</body>
</html>`
}
