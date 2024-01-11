const mongoose = require('mongoose');

const adminCredentialSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const adminCredentialModel = mongoose.model("admin_credential", adminCredentialSchema);

module.exports = {  
    adminCredentialModel,
};