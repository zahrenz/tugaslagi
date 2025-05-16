import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'

export default class BooksController {
  public async index({ response }: HttpContext) {
    const books = await Book.all()
    return response.ok(books)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'author'])

    // Validasi manual
    if (!data.title || typeof data.title !== 'string' || data.title.length > 100) {
      return response.badRequest({ message: 'Title wajib diisi dan maksimal 100 karakter' })
    }
    if (!data.author || typeof data.author !== 'string' || data.author.length > 100) {
      return response.badRequest({ message: 'Author wajib diisi dan maksimal 100 karakter' })
    }

    const book = await Book.create(data)
    return response.created(book)
  }

  public async show({ params, response }: HttpContext) {
    const book = await Book.find(params.id)
    if (!book) {
      return response.notFound({ message: 'Buku tidak ditemukan' })
    }
    return response.ok(book)
  }

  public async update({ params, request, response }: HttpContext) {
    const book = await Book.find(params.id)
    if (!book) return response.notFound({ message: 'Buku tidak ditemukan' })

    const data = request.only(['title', 'author'])

    // Validasi manual untuk update (boleh kosong, tapi kalau ada harus valid)
    if (data.title !== undefined) {
      if (typeof data.title !== 'string' || data.title.length > 100) {
        return response.badRequest({ message: 'Title maksimal 100 karakter' })
      }
    }
    if (data.author !== undefined) {
      if (typeof data.author !== 'string' || data.author.length > 100) {
        return response.badRequest({ message: 'Author maksimal 100 karakter' })
      }
    }

    book.merge(data)
    await book.save()

    return response.ok(book)
  }

  public async destroy({ params, response }: HttpContext) {
    const book = await Book.find(params.id)
    if (!book) return response.notFound({ message: 'Buku tidak ditemukan' })

    await book.delete()
    return response.noContent()
  }
}
