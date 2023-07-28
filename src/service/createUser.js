export default function createUser (values) {
  const apiUrl = 'https://jkcge88asd.execute-api.us-east-2.amazonaws.com/qa/license/api/customer/create'
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  }

  return fetch(apiUrl, requestOptions)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data.statusCode >= 400) throw new Error(data)
      return { data, code: data.statusCode }
    })
    .catch((error) => {
      console.error('Error al realizar la solicitud:', error)
      return { error, code: 422 }
    })
}
