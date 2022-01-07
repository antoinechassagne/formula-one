import { gql } from "@apollo/client";
import GQLClient from "../../services/GQLClient";

export default function Team({ team }) {
  return (
    <>
      <h1>{team.name}</h1>
      <div>Nationality : {team.nationality}</div>
      <a href={team.wikipediaUrl} target={"_blank"}>
        Wikipedia page
      </a>
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
        wikipediaUrl
      }
    }
  `;
  const { data } = await GQLClient.query({
    query: FETCH_TEAM,
    variables: { id }
  });
  return data;
}
