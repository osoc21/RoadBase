Both [`road-marking`](#road-marking) and [`traffic-light`](#traffic-light) are subclasses of [`road-signal`](#road-signal) and (at this point in time) look identical. For this reason, only their types and a reference to the their entry in the application profile is provided, in addition to the documentation for their superclass, [`road-signal`](#road-signal).



<br />
<br />



# road-marking
**Type**: [`infrastructuur:Wegmarkering`](https://data.vlaanderen.be/ns/openbaardomein/infrastructuur#Wegmarkering)  
**Superclass**: [`road-signal`](#road-signal) ([`infrastructuur:Wegsignalisatie`](https://data.vlaanderen.be/ns/openbaardomein/infrastructuur#Wegsignalisatie))  
**Application profile**: https://data.vlaanderen.be/doc/applicatieprofiel/infrastructuurelementen/#Wegmarkering  
Describes a road marking, its placement, location and other metadata.



<br />
<br />



# traffic-light
**Type**: [`infrastructuur:Verkeerslicht`](https://data.vlaanderen.be/ns/openbaardomein/infrastructuur#Verkeerslicht)  
**Application profile**: https://data.vlaanderen.be/doc/applicatieprofiel/infrastructuurelementen/#Verkeerslicht  
**Superclass**: [`road-signal`](#road-signal) ([`infrastructuur:Wegsignalisatie`](https://data.vlaanderen.be/ns/openbaardomein/infrastructuur#Wegsignalisatie))  
Describes a traffic light, its placement, location and other metadata.



<br />
<br />



# road-signal
**Type**: [`infrastructuur:Wegsignalisatie`](https://data.vlaanderen.be/ns/openbaardomein/infrastructuur#Wegsignalisatie)  
**Application profile**: https://data.vlaanderen.be/doc/applicatieprofiel/infrastructuurelementen/#Wegsignalisatie  
Parent class for [`infrastructuur:Wegmarkering`](https://data.vlaanderen.be/ns/openbaardomein/infrastructuur#Wegmarkering) and [`infrastructuur:Verkeerslicht`](https://data.vlaanderen.be/ns/openbaardomein/infrastructuur#Verkeerslicht)

## start_date, end_date
* **Predicate**: [`openbaardomein:begindatum`](https://data.vlaanderen.be/ns/openbaardomein#begindatum), [`openbaardomein:einddatum`](https://data.vlaanderen.be/ns/openbaardomein#einddatum)
* **Type**: [`xsd:dateTime`](http://www.w3.org/2001/XMLSchema#dateTime) (ISO 8601 string)
* **Example value**: `"2015-01-13T00:00:00+01:00"`
	* (https://www.w3.org/TR/xmlschema11-2/#dateTime)

## location
* **Predicate**: [`locn:geometry`](http://www.w3.org/ns/locn#geometry)
* **Type**: [`locn:Geometry`](http://www.w3.org/ns/locn#Geometry)
* **Example value**: `<geo:13.4125,103.8667>`
	* (https://www.rfc-editor.org/rfc/rfc5870)
	* (https://en.wikipedia.org/wiki/Geo_URI_scheme)

## material
* **Predicate**: [`infrastructuur:materiaal`](https://data.vlaanderen.be/ns/openbaardomein/infrastructuur#materiaal)
* **Type**: `material` reference(s)
	* (class: [`skos:Concept`](http://www.w3.org/2004/02/skos/core#Concept))

## lighted
* **Predicate**: [`infrastructuur:inwendigVerlicht`](https://data.vlaanderen.be/ns/openbaardomein/infrastructuur#inwendigVerlicht)
* **Type**: `boolean`

## level
* **Predicate**: [`openbaardomein:niveau`](https://data.vlaanderen.be/ns/openbaardomein#niveau)
* **Type**: `number`

## accuracy
* **Predicate**: [`openbaardomein:nauwkeurigheid`](https://data.vlaanderen.be/ns/openbaardomein#nauwkeurigheid)
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
**Type**: [`skos:Concept`](http://www.w3.org/2004/02/skos/core#Concept)  
Describes a material used for a road signal

## name
* **Predicate**: [`skos:notation`](http://www.w3.org/2004/02/skos/core#notation)
* **Type**: `string`
* **Example values**: `"ijzer"`, `"ijzerlegering"`, `"plastic"`
	* (https://thesaurus.onroerenderfgoed.be/conceptschemes/MATERIALEN)
