import Head from 'next/head'
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function newMeetupPage() {
  const router = useRouter();
  const addMeetupHandler = async (meetupData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(meetupData),
    };
    const response = await fetch('/api/new-meetup', config);

    const data = await response.json();

    console.log(data);
    router.push('/');
  };

  return (
    <Fragment>
      <Head>
        <title>Add New Meetup</title>
        <meat
          name="description"
          content="Add new meetups and create amazing opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </Fragment>
  ); 
}

export default newMeetupPage;
