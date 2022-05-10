const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const Recipe = require('./Recipe');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        selectedRecipeIds: [String]

    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


userSchema.virtual('recipeCount').get(function () {
    return this.selectedRecipeIds.length;
});

const User = model('User', userSchema);

module.exports = User;