import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>여행 일정 관리</h1>
      <Link to="/create-trip">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          + 새로운 여행
        </button>
      </Link>
    </div>
  );
};

export default Home;