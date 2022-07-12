const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log('Successfully connected!'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
