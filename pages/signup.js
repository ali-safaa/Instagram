import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import Head from 'next/head';
function SignUp() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const inValid =
    name === '' ||
    (username === '' && email === '') ||
    (password === '' && repeatPassword === '');

  const signUp = () => {};
  return (
    <div>
      <Head>
        <title>Sign up | page</title>
      </Head>
      <img
        className="w-[200px] mx-auto sm:w-[300px]"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png"
        alt=""
      />
      {error && (
        <p className="text-red-500 text-center">{`!sorry you dont have acount (${error})`}</p>
      )}
      <form
        onSubmit={signUp}
        className="grid items-center justify-center space-y-3 mt-3"
        method="POST"
      >
        <input
          className="text-sm pl-3 outline-none w-[200px] bg-gray-100 py-2 rounded-md sm:w-[250px]"
          value={name}
          type="text"
          name="name"
          placeholder="Type your full name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="text-sm pl-3 outline-none w-[200px] bg-gray-100 py-2 rounded-md sm:w-[250px]"
          value={username}
          type="text"
          name="username"
          placeholder="Type your username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="text-sm pl-3 outline-none w-[200px] bg-gray-100 py-2 rounded-md sm:w-[250px]"
          value={email}
          type="email"
          name="email"
          placeholder="Type your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="text-sm pl-3 sm:w-[250px] w-[200px] outline-none bg-gray-100 py-2 rounded-md"
          value={password}
          type="password"
          name="password"
          placeholder="Type your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="text-sm pl-3 sm:w-[250px] w-[200px] outline-none bg-gray-100 py-2 rounded-md"
          value={repeatPassword}
          type="password"
          name="repeatPassword"
          placeholder="repeat your password"
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <button
          className={`${
            inValid && 'opacity-60 cursor-default'
          } bg-blue-500 py-1 text-sm  hover:bg-black cursor-pointer duration-300 text-white font-semibold w-max mx-auto px-7 rounded-md`}
          disabled={inValid}
          type="submit"
        >
          Sign up
        </button>
        <h3 className="text-center">
          You have already account
          <span
            onClick={() => signIn()}
            className="cursor-pointer text-blue-400"
          >
            {' '}
            login
          </span>
        </h3>
      </form>
    </div>
  );
}

export default SignUp;
