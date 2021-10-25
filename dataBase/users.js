const User = require('../model/userModel');

const findById = async (id) => {
    return await User.findById(id);
}

const findByEmail = async (email) => {
    return await User.findOne({ email });
};

const createNewUser = async (options) => {
    const user = new User(options);
    return await user.save();
};

const updateToken = async(id, token) => {
    return await User.updateOne({ _id: id }, { token })
};

const takeCurrentUser = async(token) => {
    return await User.findOne({ token });
};

const updateAvatar = async(id, avatar) => {
    return await User.updateOne({ _id: id }, { avatar })
}

module.exports = {
    findById,
    findByEmail,
    createNewUser,
    updateToken,
    takeCurrentUser,
    updateAvatar,
}