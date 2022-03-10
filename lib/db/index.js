export async function fetchUsers(operationsDoc, operationName, variables) {
  const result = await fetch(process.env.NEXT_PUBLIC_Asura_Api, {
    method: "POST",
    headers: {
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_Asura_Secret_key,
      // Authorization:
      //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Impvc2UgbWVqaWEiLCJpYXQiOjE2NDY4Njg1ODgsImV4cCI6MTY0NzQ3MzQzNCwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6IkpMTUwifX0.JZLOvW7UHijo2jZ1Lb8TBvvlpLPwc2NI3wtZyuPAo2Y",
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
    user {
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
