import { InferGetStaticPropsType, GetStaticPropsResult } from "next";
import { gql, ApolloQueryResult } from "@apollo/client";
import Link from "next/link";
import GQLClient from "../../services/GQLClient";
import type { Team } from "../../types";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function TeamsPage({ teams }: Props) {
  return (
    <>
      <h1>Teams</h1>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            <Link
              href={{
                pathname: "/teams/[id]",
                query: { id: team.id }
              }}
            >
              {team.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<{ teams: Team[] }>> {
  const teams = await fetchTeams();
  return { props: { teams } };
}

async function fetchTeams(): Promise<Team[]> {
  const FETCH_TEAMS = gql`
    query Teams($limit: Int) {
      teams(limit: $limit) {
        id
        name
      }
    }
  `;
  const {
    data: { teams }
  }: ApolloQueryResult<{ teams: Team[] }> = await GQLClient.query({
    query: FETCH_TEAMS,
    variables: { limit: 100 }
  });
  return teams;
}
