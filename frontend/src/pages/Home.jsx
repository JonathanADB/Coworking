import React from 'react';
import App from '../components/App';
import Mobile from '../components/Mobile';

const Home = () => {
  return (
    <div>
      <Mobile>
        <App />
      </Mobile>
    </div>
  );
};

export default Home;