import Link from "next/link";
import { gql } from "@apollo/client";
import GQLClient from "../../services/GQLClient";

async function fetchDriver(id) {
  const { data } = await GQLClient.query({
    query: gql`
        {
          driver(id: "${id}") {
            firstName
            lastName
            nationality
            team {
              id
              shortName
            }
          }
        }
      `
  });
  return data;
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { driver } = await fetchDriver(id);
  return { props: { driver } };
}

export default function Driver({ driver }) {
  return (
    <>
      <h1>
        {driver.firstName} {driver.lastName}
      </h1>
      <div>Nationalité : {driver.nationality}</div>
      <div>
        Écurie :{" "}
        <Link
          href={{
            pathname: "/teams/[id]",
            query: { id: driver.team.id }
          }}
        >
          {driver.team.shortName}
        </Link>
      </div>
    </>
  );
}
