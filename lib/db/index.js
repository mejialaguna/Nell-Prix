export async function fetchUsers(operationsDoc, operationName, variables) {
  const result = await fetch(process.env.NEXT_PUBLIC_Asura_Api, {
    method: "POST",
    headers: {
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_Asura_Secret_key,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });
  // console.log(result);
  return await result.json();
}

const operationsDoc = `
  query MyQuery {
    users {
      id
      email
      issuer
      publicAddress
    }
  }
`;

function fetchMyQuery() {
  return fetchUsers(operationsDoc, "MyQuery", {});
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}
