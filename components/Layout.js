import React from 'react';
import Header from './Header';
import react, { useContext } from 'react';
function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
