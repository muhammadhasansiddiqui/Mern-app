const mongoose = require('mongoose');

const mango_url = process.env.MANGO_CONN

mongoose.connect(mango_url)
.then(() => {
    console.log('Connected to MongoDB .......');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});