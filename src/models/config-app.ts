export interface ConfigAppModel {
  browser: {
    serverID: string | number;
    channelID: string | number;
    dataDir: string;
  };
  donatorPercent: number;
  hardmode: boolean;
  currentArea: number;
  switchHunt: boolean;
  countHuntsToHeal: number;
  eventCooldownPorcent: number;
}
