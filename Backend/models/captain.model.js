const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: 'string',
            required: true,
            minlength: [3, 'First name must be at least 3 characters'],
        },
        lastname: {
            type: 'string',
            minlength: [3, 'Last name must be at least 3 characters'],
        }
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: 'string',
        required: true,
        minlength: [6, 'Password must be at least 6 characters'],
    },
    socketId: {
        type: 'string',
    },
    status: {
        type: 'string',
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: 'string',
            required: true,
            minlength: [3, 'Vehicle color must be at least 3 characters'],
        },
        plate: {
            type: 'string',
            required: true,
            minlength: [3, 'Vehicle plate must be at least 3 characters'],
        },
        capacity: {
            type: 'number',
            required: true,
            min: [1, 'Vehicle capacity must be at least 1'],
        },
        vehicletype: {
            type: 'string',
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        },
    },
    location: {
        latitude: {
            type: 'number',    
        },
        longitude: {
            type: 'number',
        },
    },
});

// Pre-save hook to hash the password before saving
captainSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await captainSchema.statics.hashPassword(this.password);
    }
    next();
});

// Method to generate auth token
captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

// Method to compare password
captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Static method to hash password
captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;
