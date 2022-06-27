import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';
import Link from 'next/link';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const inValid = password === '' || email === '';
  const signIn = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      setError(error.message);
    });
    setEmail('');
    setPassword('');
  };
  return (
    <div>
      {error && (
        <p className="text-red-500 text-center">{`!sorry you dont have acount (${error})`}</p>
      )}
      <form
        onSubmit={signIn}
        className="grid items-center justify-center space-y-3 mt-3"
        method="POST"
      >
        <input
          className="text-sm pl-3 outline-none bg-gray-100 py-2 rounded-md w-[250px]"
          value={email}
          type="email"
          name="email"
          placeholder="Type your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="text-sm pl-3 outline-none bg-gray-100 py-2 rounded-md"
          value={password}
          type="password"
          name="password"
          placeholder="Type your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={`${
            inValid && 'opacity-60 cursor-default'
          } bg-blue-500 py-1 text-sm hover:bg-black cursor-pointer duration-300 text-white font-semibold w-max mx-auto px-7 rounded-md`}
          disabled={inValid}
          type="submit"
        >
          Login
        </button>
        <h3>
          Dont have an account
          <Link href={'/signup'}>
            <span className="cursor-pointer text-blue-400"> signup</span>
          </Link>
        </h3>
      </form>
    </div>
  );
}

export default LogIn;
