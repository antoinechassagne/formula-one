import { InferGetStaticPropsType, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { gql, ApolloQueryResult } from "@apollo/client";
import Link from "next/link";
import GQLClient from "../../services/GQLClient";
import type { Driver } from "../../types";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function DriverPage({ driver }: Props) {
  return (
    <>
      <h1>
        {driver.firstName} {driver.lastName}
      </h1>
      {driver.number ? <div>Number : {driver.number}</div> : null}
      {driver.code ? <div>Code : {driver.code}</div> : null}
      <div>Birth date : {driver.birthDate}</div>
      <div>Nationality : {driver.nationality}</div>
      <a href={driver.url} target="_blank" rel="noreferrer">
        Wikipedia page
      </a>
      {driver.currentTeam && (
        <div>
          Current team :
          <Link
            href={{
              pathname: "/teams/[id]",
              query: { id: driver.currentTeam.id }
            }}
          >
            {driver.currentTeam.name}
          </Link>
        </div>
      )}
      {driver.previousTeams.length > 0 && (
        <div>
          Previous teams :
          <ul>
            {driver.previousTeams.map(team => (
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
        </div>
      )}
    </>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const drivers = await fetchDrivers();
  const paths = drivers.map(({ id }) => ({
    params: { id }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<{ driver: Driver }>> {
  const { id } = context?.params as Params;
  const driver = await fetchDriver(id);
  return { props: { driver } };
}

async function fetchDrivers(): Promise<Driver[]> {
  const FETCH_DRIVERS = gql`
    query Drivers($limit: Int) {
      drivers(limit: $limit) {
        id
      }
    }
  `;
  const {
    data: { drivers }
  }: ApolloQueryResult<{ drivers: Driver[] }> = await GQLClient.query({
    query: FETCH_DRIVERS,
    variables: { limit: 1000 }
  });
  return drivers;
}

async function fetchDriver(id: string): Promise<Driver> {
  const FETCH_DRIVER = gql`
    query Driver($id: ID!) {
      driver(id: $id) {
        id
        number
        code
        firstName
        lastName
        birthdate
        nationality
        url
        currentTeam {
          id
          name
        }
        previousTeams {
          id
          name
        }
      }
    }
  `;
  const {
    data: { driver }
  }: ApolloQueryResult<{ driver: Driver }> = await GQLClient.query({
    query: FETCH_DRIVER,
    variables: { id }
  });
  return driver;
}
