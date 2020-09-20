export function httpSearch(slug, serverNumber) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      `http://localhost:3456/search/${serverNumber}?search=${slug}`,
      true
    );
    xhr.send();
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
