const URL = "http://www.json-generator.com/api/json/get/cpWBjaoPhe?indent=2";
function Get() {
  return fetch(URL)
    .then(res => res.json())
    .then((resJSON) => {
      return resJSON;
    })
}
export default Get;
