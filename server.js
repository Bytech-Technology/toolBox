const express = require('express');
const app = express();
const path = require("path");

const dotenv = require('dotenv');
dotenv.config();

const Routes = require('./routes/routes');

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

app.use('/', Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});