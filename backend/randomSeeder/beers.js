const fetch = require("node-fetch");

let url = "https://api.punkapi.com/v2/beers/random";

const apiFetch = () =>
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res);
    })
    .catch(console.err);

const status = [
  "Bottled",
  "On Tap",
  "Kegged",
  "Fermenting",
  "Brewing",
  "Planning",
];

const images = [
  "https://zoiglawsbucket.s3.amazonaws.com/beer-2328226_1280.png",
  "https://zoiglawsbucket.s3.amazonaws.com/beer-2649143_1280.jpeg",
  "https://zoiglawsbucket.s3.amazonaws.com/beer-4960422_1280.png",
  "https://zoiglawsbucket.s3.amazonaws.com/beer-5371244_1280.jpeg",
  "https://zoiglawsbucket.s3.amazonaws.com/beer-clipart-21.jpeg",
  "https://zoiglawsbucket.s3.amazonaws.com/beer-clipart-26.jpeg",
  "https://zoiglawsbucket.s3.amazonaws.com/beer-clipart-5.jpeg",
  "https://zoiglawsbucket.s3.amazonaws.com/hop-3987576_1280.png",
  "https://zoiglawsbucket.s3.amazonaws.com/hop-4828332_1280.png",
  "https://zoiglawsbucket.s3.amazonaws.com/seamless-1082193_1280.jpeg",
];

async function beerFunc() {
  let result = await apiFetch();
  let res = result[0];
  if (!res.image_url) {
    res.image_url = images[Math.floor(Math.random() * 10)];
  }
  if (!res.ibu) {
    res.ibu = Math.floor(Math.random() * 100) + 15;
  }
  let beer = {
    name: res.name,
    style: res.tagline,
    userId: Math.floor(Math.random() * 25) + 1,
    status: status[Math.floor(Math.random() * 6)],
    description: res.description,
    beerImageUrl: res.image_url,
    ibus: res.ibu,
    abv: res.abv,
  };
  return await beer;
}

exports.beerFunc = beerFunc;
