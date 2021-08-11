# accident
**Type**: `roadbase:Accident`  
Describes a traffic accident, its location and timestamp.

## timestamp
* **Predicate**: `roadbase:timestamp`
* **Type**: `xsd:dateTime` (ISO 8601 string)
* **Example value**: `"2015-01-13T18:35:00+01:00"`
	* (https://www.w3.org/TR/xmlschema11-2/#dateTime)


## location
* **Predicate**: `locn:geometry`
* **Type**: `locn:Geometry`
* **Example value**: `<geo:13.4125,103.8667>`
	* (https://www.rfc-editor.org/rfc/rfc5870)
	* (https://en.wikipedia.org/wiki/Geo_URI_scheme)
