import { useEffect, useState } from 'react';

const App = () => {
  useEffect
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
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((number, columnIndex) => (
              <img
                key={columnIndex}
                src={generateJacketUrl(number)}
                alt={`Jacket ${number}`}
                style={{ width: 100, height: 100 }}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={generateRandomBoard}>再抽選</button>
    </div>
  );
};

export default App;
