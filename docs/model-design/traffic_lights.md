# traffic-light
**Type**: `infrastructuur:Verkeerslicht`  
**Application profile**: https://data.vlaanderen.be/doc/applicatieprofiel/infrastructuurelementen/#Verkeerslicht  
Describes a traffic light, its placement, location and other metadata.

## start_date, end_date
* **Predicate**: `openbaardomein:begindatum`, `openbaardomein:einddatum`
* **Type**: `xsd:dateTime` (ISO 8601 string)
* **Example value**: `"2015-01-13T00:00:00+01:00"`
	* (https://www.w3.org/TR/xmlschema11-2/#dateTime)

## location
* **Predicate**: `locn:geometry`
* **Type**: `locn:Geometry`
* **Example value**: `<geo:13.4125,103.8667>`
	* (https://www.rfc-editor.org/rfc/rfc5870)
	* (https://en.wikipedia.org/wiki/Geo_URI_scheme)

## material
* **Predicate**: `infrastructuur:materiaal`
* **Type**: `material` reference(s)
	* (class: `skos:Concept`)

## lighted
* **Predicate**: `infrastructuur:inwendigVerlicht`
* **Type**: `boolean`

## level
* **Predicate**: `openbaardomein:niveau`
* **Type**: `number`

## accuracy
* **Predicate**: `openbaardomein:nauwkeurigheid`
* **Type**: `url`
* **Example values**: `<https://data.vlaanderen.be/id/concept/Nauwkeurigsheidsklassen/A>`, `<https://data.vlaanderen.be/id/concept/Nauwkeurigsheidsklassen/H>`
	* (https://data.vlaanderen.be/doc/conceptscheme/Nauwkeurigsheidsklassen)

## relation
* (This can just be a URL reference to any other relevant information, such as an object in the "wegenregister")
* **Predicate**: `dc:relation`
* **Type**: `url`



<br />
<br />



# material
**Type**: `skos:Concept`  
Describes a material used for a traffic sign

## name
* **Predicate**: `skos:notation`
* **Type**: `string`
* **Example values**: `"ijzer"`, `"ijzerlegering"`, `"plastic"`
	* (https://thesaurus.onroerenderfgoed.be/conceptschemes/MATERIALEN)
