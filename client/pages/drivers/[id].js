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
      <div>Birth date : {driver.birthDate}</div>
      <div>Nationality : {driver.nationality}</div>
      <a href={driver.wikipediaUrl} target={"_blank"}>
        Wikipedia page
      </a>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { driver } = await fetchDriver(id);
  return { props: { driver } };
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
        birthDate
        nationality
        wikipediaUrl
      }
    }
  `;
  const { data } = await GQLClient.query({
    query: FETCH_DRIVER,
    variables: { id }
  });
  return data;
}
