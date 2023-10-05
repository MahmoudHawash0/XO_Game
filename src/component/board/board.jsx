import React, { useContext } from 'react'
import { Xicon } from '../icons/Xicon'
import { Oicon } from '../icons/Oicon'
import { RestartIcon } from '../icons/Restart'
import { BoardCard } from './boardCard'
import { GameContext } from '../../context/GameContext'
import { ModalContext } from '../../context/ModalContext'


export const Board = () => {

  const { showModal, setModalMode } = useContext(ModalContext);

  const resetGame = () => {
    showModal()
    setModalMode('restart')
  }

  const { squares, xnext, ties, winner, winnerLine, playMode, setScreen, activeUser } = useContext(GameContext)

  const checkUser = (user) => {
    if (playMode === 'cpu') {
      if (user === activeUser) {
        return "(you)"
      } else {
        return "(cpu)"
      }
    }
  }

  const HomeScreen = () => {
    setScreen('start')
  }

  return (
    <div className='bord'>
      <div className='board__header'>
        <div className='board__xo__icon' onClick={HomeScreen} >
          <>
            <Xicon />
            <Oicon />
          </>

        </div>
        <div className='board__turn'>
          {!xnext ? (<Xicon color='light' size='sm' />) : (<Oicon color='light' size='sm' />)}
          turn
        </div>
        <div>
          <button className='btn btn-sm board__restart' onClick={resetGame} >
            <RestartIcon />
          </button>

        </div>
      </div>
      <div className='board__body'>
        {squares.map((sq, idx) => {
          return (<BoardCard key={idx} index={idx} user={sq}
            active={winner && winnerLine && winnerLine.includes(idx)} />)
        })}
      </div>
      <div className='board__footer'>
        <div className='card bg-blue'>
          <p className='text-light'>x {checkUser('x')}</p>
          <strong className='text-2xl'>{ties.x}</strong>
        </div>
        <div className='card bg-light'>
          <p className='text-light'>ties</p>
          <strong className='text-2xl'>{ties.x + ties.o}</strong>
        </div>
        <div className='card bg-yellow'>
          <p className='text-light'>o {checkUser('o')}</p>
          <strong className='text-2xl'>{ties.o}</strong>
        </div>
      </div>
    </div>
  )
}
