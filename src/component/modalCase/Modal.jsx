import React, { useContext } from 'react'
import { Win } from './Win'
import { Restart } from './Restart'
import { ModalContext } from '../../context/ModalContext'

export const Modal = () => {

    const { show ,modalMode} = useContext(ModalContext)
    return (
        <>
            {show && (
                <div className='modal'>
                    <div className="modal__content">
                        <div className="container">
                            {modalMode === 'winner' && <Win/>}
                            {modalMode === 'restart' && <Restart/>}                            
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}
