const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userschema = new Schema({
    firstName: {
        type: String,
        required: [true, "El primer nombre es Requerido"]
    },
    secondName: {
        type: String,
        required: [true, "El segundo nombre es Requerido"]
    },
    firstSurname: {
        type: String,
        required: [true, "El primer apellido es Requerido"]

    },
    secondSurname: {
        type: String,
        required: [true, "El segundo apellido es Requerido"]

    },
    email: {
        type: String,
        required: [true, "El email es Requerido"]
    },
    username: {
        type: String,
        required: [true, "El nombre es Requerido"]
    },
    password: {
        type: String,
        required: [true, "El nombre es Requerido"]
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Rol',
        required: [true, "El nombre es Requerido"]
    },
    state: {
        type: Boolean,
        default: true
    }

});

userschema.methods.toJSON = function () {
    let user = this
    let user_object = user.toObject()
    delete user_object.password
    return user_object
};

// userschema.plugin(uniqueValidator, {
//     message: `{PATH} debe ser unico`
// });


module.exports = mongoose.model('User', userschema);