/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import BooksController from '#controllers/books_controller'
import SiswasController from '#controllers/siswas_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    halo: 'zahren',
  }
})
router
  .group(() => {
    router.get('/', [BooksController, 'index'])
    router.post('/', [BooksController, 'store'])
    router.get('/:id', [BooksController, 'show'])
    router.put('/:id', [BooksController, 'update'])
    router.delete('/:id', [BooksController, 'destroy'])

  })
  .prefix('/books')

router
  .group(() => {
    router.get('/', [SiswasController, 'index'])
    router.post('/', [SiswasController, 'store'])
    router.get('/:id', [SiswasController, 'show'])
    router.put('/:id', [SiswasController, 'update'])
    router.delete('/:id', [SiswasController, 'destroy'])
  })
  .prefix('/siswas')