# Question #2: Evacuation Priorities

With limited resources, the National Guard is looking to prioritize evacuation efforts based on cities that are likely to be attacked first.
With the assumption that cities will be attacked based on the number of previous UFO sightings,
find the Top-10 Cities in the United States with the most UFO sightings.

Cities should be returned in descending order from most sightings to least.

The HTTP service for this question should work in the following way:

```bash
⇒  curl http://localhost:<port>/<route>?<query-string>
{
  "sightings": [
    {
        "city": <city_name_with_most_sightings:string>,
        "count": <sightings_in_this_city:int>
    },
    {
        "city": <city_name_with_second_most_sightings:string>,
        "count": <sightings_in_this_city:int>
    },
    ...
    ...
    {
        "city": <city_name_with_tenth_most_sightings:string>,
        "count": <sightings_in_this_city:int>
    }
  ]
}
```

Before moving on to the next question, be sure to commit your work!

Next: [One if by Land](3-one-if-by-land.md)
