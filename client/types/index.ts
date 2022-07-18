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
