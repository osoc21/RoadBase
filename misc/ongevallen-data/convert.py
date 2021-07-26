import rdflib
import csv
from dataclasses import dataclass
from datetime import datetime, timezone, timedelta
from uuid import uuid4
from rdflib.namespace import RDF, XSD

BASE_URL = 'https://roadbase.be'
SCHEMA = rdflib.Namespace('https://schema.org/')
ROADBASE = rdflib.Namespace(f'{BASE_URL}/vocabularies/')
MU = rdflib.Namespace('http://mu.semte.ch/vocabularies/core/')


@dataclass
class Accident:
	id: str
	lat: str
	lng: str
	timestamp: float
	severity: str
	speed_limit: str
	weather: str
	road_state: str

	def __post_init__(self):
		'''Make sure the types are actually correct, because Python doesn't throw an error or cast them automatically ¯\_(ツ)_/¯'''
		self.timestamp = float(self.timestamp)


	def add_to_graph(self, g: rdflib.Graph):
		'''Add this Accident to an RDF graph'''
		uri = rdflib.URIRef(f'{BASE_URL}/accidents/{self.id}')

		# Turn UNIX timestamp from dataset into an ISO 8601 datetime string with the CET timezone
		dt = datetime.fromtimestamp(self.timestamp, timezone(timedelta(hours=1), 'Europe/Brussels'))
		dt_iso8601 = dt.isoformat()

		# Add triples for coordinates and timestamp of the accident
		g.add((uri, RDF.type, ROADBASE.Accident))
		g.add((uri, MU.uuid, rdflib.Literal(uuid4())))
		g.add((uri, SCHEMA.latitude, rdflib.Literal(self.lat)))
		g.add((uri, SCHEMA.longitude, rdflib.Literal(self.lng)))
		g.add((uri, XSD.dateTime, rdflib.Literal(dt_iso8601)))
		# TODO?: add other fields. These don't have an already existing predicate though, and aren't actually needed for this project.



def load_csv(filename) -> list[Accident]:
	'''Loads dataset csv and returns a list of Accident objects'''
	accidents = []
	with open(filename, 'r') as f:
		reader = csv.reader(f)
		next(reader)  # Skip first row, which has the column names
		for row in reader:
			accidents.append(Accident(*row))
	return accidents


def write_ttl(graph: rdflib.Graph, filename: str):
	'''Write graph back to a turte file'''
	with open(filename, 'wb') as f:
		ttl = graph.serialize(format='turtle')
		if ttl:
			f.write(ttl)



def main():
	graph = rdflib.Graph()

	# Load accidents from csv dataset, and add all Accident objects to an RDF graph
	accidents = load_csv('accidents_small.csv')
	for a in accidents:
		a.add_to_graph(graph)

	# Dump the graph to a turtle file
	write_ttl(graph, 'output_small.ttl')


if __name__ == '__main__':
	main()
