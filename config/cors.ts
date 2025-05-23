import { defineConfig } from '@adonisjs/cors'

const corsConfig = defineConfig({
  enabled: true,
  origin: ['http://localhost:3000'], // Ganti dengan URL frontend (Next.js)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  headers: ['Content-Type', 'Authorization'],
  exposeHeaders: [],
  credentials: true, // Opsional: hanya jika pakai cookies/auth
  maxAge: 90,
})

export default corsConfig