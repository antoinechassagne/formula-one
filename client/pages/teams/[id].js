import Link from "next/link";
import { gql } from "@apollo/client";
import GQLClient from "../../services/GQLClient";

async function fetchTeam(id) {
  const { data } = await GQLClient.query({
    query: gql`
        {
          team(id: "${id}") {
            shortName
            fullName
            powerUnit
            drivers {
              id
              firstName
              lastName
            }
          }
        }
      `
  });
  return data;
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { team } = await fetchTeam(id);
  return { props: { team } };
}

export default function Team({ team }) {
  return (
    <>
      <h1>{team.shortName}</h1>
      <div>Nom complet : {team.fullName}</div>
      <div>Moteur : {team.powerUnit}</div>
      <div>
        Pilotes :
        <ul>
          {team.drivers.map(driver => (
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
    </>
  );
}
