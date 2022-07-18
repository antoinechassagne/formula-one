import { InferGetStaticPropsType, GetStaticPropsResult } from "next";
import { gql, ApolloQueryResult } from "@apollo/client";
import Link from "next/link";
import GQLClient from "../../services/GQLClient";
import type { Driver } from "../../types";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function DriversPage({ drivers }: Props) {
  return (
    <>
      <h1>Drivers</h1>
      <ul>
        {drivers.map(driver => (
          <li key={driver.id}>
            <Link
              href={{
                pathname: "/drivers/[id]",
                query: { id: driver.id }
              }}
            >
              <>
                {`${driver.firstName} ${driver.lastName}`}
                {driver.currentTeam ? ` (${driver.currentTeam.name})` : null}
              </>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<{ drivers: Driver[] }>> {
  const drivers = await fetchDrivers();
  return { props: { drivers } };
}

async function fetchDrivers(): Promise<Driver[]> {
  const FETCH_DRIVERS = gql`
    query Drivers($limit: Int) {
      drivers(limit: $limit) {
        id
        firstName
        lastName
        currentTeam {
          name
        }
      }
    }
  `;
  const {
    data: { drivers }
  }: ApolloQueryResult<{ drivers: Driver[] }> = await GQLClient.query({
    query: FETCH_DRIVERS,
    variables: { limit: 100 }
  });
  return drivers;
}
