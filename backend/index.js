const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cros = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');


require('dotenv').config();
require('./Models/db');




const port = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('Hello World! PONG');
});


app.use(bodyParser.json());
app.use(cros());
app.use('/auth',AuthRouter  );
app.use('/products', ProductRouter );


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});