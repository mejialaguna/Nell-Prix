async function hasuraGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(process.env.NEXT_PUBLIC_Asura_Api, {
    headers: {
      // "x-hasura-admin-secret": process.env.NEXT_PUBLIC_Asura_Secret_key,
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDdENEQ3RjRGZjcyMjZmOTAwRGUyMDAxRENmNDA3OWFCOGJFOWIwYzgiLCJwdWJsaWNBZGRyZXNzIjoiMHg3RDREN0Y0RmY3MjI2ZjkwMERlMjAwMURDZjQwNzlhQjhiRTliMGM4IiwiZW1haWwiOiJtZWppYWxhZ3VuYUB5YWhvby5jb20iLCJpYXQiOjE2NDY5MzY5MjgsImV4cCI6MTY0NzU0MTcyOCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImRpZDpldGhyOjB4N0Q0RDdGNEZmNzIyNmY5MDBEZTIwMDFEQ2Y0MDc5YUI4YkU5YjBjOCJ9fQ.DsB0LM6vyTdqAGrSgZqPNeB-MJVCYYaaUzLLx4xNbzc",
    },
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

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
  return hasuraGraphQL(operationsDoc, "MyQuery", {});
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


