/// <reference types="vitest/config" />
import { createReadStream, existsSync, statSync } from 'node:fs'
import type { ServerResponse } from 'node:http'
import { extname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Connect, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const page = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// Vite's dev and preview servers only serve a folder's index.html when the URL ends in "/".
// Without the slash they fall back to the homepage, so /apps/magic-8-ball showed the homepage.
// This redirects such URLs to the slash form, like a static host does. Dev/preview only:
// it adds nothing to the production build.
function redirectToTrailingSlash(): Plugin {
  const redirect = (dir: string): Connect.NextHandleFunction => (req, res: ServerResponse, next) => {
    const [pathname, query] = (req.url ?? '').split(/\?(.*)/s)
    let decoded = ''
    try { decoded = decodeURIComponent(pathname) } catch { /* malformed URL: leave it to Vite */ }
    const isGet = req.method === 'GET' || req.method === 'HEAD'
    // Skipping anything with a "." also skips files and keeps "../" from leaving the root.
    if (isGet && decoded && !decoded.endsWith('/') && !decoded.includes('.') &&
        existsSync(join(dir, decoded, 'index.html'))) {
      res.writeHead(302, { Location: pathname + '/' + (query ? `?${query}` : '') }).end()
      return
    }
    next()
  }
  return {
    name: 'redirect-to-trailing-slash',
    configureServer: (server) => { server.middlewares.use(redirect(server.config.root)) },
    configurePreviewServer: (server) => {
      server.middlewares.use(redirect(resolve(server.config.root, server.config.build.outDir)))
    },
  }
}

// Development only (npm run dev): serves two archived v2 prototypes, which live outside frontend/, at
// /explorations/<name>/, so they can still be opened for reference. It is not part of the production
// build, and nothing in production links to them. The approved recipe box now lives in src/portfolio/.
const prototypes = ['v2-recipe-index', 'v2-recipe-box']
const contentTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.css': 'text/css', '.js': 'text/javascript',
}

function serveV2Prototype(): Plugin {
  const handler: Connect.NextHandleFunction = (req, res: ServerResponse, next) => {
    const [pathname] = (req.url ?? '').split('?')
    const name = prototypes.find((p) => pathname === `/explorations/${p}` || pathname.startsWith(`/explorations/${p}/`))
    if (!name) return next()
    const prototypePath = `/explorations/${name}`
    const prototypeDir = fileURLToPath(new URL(`../explorations/${name}`, import.meta.url))
    if (pathname === prototypePath) {
      res.writeHead(302, { Location: req.url!.replace(prototypePath, prototypePath + '/') }).end()
      return
    }
    let file = ''
    try {
      file = resolve(prototypeDir, '.' + decodeURIComponent(pathname.slice(prototypePath.length)))
    } catch { /* malformed URL: answered with 404 below */ }
    if (file && existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
    // Answer 404 here rather than falling through, so a broken prototype link never shows the old homepage.
    if (!file.startsWith(prototypeDir + sep) || !existsSync(file)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found in the v2 prototype')
      return
    }
    res.writeHead(200, {
      'Content-Type': contentTypes[extname(file).toLowerCase()] ?? 'application/octet-stream',
      'Cache-Control': 'no-cache',
    })
    if (req.method === 'HEAD') res.end()
    else createReadStream(file).pipe(res)
  }
  return {
    name: 'serve-v2-prototype',
    apply: 'serve',
    configureServer: (server) => { server.middlewares.use(handler) },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), redirectToTrailingSlash(), serveV2Prototype()],
  build: {
    // Multi-page build: each HTML file is its own page and keeps its path in dist/.
    rollupOptions: {
      input: {
        main: page('./index.html'), // the homepage: the recipe-box portfolio (src/portfolio/)
        magic8Ball: page('./apps/magic-8-ball/index.html'), // /apps/magic-8-ball
      },
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
})
