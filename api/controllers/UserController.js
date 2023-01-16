const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, password, confirmpassword } = req.body

    console.log(req.body)

    if (!name || !email || !password || !confirmpassword) {
      res.status(422).json({message: "Preencha todos os campos!"})
      return
    }

    if (password !== confirmpassword) {
      res.status(422).json({message: "As senhas não conferem!"})
      return
    }

    const userExists = await User.findOne({email: email})

    if (userExists) {
      res.status(422).json({message: "Por favor, utilize outro email!"})
      return
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
      name,
      email,
      password: passwordHash
    })

    try {
      const newUser = await user.save()
      await createUserToken(newUser, req, res)
    } catch (error) {
      res.status(500).json({message: 'Ocorreu algum erro, tente mais tarde!'})
      console.log(error);
    }

  }

  static async login(req, res) {
    const {email, password} = req.body

    console.log(req.body)

    if (!email || !password) {
      res.status(422).json({message: "Preencha todos os campos!"})
      return
    }

    const user = await User.findOne({email: email})

    if (!user) {
      res.status(422).json({message: "Por favor, utilize um email existente!"})
      return
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      res.status(422).json({message: "Senha inválida!"})
      return
    }

    try {
      await createUserToken(user, req, res)
    } catch (error) {
      res.status(500).json({message: 'Ocorreu algum erro, tente mais tarde!'})
      console.log(error);
    }
  }

  static async checkUser(req, res) {
    let currentUser

    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, 'nossosecret')

      currentUser = await User.findById(decoded.id)

      currentUser.password = undefined
    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

  static async getUserById(req, res) {
    const id = req.params.id

    const user = await User.findById({_id: id}).select('-password')

    if (!user) {
      res.status(422).json({message: "Usuário não encontrado!"})
      return
    }

    res.status(200).json({user})
  }

  static async editUser(req, res) {
    const {name, email, password, confirmpassword} = req.body
    
    const token = getToken(req)

    //console.log(token);

    const user = await getUserByToken(token)

    // validations
    if (!name || !email || !password || !confirmpassword) {
      res.status(422).json({ message: 'Preencha todos os campos!' })
      return
    }

    // check if user exists
    const userExists = await User.findOne({ email: user.email })

    console.log(userExists);

    if (user.email !== email && userExists) {
      res.status(422).json({ message: 'Por favor, utilize o e-mail cadastrado!' })
      return
    }

    console.log(email);
    console.log(user.email);

    user.email = email
    user.name = name

    // check if password match
    if (password !== confirmpassword) {
      res.status(422).json({ error: 'As senhas não conferem.' })
      return
    } 

    const salt = await bcrypt.genSalt(12)
    //console.log(password);
    const passwordHash = await bcrypt.hash(password, salt)

    user.password = passwordHash
    

    try {
      // returns updated data
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true },
      )
      res.json({
        message: 'Usuário atualizado com sucesso!',
        data: updatedUser,
      })
    } catch (error) {
      res.status(500).json({ message: "Ocorreu um erro, tente mais tarde!" })
    }
  }
}