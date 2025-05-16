import type { HttpContext } from '@adonisjs/core/http'
import Siswa from '#models/siswa'

export default class SiswasController {
  public async index({ response }: HttpContext) {
    const siswas = await Siswa.all()
    return response.ok(siswas)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'email', 'age'])

    // Validasi manual
    if (!data.name || typeof data.name !== 'string' || data.name.length > 100) {
      return response.badRequest({ message: 'Name wajib diisi dan maksimal 100 karakter' })
    }

    if (!data.email || typeof data.email !== 'string' || data.email.length > 255) {
      return response.badRequest({ message: 'Email wajib diisi dan maksimal 255 karakter' })
    }

    if (!data.age || typeof data.age !== 'number' || data.age < 1 || data.age > 120) {
      return response.badRequest({ message: 'Age wajib diisi dan harus valid' })
    }

    const siswa = await Siswa.create(data)
    return response.created(siswa)
  }

  public async show({ params, response }: HttpContext) {
    const siswa = await Siswa.find(params.id)
    if (!siswa) return response.notFound({ message: 'Siswa tidak ditemukan' })

    return response.ok(siswa)
  }

  public async update({ params, request, response }: HttpContext) {
    const siswa = await Siswa.find(params.id)
    if (!siswa) return response.notFound({ message: 'Siswa tidak ditemukan' })

    const data = request.only(['name', 'email', 'age'])


    if (data.name !== undefined) {
      if (typeof data.name !== 'string' || data.name.length > 100) {
        return response.badRequest({ message: 'Name maksimal 100 karakter' })
      }
    }

    if (data.email !== undefined) {
      if (typeof data.email !== 'string' || data.email.length > 255) {
        return response.badRequest({ message: 'Email maksimal 255 karakter' })
      }
    }

    if (data.age !== undefined) {
      if (typeof data.age !== 'number' || data.age < 1 || data.age > 120) {
        return response.badRequest({ message: 'Age harus berupa angka yang valid' })
      }
    }

    siswa.merge(data)
    await siswa.save()

    return response.ok(siswa)
  }

  public async destroy({ params, response }: HttpContext) {
    const siswa = await Siswa.find(params.id)
    if (!siswa) return response.notFound({ message: 'Siswa tidak ditemukan' })

    await siswa.delete()
    return response.noContent()
  }
}
