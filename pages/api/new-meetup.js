// /api/new-meetup
import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const connect = await MongoClient.connect(
      'mongodb+srv://tegajunior:tegajunior@cluster0.mykpl.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = connect.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    connect.close();

    res.status(201).json({ message: 'Meetup Inserted' });
  }
}

export default handler;
