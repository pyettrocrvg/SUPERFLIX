const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
  id: "org.stremio.superflix",
  version: "1.0.0",
  name: "Superflix",
  description: "Addon com catálogo gigante de filmes, séries, animes e desenhos dublados.",
  types: ["movie", "series", "anime"],
  catalogs: [
    {
      type: "movie",
      id: "superflix_movies",
      name: "Filmes Superflix",
      extra: [{ name: "search" }, { name: "genre" }]
    },
    {
      type: "series",
      id: "superflix_series",
      name: "Séries Superflix",
      extra: [{ name: "search" }, { name: "genre" }]
    },
    {
      type: "anime",
      id: "superflix_animes",
      name: "Animes Superflix",
      extra: [{ name: "search" }, { name: "genre" }]
    }
  ]
};

const builder = new addonBuilder(manifest);

// catálogo fictício com poucos exemplos só pra teste
const fakeCatalog = [
  {
    id: "superflix:shrek",
    type: "movie",
    name: "Shrek",
    poster: "https://upload.wikimedia.org/wikipedia/en/3/39/Shrek.jpg",
    description: "Um ogro parte em uma aventura hilária para resgatar uma princesa."
  },
  {
    id: "superflix:south-park",
    type: "series",
    name: "South Park",
    poster: "https://upload.wikimedia.org/wikipedia/en/7/7f/South_Park_Season_1_DVD.jpg",
    description: "Série animada de humor negro sobre quatro garotos em uma pequena cidade americana."
  }
];

builder.defineCatalogHandler(({ type }) => {
  return Promise.resolve({ metas: fakeCatalog.filter(item => item.type === type) });
});

builder.defineMetaHandler(({ id }) => {
  const meta = fakeCatalog.find(item => item.id === id);
  return Promise.resolve({ meta });
});

builder.defineStreamHandler(({ id }) => {
  return Promise.resolve({
    streams: [
      {
        title: "Assistir em 1080p",
        url: "https://example.com/video.mp4"
      }
    ]
  });
});

module.exports = builder.getInterface();
