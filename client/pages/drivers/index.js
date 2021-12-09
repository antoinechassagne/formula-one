import Link from "next/link";
import { gql } from "@apollo/client";
import GQLClient from "../../services/GQLClient";

async function fetchDrivers() {
  const { data } = await GQLClient.query({
    query: gql`
      {
        drivers {
          id
          firstName
          lastName
          team {
            shortName
          }
        }
      }
    `
  });
  return data;
}

export async function getServerSideProps() {
  const { drivers } = await fetchDrivers();
  return { props: { drivers } };
}

export default function Drivers({ drivers }) {
  return (
    <>
      <h1>Pilotes</h1>
      <ul>
        {drivers.map(driver => (
          <li key={driver.id}>
            <Link
              href={{
                pathname: "/drivers/[id]",
                query: { id: driver.id }
              }}
            >
              {`${driver.firstName} ${driver.lastName} (${driver.team.shortName})`}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
