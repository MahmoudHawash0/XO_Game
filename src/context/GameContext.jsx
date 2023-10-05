import { createContext, useContext, useEffect, useState } from "react";
import { CalcBestMove, CalcWinner } from "../helpers/CalcSquears";
import { ModalContext } from "./ModalContext";


const GameContext = createContext();

const GameState = (props) => {

    // use modal context 
    const { showModal, setModalMode, hideModal } = useContext(ModalContext)

    // start screen
    const [screen, setScreen] = useState('start'); // start || game

    // choose player x or o
    const [activeUser, setActiveUser] = useState('x') // x || o

    // choose play with user or cpu
    const [playMode, setPlayMode] = useState('user') // user || cpu

    // on play fill x or o
    const [squares, setSquares] = useState(new Array(9).fill(''));
    const [xnext, setXnext] = useState(false)

    // any winner user
    const [winner, setWinner] = useState(null);
    const [winnerLine, setWinnerLine] = useState(null);

    // which user win x or o or equal
    const [ties, setTies] = useState({ x: 0, o: 0, no: 0 });

    // rendered if no winner and play with cpu
    useEffect(() => {
        // check if cpu turn
        const currentUser = xnext ? 'o' : 'x';
        if (playMode === 'cpu' && currentUser !== activeUser && !winner) {
            cpuNextMove(squares);
        }
        CheckNoWinner();

    }, [xnext, winner, screen]);

    const handleStart  = (player) => {
        setPlayMode(player);
        setScreen('game')
    }

    // handle click squares on 2 player
    const handleSquarClick = (idx) => {
        if (squares[idx] || winner) {
            return
        }
        const currentUser = xnext ? 'o' : 'x';
        if (playMode === 'cpu' && currentUser !== activeUser) {
            return
        }

        let ns = [...squares];
        ns[idx] = !xnext ? 'x' : 'o';

        setSquares(ns)
        setXnext(!xnext)

        // check winner
        CheckWinner(ns)
    }

    // check winner and calc result    
    const CheckWinner = (ns) => {
        const isWinner = CalcWinner(ns);
        if (isWinner) {
            setWinner(isWinner.winner);
            setWinnerLine(isWinner.lines);

            // set ties
            const ti = { ...ties }
            ti[isWinner.winner] += 1
            setTies(ti)
            showModal();
            setModalMode('winner')
        }
    }

    // check no winner
    const CheckNoWinner = () => {
        const moves = squares.filter((sq) => sq === '');
        if (moves.length === 0) {
            setWinner('no');
            showModal();
            setModalMode('winner');
        }
    }

    // reset game
    const handleReset = () => {
        setSquares(new Array(9).fill(''));
        setXnext(false);
        setWinner(null);
        setWinnerLine(null);
        setActiveUser('x');
        setTies({ x: 0, o: 0 });
        hideModal();
        setScreen('start')
    }

    // start new round
    const handleNextRound = () => {
        setSquares(new Array(9).fill(''));
        setXnext(winner === 'x');
        setWinner(null);
        setWinnerLine(null);
        hideModal();
    }

    // play with cpu
    const cpuNextMove = (sq) => {
        const bestMove = CalcBestMove(sq, activeUser === 'x' ? 'o' : 'x');
        let ns = [...squares]
        ns[bestMove] = !xnext ? 'x' : 'o'
        setSquares(ns)
        setXnext(!xnext)
        CheckNoWinner(ns)
    }

    return (
        <GameContext.Provider value={{
            screen,
            activeUser,
            squares,
            xnext,
            ties,
            winner,
            winnerLine,
            playMode,
            setActiveUser,
            handleSquarClick,
            changePlayMode: handleStart ,
            handleReset,
            handleNextRound,
            setScreen
        }}>
            {props.children}
        </GameContext.Provider>
    )
}

export { GameContext, GameState }