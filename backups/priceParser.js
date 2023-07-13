import json from "./7-13-23.js";

for (let item in json.active) {
  if (json.active[item].Price > 100) console.log(json.active[item]);
}
