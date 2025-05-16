import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Siswa extends BaseModel {
  @column({ isPrimary: true })
  declare id: number | undefined

  @column()
  declare name: string | undefined

  @column()
  declare email: string | undefined

  @column()
  declare age: string | undefined

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | undefined

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | undefined
}
