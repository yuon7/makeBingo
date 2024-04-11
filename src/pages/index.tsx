import { useEffect, useState } from 'react';
import styles from './index.module.css';

const App = () => {
  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [musicIds, setMusicIds] = useState<number[]>([]);

  useEffect(() => {
    fetch('https://sekai-world.github.io/sekai-master-db-diff/musics.json')
      .then((response) => response.json())
      .then((data) => {
        const ids = data.map((item: { id: number }) => item.id);
        setMusicIds(ids);
      })
      .catch((error) => console.error('Error fetching music IDs:', error));
  }, []);

  const generateRandomNumber = (ids: number[]) => ids[Math.floor(Math.random() * ids.length)];

  const generateRandomBoard = () => {
    if (musicIds.length > 0) {
      const newBoard = board.map((row) => row.map(() => generateRandomNumber(musicIds)));
      setBoard(newBoard);
    }
  };

  const generateJacketUrl = (number: number): string => {
    const formattedNumber = number.toString().padStart(3, '0');
    return `https://storage.sekai.best/sekai-assets/music/jacket/jacket_s_${formattedNumber}_rip/jacket_s_${formattedNumber}.webp`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
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
      <button className={styles.buttonNeon} onClick={generateRandomBoard}>
        MakeBingo!
      </button>
    </div>
  );
};

export default App;
