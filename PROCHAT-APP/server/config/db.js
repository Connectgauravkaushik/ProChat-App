const mongoose = require("mongoose");

const connectDataBase = async()=> {

    try {
        const connect = await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@prochatapp.lj9bhzl.mongodb.net/`);
        console.log(`MongoDb connected!!,${connect.connection.host}`);
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

module.exports = connectDataBase;
