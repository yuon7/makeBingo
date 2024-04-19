export interface Music {
  id: number;
  seq: number;
  releaseConditionId: number;
  categories: string[];
  title: string;
  pronunciation: string;
  creatorArtistId: number;
  lyricist: string;
  composer: string;
  arranger: string;
  dancerCount: number;
  selfDancerPosition: number;
  assetbundleName: string;
  liveTalkBackgroundAssetbundleName: string;
  publishedAt: number;
  releasedAt: number;
  liveStageId: number;
  fillerSec: number;
  isNewlyWrittenMusic: boolean;
  isFullLength: boolean;
}

export interface MusicTag {
  id: number;
  musicId: number;
  musicTag: string;
  seq: number;
}
export interface MusicWithTags extends Music {
  unitNames: string[];
}
export interface OptionType {
  value: string;
  label: string;
}
