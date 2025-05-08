const userService = require("../services/userService")

const userController = {
    signUp: async (req, res) => {
        const { username, password, email } = req.body;

        if (
            typeof username !== 'string' || username.trim() === '' ||
            typeof password !== 'string' || password.trim() === '' ||
            typeof email !== 'string' || email.trim() === ''
        ) {
            res.status(400).end("Invalid request body");
            return;
        }

        try {
            const newUser = userService.signUp({
                username, password, email
            })
    
            res.send(newUser)
            res.status(200).end()
        } catch (err) {
            res.status(err.code).end(err.message)
        }
    },
    login: async (req, res) => {
        const { username, password } = req.body;

        if (
            typeof username !== 'string' || username.trim() === '' ||
            typeof password !== 'string' || password.trim() === ''
        ) {
            res.status(400).end("Invalid request body");
            return;
        }
        
        try {
            const user = await userService.login({
                username, password
            })

            res.send(user)
            res.status(200).end()
        } catch (err) {
            res.status(err.code).end(err.message)
        }
    },
    resetPassword: async (req, res) => {
        const { username, newPassword } = req.body

        if (
            typeof username !== 'string' || username.trim() === '' ||
            typeof newPassword !== 'string' || newPassword.trim() === ''
        ) {
            res.status(400).end("Invalid request body");
            return;
        }

        try {
            const updatedUser = await userService.resetPassword({
                username, newPassword
            })

            res.send(updatedUser)
            res.status(200).end()
        } catch (err) {
            res.status(err.code).end(err.message)
        }
    }
}

module.exports = userController;