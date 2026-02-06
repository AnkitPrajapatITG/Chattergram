// const mongoose = require('mongoose');

// consolke.log('process.env.DB_URL', process.env.DB_URL)

// mongoose.connect(process.env.DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log("Connected to MongoDB");
// }).catch((error) => {
//     console.log("Failed to connect to MongoDB", error);
// });



/**
 * ============================================================
 * DATABASE CONNECTION (MONGOOSE)
 * ============================================================
 * - Establishes a single MongoDB connection using Mongoose
 * - Prevents multiple connections in serverless / hot reload
 * - Ensures TTL index exists for ActiveUser cleanup
 */

const mongoose = require("mongoose");







exports.dbConnection = async () => {
    // Prevent reconnecting if already connected


    try {
        // Connect to MongoDB using connection string from env
        await mongoose.connect(process.env.DB_URL, {

        }).then(() => {
            console.log("Connected to MongoDB");
        }).catch((error) => {
            console.log("Failed to connect to MongoDB", error);
        });

    }
    catch (error) {
        console.error(error)
    }

    /**
* ------------------------------------------------------------
* TTL INDEX SETUP
* ------------------------------------------------------------
* Automatically removes inactive users after 5 minutes
* based on `lastActive` field.
* This is useful for real-time active user tracking.
*/

};


