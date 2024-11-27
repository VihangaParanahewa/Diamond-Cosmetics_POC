require('dotenv').config(); // Load .env variables into process.env
const express = require('express');
const cors = require('cors');
const app = express();
const port= process.env.SERVER_PORT || '3000';
const path = require('path');


const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
// Use CORS middleware
app.use(cors());
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);