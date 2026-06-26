const express = require("express");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://student-bus-tracker-e03fc-default-rtdb.firebaseio.com"
});

const db = admin.database();

app.post("/", async (req, res) => {
  try {

    const location =
      req.body.data.location_solved.location;

    await db.ref("buses/bus-001").set({
      latitude: location.latitude,
      longitude: location.longitude,
      lastUpdated: Date.now()
    });

    console.log("GPS Updated!");

    res.sendStatus(200);

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Webhook running");
});
