const SparqlClient = require("sparql-http-client");

const endpointUrl = "http://localhost:8890/sparql";
const client = new SparqlClient({ endpointUrl });


//! TODO: escape inputs please for the love of god
/**
 * Execute a SPARQL query, return the results as an array of row objects, or as a single row object if there's only a single result.
 *
 * @param {string} q Query to execute
 * @returns array of result objects, or single result object
 */
async function query(q) {
	const stream = await client.query.select(q);
	let rowObjs = [];

	// Resolve the promise only when we're finished reading from the query stream
	return new Promise(async (resolve, reject) => {
		// Key-value pairs -> row object
		stream.on("data", (row) => {
			let obj = {};
			Object.entries(row).forEach(([key, value]) => {
				obj[key] = value.value;
			});
			rowObjs.push(obj);
		})
		.on("end", () => {
			// If there's only a single row, return it as an object instead of an array of objects
			if (rowObjs.length === 1) resolve(rowObjs[0]);
			else resolve(rowObjs);
		});
	});
}


async function queryMain(uuid) {
	let q = `
	PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
	PREFIX mobiliteit: <https://data.vlaanderen.be/ns/mobiliteit#>
	PREFIX openbaardomein: <https://data.vlaanderen.be/ns/openbaardomein#>
	PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
	PREFIX locn: <http://www.w3.org/ns/locn#>
	PREFIX schema: <https://schema.org/>


	SELECT * WHERE {
		?s
			mu:uuid "${uuid}" ;
			locn:geometry ?location ;
			mobiliteit:omvatVerkeersbord ?verkeersbord .

		?verkeersbord
			mobiliteit:aanzicht ?rotation ;
			mobiliteit:opstelhoogte [
				schema:value ?heightValue ;
				schema:unitCode ?heightUnit
			] ;
			openbaardomein:beheerder [
				skos:notation ?authorityNotation ;
				skos:prefLabel ?authorityPrefLabel ;
				skos:altLabel ?authorityAltLabel
			] ;
			openbaardomein:leverancier [
				skos:notation ?supplierNotation ;
				skos:prefLabel ?supplierPrefLabel ;
				skos:altLabel ?supplierAltLabel
			];
			mobiliteit:Verkeersbord.operationeleStatus ?operationalStatus ;
			schema:comment ?comment ;
			mobiliteit:realiseert ?combination .

		# Road sign must either have a size (diagonal) or height+width
		{
			?verkeersbord mobiliteit:Verkeersbord.afmeting [
				schema:value ?sizeValue ;
				schema:unitCode ?sizeUnit
			]
		}
		UNION
		{
			?verkeersbord
				mobiliteit:hoogte [
				schema:value ?heightValue ;
				schema:unitCode ?heightUnit
			] ;
				mobiliteit:breedte [
				schema:value ?widthValue ;
				schema:unitCode ?widthUnit
			]
		}
	}`;

	return await query(q);
}


async function querySubBoards(combination) {
	//! This is BAD. sparql-http-client doesn't seem prepapred statements, would URL encoding be sufficient?
	let q = `
	PREFIX mobiliteit: <https://data.vlaanderen.be/ns/mobiliteit#>
	PREFIX infrastructuur: <https://data.vlaanderen.be/ns/openbaardomein/infrastructuur#>

	SELECT ?isBeginZone ?isEndZone ?code ?meaning ?image (COUNT(?mid)-1 as ?distance) WHERE {
		<https://osoc-safe-open-roads.s.redpencil.io/road-sign-combinations/72cc6adf-7776-4187-ac32-3e29f38c8210>
			a mobiliteit:Verkeersbord-Verkeersteken ;
			# Traverse the linked list - property paths go brrrrrrrr
			mobiliteit:heeftOnderbord* ?mid .

		# Used for sorting by distance
		?mid mobiliteit:heeftOnderbord* ?subBoard .

		?subBoard
			a mobiliteit:Verkeersbord-Verkeersteken ;
			mobiliteit:isBeginZone ?isBeginZone ;
			mobiliteit:isEindZone ?isEndZone ;
			mobiliteit:heeftVerkeersbordconcept [
				a mobiliteit:Verkeersbordconcept ;
				skos:prefLabel ?code ;
				skos:scopeNote ?meaning ;
				mobiliteit:grafischeWeergave ?image
			]
	} ORDER BY ?distance`;

	let rows = await query(q);
	let subBoards = {}

	for (const [index, row] of rows.entries()) {
		let ref = subBoards;

		for (let i = 0; i < index; i++) {
			if (!ref.subBoard) ref.subBoard = {};
			ref = ref.subBoard;
		}

		Object.assign(ref, {
			isBeginZone: Boolean(row.isBeginZone),
			isEndZone: Boolean(row.isEndZone),
			concept: {
				code: row.code,
				meaning: row.meaning,
				image: row.image
			}
		});
	}

	return subBoards;
}


async function getOpstelling(uuid) {
	let opstelling = await queryMain(uuid);
	let subBoards = await querySubBoards(opstelling.combination);
	opstelling.board = subBoards;

	return opstelling;
}



function getMockData() {
	return {
		location: "geo:50.933813981621235,4.03698742389679",
		supplier: {
			notation: "LEVERANCIER",
			prefLabel: "Leverancier van het bord",
			altLabel: "Een andere naam voor de leverancier van het bord",
		},
		authority: {
			notation: "BEHEERDER",
			prefLabel: "Beheerder van het bord",
			altLabel: "Een andere naam voor de beheerder van het bord",
		},
		comment: "Yep dit is inderdaad een bord.",
		operationalState: "OK",
		rotation: 90,
		height: {
			value: 2,
			unitCode: "MTR",
		},
		size: {
			value: 0.25,
			unitCode: "MTR",
		},
		boardHeight: null,
		boardWidth: null,
		board: {
			isBeginZone: false,
			isEndZone: false,
			concept: {
				code: "B5",
				meaning: "Stoppen en voorrang verlenen.",
				image: "http://mobiliteit.vo.data.gift/images/3b3291d61283d2522afbea6ae5d9731ce8a6994fc75fecee6fd2f22f5114fc3b",
			},
			subBoard: {
				isBeginZone: false,
				isEndZone: false,
				concept: {
					code: "B5",
					meaning: "Stoppen en voorrang verlenen.",
					image: "http://mobiliteit.vo.data.gift/images/3b3291d61283d2522afbea6ae5d9731ce8a6994fc75fecee6fd2f22f5114fc3b",
				},
			},
		},
	};
}


module.exports = { getOpstelling };
