import React, { useContext, useState } from 'react'
import { Xicon } from '../icons/Xicon'
import { Oicon } from '../icons/Oicon'
import { GameContext } from '../../context/GameContext'

export const Win = () => {
    const { winner, handleReset, handleNextRound } = useContext(GameContext)

    return (
        <div className='score'>
            {winner && winner !== 'no' ? (
                <>
                    <p>you win!</p>
                    <h3 className={`score__title ${winner === 'o' ? 'text-yellow' : 'text-blue'}`}>
                        {winner === 'x' ? <Xicon /> : <Oicon />}
                        Takes the round
                    </h3>
                </>) : (<h3 className='score__title'>No Winner</h3>)
            }

            <div className="score__btns">
                <button className='btn btn-sm' onClick={handleReset}>Quite</button>
                <button className='btn btn-sm btn-yellow' onClick={handleNextRound}>Next Round</button>
            </div>
        </div>
    )
}
