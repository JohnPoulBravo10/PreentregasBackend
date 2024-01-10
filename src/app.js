import express from 'express';
import mongoose from 'mongoose';
import {engine} from 'express-handlebars';
import __dirname from './utils.js';
import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';

const PORT = 8080;
const MONGO = 'mongodb+srv://juanpablobravo0209:42765715JpB10@cluster0.h1cvx6d.mongodb.net/CoderBackend'

const app = express()

mongoose.connect(MONGO)

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.engine("handlebars",engine())
app.set("view engine", "handlebars")
app.set("views",__dirname + "/views")
app.use(express.static(__dirname + '/public'));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/products", routerview);

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})
