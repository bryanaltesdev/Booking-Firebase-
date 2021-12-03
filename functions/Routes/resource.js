
var express = require('express');
var router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  console.log(data)
  const admin = req.admin;
  // let place = db.collection("place").doc(data.place.id),
  let calendars = [];
  for (let index = 0; index < data.calendars.length; index++) {
    calendars.push(admin.firestore().collection("resourceCalendar").doc(data.calendars[index].id))
  }
  const savedata = {
    name: data.name,
    attributes: data.attributes,
    place: admin.firestore().collection("place").doc(data.place.id),
    calendars: calendars
  }
  console.log(savedata)
  await admin.firestore().collection('resource').add(savedata);
  res.status(201).send();
});

router.get('/', async (req, res) => {
  const admin = req.admin;
  const snapshot = await admin.firestore().collection('resource').get();
  let resource = [];
  snapshot.forEach(doc => {
    let id = doc.id;
    let data = doc.data();
    resource.push({id, ...data});
  });
  res.status(200).send(JSON.stringify(resource));
});

router.get('/searchResource', async (req, res) => {
  const admin = req.admin;
  const snapshot = await admin.firestore().collection('resource').get();
  let resource = [];
  snapshot.forEach(doc => {
    let id = doc.id;
    let data = doc.data();
    resource.push({id, ...data});
  });
  const snapshot1 = await admin.firestore().collection('typeofResource').get();
  let typeofResource = [];
  snapshot1.forEach(doc => {
    let id = doc.id;
    let data = doc.data();
    typeofResource.push({id, ...data});
  });
  const snapshot2 = await admin.firestore().collection('place').get();
  let place = [];
  snapshot2.forEach(doc => {
    let id = doc.id;
    let data = doc.data();
    place.push({id, ...data});
  });
  const searchData = {
    resource: resource,
    typeofResource: typeofResource,
    place: place
  }
  res.status(200).send(JSON.stringify(searchData));
});

router.get("/:id", async (req, res) => {
  const admin = req.admin;
  const snapshot = await admin.firestore().collection('resource').doc(req.params.id).get();
  const userId = snapshot.id;
  const userData = snapshot.data();
  res.status(200).send(JSON.stringify({id: userId, ...userData}));
})

router.put("/:id", async (req, res) => {
  const data = req.body;
  console.log(data)
  const admin = req.admin;
  // let place = db.collection("place").doc(data.place.id),
  let calendars = [];
  for (let index = 0; index < data.calendars.length; index++) {
    calendars.push(admin.firestore().collection("resourceCalendar").doc(data.calendars[index].id))
  }
  const savedata = {
    name: data.name,
    attributes: data.attributes,
    place: admin.firestore().collection("place").doc(data.place.id),
    calendars: calendars
  }
  console.log(savedata, req.params.id)
  await admin.firestore().collection("resource").doc(req.params.id).update(savedata);
  res.status(200).send()
});

router.delete("/:id", async (req, res) => {
  const admin = req.admin;
  await admin.firestore().collection("resource").doc(req.params.id).delete();
  
  res.status(200).send();
})

module.exports = router;