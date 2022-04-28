export interface ConfigAppModel {
  browser: {
    serverID: string | number;
    channelID: string | number;
    dataDir: string;
  };
  professions: {
    worker: number;
  };
  donatorPercent: number;
  ascended: boolean;
  currentArea: number;
  switchHunt: boolean;
  countHuntsToHeal: number;
  eventCooldownPorcent: number;
}
