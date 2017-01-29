export function get(url) {
  return fetch(url)
    .then((response) => response.json());
}

export function searchFor(query) {
  const requestUrl = (
    `https://api.spotify.com/v1/search?q=${ query }&type=artist`
  );

  return get(requestUrl)
    .then((res) => {
      const artists = res.artists ? res.artists.items : [];
      return artists;
    });
}


/*  searchFor qui va nous permettre de construire
  une requete du spotify search api , pour construire une get request
  qui va s'il est réalisé retourner la liste des artistes */
