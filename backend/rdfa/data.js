const SparqlClient = require("sparql-http-client");

const endpointUrl = process.env.SPARQL_ENDPOINT || "http://localhost:8890/sparql";
const client = new SparqlClient({ endpointUrl });


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


function sparqlEscapeString(value){
	return '"""' + value.replace(/[\\"]/g, function(match) { return '\\' + match; }) + '"""';
};

function sparqlEscapeUri(value){
	return '<' + value.replace(/[\\"']/g, function(match) { return '\\' + match; }) + '>';
};


async function queryMain(uuid) {
	uuid = sparqlEscapeString(uuid);
	let q = `
	PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
	PREFIX mobiliteit: <https://data.vlaanderen.be/ns/mobiliteit#>
	PREFIX openbaardomein: <https://data.vlaanderen.be/ns/openbaardomein#>
	PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
	PREFIX locn: <http://www.w3.org/ns/locn#>
	PREFIX schema: <https://schema.org/>


	SELECT * WHERE {
		?s
			mu:uuid ${uuid} ;
			locn:geometry ?location ;
			mobiliteit:omvatVerkeersbord ?verkeersbord .

		?verkeersbord
			mobiliteit:aanzicht ?rotation ;
			mobiliteit:opstelhoogte [
				schema:value ?heightValue ;
				schema:unitCode ?heightUnitCode
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
			mobiliteit:Verkeersbord.operationeleStatus [
				skos:notation ?operationalStatus
			] ;
			schema:comment ?comment ;
			mobiliteit:realiseert ?combination .

		# Road sign must either have a size (diagonal) or height+width
		{
			?verkeersbord mobiliteit:Verkeersbord.afmeting [
				schema:value ?sizeValue ;
				schema:unitCode ?sizeUnitCode
			]
		}
		UNION
		{
			?verkeersbord
				mobiliteit:hoogte [
				schema:value ?heightValue ;
				schema:unitCode ?heightUnitCode
			] ;
				mobiliteit:breedte [
				schema:value ?widthValue ;
				schema:unitCode ?widthUnitCode
			]
		}
	}`;

	let res = await query(q);

	// Collapse some properties into objects that are nicer to work with for templating.
	// Not very elegant, but ¯\_(ツ)_/¯
	res.supplier = {
		notation: res.supplierNotation,
		prefLabel: res.supplierPrefLabel,
		altLabel: res.supplierAltLabel
	};
	delete res.supplierNotation;
	delete res.supplierPrefLabel;
	delete res.supplierAltLabel;

	res.authority = {
		notation: res.authorityNotation,
		prefLabel: res.authorityPrefLabel,
		altLabel: res.authorityAltLabel
	};
	delete res.authorityNotation;
	delete res.authorityPrefLabel;
	delete res.authorityAltLabel;

	res.height = {
		value: res.heightValue,
		unitCode: res.heightUnitCode
	}
	delete res.heightValue;
	delete res.heightUnitCode;

	res.size = {
		value: res.sizeValue,
		unitCode: res.sizeUnitCode
	}
	delete res.sizeValue;
	delete res.sizeUnitCode;

	res.boardHeight = {
		value: res.boardHeightValue,
		unitCode: res.boardHeightUnitCode
	}
	delete res.boardHeightValue;
	delete res.boardHeightUnitCode;

	res.boardWidth = {
		value: res.boardWidthValue,
		unitCode: res.boardWidthUnitCode
	}
	delete res.boardWidthValue;
	delete res.boardWidthUnitCode;

	return res;
}


async function querySubBoards(combination) {
	combination = sparqlEscapeUri(combination);
	let q = `
	PREFIX mobiliteit: <https://data.vlaanderen.be/ns/mobiliteit#>
	PREFIX infrastructuur: <https://data.vlaanderen.be/ns/openbaardomein/infrastructuur#>

	SELECT ?isBeginZone ?isEndZone ?code ?meaning ?image (COUNT(?mid)-1 as ?distance) WHERE {
		${combination}
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
