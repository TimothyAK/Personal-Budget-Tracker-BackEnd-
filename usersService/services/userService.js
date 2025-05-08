const bcrypt = require('bcrypt');
const userDAO = require('../repositories/userRepository');

const SALT_ROUNDS = 10;

const userService = {
    signUp: async ({ username, email, password }) => {
        const existingUsers = await userDAO.findAll();
        const usernameExists = existingUsers.find(u => u.username === username);
        const emailExists = existingUsers.find(u => u.email === email);

        if (usernameExists || emailExists) {
            const error = new Error('Username or email already in use');
            error.code = 400;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        try {
            return await userDAO.create({ username, email, password: hashedPassword });
        } catch (err) {
            if(err.code === 400) throw err;

            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    },

    login: async ({ username, password }) => {
        try {
            const users = await userDAO.findAll();

            const user = users.find(u => u.username === username);
            if (!user) {
                const error = new Error('User not found');
                error.code = 404;
                throw error;
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                const error = new Error('Invalid password');
                error.code = 400;
                throw error;
            }
    
            // Return user data excluding password
            const { password: _, ...userSafe } = user.toJSON();
            return userSafe;
        } catch (err) {
            if(err.code === 404 || err.code === 400) throw err;

            const error = new Error("Internal server error")
            error.code = 500;
            throw error;
        }
    },

    resetPassword: async ({ username, newPassword }) => {
        try {
            const users = await userDAO.findAll();
            const user = users.find(u => u.username === username);

            if (!user) {
                const error = new Error('User not found');
                error.code = 404;
                throw error
            }

            const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

            const updatedUser = await userDAO.update(user.userID, { password: hashedPassword });

            const { userID: _2, password: _, ...updatedValues } = updatedUser.dataValues

            return updatedValues;
        } catch (err) {
            if(err.code === 404) throw err;

            const error = new Error('Internal server error');
            error.code = 500;
            throw error;
        }
    }
};

module.exports = userService;