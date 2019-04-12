const config = {};

config.production = {
  port: 5000,
  source: "../ufo-sightings.csv"
};

config.development = {
  port: 5000,
  source: "../ufo-sightings.csv"
};

const env = process.env.NODE_ENV || "development";

module.exports = config[env];
