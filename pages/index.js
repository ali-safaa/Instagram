import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Feed from '../components/Feed';
import ContextApi from '../components/ContextApi';

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Home | Page</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        />
      </Head>

      <Feed />
    </div>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};
