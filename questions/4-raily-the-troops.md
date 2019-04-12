# Question #4: Raily the Troops

You're delivering as promised and the higher ups in government intelligence have noticed. You've just been given a new
office with a view. It's a view of a concrete wall, but still, it's a nice wall. Much better than the leaky pipe and
mold covered floors of your last office.
More importantly however is that you've been granted clearance to **Top Secret** classified information.

For your first assignment, you've received a large dossier covering the details of a secret weapon in development
by the Navy; the Railgun. It's still in the prototype phase but the engineering corp was able to mount one outside
of Area 52 before retreating underground.

While the Railgun is a technological breakthrough, you've been able to determine a few of its constraints
from the technical documentation:

* **Range:** 120 Kilometers
* **Firing Direction:** 360 degrees
* **Lock-on Time:** 42 seconds

The lock-on time is particularly tricky. This means that the Railgun can only hit slow moving UFOs and will be ineffective
against UFOs that have been sighting appearing/disappearing under 42 seconds.

Defense forces need to understand the effectiveness of the Railgun against specific types of ships and need your help to do it.

Given this weapon and these constraints, find the UFO sightings that the Railgun can successfully shoot down grouped by their shape.

The Railgun can successfully hit a UFO target if the following constraints are met:

* The UFO sighting is within 120 Kilometers of Area 52 (inclusive)
* The UFO sighting duration is more than 42 seconds (inclusive)

Remember: Area 52 is located at: `46.5476, -87.3956`

The HTTP service for this question should work in the following way:

```bash
⇒  curl http://localhost:<port>/<route>?<query-string>
{
  "targets": {
    "<shape_1>": <number_of_sightings_of_shape1:int>
    "<shape_2>": <number_of_sightings_of_shape2:int>
    ...
  }
}
```
