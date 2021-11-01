const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose')
const multer = require('multer')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().array());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

mongoose.connect("mongodb+srv://itqademtestuser:CYIVvZGF7rbv8imk@cluster0.0qtig.mongodb.net/itqadem?retryWrites=true&w=majority")

/*
* Routes
*/
const categoryRoutes = require('./resources/categories')
const tagRoutes = require('./resources/tags')
app.use('/categories', categoryRoutes);
app.use('/tags', tagRoutes);


app.listen(3000, () => {
  console.log('listening on port 3000');
});
