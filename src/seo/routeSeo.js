const SITE_NAME = 'Louis GENTY'
const SITE_TAGLINE = 'Développeur web & IA appliquée'
const SITE_DEFAULT_DESCRIPTION =
  "Portfolio de Louis GENTY, développeur d'applications web et solutions IA: automatisation, agents IA, intégration frontend/backend et outils métiers."
const SITE_LOCALE = 'fr_FR'
const SITE_LANGUAGE = 'fr-FR'
const SOCIAL_LINKS = [
  'https://github.com/GenXwater',
  'https://fr.linkedin.com/in/louis-genty-023708209',
]

const SERVICE_CATALOG = [
  {
    name: 'Automatisation complète avec n8n',
    description:
      'Scénarios robustes pour connecter vos outils et automatiser les tâches répétitives.',
  },
  {
    name: 'Chatbots & agents IA personnalisés',
    description:
      'Assistants IA pour réponses clients, traitement documentaire et actions métier.',
  },
  {
    name: 'Extraction intelligente de documents',
    description:
      'Lecture, résumé et extraction de données depuis PDF/Word pour des usages opérationnels.',
  },
  {
    name: 'Agents API intelligents',
    description:
      "Orchestration d'API et agents autonomes pour automatiser des workflows complexes.",
  },
  {
    name: 'IA & automation pour BTP / logistique',
    description:
      "Solutions adaptées au suivi chantier, à la logistique et aux opérations terrain.",
  },
  {
    name: 'Sites web & outils métiers',
    description:
      "Sites vitrines et micro-apps connectables à des outils CRM, IA et d'automatisation.",
  },
  {
    name: "Développement d'outils métiers IA",
    description:
      'Copilotes internes et micro-apps pour rédiger, classer et piloter des opérations.',
  },
  {
    name: 'Workflows IA pour PME',
    description:
      'Automatisation des leads, relances, devis, rendez-vous et suivi clients.',
  },
]

const stripTrailingSlash = (value) => value.replace(/\/+$/, '')
const cleanPathname = (path) => {
  if (!path || path === '/') return '/'
  return `/${path.replace(/^\/+/, '').replace(/\/+$/, '')}`
}

const getBaseUrl = () => {
  const configuredBase = (import.meta.env.VITE_SITE_URL || '').trim()
  if (configuredBase) return stripTrailingSlash(configuredBase)

  if (typeof window !== 'undefined' && window.location?.origin) {
    return stripTrailingSlash(window.location.origin)
  }

  return 'https://example.com'
}

const toAbsoluteUrl = (pathOrUrl) => {
  if (!pathOrUrl) return `${getBaseUrl()}/og-image.jpg`
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl
  return `${getBaseUrl()}${cleanPathname(pathOrUrl)}`
}

const getRouteCanonical = (route) => `${getBaseUrl()}${cleanPathname(route.path)}`

const upsertMeta = (attribute, key, content) => {
  if (!content) return

  let node = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!node) {
    node = document.createElement('meta')
    node.setAttribute(attribute, key)
    node.setAttribute('data-seo-managed', 'true')
    document.head.appendChild(node)
  }

  node.setAttribute('content', content)
}

const upsertLink = (rel, href) => {
  let node = document.head.querySelector(`link[rel="${rel}"]`)
  if (!node) {
    node = document.createElement('link')
    node.setAttribute('rel', rel)
    node.setAttribute('data-seo-managed', 'true')
    document.head.appendChild(node)
  }

  node.setAttribute('href', href)
}

const replaceJsonLd = (schemas) => {
  document.head
    .querySelectorAll('script[type="application/ld+json"][data-seo-jsonld="true"]')
    .forEach((node) => node.remove())

  schemas.forEach((schema, index) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo-jsonld', 'true')
    script.setAttribute('data-seo-jsonld-key', String(index))
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
  })
}

const getGlobalSchemas = (canonicalUrl) => {
  const siteUrl = `${getBaseUrl()}/`

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Louis GENTY',
      url: siteUrl,
      jobTitle: "Développeur d'applications web et IA appliquée",
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'FR',
      },
      knowsAbout: [
        'Automatisation n8n',
        'Agents IA',
        'RAG',
        'Développement web',
        'Vue.js',
        'Python',
      ],
      sameAs: SOCIAL_LINKS,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Louis.dev',
      url: siteUrl,
      founder: {
        '@type': 'Person',
        name: 'Louis GENTY',
      },
      sameAs: SOCIAL_LINKS,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: `${SITE_NAME} - ${SITE_TAGLINE}`,
      url: siteUrl,
      inLanguage: SITE_LANGUAGE,
      publisher: {
        '@type': 'Person',
        name: 'Louis GENTY',
      },
      mainEntity: {
        '@type': 'Person',
        name: 'Louis GENTY',
      },
      potentialAction: {
        '@type': 'CommunicateAction',
        target: `${getBaseUrl()}/contact`,
        name: 'Prise de contact',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: document.title || `${SITE_NAME} - ${SITE_TAGLINE}`,
      url: canonicalUrl,
      inLanguage: SITE_LANGUAGE,
      about: {
        '@type': 'Person',
        name: 'Louis GENTY',
      },
      isPartOf: {
        '@type': 'WebSite',
        name: `${SITE_NAME} - ${SITE_TAGLINE}`,
        url: siteUrl,
      },
    },
  ]
}

const getRouteSchemas = (route, canonicalUrl) => {
  const homeBreadcrumb = {
    '@type': 'ListItem',
    position: 1,
    name: 'Accueil',
    item: `${getBaseUrl()}/`,
  }

  if (route.name === 'services') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          homeBreadcrumb,
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: canonicalUrl,
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Services IA, automatisation et développement web',
        description:
          "Services d'automatisation, d'agents IA et de développement d'outils métiers sur mesure.",
        provider: {
          '@type': 'Person',
          name: 'Louis GENTY',
        },
        areaServed: {
          '@type': 'Country',
          name: 'France',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Catalogue de services',
          itemListElement: SERVICE_CATALOG.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              description: service.description,
            },
          })),
        },
      },
    ]
  }

  if (route.name === 'contact') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          homeBreadcrumb,
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Contact',
            item: canonicalUrl,
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Louis GENTY',
        url: canonicalUrl,
        inLanguage: SITE_LANGUAGE,
        mainEntity: {
          '@type': 'Person',
          name: 'Louis GENTY',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'FR',
          },
        },
      },
    ]
  }

  return []
}

const applyRouteSeo = (route) => {
  const seo = route.meta?.seo || {}
  const pageTitle = seo.title
    ? `${seo.title} | ${SITE_NAME}`
    : `${SITE_NAME} | ${SITE_TAGLINE}`
  const description = seo.description || SITE_DEFAULT_DESCRIPTION
  const canonicalUrl = getRouteCanonical(route)
  const imageUrl = toAbsoluteUrl(seo.image || '/og-image.jpg')
  const robots = seo.robots || 'index,follow'
  const ogType = seo.ogType || 'website'

  document.title = pageTitle

  upsertMeta('name', 'description', description)
  upsertMeta('name', 'robots', robots)
  upsertMeta('name', 'author', 'Louis GENTY')
  upsertMeta('property', 'og:type', ogType)
  upsertMeta('property', 'og:site_name', `${SITE_NAME} - ${SITE_TAGLINE}`)
  upsertMeta('property', 'og:locale', SITE_LOCALE)
  upsertMeta('property', 'og:title', pageTitle)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:url', canonicalUrl)
  upsertMeta('property', 'og:image', imageUrl)
  upsertMeta('name', 'twitter:card', seo.twitterCard || 'summary_large_image')
  upsertMeta('name', 'twitter:title', pageTitle)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', imageUrl)

  upsertLink('canonical', canonicalUrl)

  const schemas = [
    ...getGlobalSchemas(canonicalUrl),
    ...getRouteSchemas(route, canonicalUrl),
  ]
  replaceJsonLd(schemas)
}

export const setupRouteSeo = (router) => {
  if (typeof window === 'undefined') return

  router.afterEach((to) => {
    applyRouteSeo(to)
  })

  router.isReady().then(() => {
    applyRouteSeo(router.currentRoute.value)
  })
}
