import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('author').notNullable()
      table.text('description').nullable() // ✅ Tambahan kolom deskripsi

      // Tambah kolom category dengan opsi
      table.enum('category', ['Fiction', 'Non-Fiction', 'Biography', 'Fantasy', 'Science']).notNullable()

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
