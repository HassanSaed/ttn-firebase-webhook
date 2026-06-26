const express = require("express");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://student-bus-tracker-e03fc-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database();

app.get("/", (req, res) => {
  res.send("TTN Firebase Webhook is running");
});

app.post("/", async (req, res) => {
  try {
    console.log(JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Webhook running");
});
