const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { user, task } = require('../models/IndexModel')

class UserController {
  async index(req, res) {
    try {
      const users = await user.findAll({
        include: {
          model: task,
          as: 'tasks',
          attributes: [
            'id',
            'title',
            'description',
            'conclusionDate',
            'completed',
            'priority',
          ],
        },
      })
      return res.status(200).json(users)
    } catch (error) {
      console.log('ERRO!!!!', error)
      return res
        .status(500)
        .json({ message: 'Houve um problema ao buscar os usuários.' })
    }
  }

  async show(req, res) {
    const { id } = req.params
    try {
      const foundUser = await user.findByPk(id, {
        include: {
          model: task,
          as: 'tasks',
          attributes: [
            'id',
            'title',
            'description',
            'conclusionDate',
            'completed',
            'priority',
          ],
        },
      })
      if (!foundUser) {
        return res.status(404).json({ message: 'Usuário não encontrado.' })
      }
      return res.status(200).json(foundUser)
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Não foi localizado esse usuário.' })
    }
  }

  async register(req, res) {
    const { name, surname, email, password, githubUrl } = req.body

    if (!name || !surname || !email || !password) {
      return res
        .status(422)
        .json({ message: 'Estão faltando campos obrigatórios para o cadastro' })
    }

    const isUserAlreadyRegistered = await user.findAll({
      where: {
        email,
      },
    })

    if (isUserAlreadyRegistered.length > 0) {
      return res.status(422).json({ message: 'Esse usuário já foi cadastrado' })
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = await user.create({
      name,
      surname,
      email,
      password: passwordHash,
      ...(githubUrl && { githubUrl }),
    })

    return res
      .status(200)
      .json({ message: 'Usuário criado com sucesso', newUser })
  }

  async login(req, res) {
    const { email, password } = req.body

    const currentUser = await user.findOne({
      where: {
        email,
      },
    })

    if (!currentUser)
      return res.status(404).json({ message: 'Usuário não encontrado' })

    const isPasswordCorrect = await bcrypt.compare(
      password,
      currentUser.password,
    )

    if (!isPasswordCorrect)
      return res.status(422).json({ message: 'Senha incorreta.' })

    try {
      const { JWT_SECRET } = process.env
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        JWT_SECRET,
        {
          expiresIn: '24h',
        },
      )

      const { id, name, surname, email, githubUrl } = currentUser

      res.status(200).cookie('token', token, { httpOnly: true }).json({
        message: 'Usuário logado com sucesso',
        user: {
          id,
          name,
          surname,
          email,
          githubUrl,
        },
        token,
      })
    } catch (err) {
      res.send(500).json('Algo deu errado com o login.')
    }
  }

  async update(req, res) {
    const { id } = req.params
    const { name, surname, email, password, githubUrl } = req.body
    try {
      const updatedUser = await user.findByPk(id)
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado.' })
      }

      name && (updatedUser.name = name)
      surname && (updatedUser.surname = surname)
      email && (updatedUser.email = email)
      githubUrl && (updatedUser.githubUrl = githubUrl)

      if (password && password.trim() !== '') {
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
        updatedUser.password = passwordHash
      }

      await updatedUser.save()

      return res
        .status(200)
        .json({ message: 'Usuário atualizado com sucesso!', updatedUser })
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Houve um problema ao atualizar o usuário.' })
    }
  }

  async delete(req, res) {
    const { id } = req.params
    try {
      const deletedUser = await user.findByPk(id)
      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado.' })
      }

      await deletedUser.destroy()

      return res.status(200).json({ message: 'Usuário excluído com sucesso!' })
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Houve um problema ao excluir o usuário.' })
    }
  }
}

module.exports = new UserController()
