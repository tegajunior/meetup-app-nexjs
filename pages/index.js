import Head from 'next/head'
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meat name="description" content="Browse a huge list of meetups and add new ones to ur collection" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   // fetch some data from an API
//   const res = context.res;
//   const req = context.req;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

//static site generation
export async function getStaticProps () {
  const connect = await MongoClient.connect(
    'mongodb+srv://tegajunior:tegajunior@cluster0.mykpl.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = connect.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  connect.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        image:meetup.image,
        address:meetup.address,
        description:meetup.description,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1 //how many seconds before getStaticProps() is executed again and replacing the props with the new values
  }
}
export default HomePage;
