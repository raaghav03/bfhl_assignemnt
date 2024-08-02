// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST endpoint
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, error: "Invalid input format" });
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item) && item.length === 1);
    const highestAlphabet =
      alphabets.length > 0
        ? [
            alphabets.reduce((a, b) =>
              a.toLowerCase() > b.toLowerCase() ? a : b
            ),
          ]
        : [];

    const response = {
      is_success: true,
      user_id: "raghav_nagpal_22122003",
      email: "rn2199@srmist.edu.in",
      roll_number: "RA2111026030175",
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
