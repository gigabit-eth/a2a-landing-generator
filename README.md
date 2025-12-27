# @cart.fun/a2a-pages

> Generate beautiful developer documentation pages from agent card JSON

[![npm version](https://img.shields.io/npm/v/@cart.fun/a2a-pages.svg)](https://www.npmjs.com/package/@cart.fun/a2a-pages)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Beautiful dark/light themes** - Professional documentation pages out of the box
- ⚡ **One-line integration** - Add a landing page with a single import
- 🔧 **Fully customizable** - Themes, sections, footer links, and more
- 📱 **Responsive design** - Looks great on all devices
- 💳 **x402 payment flow** - Built-in documentation for x402 payments
- 📊 **Symbol grids** - Automatic rendering of supported assets

## Installation

```bash
npm install @cart.fun/a2a-pages
```

## Quick Start

```typescript
import express from 'express'
import { createAgentLanding } from '@cart.fun/a2a-pages'

const app = express()

// Serve landing page from agent-card.json file
app.get('/', createAgentLanding('./agent-card.json'))

app.listen(3000)
```

## Usage

### Using a file path

```typescript
app.get('/', createAgentLanding('./.well-known/agent-card.json'))
```

### Using an agent card object

```typescript
const agentCard = {
  name: 'My Agent',
  description: 'A powerful AI agent',
  url: 'https://my-agent.example.com',
  version: '1.0.0',
  skills: [
    {
      id: 'message/send',
      name: 'Send Message',
      description: 'Send a message to the agent'
    }
  ],
  pricing: {
    model: 'per-request',
    price: '$0.001',
    currency: 'USDC',
    network: 'base'
  }
}

app.get('/', createAgentLanding(agentCard))
```

### With options

```typescript
app.get('/', createAgentLanding('./agent-card.json', {
  // Theme: 'dark' | 'light' | custom Theme object
  theme: 'dark',
  
  // Toggle sections
  showPaymentFlow: true,
  showSymbols: true,
  showAgentCard: true,
  
  // Add custom sections
  customSections: [
    {
      title: 'Rate Limits',
      content: '<p>100 requests per minute</p>'
    }
  ],
  
  // Customize footer
  footer: {
    links: [
      { label: 'GitHub', url: 'https://github.com/...' },
      { label: 'Discord', url: 'https://discord.gg/...' },
      { label: 'Docs', url: 'https://docs.example.com' }
    ]
  },
  
  // Enable caching (default: true in production)
  cache: true
}))
```

## Custom Themes

Create your own theme by providing a Theme object:

```typescript
import { createAgentLanding, type Theme } from '@cart.fun/a2a-pages'

const myTheme: Theme = {
  colors: {
    bg: '#0f0f23',
    surface: '#1a1a2e',
    border: '#2d2d44',
    text: '#e4e4e7',
    textDim: '#8b8b9e',
    accent: '#ff6b6b',
    accentDim: '#4a3333',
    codeBg: '#16162a'
  },
  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'Fira Code', monospace"
  }
}

app.get('/', createAgentLanding('./agent-card.json', { theme: myTheme }))
```

## Advanced: Direct HTML Generation

For more control, use the generator function directly:

```typescript
import { generateLandingPage, darkTheme } from '@cart.fun/a2a-pages'

const html = generateLandingPage(agentCard, {
  theme: darkTheme,
  showPaymentFlow: true
})

// Use the HTML however you need
fs.writeFileSync('landing.html', html)
```

## Advanced: Individual Components

For maximum flexibility, use individual components:

```typescript
import {
  renderHero,
  renderQuickstart,
  renderSkills,
  renderSymbols,
  renderPaymentFlow,
  renderFooter,
  darkTheme
} from '@cart.fun/a2a-pages'

// Build your own page structure
const hero = renderHero(agentCard, darkTheme)
const quickstart = renderQuickstart(agentCard, darkTheme)
// ... compose as needed
```

## Agent Card Schema

The agent card should follow the A2A protocol specification:

```typescript
interface AgentCard {
  name: string
  description: string
  url: string
  version: string
  skills: Array<{
    id: string
    name: string
    description: string
    tags?: string[]
    examples?: string[]
    inputSchema?: object
    outputSchema?: object
  }>
  supportedSymbols?: {
    [category: string]: {
      source: string
      symbols: string[]
    }
  }
  pricing?: {
    model: string
    price: string
    currency: string
    network: string
  }
}
```

## License

MIT © [cart.fun](https://cart.fun)
