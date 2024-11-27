const express = require('express');
const router = express.Router();
const connection = require('../configuration/connection');
const upload = require('../middlewares/upload');

// This route handles GET requests to fetch all products
router.get('/', (req, res) => {
    try {
        // Validate and parse page and limit query parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).json({error: 'Page and limit must be greater than 0.'});
        }

        let productCount = 0;

        const query_for_total_count = `SELECT COUNT(*) AS total FROM products;`

        connection.query(query_for_total_count,(err, count) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({error: `An error occurred while calculating product count.`});
            }

            productCount = count[0].total;
        });

        const offset = (page - 1) * limit;

        const query = `SELECT products.*, categories.name as categoryName
                       FROM products
                                LEFT JOIN categories ON products.categoryId = categories.id LIMIT ?
                       OFFSET ?`;

        const values = [limit, offset];

        connection.query(query, values, (err, products) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({error: 'An error occurred while fetching products.'});
            }

            console.debug('Fetched products:', products);
            res.json({data : products, total : productCount});

        });
    } catch (error) {
        // Catch any other unexpected errors
        console.error('Unexpected error:', error);
        res.status(500).json({error: 'An unexpected error occurred.'});
    }
});

// This route handles POST requests to create a new product
router.post('/',  upload.single('imageFile'), (req, res) => {
    try {
        const { name, categoryId, description, directions, price, in_stock } = req.body;

        // Validate product input
        const isValidProductInput = validateProductInput({
            name,
            categoryId,
            description,
            directions,
            price,
            in_stock
        }, res);

        if (!isValidProductInput) return;

        // Convert string values to numbers
        const categoryId_number = Number(categoryId);
        const price_number = Number(price);
        const in_stock_number = Number(in_stock);

        // Get the uploaded file information
        const uploadedFile = req.file;
        if (!uploadedFile) {
            return res.status(400).json({ error: 'Image file is required.' });
        }

        // Generate the image URL (this assumes the uploads folder is publicly accessible)
        const imageUrl = `/public/uploads/images/${uploadedFile.filename}`;


        // Prepare the SQL query and values
        const query = `INSERT INTO products (name, categoryId, description, directions, price, in_stock, image_url)
                       VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const values = [name, categoryId_number, description, directions, price_number, in_stock_number, imageUrl];

        connection.query(query, values, (err, result) => {
            if (err) {
                // Log the error and respond with a server error
                console.error('Database error:', err);
                return res.status(500).json({ error: 'An error occurred while creating the product.' });
            }

            console.debug(`Created product with ID: ${result.insertId}`);

            res.status(201).json({
                message: 'Product created successfully.',
                product: { id: result.insertId, name, categoryId, description, directions, price, in_stock, imageUrl }
            });
        });
    } catch (error) {
        // Catch unexpected errors
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});


// This route handles PUT requests to update specific product
router.put('/', (req, res) => {
    try {
        const {id, name, categoryId, description, directions, price, in_stock} = req.body;
        const isValidProductInput = validateProductInput({
            name,
            categoryId,
            description,
            directions,
            price,
            in_stock
        }, res);
        if (!isValidProductInput) return;

        const query = `
            UPDATE products
            SET name        = ?,
                categoryId  = ?,
                description = ?,
                directions  = ?,
                price       = ?,
                in_stock    = ?
            WHERE id = ?;
        `;
        const values = [name, categoryId, description, directions, price, in_stock, id];

        connection.query(query, values, (err, updatedProduct) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({error: `An error occurred while updating product of ${name}.`});
            }

            // Check if the product was actually updated
            if (updatedProduct.affectedRows === 0) {
                return res.status(404).json({error: `No product found with ID of ${id}.`});
            }

            console.debug(`Updated product with ID ${id}`);

            res.json({
                message: `Product updated successfully.`,
                product: {id: id, name, categoryId, description, directions, price, in_stock}
            });
        });
    } catch (error) {
        // Catch unexpected errors
        console.error('Unexpected error:', error);
        res.status(500).json({error: 'An unexpected error occurred.'});
    }
});

// This route handles DELETE requests to delete specific product
router.delete('/:id', (req, res) => {
    try {
        const productId = req.params.id;
        const isValidProductId = validateProductId(productId, res);
        if (!isValidProductId) return;

        const query = `DELETE
                       FROM products
                       WHERE id = ?;`;

        connection.query(query, productId, (err, deletedResult) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({error: `An error occurred while deleting product with ID ${productId}.`});
            }

            // Check if the product was actually updated
            if (deletedResult.affectedRows === 0) {
                return res.status(404).json({error: `No product found with ID ${productId}.`});
            }

            console.debug(`Deleted product with ID ${productId}`);
            res.json({message: `Product deleted successfully.`});
        });
    } catch (error) {
        // Catch unexpected errors
        console.error('Unexpected error:', error);
        res.status(500).json({error: 'An unexpected error occurred.'});
    }
});

function validateProductId(productId, res) {
    if (!productId || isNaN(productId)) {
        return res.status(400).json({error: 'Invalid product ID.'});
    }
    // Return true if validation passes
    return true;
}

function validateProductInput({name, categoryId, description, directions, price, in_stock}, res) {
    if (!name || typeof name !== 'string') {
        return res.status(400).json({error: 'Product name is required and must be a string.'});
    }
    if (!categoryId || isNaN(categoryId)) {
        return res.status(400).json({error: 'Category ID is required and must be a number.'});
    }
    if (description && typeof description !== 'string') {
        return res.status(400).json({error: 'Description must be a string.'});
    }
    if (directions && typeof directions !== 'string') {
        return res.status(400).json({error: 'Directions must be a string.'});
    }
    if (!price || isNaN(price) || price < 0) {
        return res.status(400).json({error: 'Price is required and must be a positive number.'});
    }
    if (!in_stock || isNaN(in_stock) || in_stock < 0) {
        return res.status(400).json({error: 'In-stock must be a boolean value.'});
    }
    // Return true if validation passes
    return true;
}

module.exports = router;