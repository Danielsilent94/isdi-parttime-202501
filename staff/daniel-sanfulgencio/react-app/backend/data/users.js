import { errors } from 'common';
import User from '../models/User.js';

const users = {
    createUser: async (userData, callback) => {
        try {
            const user = new User({
                email: userData.email,
                password: userData.password,
                username: userData.username,
                avatar: userData.avatar || '',
                bio: userData.bio || ''
            });
            await user.save();
            callback(null, user);
        } catch (error) {
            callback(error);
        }
    },

    findUserByEmail: async (email, callback) => {
        try {
            const user = await User.findOne({ email });
            callback(null, user);
        } catch (error) {
            callback(error);
        }
    },

    findUserById: async (id, callback) => {
        try {
            const user = await User.findById(id);
            callback(null, user);
        } catch (error) {
            callback(error);
        }
    },

    updateUserById: async (id, newUserData, callback) => {
        try {
            const user = await User.findByIdAndUpdate(id, newUserData, { new: true });
            if (!user) {
                callback(new errors.ExistenceError('user not found'));
            } else {
                callback(null, user);
            }
        } catch (error) {
            callback(error);
        }
    }
};

export default users;