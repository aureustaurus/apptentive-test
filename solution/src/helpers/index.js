const _ = require("lodash");
const haversine = require("haversine");

const getUniqParam = (allData, param) => {
  const uniqParam = _.groupBy(allData, param);
  return Object.keys(uniqParam);
};

const clearEmptyParams = params => {
  return _.filter(params, param => {
    return (
      param !== "" &&
      param !== "unknow" &&
      param !== "undefined" &&
      param !== undefined &&
      param !== null
    );
  });
};

const getTopBy = ({
  allData,
  country,
  property,
  amount = "10",
  ordering = "desc"
}) => {
  const ufosByArea = country
    ? _.filter(allData, ufo => {
        return ufo.country === country;
      })
    : allData;
  const countedUFO = _.countBy(ufosByArea, property);

  const sortedUFO = _.chain(countedUFO)
    .map((amount, propertyValue) => {
      return {
        [property]: propertyValue,
        count: amount
      };
    })
    .orderBy("count", ordering)
    .value();

  // top cross section - default 10
  sortedUFO.length = _.toNumber(amount);
  return sortedUFO;
};

const getAllNearest = ({ allData, lat, lon, unit = "meter" }) => {
  const currentPoint = {
    latitude: lat,
    longitude: lon
  };

  const locations = _.chain(allData)
    .map(location => {
      location.distance = haversine(currentPoint, location, { unit });
      return location;
    })
    .orderBy("distance", "asc")
    .value();

  return locations;
};

const getNearestLocations = ({ allData, lat, lon, amount = "3", unit }) => {
  if (!lat || !lon) return null;

  const locations = getAllNearest({ allData, lat, lon, unit });
  locations.length = _.toNumber(amount);

  return locations;
};

const getTargets = ({
  allData,
  lat,
  lon,
  unit = "km",
  distance = "120",
  duration = "42"
}) => {
  if (!lat || !lon) return null;

  let locations = getAllNearest({ allData, lat, lon, unit });

  // in distance
  locations = filterLocationsByDistance(locations, distance, duration);
  const groupsByShapes = _.groupBy(locations, "shape");
  const amountByShape = _.reduce(
    groupsByShapes,
    (result, group, key) => {
      result[key] = group.length;
      return result;
    },
    {}
  );

  return amountByShape;
};

const filterLocationsByDistance = (locations, distance, duration) => {
  return _.filter(locations, location => {
    const isNear = location.distance * 1 <= distance * 1;
    const isSlow = location.duration_seconds * 1 <= duration * 1;

    return isNear && isSlow;
  });
};

module.exports = {
  getUniqParam,
  clearEmptyParams,
  getTopBy,
  getNearestLocations,
  getTargets
};
