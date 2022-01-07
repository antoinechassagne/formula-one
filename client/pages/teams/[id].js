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

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { team } = await fetchTeam(id);
  return { props: { team } };
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
