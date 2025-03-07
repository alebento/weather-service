const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongoServer;

const connectTestDB = async () => {
    if (mongoose.connection.readyState !== 0) {
        console.log("Banco de testes já conectado.");
        return;
    }

    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("Banco de testes conectado.");
};

const closeTestDB = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        if (mongoServer) await mongoServer.stop();
        console.log("Banco de testes desconectado.");
    }
};

const clearTestDB = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
};

module.exports = { connectTestDB, closeTestDB, clearTestDB };
