import Link from "next/link";
import { gql } from "@apollo/client";
import GQLClient from "../../services/GQLClient";

export default function Drivers({ drivers }) {
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
              {`${driver.firstName} ${driver.lastName}`}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const { drivers } = await fetchDrivers();
  return { props: { drivers } };
}

async function fetchDrivers() {
  const FETCH_DRIVERS = gql`
    query Drivers($limit: Int) {
      drivers(limit: $limit) {
        id
        firstName
        lastName
      }
    }
  `;
  const { data } = await GQLClient.query({
    query: FETCH_DRIVERS,
    variables: { limit: 1000 }
  });
  return data;
}
