const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("counter.db");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/test", (req, res) => {
  res.send("Hello world");
});

app.get("/api/counterValue", (req, res) => {
  db.serialize(() => {
    db.get("SELECT value FROM counter", (err, data) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ error: "Something went wrong, please try again later" });
        return;
      }
      res.status(200).json({ counterValue: data.value });
    });
  });
});

app.listen(port, () => {
  db.serialize(() => {
    db.run("DROP TABLE IF EXISTS counter");
    db.run("CREATE TABLE IF NOT EXISTS counter (value INTEGER)");
    db.run("INSERT INTO counter (value) VALUES (0)");
  });
  console.log(`Example app listening on port ${port}!`);
});
