import Link from "next/link";
import { gql } from "@apollo/client";
import GQLClient from "../../services/GQLClient";

export default function Team({ team, ok }) {
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

export async function getStaticPaths() {
  const { teams } = await fetchTeams();
  const paths = teams.map(({ id }) => ({
    params: { id }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const { team } = await fetchTeam(id);
  return { props: { team } };
}

async function fetchTeams() {
  const FETCH_TEAMS = gql`
    query Teams($limit: Int) {
      teams(limit: $limit) {
        id
      }
    }
  `;
  const { data } = await GQLClient.query({
    query: FETCH_TEAMS,
    variables: { limit: 1000 }
  });
  return data;
}

async function fetchTeam(id) {
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
  const { data } = await GQLClient.query({
    query: FETCH_TEAM,
    variables: { id }
  });
  return data;
}
