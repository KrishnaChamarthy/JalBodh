export type Station = {
  Agency_Name: string;
  State_Name: string;
  District_Name: string;
  Tahsil_Name: string;
  Station_Name: string;
  Latitude: number;
  Longitude: number;
  Station_Type: string;
  Station_Status: string;
  [key: string]: any;
};

export function getStationsByState(
  stations: Station[],
  maxPerState: number = 10
): Station[] {
  const stationsByState: Record<string, Station[]> = {};
  stations.forEach((station) => {
    if (!station.Latitude || !station.Longitude) return;
    if (!stationsByState[station.State_Name]) stationsByState[station.State_Name] = [];
    if (stationsByState[station.State_Name].length < maxPerState) {
      stationsByState[station.State_Name].push(station);
    }
  });
  return Object.values(stationsByState).flat();
}
