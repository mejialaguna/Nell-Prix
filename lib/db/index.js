
export async function isNewUser(token, {issuer}) {
  const operationsDoc = `
  query isNewUser ($issuer: String!) {
    users(where: {issuer: {_eq: issuer}}) {
      id
      email
      issuer
      publicAddress
    }
  }
`;
  
  const response = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    {
      issuer,
    },
    token
  );

  return response?.data?.users?.length === 0;
}

async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(process.env.NEXT_PUBLIC_Asura_Api, {
    method: "POST",
    headers: {
      // "x-hasura-admin-secret": process.env.NEXT_PUBLIC_Asura_Secret_key,
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}