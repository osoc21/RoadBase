module.exports = {


	getMockData: () => {
		return {
			location: "geo:50.933813981621235,4.03698742389679",
			supplier: {
				notation: "LEVERANCIER",
				prefLabel: "Leverancier van het bord",
				altLabel: "Een andere naam voor de leverancier van het bord"
			},
			authority: {
				notation: "BEHEERDER",
				prefLabel: "Beheerder van het bord",
				altLabel: "Een andere naam voor de beheerder van het bord"
			},
			comment: "Yep dit is inderdaad een bord.",
			operationalState: "OK",
			height: {
				value: 2,
				unitCode: "MTR"
			},
			size: {
				value: 0.25,
				unitCode: "MTR"
			},
			boardHeight: null,
			boardWidth: null,
			board: {
				isBeginZone: false,
				isEndZone: false,
				concept: {
					code: "B5",
					meaning: "Stoppen en voorrang verlenen.",
					image: "http://mobiliteit.vo.data.gift/images/3b3291d61283d2522afbea6ae5d9731ce8a6994fc75fecee6fd2f22f5114fc3b"
				},
				subBoard: {
					isBeginZone: false,
					isEndZone: false,
					concept: {
						code: "B5",
						meaning: "Stoppen en voorrang verlenen.",
						image: "http://mobiliteit.vo.data.gift/images/3b3291d61283d2522afbea6ae5d9731ce8a6994fc75fecee6fd2f22f5114fc3b"
					}
				}
			}
		};
	},


	getOpstelling: () => {
		return {
			this: "is",
			an: "object"
		};
	},

}
