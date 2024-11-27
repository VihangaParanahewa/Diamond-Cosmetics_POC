const express = require('express');
const router = express.Router();
const connection = require('../configuration/connection');

// This route handles GET requests to fetch all categories
router.get('/', (req, res) => {
    try {

        const query = `SELECT *
                       FROM categories`;

        connection.query(query, (err, categories) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({error: 'An error occurred while fetching categories.'});
            }

            console.debug('Fetched categories:', categories);
            res.json(categories);

        });
    } catch (error) {
        // Catch any other unexpected errors
        console.error('Unexpected error:', error);
        res.status(500).json({error: 'An unexpected error occurred.'});
    }
});

module.exports = router;