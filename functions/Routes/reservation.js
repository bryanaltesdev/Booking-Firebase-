
var express = require('express');
var router = express.Router();

router.post('/', async (req, res) => {
  const reservation = req.body;
  const admin = req.admin;
  let data = {
    note: reservation.note,
    startDate: new Date( reservation.startDate *1000),
    endDate: new Date( reservation.endDate *1000),
    resource: admin.firestore().collection("resource").doc(reservation.resource.id)
  }
  console.log(data)
  await admin.firestore().collection('reservation').add(data);
  res.status(201).send();
});

router.get('/', async (req, res) => {
  const admin = req.admin;
  const snapshot = await admin.firestore().collection('reservation').get();
  let reservation = [];
  snapshot.forEach(doc => {
    let id = doc.id;
    let data = doc.data();
    reservation.push({id, ...data});
  });
  res.status(200).send(JSON.stringify(reservation));
});

router.get("/:id", async (req, res) => {
  const admin = req.admin;
  const snapshot = await
  admin.firestore().collection('reservation').doc(req.params.id).get();
  const userId = snapshot.id;
  const userData = snapshot.data();
  res.status(200).send(JSON.stringify({id: userId, ...userData}));
})

router.put("/:id", async (req, res) => {
  const admin = req.admin;
  const reservation = req.body;
  let data = {
    note: reservation.note,
    startDate: new Date( reservation.startDate *1000),
    endDate: new Date( reservation.endDate *1000),
    resource: admin.firestore().collection("resource").doc(reservation.resource.id)
  }
  await admin.firestore().collection('reservation').doc(req.params.id).update(data);
  res.status(200).send()
});

router.delete("/:id", async (req, res) => {
  const admin = req.admin;
  await
  admin.firestore().collection("reservation").doc(req.params.id).delete();
  
  res.status(200).send();
})

module.exports = router;