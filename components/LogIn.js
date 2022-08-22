import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logIn } from '../providerSlice';
function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const router = useRouter();

  const logInProvider = (e) => {
    e.preventDefault();
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password).then(() => {
      dispatch(
        logIn({
          fullname: name,
          email: email,
          password: password,
        })
      );
    });
    router.push('/');
    setName('');
    setEmail('');
    setPassword('');
  };
  return (
    <div>
      <p>{error}</p>
      <form
        onSubmit={logInProvider}
        className="grid items-center justify-center space-y-3 mt-3"
        method="POST"
      >
        <input
          className="text-sm pl-3 outline-none w-[200px] bg-gray-100 py-2 rounded-md sm:w-[250px]"
          value={name}
          type="text"
          name="name"
          placeholder="Type your fullName"
          onChange={(e) => setName(e.target.value)}
        />
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
          className={`bg-blue-500 py-1 text-sm hover:bg-black cursor-pointer duration-300 text-white font-semibold w-max mx-auto px-7 rounded-md`}
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
