import { useEffect, useState } from 'react';
import type { Music, MusicTag, MusicWithTags } from '../types/type';
import styles from './index.module.css';

const App = () => {
  const [bingoBoard, setBingoBoard] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [musics, setMusics] = useState<MusicWithTags[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>('all');

  const units = [
    'all',
    'vocaloid',
    'light_music_club',
    'idol',
    'street',
    'theme_park',
    'school_refusal',
  ];

  useEffect(() => {
    const fetchMusicData = async () => {
      const responseMusics = await fetch(
        'https://sekai-world.github.io/sekai-master-db-diff/musics.json'
      );
      const musicsData: Music[] = await responseMusics.json();
      const responseTags = await fetch(
        'https://sekai-world.github.io/sekai-master-db-diff/musicTags.json'
      );
      const tagsData: MusicTag[] = await responseTags.json();

      // 各楽曲に関連するすべてのユニット名を結合する
      const musicsWithTags = musicsData.map((music) => ({
        ...music,
        unitNames: tagsData.filter((tag) => tag.musicId === music.id).map((tag) => tag.musicTag),
      }));

      setMusics(musicsWithTags);
    };

    fetchMusicData();
  }, []);

  const generateFilteredMusicIds = () => {
    return musics
      .filter((music) => selectedUnit === 'all' || music.unitNames.includes(selectedUnit))
      .map((music) => music.id);
  };

  const generateBingoBoard = () => {
    const filteredIds = generateFilteredMusicIds();
    if (filteredIds.length > 0) {
      const newBoard = bingoBoard.map((row) =>
        row.map(() => filteredIds[Math.floor(Math.random() * filteredIds.length)])
      );
      setBingoBoard(newBoard);
    }
  };

  const generateJacketUrl = (id: number): string => {
    const formattedId = id.toString().padStart(3, '0');
    return `https://storage.sekai.best/sekai-assets/music/jacket/jacket_s_${formattedId}_rip/jacket_s_${formattedId}.webp`;
  };

  return (
    <div className={styles.container}>
      <select
        className={styles.dropDownMenu}
        value={selectedUnit}
        onChange={(e) => setSelectedUnit(e.target.value)}
      >
        {units.map((unit) => (
          <option key={unit} value={unit}>
            {unit.replace(/_/g, ' ')}
          </option>
        ))}
      </select>
      <div className={styles.board}>
        {bingoBoard.map((row, rowIndex) => (
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
      <button className={styles.buttonNeon} onClick={generateBingoBoard}>
        MakeBingo!
      </button>
    </div>
  );
};

export default App;
