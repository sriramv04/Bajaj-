// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Route for GET method
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

// Route for POST method
app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  const numbers = [];
  const alphabets = [];
  let highestAlphabet = '';

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else {
      alphabets.push(item);
      if (item.toLowerCase() > highestAlphabet.toLowerCase()) {
        highestAlphabet = item;
      }
    }
  });

  res.json({
    is_success: true,
    user_id: 'john_doe_17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
    numbers,
    alphabets,
    highest_alphabet: [highestAlphabet],
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(Server started on port ${port});
});