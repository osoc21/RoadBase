# Resources layout

Aight this might get somewhat confusing, so buckle up kiddo

So, the highest-level class is `Opstelling`, which refers to a `Verkeersbord-Verkeersteken`, which refers to a `Verkeersbord`, which refers to a `Verkeersbordconcept` (and optionally more `Verkeersbord-Verkeersteken`s, if it's a combination of multiple signs).

Distinctions between the categories of properties stored in some classes, especially `Opstelling` and `Verkeersbord`, honestly seem somewhat arbitrary. The "beheerder" property of `Verkeersbord` for example, would seem more intuitive as a property of `Opstelling`.

Classes will have more properties than the ones listed here, but these are the main ones relevant to this project. For a full overview, the [Verkeersborden application profile](https://data.vlaanderen.be/doc/applicatieprofiel/verkeersborden/#Opstelling) should be used as reference.

* [`Opstelling`](#traffic-sign-placement): describes *placement* of a sign
	* [`Verkeersbord`](#traffic-sign-instance): physical dimensions + other metadata
		* [`Verkeersbord-Verkeersteken`](#traffic-sign-combination): sign combinations ("onderborden")
			* [`Verkeersbordconcept`](#traffic-sign-concept): *type* of traffic sign
				* [`VerkeersbordconceptStatus`](#traffic-sign-state): whether or not a traffic sign type is still in use



<br />
<br />



# traffic-sign-placement
**Type**: `mobiliteit:Opstelling`  
Describes specific data about how a sign is *placed*. Most importantly, it contains the geographical coordinates, but also for example the sign's condition and position relative to the road.

## traffic-sign-instance
* **Predicate**: `mobiliteit:omvatVerkeersbord`
* **Type**: `traffic-sign-instance` reference
	* (class: `mobiliteit:Verkeersbord`)

## location
* **Predicate**: `locn:geometry`
* **Type**: `locn:Geometry`
* **Example value**: `geo:13.4125,103.8667`
	* (https://www.rfc-editor.org/rfc/rfc5870)
	* (https://en.wikipedia.org/wiki/Geo_URI_scheme)



<br />
<br />



# traffic-sign-instance
**Type**: `infrastructuur:Verkeersbord`  
Describes a real-world instance of a traffic sign. Contains physical properties such as dimensions, but also the supplier and managing authority.

## direction
* **Predicate**: `mobiliteit:aanzicht`
* **Type**: string literal, degrees or radians relative to North
* **Example values**: `"0"`, `"90"`, `"180"`, `"270"`

## height
* **Predicate**: `mobiliteit:opstelhoogte`
* **Type**: `schema:QuantitativeValue`

## traffic-sign-concept
* **Predicate**: `mobiliteit:realiseert`
* **Type**: `mobiliteit:Verkeersbord-Verkeersteken`



<br />
<br />



# traffic-sign-combination
**Type**: `mobiliteit:Verkeersbord-Verkeersteken`  
Describes a sign and optionally a subsign, can be nested.

## traffic-sign-concept
* **Predicate**: `mobiliteit:heeftVerkeersbordconcept`
* **Type**: `traffic-sign-concept` reference
	* (class: `mobiliteit:Verkeersbord-Verkeersteken`)

## traffic-sign-combination
* **Predicate**: `mobiliteit:heeftOnderbord`
* **Type**: `traffic-sign-combination` reference
	* (class: `mobiliteit:Verkeersbord-Verkeersteken`)



<br />
<br />



# traffic-sign-concept
**Type**: `mobiliteit:Verkeersbordconcept`  
Describes a *type* of traffic sign. Contains a description, category, etc.

## description
* **Predicate**: `skos:scopeNote`
* **Type**: string literal

## code
* **Predicate**: `skos:prefLabel`
* **Type**: string literal
* **Example value**: `"F1"`

## state
* **Predicate**: `vs:term_status`
* **Type**: `traffic-sign-state` reference
	* (class: `mobiliteit:VerkeersbordconceptStatus`)



<br />
<br />



# traffic-sign-state
**Type**: `mobiliteit:VerkeersbordconceptStatus`  
Describes the current state of a traffic sign concept (whether it's being used)

## state
* **Predicate**: `mobiliteit:VerkeersbordconceptStatus.status`
* **Type**: string literal
* **Example values**: `"stabiel"`, `"onstabiel"`, `"afgeschaft"`
