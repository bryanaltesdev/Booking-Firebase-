
var express = require('express');
var router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  const savedata = {
    name: data.name,
    available: data.available,
    endDate: data.endDate,
    startDate: data.startDate,
    minium: data.minium,
    maximum: data.maximum,
    startTime: data.startTime,
    endTime: data.endTime,
    days: data.days
  }
  console.log(savedata, data, typeof(data));
  const admin = req.admin;
  await admin.firestore().collection('resourceCalendar').add(data);
  res.status(201).send();
});

router.get('/', async (req, res) => {
  const admin = req.admin;
  const snapshot = await admin.firestore().collection('resourceCalendar').get();
  let resourceCalendar = [];
  snapshot.forEach(doc => {
    let id = doc.id;
    let data = doc.data();
    resourceCalendar.push({id, ...data});
  });
  res.status(200).send(JSON.stringify(resourceCalendar));
});

router.get("/:id", async (req, res) => {
  const admin = req.admin;
  const snapshot = await admin.firestore().collection('resourceCalendar').doc(req.params.id).get();
  const userId = snapshot.id;
  const userData = snapshot.data();
  res.status(200).send(JSON.stringify({id: userId, ...userData}));
})

router.put("/:id", async (req, res) => {
  const admin = req.admin;
  const body = req.body;
  await admin.firestore().collection('resourceCalendar').doc(req.params.id).update(body);
  res.status(200).send()
});

router.delete("/:id", async (req, res) => {
  const admin = req.admin;
  await admin.firestore().collection("resourceCalendar").doc(req.params.id).delete();
  
  res.status(200).send();
})

module.exports = router;