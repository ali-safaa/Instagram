import { getProviders, signIn } from 'next-auth/react';
import Head from 'next/head';
import LogIn from '../../components/LogIn';
export default function SignIn({ providers }) {
  return (
    <div className="grid items-center mt-10">
      <Head>
        <title>Authentication | Page</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        />
      </Head>
      <img
        className="w-[200px] mx-auto sm:w-[300px]"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png"
        alt=""
      />
      <h3 className="font-light mt-3 text-center">
        This is not a real instagram is just clone
      </h3>
      <LogIn />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <h3
            className="bg-gray-700 font-semibold m-auto text-sm mt-3 px-5 py-1 w-max cursor-pointer rounded-md hover:bg-black duration-300 text-white"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Sign in with {provider.name}
          </h3>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
