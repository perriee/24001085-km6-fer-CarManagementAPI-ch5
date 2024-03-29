const { createClient } = require("redis");

const client = async () => {
    const connection = await createClient({
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        },
    });

    await connection.connect();
    return connection;
};

module.exports = client;
