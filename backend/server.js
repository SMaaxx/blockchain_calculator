const express = require('express')
const cors =  require('cors');
const bodyParser = require('body-parser');

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/routes')(app);

const PORT = process.env.BACKEND_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})