// const MongoClient = require('mongodb');
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  /*  db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((response) => {
   console.log(response.result);
   });*/

  // deleteOne
  /*  db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((response) => {
   console.log(response.result);
   });*/

  // findOneAdnDelete
  /*  db.collection('Todos').findOneAndDelete({text: 'Eat lunch'}).then((response) => {
   console.log(response);
   });*/

  db.collection('Users').deleteMany({ name: 'sairus' }).then((response) => {
    console.log(response.result);
  });

  db.collection('Users').deleteOne({_id: ObjectID("58a024f7efa51a22a4921784")}).then((response) => {
    console.log(response.result);
  });

  db.close();
});
