// const MongoClient = require('mongodb');
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  /*  // FindOneAdnUpdate
   db.collection('Todos').findOneAndUpdate({
   _id: ObjectID("58aefeba2e085499d728ab72")
   }, {
   $set: {
   completed: true
   }
   }, {
   returnOriginal: false
   }).then((result) => {
   console.log(result);
   });*/
  db.collection('Users').findOneAndUpdate({
    _id: ObjectID("58a01e9fbe375b31882bc3b2")
  }, {
    $set: {
      name: 'sairus'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });
  db.close();
});
