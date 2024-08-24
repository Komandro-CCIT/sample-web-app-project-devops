import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'
import { DateTime } from 'luxon'
export default class TodosController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const allTodos = await Todo.query().whereNull('deleted_at').orderBy('created_at', 'desc')
    return view.render("pages/home", { todos: allTodos })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render("pages/create")
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const todo = new Todo()
    const body = await request.body()

    todo.title = body.title
    todo.description = body.description
    todo.status = "TODO"

    await todo.save()

    return response.redirect().toRoute('todo.index')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
async edit({ view, params }: HttpContext) {
  const data = await Todo.findBy('id', params.id)
  return view.render("pages/edit", { todo: data })
}

/**
 * Handle form submission for the edit action
 */
async update({ params, request, response }: HttpContext) {

  const todo = await Todo.findByOrFail('id', params.id)
  const body = await request.body()

  todo.title = body.title
  todo.description = body.description
  todo.status = body.status

  await todo.save()

  return response.redirect().toRoute('todo.index')
}

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const todo = await Todo.findByOrFail('id', params.id)
    todo.deletedAt = DateTime.now()

    await todo.save()

    return response.redirect().toRoute('todo.index')
  }
}
