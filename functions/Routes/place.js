
var express = require('express');
var router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  const admin = req.admin;
  await admin.firestore().collection('place').add(data);
  res.status(201).send();
});

router.get('/', async (req, res) => {
  const admin = req.admin;
  const snapshot = await admin.firestore().collection('place').get();
  let place = [];
  snapshot.forEach(doc => {
    let id = doc.id;
    let data = doc.data();
    place.push({id, ...data});
  });
  res.status(200).send(JSON.stringify(place));
});

router.get("/:id", async (req, res) => {
  const admin = req.admin;
  const snapshot = await
  admin.firestore().collection('place').doc(req.params.id).get();
  const userId = snapshot.id;
  const userData = snapshot.data();
  res.status(200).send(JSON.stringify({id: userId, ...userData}));
})

router.put("/:id", async (req, res) => {
  const admin = req.admin;
  const body = req.body;
  await 
admin.firestore().collection('place').doc(req.params.id).update(body);
  res.status(200).send()
});

router.delete("/:id", async (req, res) => {
  const admin = req.admin;
  await
  admin.firestore().collection("place").doc(req.params.id).delete();
  
  res.status(200).send();
})

module.exports = router;