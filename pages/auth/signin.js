import { getProviders, signIn } from 'next-auth/react';

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div
          className="grid items-center justify-center mt-20"
          key={provider.name}
        >
          <img
            className="w-[200px] mx-auto sm:w-[300px]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png"
            alt=""
          />
          <h3 className="font-light my-3">
            This is not a real instagram is just clone
          </h3>
          <button
            className="bg-blue-500 m-auto px-5 py-1 w-max cursor-pointer rounded-md hover:bg-black duration-300 text-white"
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
