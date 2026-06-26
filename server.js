app.post("/", async (req, res) => {
  try {
    const location =
      req.body.location_solved?.location ||
      req.body.data?.location_solved?.location ||
      req.body.uplink_message?.locations?.frm_payload;

    if (!location) {
      console.log("No location found:", JSON.stringify(req.body, null, 2));
      return res.sendStatus(200);
    }

    await db.ref("ROUTE-1").update({
      latitude: location.latitude,
      longitude: location.longitude,
      lastUpdated: new Date().toLocaleTimeString(),
      status: "Moving"
    });

    console.log("ROUTE-1 GPS Updated:", location);
    res.sendStatus(200);

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
