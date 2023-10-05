

import { useContext } from 'react';
import { Board } from './component/board/board';
import { Modal } from './component/modalCase/Modal';
import { Start } from './component/startScreen/start';
import { GameContext } from './context/GameContext';

function App() {

  const { screen } = useContext(GameContext)
  return (
    <div className="App">
      <div className='container'>
        {screen === 'start' && <Start />}
        {screen === 'game' && <Board />}
      </div>
      <Modal />
    </div>
  );
}

export default App;
