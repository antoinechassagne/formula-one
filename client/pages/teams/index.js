import Link from "next/link";
import { gql } from "@apollo/client";
import GQLClient from "../../services/GQLClient";

async function fetchTeams() {
  const { data } = await GQLClient.query({
    query: gql`
      {
        teams {
          id
          shortName
        }
      }
    `
  });
  return data;
}

export async function getServerSideProps() {
  const { teams } = await fetchTeams();
  return { props: { teams } };
}

export default function Teams({ teams }) {
  return (
    <>
      <h1>Écuries</h1>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            <Link
              href={{
                pathname: "/teams/[id]",
                query: { id: team.id }
              }}
            >
              {team.shortName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
