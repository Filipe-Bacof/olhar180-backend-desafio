const { user } = require('../models/IndexModel')

const verifyTokenForgotPass = async (req, res, next) => {
  const { email, password, token } = req.body

  if (!token)
    return res
      .status(401)
      .json({ message: 'O campo do Token não pode estar vazio' })
  if (!email)
    return res
      .status(401)
      .json({ message: 'O campo do e-mail não pode estar vazio.' })
  if (!password)
    return res
      .status(401)
      .json({ message: 'O campo de senha não pode estar vazio' })
  try {
    const foundUser = await user.findOne({
      where: {
        email,
      },
    })

    if (!foundUser) {
      res.status(400).send({ error: 'Usuário não encontrado' })
    }
    if (foundUser.passwordResetToken !== token)
      res.status(400).send({ error: 'O token informado está incorreto' })

    if (foundUser.passwordResetExpires < new Date())
      res
        .status(400)
        .send({ error: 'O token informado expirou, tente gerar novamente.' })

    next()
  } catch (err) {
    res.status(400).json({ message: 'Este token é inválido!' })
  }
}

module.exports = verifyTokenForgotPass
