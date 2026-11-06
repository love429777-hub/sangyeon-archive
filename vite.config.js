import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectsJsonPath = path.resolve(__dirname, 'src/data/projects.json')

function saveBase64Image(dataUri, targetDir, baseName) {
  const match = dataUri.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/)
  if (!match) return dataUri
  let ext = match[1] === 'jpeg' ? 'jpg' : match[1]
  if (ext.includes('+')) ext = ext.split('+')[0]
  const base64Data = match[2]
  fs.mkdirSync(targetDir, { recursive: true })
  const fileName = `${baseName}.${ext}`
  const filePath = path.join(targetDir, fileName)
  fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'))
  return fileName
}

function projectApiPlugin() {
  return {
    name: 'project-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/projects' && req.method === 'GET') {
          try {
            const data = fs.readFileSync(projectsJsonPath, 'utf8')
            res.setHeader('Content-Type', 'application/json')
            res.end(data)
          } catch (err) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: err.message }))
          }
          return
        }

        if (req.url === '/api/projects' && req.method === 'POST') {
          const chunks = []
          req.on('data', chunk => chunks.push(chunk))
          req.on('end', () => {
            try {
              const bodyStr = Buffer.concat(chunks).toString('utf8')
              const newProj = JSON.parse(bodyStr)

              // If image is base64, save to public/images/projects/{id}/
              const projectDir = path.resolve(__dirname, 'public/images/projects', newProj.id)
              if (newProj.thumbnail?.startsWith('data:image/')) {
                const fileName = saveBase64Image(newProj.thumbnail, projectDir, 'thumb')
                newProj.thumbnail = `/images/projects/${newProj.id}/${fileName}`
              }

              if (Array.isArray(newProj.gallery)) {
                newProj.gallery = newProj.gallery.map((g, idx) => {
                  if (g.url?.startsWith('data:image/')) {
                    const fileName = saveBase64Image(g.url, projectDir, `gallery-${idx + 1}`)
                    return { ...g, url: `/images/projects/${newProj.id}/${fileName}` }
                  }
                  return g
                })
              }

              let projects = []
              if (fs.existsSync(projectsJsonPath)) {
                projects = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf8'))
              }

              const existingIdx = projects.findIndex(p => p.id === newProj.id)
              if (existingIdx >= 0) {
                projects[existingIdx] = newProj
              } else {
                projects.unshift(newProj)
              }

              fs.writeFileSync(projectsJsonPath, JSON.stringify(projects, null, 2), 'utf8')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, project: newProj }))
            } catch (err) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: err.message }))
            }
          })
          return
        }

        if (req.url?.startsWith('/api/projects/') && req.method === 'DELETE') {
          const id = decodeURIComponent(req.url.split('/api/projects/')[1].split('?')[0])
          try {
            let projects = []
            if (fs.existsSync(projectsJsonPath)) {
              projects = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf8'))
            }
            projects = projects.filter(p => p.id !== id)
            fs.writeFileSync(projectsJsonPath, JSON.stringify(projects, null, 2), 'utf8')
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, deletedId: id }))
          } catch (err) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: err.message }))
          }
          return
        }

        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    tailwindcss(),
    projectApiPlugin(),
  ],
})
