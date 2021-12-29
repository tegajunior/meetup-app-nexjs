import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        description={props.meetupData.description}
        address={props.meetupData.address}
      />
    </Fragment>
  );
};
export async function getStaticPaths() {
  const connect = await MongoClient.connect(
    'mongodb+srv://tegajunior:tegajunior@cluster0.mykpl.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = connect.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const connect = await MongoClient.connect(
    'mongodb+srv://tegajunior:tegajunior@cluster0.mykpl.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = connect.db();

  const meetupsCollection = db.collection('meetups');

  const singleMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})

  return {
    props: {
      meetupData: {
        id: singleMeetup._id.toString(),
        image: singleMeetup.image,
        title: singleMeetup.title,
        description: singleMeetup.description,
        address: singleMeetup.address,
      }
    },
  };
}
export default MeetupDetails;
