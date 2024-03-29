const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const { router } = require('./routes/transaction');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3001;



//middlewares

app.use(express.json());
app.use(cors());

//routes
readdirSync('./routes').map((route) =>
  app.use('/api/v1', require('./routes/' + route))
);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log('port running on PORT:', PORT);
  });
};

server();
