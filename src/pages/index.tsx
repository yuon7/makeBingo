import CachedIcon from '@mui/icons-material/Cached';
import DownloadIcon from '@mui/icons-material/Download';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react';
import type { SingleValue } from 'react-select';
import Select from 'react-select';
import { customSelectStyles } from '../components/SelectStyles';
import type { Music, MusicTag, MusicWithTags, OptionType } from '../types/type';
import styles from './index.module.css';
import loadingSound from './materials/op_metal_tool_box.mp3'; // Adjust the path as needed

const App = () => {
  const [bingoBoard, setBingoBoard] = useState<number[][]>([
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ]);
  const [musics, setMusics] = useState<MusicWithTags[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cellLoading, setCellLoading] = useState<boolean[][]>([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);

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
    vocaloid: 'VIRTUAL SINGER',
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

  const bingoBoardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(new Audio(loadingSound));

  useEffect(() => {
    const fetchMusicData = async () => {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const targetUrlMusics = 'https://sekai-world.github.io/sekai-master-db-diff/musics.json';
      const targetUrlTags = 'https://sekai-world.github.io/sekai-master-db-diff/musicTags.json';

      try {
        const responseMusics = await fetch(proxyUrl + targetUrlMusics);
        const musicsData: Music[] = await responseMusics.json();
        const responseTags = await fetch(proxyUrl + targetUrlTags);
        const tagsData: MusicTag[] = await responseTags.json();

        const musicsWithTags = musicsData.map((music) => ({
          ...music,
          unitNames: tagsData.filter((tag) => tag.musicId === music.id).map((tag) => tag.musicTag),
        }));

        setMusics(musicsWithTags);
      } catch (error) {
        console.error('Error fetching music data:', error);
      }
    };

    fetchMusicData();
  }, []);

  const generateFilteredMusicIds = () => {
    return musics
      .filter((music) => selectedUnit === 'all' || music.unitNames.includes(selectedUnit))
      .map((music) => music.id);
  };

  const initializeCellLoading = () => {
    setCellLoading([
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ]);
  };

  const generateBingoBoard = async () => {
    setIsLoading(true);
    initializeCellLoading();
    audioRef.current.play();
    const filteredIds = generateFilteredMusicIds();
    if (filteredIds.length > 0) {
      const newBoard = bingoBoard.map((row) =>
        row.map(() => filteredIds[Math.floor(Math.random() * filteredIds.length)])
      );
      setBingoBoard(newBoard);

      // 各セルの回転を順番に停止する
      newBoard.forEach((row, rowIndex) => {
        row.forEach((_, columnIndex) => {
          setTimeout(() => {
            setCellLoading((prev) => {
              const newLoadingState = [...prev];
              newLoadingState[rowIndex] = [...newLoadingState[rowIndex]];
              newLoadingState[rowIndex][columnIndex] = false;
              return newLoadingState;
            });
          }, (rowIndex * newBoard.length + columnIndex) * 500); // 0.5秒間隔で次のセルに移動
        });
      });
    }
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsLoading(false);
  };

  const generateJacketUrl = (id: number) => {
    const formattedId = id.toString().padStart(3, '0');
    return `https://storage.sekai.best/sekai-assets/music/jacket/jacket_s_${formattedId}_rip/jacket_s_${formattedId}.webp`;
  };

  const handleImageError = (rowIndex: number, columnIndex: number, filteredIds: number[]) => {
    setCellLoading((prev) => {
      const newLoadingState = [...prev];
      newLoadingState[rowIndex] = [...newLoadingState[rowIndex]];
      newLoadingState[rowIndex][columnIndex] = true; // 再試行のためにロード中に設定
      return newLoadingState;
    });

    const newId = filteredIds[Math.floor(Math.random() * filteredIds.length)];
    setBingoBoard((prev) => {
      const newBoard = [...prev];
      newBoard[rowIndex] = [...newBoard[rowIndex]];
      newBoard[rowIndex][columnIndex] = newId;
      return newBoard;
    });

    setTimeout(() => {
      setCellLoading((prev) => {
        const newLoadingState = [...prev];
        newLoadingState[rowIndex] = [...newLoadingState[rowIndex]];
        newLoadingState[rowIndex][columnIndex] = false; // 再度ロードを停止
        return newLoadingState;
      });
    }, 500);
  };

  const handleSelectChange = (newValue: SingleValue<OptionType>) => {
    if (newValue !== null) {
      setSelectedUnit(newValue.value);
    }
  };

  const makeImageOfBingo = () => {
    setTimeout(() => {
      if (bingoBoardRef.current) {
        html2canvas(bingoBoardRef.current, { useCORS: true }).then((canvas) => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'bingo.png';
          link.click();
        });
      }
    }, 500);
  };

  return (
    <div className={styles.container}>
      <Select
        styles={customSelectStyles}
        options={unitOptions}
        value={unitOptions.find((option) => option.value === selectedUnit) || null}
        onChange={handleSelectChange}
        isMulti={false}
      />
      <div className={styles.board} ref={bingoBoardRef}>
        {bingoBoard.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((number, columnIndex) => (
              <div
                key={columnIndex}
                className={`${styles.cell} ${
                  cellLoading[rowIndex][columnIndex] ? styles.loading : ''
                }`}
              >
                {number === -1 ? (
                  <MusicNoteIcon fontSize="large" />
                ) : (
                  !cellLoading[rowIndex][columnIndex] && (
                    <img
                      src={generateJacketUrl(number)}
                      alt={`${number}`}
                      onError={() =>
                        handleImageError(rowIndex, columnIndex, generateFilteredMusicIds())
                      }
                    />
                  )
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonNeon} onClick={generateBingoBoard} disabled={isLoading}>
          <CachedIcon fontSize="large" />
        </button>
        <button className={styles.buttonNeon} onClick={makeImageOfBingo} disabled={isLoading}>
          <DownloadIcon fontSize="large" />
        </button>
      </div>
      <audio ref={audioRef} src={loadingSound} />
    </div>
  );
};

export default App;
