import { useEffect, useState } from 'react';
import styles from './index.module.css';

const App = () => {
  useEffect;
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const generateRandomNumber = () => Math.floor(Math.random() * 423) + 1;

  const generateRandomBoard = () => {
    const newBoard = board.map((row) => row.map(() => generateRandomNumber()));
    setBoard(newBoard);
  };

  const generateJacketUrl = (number: number): string => {
    const formattedNumber = number.toString().padStart(3, '0');
    return `https://storage.sekai.best/sekai-assets/music/jacket/jacket_s_${formattedNumber}_rip/jacket_s_${formattedNumber}.webp`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex' }}>
              {row.map((number, columnIndex) => (
                <img
                  key={columnIndex}
                  src={generateJacketUrl(number)}
                  alt={`${number}`}
                  className={styles.cell}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <button className={styles.buttonNeon} onClick={generateRandomBoard}>
        MakeBingo!
      </button>
    </div>
  );
};

export default App;
