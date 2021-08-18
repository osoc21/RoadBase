const SparqlClient = require("sparql-http-client");

const endpointUrl = "http://localhost:8890/sparql";
const client = new SparqlClient({ endpointUrl });


async function getOpstelling(uuid) {
	let query = `
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
				schema:value ?sizeValue ;
				schema:unitCode ?sizeUnit
			] ;
				mobiliteit:breedte [
				schema:value ?sizeValue ;
				schema:unitCode ?sizeUnit
			]
		}
	}`;

	const stream = await client.query.select(query);

	stream.on("data", (row) => {
		console.log(row);
		Object.entries(row).forEach(([key, value]) => {
			console.log(`${key}: ${value.value} (${value.termType})`);
		});
	});

	return getMockData();
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


module.exports = { getOpstelling, getMockData };
