/**
 * Quickstart Component
 * 
 * Displays endpoint and curl example
 */

import type { AgentCard } from '../types.js'
import type { Theme } from '../themes/types.js'

export function renderQuickstart(agentCard: AgentCard, theme: Theme): string {
  const { url, skills } = agentCard

  // Use first skill for example, or default to message/send
  const exampleMethod = skills[0]?.id || 'message/send'
  const exampleParams = skills[0]?.examples?.[0]
    ? `{"symbol":"${skills[0].examples[0]}"}`
    : '{}'

  return `
    <section>
      <h2>⚡ Quick Start</h2>
      <p style="color: var(--text-dim); margin-bottom: 1rem;">Get started with a single request. Payments handled automatically via x402.</p>
      
      <div class="endpoint">
        <span class="method">POST</span>
        <span class="path">${escapeHtml(url)}/a2a</span>
      </div>

      <h3>Example Request</h3>
      <pre><button class="copy-btn" onclick="copyCode(this)">Copy</button>curl -X POST ${escapeHtml(url)}/a2a \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"${escapeHtml(exampleMethod)}","params":${exampleParams},"id":1}'</pre>

      <div class="response-example">
        <h3>Response (after x402 payment)</h3>
        <pre>{
  "jsonrpc": "2.0",
  "result": {
    "symbol": "BTCUSDT",
    "price": 86047.98,
    "source": "Polymarket (Binance)",
    "timestamp": ${Date.now()}
  },
  "id": 1
}</pre>
      </div>
    </section>`
}

function escapeHtml(str: string | undefined): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
