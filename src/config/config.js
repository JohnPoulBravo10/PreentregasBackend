import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO = process.env.MONGO;
const CLIENTID = process.env.client.clientID;
const CLIENTSECRET = process.env.client.clientSecret
const CALLBACKURL = process.env.client.callbackURL

export const options = {
    server: {
        port: PORT
    },
    mongo:{
        url: MONGO
    },
    client:{
        clientID: CLIENTID,
        clientSecret: CLIENTSECRET,
        callbackURL:CALLBACKURL
    }
};