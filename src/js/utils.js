const serverUrl = process.env.SERVER_URL;

function request(method = 'GET', url, data = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status !== 200) {
        reject(xhr.statusText);
      } else {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch (e) {
          resolve(xhr.responseText);
        }
      }
    };
  });
}

export async function httpSearch(slug, serverNumber) {
  return await request(
    'GET',
    `${serverUrl}/search/${serverNumber}?search=${slug}`
  );
}

export async function sendFormToServer(formData) {
  return await request(
    'POST',
    `${serverUrl}/form/save`,
    JSON.stringify(formData)
  );
}
