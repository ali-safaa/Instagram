import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import Feed from '../components/Feed';
// import { setUser } from '../slices';
const Home = () => {
  const auth = getAuth();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (userAuth) => {
  //     console.log('this is the user >>>', userAuth);

  //     if (userAuth) {
  //       dispatch(setUser(userAuth));
  //     } else {
  //       dispatch(setUser(null));
  //     }
  //   });
  // }, []);
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
