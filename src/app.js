import express from 'express';
import mongoose from 'mongoose';
import {engine} from 'express-handlebars';
import __dirname from "./utils.js";
import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';
import { routerview } from "./routes/routerview.routes.js"
import session from "express-session";
import MongoStore from "connect-mongo";
import { sessionRouter } from './routes/session.routes.js';
import { viewRoutes } from './routes/viewroutes.routes.js';
import passport from "passport";
import inicializePassport from "./config/passport.config.js";
import { options } from './config/config.js';

const PORT = 8080;
const MONGO = 'mongodb+srv://juanpablobravo0209:42765715JpB10@cluster0.h1cvx6d.mongodb.net/CoderBackend'

const app = express()

mongoose.connect(MONGO)

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl:3600
    }),
    secret:"CoderSecret",
    resave:false,
    saveUninitialized:false
}))

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/products", routerview);
app.use("/api/session", sessionRouter);
app.use("/", viewRoutes );
inicializePassport()
app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})
