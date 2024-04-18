import { useEffect, useState } from 'react';
import type { ActionMeta, SingleValue } from 'react-select';
import Select from 'react-select';
import { customSelectStyles } from '../components/SelectStyles';
import type { Music, MusicTag, MusicWithTags, OptionType } from '../types/type';
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

  const unitDisplayNames: Record<string, string> = {
    all: 'All',
    vocaloid: 'VITUAL SINGER',
    light_music_club: 'Leo/need',
    idol: 'MORE MORE JUMP!',
    street: 'Vivid BAD SQUAD',
    theme_park: 'ワンダーランズ×ショウタイム',
    school_refusal: '25時、ナイトコードで。',
  };

  const unitOptions = units.map((unit) => ({
    value: unit,
    label: unitDisplayNames[unit],
  }));

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

  const handleSelectChange = (
    selectedOption: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    // actionMetaを使用して異なるアクションタイプを区別できるが、今回は不要
    if (selectedOption) {
      // nullの可能性を排除
      setSelectedUnit(selectedOption.value);
    }
  };

  return (
    <div className={styles.container}>
      <Select
        styles={customSelectStyles}
        options={unitOptions}
        value={unitOptions.find((option) => option.value === selectedUnit)}
        onChange={handleSelectChange} // ハンドラー関数を指定
      />

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
