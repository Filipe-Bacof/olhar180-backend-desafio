const { task, user } = require('../models/IndexModel')

class TaskController {
  async index(_req, res) {
    try {
      const tasks = await task.findAll({
        include: {
          model: user,
          as: 'user',
          attributes: ['name', 'surname', 'email', 'githubUrl'],
        },
      })
      return res.status(200).json(tasks)
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Houve um problema ao buscar as tarefas.' })
    }
  }

  async show(req, res) {
    const { id } = req.params
    try {
      const foundTask = await task.findByPk(id, {
        include: {
          model: user,
          as: 'user',
          attributes: ['name', 'surname', 'email', 'githubUrl'],
        },
      })
      if (!foundTask) {
        return res.status(404).json({ message: 'Tarefa não encontrada.' })
      }
      return res.status(200).json(foundTask)
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Não foi localizada essa tarefa.' })
    }
  }

  async store(req, res) {
    const { title, description, conclusionDate, priority, userId } = req.body

    if (!title || !description || !conclusionDate || !priority || !userId) {
      return res
        .status(422)
        .json({ message: 'Estão faltando campos obrigatórios para o cadastro' })
    }

    try {
      const newTask = await task.create({
        title,
        description,
        conclusionDate,
        priority,
        userId,
      })
      return res
        .status(200)
        .json({ message: 'Tarefa criada com sucesso!', newTask })
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Houve um problema ao criar a tarefa.' })
    }
  }

  async update(req, res) {
    const { id } = req.params
    const { title, description, conclusionDate, priority, userId } = req.body
    try {
      const updatedTask = await task.findByPk(id)
      if (!updatedTask) {
        return res.status(404).json({ message: 'Tarefa não encontrada.' })
      }

      title && (updatedTask.title = title)
      description && (updatedTask.description = description)
      conclusionDate && (updatedTask.conclusionDate = conclusionDate)
      priority && (updatedTask.priority = priority)
      userId && (updatedTask.userId = userId)

      await updatedTask.save()

      return res
        .status(200)
        .json({ message: 'Tarefa atualizada com sucesso!', updatedTask })
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Houve um problema ao atualizar a tarefa.' })
    }
  }

  async delete(req, res) {
    const { id } = req.params
    try {
      const deletedTask = await task.findByPk(id)
      if (!deletedTask) {
        return res.status(404).json({ message: 'Tarefa não encontrada.' })
      }

      await deletedTask.destroy()

      return res.status(200).json({ message: 'Tarefa excluída com sucesso!' })
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Houve um problema ao excluir a tarefa.' })
    }
  }
}

module.exports = new TaskController()
