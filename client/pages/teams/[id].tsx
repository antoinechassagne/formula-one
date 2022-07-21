import { InferGetStaticPropsType, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { gql, ApolloQueryResult } from "@apollo/client";
import Link from "next/link";
import GQLClient from "../../services/GQLClient";
import type { Team } from "../../types";

type Props = InferGetStaticPropsType<typeof getStaticProps>;
interface Params extends ParsedUrlQuery {
  id: string;
}

export default function TeamPage({ team }: Props) {
  return (
    <>
      <h1>{team.name}</h1>
      <div>Nationality : {team.nationality}</div>
      <a href={team.url} target="_blank" rel="noreferrer">
        Wikipedia page
      </a>
      {team.currentDrivers.length > 0 && (
        <div>
          Current drivers :
          <ul>
            {team.currentDrivers.map(driver => (
              <li key={driver.id}>
                <Link
                  href={{
                    pathname: "/drivers/[id]",
                    query: { id: driver.id }
                  }}
                >
                  {`${driver.firstName} ${driver.lastName}`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {team.previousDrivers.length > 0 && (
        <div>
          Previous drivers :
          <ul>
            {team.previousDrivers.map(driver => (
              <li key={driver.id}>
                <Link
                  href={{
                    pathname: "/drivers/[id]",
                    query: { id: driver.id }
                  }}
                >
                  {`${driver.firstName} ${driver.lastName}`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const teams = await fetchTeams();
  const paths = teams.map(({ id }) => ({
    params: { id }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<{ team: Team }>> {
  const { id } = context?.params as Params;
  const team = await fetchTeam(id);
  return { props: { team } };
}

async function fetchTeams(): Promise<Team[]> {
  const FETCH_TEAMS = gql`
    query Teams($limit: Int) {
      teams(limit: $limit) {
        id
      }
    }
  `;
  const {
    data: { teams }
  }: ApolloQueryResult<{ teams: Team[] }> = await GQLClient.query({
    query: FETCH_TEAMS,
    variables: { limit: 1000 }
  });
  return teams;
}

async function fetchTeam(id: string): Promise<Team> {
  const FETCH_TEAM = gql`
    query Team($id: ID!) {
      team(id: $id) {
        id
        name
        nationality
        url
        currentDrivers {
          id
          firstName
          lastName
        }
        previousDrivers {
          id
          firstName
          lastName
        }
      }
    }
  `;
  const {
    data: { team }
  }: ApolloQueryResult<{ team: Team }> = await GQLClient.query({
    query: FETCH_TEAM,
    variables: { id }
  });
  return team;
}
