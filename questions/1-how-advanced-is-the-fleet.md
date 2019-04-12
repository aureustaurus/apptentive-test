# Question #1: How Advanced is the Fleet?

NASA and defense forces are scrambling to determine the capabilities of the Alien fleet, more specifically, how many different types of spaceships do they have?
As a simple approximation, just calculate the number of unique shapes of alien ships that have been seen across the globe.

If a UFO sighting does not describe a shape of the UFO, it can be ignored for this calculation.

The HTTP service for this question should work in the following way:

```bash
⇒  curl http://localhost:<port>/<route>?<optional-query-string>
{
  "count": <unique_ship_shape_count:int>
}
```

Before moving on to the next question, be sure to commit your work!

Next: [Evacuation Priorities](2-evacuation-priorities.md)
