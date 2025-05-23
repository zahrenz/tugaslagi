import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'

const allowedCategories = ['Fiction', 'Non-Fiction', 'Biography', 'Fantasy', 'Science']

export default class BooksController {
  public async index({ response }: HttpContext) {
    const books = await Book.query().select('id', 'title', 'author', 'category', 'description')
    return response.ok(books)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'author', 'category', 'description'])

    // Validasi manual
    if (!data.title || typeof data.title !== 'string' || data.title.length > 100) {
      return response.badRequest({ message: 'Title wajib diisi dan maksimal 100 karakter' })
    }
    if (!data.author || typeof data.author !== 'string' || data.author.length > 100) {
      return response.badRequest({ message: 'Author wajib diisi dan maksimal 100 karakter' })
    }
    if (!data.category || !allowedCategories.includes(data.category)) {
      return response.badRequest({ message: 'Category tidak valid' })
    }
    if (data.description && typeof data.description !== 'string') {
      return response.badRequest({ message: 'Description harus berupa teks' })
    }

    const book = await Book.create(data)
    return response.created(book)
  }

  public async show({ params, response }: HttpContext) {
    const book = await Book.query()
      .select('id', 'title', 'author', 'category', 'description')
      .where('id', params.id)
      .first()

    if (!book) {
      return response.notFound({ message: 'Buku tidak ditemukan' })
    }
    return response.ok(book)
  }

  public async update({ params, request, response }: HttpContext) {
    const book = await Book.find(params.id)
    if (!book) return response.notFound({ message: 'Buku tidak ditemukan' })

    const data = request.only(['title', 'author', 'category', 'description'])

    if (data.title !== undefined && (typeof data.title !== 'string' || data.title.length > 100)) {
      return response.badRequest({ message: 'Title maksimal 100 karakter' })
    }
    if (data.author !== undefined && (typeof data.author !== 'string' || data.author.length > 100)) {
      return response.badRequest({ message: 'Author maksimal 100 karakter' })
    }
    if (data.category !== undefined && !allowedCategories.includes(data.category)) {
      return response.badRequest({ message: 'Category tidak valid' })
    }
    if (data.description !== undefined && typeof data.description !== 'string') {
      return response.badRequest({ message: 'Description harus berupa teks' })
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
