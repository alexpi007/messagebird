function parseJSON(response) {
  return response.json();
}

function parseBlob(response) {
  return response.blob();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw response;
}

function getErrorMsg(err) {
  return parseJSON(err).then((response) => response.errors[0])
}

export default function request(url, options) {
  return fetch(url, options)
  .then(checkStatus)
  .then((resolve) => {
    switch (resolve.headers.get('Content-type')) {
      case 'application/json': return parseJSON(resolve);
      case 'application/zip': return parseBlob(resolve);
      default: return parseJSON(resolve);
    }
  })
  .then((data) => {
    return data
  })
  .catch(getErrorMsg);
}