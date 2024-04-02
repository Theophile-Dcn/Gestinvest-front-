// app.tsx
import React, { useState } from 'react';
import HomePage from '../HomePage/HomePage';

import './App.scss';
import ModalLogin from '../ModalLogin/ModalLogin';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="app">
      <main>
        <HomePage openModal={openModal} />
        {isModalOpen && <ModalLogin closeModal={closeModal} />}
      </main>
    </div>
  );
}

export default App;
