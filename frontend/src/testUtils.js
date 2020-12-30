const fakePlayer = () => ({
  id: 1,
  name: "Fake Player",
  city: "Fake City",
  startYear: 1234,
  endYear: 5678,
});

const fakePlayers = () => [
  {
    id: 1,
    name: "Fake Player",
    city: "Fake City",
    startYear: 1234,
    endYear: 5678,
  },
  {
    id: 2,
    name: "Fake Player 2",
    city: "Fake City 2",
    startYear: 2345,
    endYear: 6789,
  },
];

const fakeAlbums = () => [
  {
    id: 1,
    title: "Fake Album 1",
    year: 1234,
    genre: "fakeGenre1",
    player_id: 1,
  },
  {
    id: 2,
    title: "Fake Album 2",
    year: 1234,
    genre: "fakeGenre2",
    player_id: 1,
  },
];

const fakeAlbum = () => ({
  id: 1,
  title: "Fake Album 1",
  year: 1234,
  genre: "fakeGenre1",
  player_id: 1,
});

const fakeGenres = () => ["fakeGenre1", "fakeGenre2"];

export { fakeAlbum, fakeAlbums, fakePlayer, fakeGenres, fakePlayers };
