const User = require('../model/userModel');

const findByEmail = async (email) => {
    return await User.findOne({ email });
}

const createNewUser = async (options) => {
    const user = new User(options);
    return await user.save();
}


module.exports = {
    findByEmail,
    createNewUser,
}