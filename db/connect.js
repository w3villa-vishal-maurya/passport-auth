const mongoose = require("mongoose");

const connectMongoose = () => {
    mongoose
        .connect(process.env.CONNECT_URL)
        .then((e) => {
            console.log(`Connect to mongoDb: ${e.connection.host}`);
        })
        .catch((e) => {
            console.log(e);
        })
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = {
    connectMongoose,
    User
}