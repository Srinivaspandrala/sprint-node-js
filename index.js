const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const router = require('./src/routes/index');

const app = express();
const port = process.env.PORT 

app.use(express.json());

// Correctly mount the router
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})