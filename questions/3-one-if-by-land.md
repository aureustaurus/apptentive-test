# Question #3: One if by Land

Prior to the invasion fleet arriving, the government rounded up high ranking scientists, engineers, and software developers
and took them to a secret underground base, codename: **Area 52**. The location of Area 52 is highly classified and not even you know its exact location.

You thought you were safe. However, rumors are afloat and everyone speaks in hushed whispers.
It seems that the Aliens may have figured out the hidden location of Area 52. Now you're being tasked with an impossible request:
Figure out where the Alien attack will come from.

Lucky for you, someone scrawled the GPS coordinates of Area 52 on the inside of a bathroom stall. Go figure.

Location: `46.5476, -87.3956`

Given these GPS coordinates, find the three geographically closest UFO sightings where an attack would originate from.

Sightings should be returned in ascending order by distance, from closest to furthest away.
Each sighting returned should contain all fields available, including a `distance` field that represents the distance
of this sighting from Area 52 in kilometers.

You do not need to consider that the Earth is an ellipsoid/spheroid. For the purposes of this computation, it is
safe to assume that it is a perfect sphere and that will accurate enough. For example, an implementation of the
[Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula) will suffice.

The HTTP service for this question should work in the following way:

```bash
⇒  curl http://localhost:<port>/<route>?<query-string>
{
  "sightings": [
    {
        "city": <city_closest_to_base:string>,
        "country": <country_of_city:string>,
        ...
        ...
        "shape": <shape_of_ufo:string>,
        "distance": <distance_of_ufo_from_area52:float>
    },
    {
        "city": <city_second_closest:string>,
        "country": <country_of_city:string>,
        ...
        ...
        "shape": <shape_of_ufo:string>,
        "distance": <distance_of_ufo_from_area52:float>
    },
    {
        "city": <city_third_closest:string>,
        "country": <country_of_city:string>,
        ...
        ...
        "shape": <shape_of_ufo:string>,
        "distance": <distance_of_ufo_from_area52:float>
    }
  ]
}
```

Before moving on to exercise submission be sure to commit your work!

Next: [Submit your work](../submission.md)
