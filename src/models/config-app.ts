export interface ConfigAppModel {
  browser: {
    url: string;
    serverID: string | number;
    channelID: string | number;
    dataDir: string;
    inputTextHTML: string;
  };
  professions: {
    worker: number;
  };
  donatorPercent: number;
  ascended: boolean;
  currentArea: number;
  switchHunt: boolean;
  isHuntTogether: boolean;
  numHunts: number;
  countHuntsToHeal: number;
  eventCooldownPorcent: number;
}
