const express = require("express")
const q2m = require("query-to-mongo")
const { authenticate } = require("../auth/tools")
const { authorize } = require("../auth/middlewares")
const passport = require("passport");

const UserModel = require("./schema")

const usersRouter = express.Router()

usersRouter.get("/", authorize, async (req, res, next) => {
  try {
    console.log(req.user)
    const users = await UserModel.find()
    res.send(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/me", authorize, async (req, res, next) => {
  try {
    res.send(req.user)
  } catch (error) {
    next(error)
  }
})


usersRouter.put("/me", authorize, async (req, res, next) => {
  try {
    const updates = Object.keys(req.body)
    updates.forEach(update => (req.user[update] = req.body[update]))
    await req.user.save()
    res.send(req.user)
  } catch (error) {
    next(error)
  }
})

usersRouter.delete("/me", authorize, async (req, res, next) => {
  try {
    await req.user.deleteOne(res.send("Deleted"))
  } catch (error) {
    next(error)
  }
})

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findByCredentials(email, password)
    const token = await authenticate(user)
    res.send({ token, userName: user.userName, role: role })
  } catch (error) {
    next(error)
  }
})
usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body)
    const { _id } = await newUser.save()
    const token = await authenticate(user)
    res.status(201).send({ token, firstNname: newUser.firstName, userName: newUser.userName, role: newUser.role })
  } catch (error) {
    next(error)
  }
})

usersRouter.post("/logout", authorize, async (req, res, next) => {
  try {
    req.user.refreshTokens = req.user.refreshTokens.filter(
      t => t.token !== req.body.refreshToken
    )
    await req.user.save()
    res.send()
  } catch (err) {
    next(err)
  }
})

usersRouter.post("/logoutAll", authorize, async (req, res, next) => {
  try {
    req.user.refreshTokens = []
    await req.user.save()
    res.send()
  } catch (err) {
    next(err)
  }
})

usersRouter.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

usersRouter.get(
  "/googleRedirect",
  passport.authenticate("google"),
  async (req, res, next) => {
    try {
      res.cookie("accessToken", req.user.tokens.accessToken, {
        httpOnly: true,
      })

      res.status(200).redirect("http://localhost:3000")
    } catch (error) {
      next(error)
    }
  }
)

module.exports = usersRouter
