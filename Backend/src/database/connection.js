const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connectDatabase() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error(
                "MONGODB_URI não foi encontrada no arquivo .env"
            );
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ MongoDB conectado!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao MongoDB:");
        console.error(error.message);

        process.exit(1);
    }
}

module.exports = connectDatabase;