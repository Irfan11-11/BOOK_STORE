const express = require('express');
const app = express();
const cors = require("cors")
require("dotenv").config();
require("./connection/connection")
const User = require("./routes/user")
const Books = require("./routes/book")
const Favourite = require("./routes/favourite")
const Cart = require("./routes/cart");
const order = require('./Models/order');

app.use(cors())
app.use(express.json())


app.use("/api/v1",User)
app.use("/api/v1",Books)
app.use("/api/v1",Favourite)
app.use("/api/v1",Cart)
app.use("/api/v1",order)





const PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
    console.log(`server started at PORT: ${PORT}`);
})

app.get('/',(req,res)=>{
    res.send('hello Backend');
})

 