const express = require("express");
const app = express();
const { inviaSpedizione } = require("./brt");

app.use(express.json());

app.post("/spedizione", async (req, res) => {
  try {
    const result = await inviaSpedizione(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
