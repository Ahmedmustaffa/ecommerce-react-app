const dotenv = require("dotenv");
dotenv.config();

const app = require('./app');
const mongoose = require("mongoose");

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(" connection to mongoDB has successed");
    } catch (error) {
        console.log(" connection to mongoDB has failed", error);
        process.exit(1);
    }
};

mongoDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`the server is running at ${PORT}`);
});