# Road signs resources

Aight this might get somewhat confusing, so buckle up kiddo

So, the highest-level class is [`Opstelling`](https://data.vlaanderen.be/ns/mobiliteit#Opstelling), which refers to a [`Verkeersbord-Verkeersteken`](https://data.vlaanderen.be/ns/mobiliteit#Verkeersbord-Verkeersteken), which refers to a [`Verkeersbord`](https://data.vlaanderen.be/ns/mobiliteit#Verkeersbord), which refers to a [`Verkeersbordconcept`](https://data.vlaanderen.be/ns/mobiliteit#Verkeersbordconcept) (and optionally more [`Verkeersbord-Verkeersteken`](https://data.vlaanderen.be/ns/mobiliteit#Verkeersbord-Verkeersteken)s, if it's a combination of multiple signs).

Distinctions between the categories of properties stored in some classes, especially [`Opstelling`](https://data.vlaanderen.be/ns/mobiliteit#Opstelling) and `Verkeersbord`, honestly seem somewhat arbitrary. The "beheerder" property of `Verkeersbord` for example, would seem more intuitive as a property of [`Opstelling`](https://data.vlaanderen.be/ns/mobiliteit#Opstelling). And the `aanzicht` property of `Verkeersbord` would make more sense in [`Opstelling`](https://data.vlaanderen.be/ns/mobiliteit#Opstelling), in my (completely objective and always correct) opinion.

Classes will have more properties than the ones listed here, but these are the main ones relevant to this project. For a full overview, the [Verkeersborden application profile](https://data.vlaanderen.be/doc/applicatieprofiel/verkeersborden/#Opstelling) should be used as reference.

* [`Opstelling`](#road-sign-placement): describes *placement* of a sign
	* [`Verkeersbord`](#road-sign-instance): physical dimensions + other metadata
		* [`Verkeersbord-Verkeersteken`](#road-sign-combination): sign combinations ("onderborden")
			* [`Verkeersbordconcept`](#road-sign-concept): *type* of road sign
				* [`VerkeersbordconceptStatus`](#road-sign-state): whether or not a road sign type is still in use



<br />
<br />



# road-sign-placement
**Type**: [`mobiliteit:Opstelling`](https://data.vlaanderen.be/ns/mobiliteit#Opstelling)  
Describes specific data about how a sign is *placed*. Most importantly, it contains the geographical coordinates, but also for example the sign's condition and position relative to the road.

## road-sign-instance
* **Predicate**: [`mobiliteit:omvatVerkeersbord`](https://data.vlaanderen.be/ns/mobiliteit#omvatVerkeersbord)
* **Type**: `road-sign-instance` reference
	* (class: [`mobiliteit:Verkeersbord`](https://data.vlaanderen.be/ns/mobiliteit#Verkeersbord))

## location
* **Predicate**: [`locn:geometry`](http://www.w3.org/ns/locn#geometry)
* **Type**: [`locn:Geometry`](http://www.w3.org/ns/locn#Geometry)
* **Example value**: `geo:13.4125,103.8667`
	* (https://www.rfc-editor.org/rfc/rfc5870)
	* (https://en.wikipedia.org/wiki/Geo_URI_scheme)



<br />
<br />



# road-sign-instance
**Type**: [`infrastructuur:Verkeersbord`](https://data.vlaanderen.be/ns/openbaardomein/infrastructuur#Verkeersbord)  
Describes a real-world instance of a road sign. Contains physical properties such as dimensions, but also the supplier and managing authority.

## direction
* **Predicate**: [`mobiliteit:aanzicht`](https://data.vlaanderen.be/ns/mobiliteit#aanzicht)
* **Type**: string literal, degrees or radians relative to North
* **Example values**: `"0"`, `"90"`, `"180"`, `"270"`

## height
* (The height at which a board is placed, distance between the ground and bottom of the board)
* **Predicate**: [`mobiliteit:opstelhoogte`](https://data.vlaanderen.be/ns/mobiliteit#opstelhoogte)
* **Type**: `quantitativeValue` reference
	* (class: [`schema:QuantitativeValue`](https://schema.org/QuantitativeValue))

## board_size, board_width and board_height
* (Dimensions of the board itself. Size is the diameter of circular boards, width and height are used for rectangular boards)
* **Predicate**: [`mobiliteit:Verkeersbord.afmeting`](https://data.vlaanderen.be/ns/mobiliteit#afmeting), [`mobiliteit:breedte`](https://data.vlaanderen.be/ns/mobiliteit#breedte), [`mobiliteit:hoogte`](https://data.vlaanderen.be/ns/mobiliteit#hoogte)
* **Type**: `QuantitativeValue` reference
	* (class: [`schema:QuantitativeValue`](https://schema.org/QuantitativeValue))

## road-sign-combination
* **Predicate**: [`mobiliteit:realiseert`](https://data.vlaanderen.be/ns/mobiliteit#realiseert)
* **Type**: [`mobiliteit:Verkeersbord-Verkeersteken`](https://data.vlaanderen.be/ns/mobiliteit#Verkeersbord-Verkeersteken)

## supplier
* **Predicate**: [`mobiliteit:leverancier`](https://data.vlaanderen.be/ns/mobiliteit#leverancier)
* **Type**: [`org:Organization`](http://www.w3.org/ns/org#Organization)
* **Note**: The [traffic signs application profile](https://data.vlaanderen.be/doc/applicatieprofiel/verkeersborden/#Verkeersbord%3Aleverancier) specifies a `dc:Agent` type. But since the `dc:Agent` model doesn't actually have any properties, and [`org:Organization`](http://www.w3.org/ns/org#Organization) is a subclass of `dc:Agent`, I decided to use that instead for this project. For other applications, this might need to be changed though. It could also be interesting to use [this expanded definition of dc:Agent](https://data.vlaanderen.be/doc/applicatieprofiel/organisatie-basis/#Agent) instead.



<br />
<br />



# road-sign-combination
**Type**: [`mobiliteit:Verkeersbord-Verkeersteken`](https://data.vlaanderen.be/ns/mobiliteit#Verkeersbord-Verkeersteken)  
Describes a sign and optionally a subsign, can be nested.

## road-sign-concept
* **Predicate**: [`mobiliteit:heeftVerkeersbordconcept`](https://data.vlaanderen.be/ns/mobiliteit#heeftVerkeersbordconcept)
* **Type**: `road-sign-concept` reference
	* (class: [`mobiliteit:Verkeersbord-Verkeersteken`](https://data.vlaanderen.be/ns/mobiliteit#Verkeersbord-Verkeersteken))

## road-sign-combination
* **Predicate**: [`mobiliteit:heeftOnderbord`](https://data.vlaanderen.be/ns/mobiliteit#heeftOnderbord)
* **Type**: `road-sign-combination` reference
	* (class: [`mobiliteit:Verkeersbord-Verkeersteken`](https://data.vlaanderen.be/ns/mobiliteit#Verkeersbord-Verkeersteken))



<br />
<br />



# road-sign-concept
**Type**: [`mobiliteit:Verkeersbordconcept`](https://data.vlaanderen.be/ns/mobiliteit#Verkeersbordconcept)  
Describes a *type* of road sign. Contains a description, category, etc.

## description
* **Predicate**: [`skos:scopeNote`](http://www.w3.org/2004/02/skos/core#scopeNote)
* **Type**: string literal

## code
* **Predicate**: [`skos:prefLabel`](http://www.w3.org/2004/02/skos/core#prefLabel)
* **Type**: string literal
* **Example value**: `"F1"`

## state
* **Predicate**: [`vs:term_status`](http://www.w3.org/2003/06/sw-vocab-status/ns#term_status)
* **Type**: `road-sign-state` reference
	* (class: [`mobiliteit:VerkeersbordconceptStatus`](https://data.vlaanderen.be/ns/mobiliteit#VerkeersbordconceptStatus))



<br />
<br />



# road-sign-state
**Type**: [`mobiliteit:VerkeersbordconceptStatus`](https://data.vlaanderen.be/ns/mobiliteit#VerkeersbordconceptStatus)  
Describes the current state of a road sign concept (whether it's being used)

## state
* **Predicate**: [`mobiliteit:VerkeersbordconceptStatus.status`](https://data.vlaanderen.be/ns/mobiliteit#status)
* **Type**: string literal
* **Example values**: `"stabiel"`, `"onstabiel"`, `"afgeschaft"`



<br />
<br />
<br />
<br />



# quantitative-value
**Type**: [`schema:QuantitativeValue`](https://schema.org/QuantitativeValue)
Describes a value with a given unit

## value
* **Predicate**: [`schema:value`](https://schema.org/value)
* **Type**: number

## unit_code
* **Predicate**: [`schema:unitCode`](https://schema.org/unitCode)
* **Type**: string literal
* **Example value**: `"MTR"`
	* (https://tfig.unece.org/contents/recommendation-20.htm)



<br />
<br />



# organization
**Type**: [`org:Organization`](http://www.w3.org/ns/org#Organization)  
Describes an organization with a (primary/secondary) name and a "code"

**Note**: It could be interesting to use [this expanded definition of org:Organization](https://data.vlaanderen.be/doc/applicatieprofiel/organisatie-basis/#Organisatie) instead. But for this project, having an organization with a name is the main important thing.

## name
* **Predicate**: [`skos:prefLabel`](http://www.w3.org/2004/02/skos/core#prefLabel)
* **Type**: string literal

## altname
* **Predicate**: [`skos:altLabel`](http://www.w3.org/2004/02/skos/core#altLabel)
* **Type**: string literal

## code
* **Predicate**: [`skos:notation`](http://www.w3.org/2004/02/skos/core#notation)
* **Type**: string literal



<br />
<br />



# code
**Type**: [`skos:Concept`](http://www.w3.org/2004/02/skos/core#Concept)  
Used to describe some more abstract concepts, in this case "position relative to road" and "operational status".

## code
* **Predicate**: [`skos:notation`](http://www.w3.org/2004/02/skos/core#notation)
* **Type**: string literal
* **Example values**: `"left"`, `"right"`

## description
* **Predicate**: [`skos:scopeNote`](http://www.w3.org/2004/02/skos/core#scopeNote)
* **Type**: string literal
* **Example value**: `"to the left side of the road"`
