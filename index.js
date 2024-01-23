require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const { sendEmail } = require("./utils/nodemailer");

// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());
// cors origin
app.use(
  cors({
    origin: [
      "https://subharthi-portfolio.vercel.app/",
      "https://subharthi-portfolio.vercel.app",
      "http://subharthi-portfolio.vercel.app/",
      "http://subharthi-portfolio.vercel.app",
    ],
  })
);

app.post("/sendmail", async (req, res) => {
  try {
    const { name, message } = req.body;

    await sendEmail(name, message);
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

app.get("/cron", (req, res) => {
  res.status(200).json({ cron: "hit" });
});

const PORT = process.env.PORT || 5000;
const initserver = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT} ...`);
    });
  } catch (err) {}
};
initserver();
