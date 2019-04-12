# Solution: aureustaurus

**Date:** 03.05.2019

## Summary

You can change port for server and source name:
`_repos_folder_/solution/src/config.js`

## Requirements

You system should have that packages:
- `npm` (source site: https://www.npmjs.com/get-npm);
- `node` v10.1.0 or latest (source site: https://nodejs.org/en/download/package-manager/);
- `curl` (source site: https://curl.haxx.se/download.html);

## Usage

### Start steps
- Clone this repositiories;
- switch to `solution` folder used command in console: ``` cd solution ```;
- Run ``` npm install ``` command in console;
- ***Optional*** chage the port for server (5000 by default);
- Start server, used command: ``` npm run server ```;

## Answers

### Question - 0

#### Example

1) How many sightings are there?

```bash
⇒  time curl http://localhost:5000/api/v1/ufo
{
  "count": 80332
}
curl http://localhost:5000/api/v1/ufo  0.01s user 0.01s system 50% cpu 0.038 total
```

### Question - 1

Use this API we can count any uniq parameters, for this we should set name of parameter in URL query string like: `by=shape`.

***Examples:***
- http://localhost:5000/api/v1/ufo/count?by=city
- http://localhost:5000/api/v1/ufo/count?by=country
- http://localhost:5000/api/v1/ufo/count?by=description

By default we cut empty parameters from the result. If we want count empty parameters, we whould set `empty=true` in URL query string.

***Example:***
- http://localhost:5000/api/v1/ufo/count?by=shape&empty=true

Empty values are:
- '' (empty string);
- 'unknow';
- 'undefined' and undefined;
- null;

#### Example

2) How many different ships will be attacking?
***Note: remove `\` from example to using this url in browser ***

```bash
⇒  time curl http://localhost:5000/api/v1/ufo/count\?by\=shape
{
  "count": 29
}
curl http://localhost:5000/api/v1/ufo/count\?by\=shape  0.01s user 0.01s system 26% cpu 0.063 total
```

### Question - 2

Use this API we can got:

**top positions**

***Examples:***
- http://localhost:5000/api/v1/ufo/top/us?by=city (top 10 - by default)
- http://localhost:5000/api/v1/ufo/top/us?by=city&amount=5 (top 5 positions)
- http://localhost:5000/api/v1/ufo/top/us?by=city&amount=20 (top 20 positions)

**by any parameters (using string equal to compare)**

***Examples:***
- http://localhost:5000/api/v1/ufo/top?by=city (by city)
- http://localhost:5000/api/v1/ufo/top?by=shape (by shape)

**for any country (by default for all countries)**

***Examples:***
- http://localhost:5000/api/v1/ufo/top?by=city (for all countries - by default)
- http://localhost:5000/api/v1/ufo/top/us?by=city (for USA)
- http://localhost:5000/api/v1/ufo/top/ca?by=city (for Canada)

**worst/best positions**

***Examples:***
- http://localhost:5000/api/v1/ufo/top/us?by=city  (best position - by default)
- http://localhost:5000/api/v1/ufo/top/us?by=city&ordering=desc (best position - by default)
- http://localhost:5000/api/v1/ufo/top/us?by=city&ordering=asc  (worst position)


#### Example

3) What are the Top-10 cities in the United States that should be evacuated first?

***Note: remove `\` from example to using this url in browser ***

```bash
⇒  time curl http://localhost:5000/api/v1/ufo/top/us\?by\=city
{
  "sightings": [
    {
      "city": "seattle",
      "count": 524
    },
    {
      "city": "phoenix",
      "count": 454
    },
    {
      "city": "portland",
      "count": 373
    },
    {
      "city": "las vegas",
      "count": 367
    },
    {
      "city": "los angeles",
      "count": 352
    },
    {
      "city": "san diego",
      "count": 338
    },
    {
      "city": "houston",
      "count": 297
    },
    {
      "city": "chicago",
      "count": 264
    },
    {
      "city": "tucson",
      "count": 241
    },
    {
      "city": "miami",
      "count": 239
    }
  ]
}
curl http://localhost:5000/api/v1/ufo/top/us\?by\=city  0.01s user 0.01s system 14% cpu 0.122 total
```

### Question - 3

Nearest locations for our coordinates. Should be set `lat` and `lon` parameters in request.

***Examples:***
- http://localhost:5000/api/v1/ufo/nearest?lat=46.5476&lon=-87.3956 (coordinates Area-52)
- http://localhost:5000/api/v1/ufo/nearest?lat=45&lon=-88

More then 3 points - just set `amount` parameter in request

***Examples:***
- http://localhost:5000/api/v1/ufo/nearest?lat=46.5476&lon=-87.3956 (3 by default - without amount parameter)
- http://localhost:5000/api/v1/ufo/nearest?lat=46.5476&lon=-87.3956&amount=5
- http://localhost:5000/api/v1/ufo/nearest?lat=46.5476&lon=-87.3956&amount=10

Get result location distance with different units (by default `meters`)
Unit values:
- km
- mile
- meter
- nmi

***Examples:***
- http://localhost:5000/api/v1/ufo/nearest?lat=46.5476&lon=-87.3956 (`meters` by default - without unit parameter)
- http://localhost:5000/api/v1/ufo/nearest?lat=46.5476&lon=-87.3956&unit=km
- http://localhost:5000/api/v1/ufo/nearest?lat=46.5476&lon=-87.3956&unit=mile

#### Example

4) If our secret Area-52 base was to be attacked, where would it come from?

```bash
⇒  time curl http://localhost:5000/api/v1/ufo/nearest\?lat\=46.5476\&lon\=-87.3956
{
  "sightings": [
    {
      "id": "6084",
      "occurred_at": "6/1/1974 00:00",
      "city": "marquette",
      "state": "mi",
      "country": "us",
      "shape": "oval",
      "duration_seconds": "300",
      "duration_text": "5 minutes",
      "description": "We had no idea what it was and did not speak of it for years.",
      "reported_on": "2/14/2006",
      "latitude": "46.5436111",
      "longitude": "-87.3952778",
      "distance": 444.22937575361806
    },
    {
      "id": "10267",
      "occurred_at": "11/29/2011 03:35",
      "city": "marquette",
      "state": "mi",
      "country": "us",
      "shape": "light",
      "duration_seconds": "240",
      "duration_text": "4 min",
      "description": "Light object in sky dims then moves away towards downtown after hovering for several minutes.",
      "reported_on": "12/12/2011",
      "latitude": "46.5436111",
      "longitude": "-87.3952778",
      "distance": 444.22937575361806
    },
    {
      "id": "14024",
      "occurred_at": "7/31/2008 16:00",
      "city": "marquette",
      "state": "mi",
      "country": "us",
      "shape": "sphere",
      "duration_seconds": "900",
      "duration_text": "15 minutes",
      "description": "Something awakened me. When I looked out of the deck window at around 4:00 a.m.&#44 I was surprised to see a red flashing light. I live",
      "reported_on": "8/12/2008",
      "latitude": "46.5436111",
      "longitude": "-87.3952778",
      "distance": 444.22937575361806
    }
  ]
}
curl http://localhost:5000/api/v1/ufo/nearest\?lat\=46.5476\&lon\=-87.3956  0.01s user 0.01s system 8% cpu 0.288 total
```

### Question - 4

Nearest targets for our coordinates. Should be set `lat` and `lon` parameters in request (our position).

***Examples:***
- http://localhost:5000/api/v1/ufo/targets?lat=46.5476&lon=-87.3956 (coordinates Area-52)


Get result targets used different units for radius (by default `km`)
Unit values:
- km
- mile
- meter
- nmi

***Examples:***
- http://localhost:5000/api/v1/ufo/nearest?lat=46.5476&lon=-87.3956 (`km` by default - without unit parameter)
- http://localhost:5000/api/v1/ufo/nearest?lat=46.5476&lon=-87.3956&unit=meters
- http://localhost:5000/api/v1/ufo/nearest?lat=46.5476&lon=-87.3956&unit=mile


Get result targets with custome radius value (by default `120`)

***Examples:***
- http://localhost:5000/api/v1/ufo/nearest?lat=46.5476&lon=-87.3956 (`120` by default)
- http://localhost:5000/api/v1/ufo/nearest?lat=46.5476&lon=-87.3956&distance=500


Get result targets with custome duration value - in seconds (by default `42`)

***Examples:***
- http://localhost:5000/api/v1/ufo/nearest?lat=46.5476&lon=-87.3956 (`42` seconds by default)
- http://localhost:5000/api/v1/ufo/nearest?lat=46.5476&lon=-87.3956&duration=60


#### Example

```bash
⇒  time curl http://localhost:5000/api/v1/ufo/targets\?lat\=46.5476\&lon\=-87.3956
{
  "targets": {
    "egg": 1,
    "oval": 2,
    "": 1,
    "triangle": 3,
    "other": 2,
    "flash": 1,
    "light": 5,
    "formation": 1,
    "fireball": 1,
    "teardrop": 1,
    "cigar": 1
  }
}
curl http://localhost:5000/api/v1/ufo/targets\?lat\=46.5476\&lon\=-87.3956  0.01s user 0.01s system 6% cpu 0.293 total
```


## Ambiguity Notes

For question-3 we are using `https://www.npmjs.com/package/haversine` npm package to calculate a distance between two points by `latitude` and `longitude`.
And currently, we return 3 points (by default) that placed in one geo point. If we need different points - we should know what is base on our choice of unique place from an array with the same coordinates. (we should add/uncomment function `unique` in `getNearestLocations` method).
