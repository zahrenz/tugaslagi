import vine from '@vinejs/vine'

export const createBookValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(5).maxLength(10),
        author: vine.string().trim().minLength(5).maxLength(10),
    })
)

export const updateBookValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(5).maxLength(10).optional(),
        author: vine.string().trim().minLength(5).maxLength(10).optional(),
    })
)

export const deleteBookValidator = vine.compile(
    vine.object({
        params: vine.object({
            id: vine.number().positive(),
        }),
    })
)