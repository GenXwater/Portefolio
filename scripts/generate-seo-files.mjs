import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const publicDir = path.join(rootDir, 'public')

const stripTrailingSlash = (value) => value.replace(/\/+$/, '')

const getSiteUrl = () => {
  const raw =
    process.env.VITE_SITE_URL ||
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    'https://example.com'

  return stripTrailingSlash(raw)
}

const toAbsoluteUrl = (siteUrl, routePath) => {
  if (routePath === '/') return `${siteUrl}/`
  return `${siteUrl}${routePath}`
}

const routes = ['/', '/services', '/contact']
const siteUrl = getSiteUrl()
const dateStamp = new Date().toISOString().slice(0, 10)

const sitemapEntries = routes
  .map(
    (routePath) => `  <url>
    <loc>${toAbsoluteUrl(siteUrl, routePath)}</loc>
    <lastmod>${dateStamp}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${routePath === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

await fs.mkdir(publicDir, { recursive: true })
await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8')
await fs.writeFile(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8')

console.log(`SEO files generated for ${siteUrl}`)
