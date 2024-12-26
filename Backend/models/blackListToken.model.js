const mongoose = require('mongoose');

const blackListTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true,
        required: true,

    },
    createdeAt:{
        type:"Date",
        deafault: Date.now,
        expires:86400
    }
});

module.exports = mongoose.model('BlackListToken', blackListTokenSchema);