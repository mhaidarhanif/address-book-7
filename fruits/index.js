const urlParams = new URLSearchParams(window.location.search);
const fruitId = Number(urlParams.get("id"));

console.log({ fruitId });
