export type GenericObject = { [key: string]: any };

export interface Entity {
  id: string;
  [key: string]: any;
}

export type RepositoryResult<T> = {
  data?: T;
  error?: any;
};

export type SingleResolverQuery = {
  id: string;
};

export type ListResolverQuery = {
  query?: any;
  skip?: number;
  limit?: number;
};

export type Circuit = {
  id: string;
  ref: string;
  name: string;
  location: string;
  country: string;
  latitude: number;
  longitude: number;
  altitude: number;
  url: string;
};

export type Team = {
  id: string;
  name: string;
  nationality: string;
  url: string;
  currentDrivers: Array<Driver>;
  previousDrivers: Array<Driver>;
};

export type Driver = {
  id: string;
  number: number;
  code: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  url: string;
  currentTeam: Team;
  previousTeams: Array<Team>;
};

export type Season = {
  id: string;
  year: number;
  url: string;
};

export type Status = {
  id: string;
  label: string;
};

export type Race = {
  id: string;
  year: number;
  round: number;
  circuit: Circuit;
  name: string;
  date: string;
  time: string;
  url: string;
  fp1Date: string;
  fp1Time: string;
  fp2Date: string;
  fp2Time: string;
  fp3Date: string;
  fp3Time: string;
  qualifyingDate: string;
  qualifyingTime: string;
  sprintDate: string;
  sprintTime: string;
};

export type TeamResult = {
  id: string;
  race: Race;
  team: Team;
  points: number;
  disqualified: Boolean;
};

export type TeamStanding = {
  id: string;
  race: Race;
  team: Team;
  points: number;
  position: number;
  positionText: string;
  wins: number;
};

export type DriverStanding = {
  id: string;
  race: Race;
  driver: Driver;
  points: number;
  position: number;
  positionText: string;
  wins: number;
};

export type LapTime = {
  id: string;
  race: Race;
  driver: Driver;
  lap: number;
  position: number;
  time: string;
  milliseconds: number;
};

export type PitStop = {
  id: string;
  race: Race;
  driver: Driver;
  stop: number;
  lap: number;
  time: string;
  duration: string;
  milliseconds: number;
};

export type QualifyingResult = {
  id: string;
  race: Race;
  driver: Driver;
  team: Team;
  number: number;
  position: number;
  q1: string;
  q2: string;
  q3: string;
};

export type RaceResult = {
  id: string;
  race: Race;
  driver: Driver;
  team: Team;
  number: number;
  grid: number;
  position: number;
  positionText: string;
  positionOrder: string;
  points: number;
  laps: number;
  time: string;
  milliseconds: string;
  fastestLap: number;
  fastestLapTime: string;
  status: Status;
};

export type SprintResult = {
  id: string;
  race: Race;
  driver: Driver;
  team: Team;
  number: number;
  grid: number;
  position: number;
  positionText: string;
  positionOrder: string;
  points: number;
  laps: number;
  time: string;
  milliseconds: string;
  fastestLap: number;
  fastestLapTime: string;
  status: Status;
};
