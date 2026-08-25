const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const Routes = require('./routes/routes');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});