const dotenv = require("dotenv");
dotenv.config();

const app = require('./app');
const mongoose = require("mongoose");

const mongoDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in environment variables");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("connection to mongoDB has succeeded");
    } catch (error) {
        console.log("connection to mongoDB has failed", error.message);
        process.exit(1);
    }
};

mongoDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`the server is running at ${PORT}`);
});
