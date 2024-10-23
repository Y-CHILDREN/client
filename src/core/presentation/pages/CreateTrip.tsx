import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTrip: React.FC = () => {
  const [tripName, setTripName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Creating trip: ", tripName);
    // 여기에서 생성 로직을 추가 또는 API 호출.
  };

  const handleClose = () => {
    navigate('/'); // 홈으로 이동.
  }

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <button onClick={handleClose} className="mb-4">
          <span className="text-xl font-semibold">X</span>
        </button>
        <header>
          <h1>여행 추가하기</h1>
        </header>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>여행의 이름을 적어주세요.</h2>
        <input
          type="text"
          value={tripName}
          onChange={e => setTripName(e.target.value)}
          placeholder="여행 이름 입력"
          className="border rounded p-2"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          여행 생성
        </button>
      </form>
    </div>
  );
};

export default CreateTrip;