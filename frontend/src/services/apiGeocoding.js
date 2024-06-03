export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}

export async function getLatlng(countryName) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${countryName}&format=json&limit=1`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}
