import Link from "next/link";
import { gql } from "@apollo/client";
import GQLClient from "../../services/GQLClient";

export default function Teams({ teams }) {
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

export async function getStaticProps() {
  const { teams } = await fetchTeams();
  return { props: { teams } };
}

async function fetchTeams() {
  const FETCH_TEAMS = gql`
    query Teams($limit: Int) {
      teams(limit: $limit) {
        id
        name
      }
    }
  `;
  const { data } = await GQLClient.query({
    query: FETCH_TEAMS,
    variables: { limit: 1000 }
  });
  return data;
}
