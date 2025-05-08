const User = require('../models/user');

const userDao = {
    create: async (userData) => {
        return await User.create(userData);
    },

    findById: async (id) => {
        return await User.findByPk(id);
    },

    findAll: async () => {
        return await User.findAll();
    },

    update: async (id, updateData) => {
        const user = await User.findByPk(id);
        if (!user) return null;
        return await user.update(updateData);
    },

    delete: async (id) => {
        const user = await User.findByPk(id);
        if (!user) return null;
        await user.destroy();
        return true;
    }
};

module.exports = userDao;