import React, { useContext } from 'react'
import { Xicon } from '../icons/Xicon'
import { Oicon } from '../icons/Oicon'
import { GameContext } from '../../context/GameContext'

export const Start = () => {

    const { activeUser, setActiveUser, changePlayMode } = useContext(GameContext)
    return (
        <div className='start'>
            <div className='start__header'>
                <Xicon />
                <Oicon />
            </div>
            <div className='card shadow-gray'>
                <h1 className='text-lg'>pick player 1'st mark</h1>
                <div className='start__players'>
                    <span className={activeUser === 'x' ? 'start__players--active' : ''}
                        onClick={() => setActiveUser('x')}
                    >
                        <Xicon color={activeUser === 'x' ? 'dark' : 'light'} />
                    </span>
                    <span className={activeUser === 'o' ? 'start__players--active' : ''}
                        onClick={() => setActiveUser('o')}
                    >
                        <Oicon color={activeUser === 'o' ? 'dark' : 'light'} />
                    </span>
                </div>
                <p>remember: x goes first</p>
            </div>
            <div className='start-btns'>
                <button className='btn btn-yellow' onClick={() => changePlayMode('cpu')}>new game(vs CPU)</button>
                <button className='btn btn-blue' onClick={() => changePlayMode('user')}>new game(vs Player)</button>
            </div>
        </div>
    )
}
