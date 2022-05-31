import Link from "next/link";
import { gql } from "@apollo/client";
import GQLClient from "../../services/GQLClient";

export default function Driver({ driver }) {
  return (
    <>
      <h1>
        {driver.firstName} {driver.lastName}
      </h1>
      {driver.number ? <div>Number : {driver.number}</div> : null}
      {driver.code ? <div>Code : {driver.code}</div> : null}
      <div>Birth date : {driver.birthdate}</div>
      <div>Nationality : {driver.nationality}</div>
      <a href={driver.url} target={"_blank"}>
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

export async function getStaticPaths() {
  const { drivers } = await fetchDrivers();
  const paths = drivers.map(({ id }) => ({
    params: { id }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const { driver } = await fetchDriver(id);
  return { props: { driver } };
}

async function fetchDrivers() {
  const FETCH_DRIVERS = gql`
    query Drivers($limit: Int) {
      drivers(limit: $limit) {
        id
      }
    }
  `;
  const { data } = await GQLClient.query({
    query: FETCH_DRIVERS,
    variables: { limit: 1000 }
  });
  return data;
}

async function fetchDriver(id) {
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
  const { data } = await GQLClient.query({
    query: FETCH_DRIVER,
    variables: { id }
  });
  return data;
}
