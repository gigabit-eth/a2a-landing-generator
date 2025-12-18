/**
 * @cart.fun/agent-landing
 * 
 * Generate beautiful developer documentation pages from A2A agent cards.
 * 
 * @example
 * import { createAgentLanding } from '@cart.fun/agent-landing'
 * 
 * app.get('/', createAgentLanding('./agent-card.json'))
 * 
 * @example
 * // With options
 * app.get('/', createAgentLanding('./agent-card.json', {
 *   theme: 'dark',
 *   showPaymentFlow: true,
 *   footer: {
 *     links: [
 *       { label: 'GitHub', url: 'https://github.com/...' },
 *       { label: 'Discord', url: 'https://discord.gg/...' }
 *     ]
 *   }
 * }))
 */

// Main export
export { createAgentLanding, clearLandingCache, type MiddlewareOptions, type AgentCardInput } from './middleware.js'

// Generator function for advanced use
export { generateLandingPage, type GeneratorOptions, type CustomSection, type MetaOptions } from './generator.js'

// Types
export type { AgentCard, AgentSkill, SupportedSymbols, PricingInfo } from './types.js'

// Themes
export { darkTheme, lightTheme, type Theme } from './themes/index.js'

// Individual components for advanced customization
export {
    renderHero,
    renderQuickstart,
    renderSkills,
    renderSymbols,
    renderPaymentFlow,
    renderAgentCardSection,
    renderFooter,
    type FooterLink,
    type FooterOptions
} from './components/index.js'
