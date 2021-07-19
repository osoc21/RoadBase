# Accident dataset LOD-ifyer

We are using the dataset from [the Federal Police's accident heatmap](http://www.verkeersstatistieken.federalepolitie.be/assets/stats/wetenschapstudie/index.html). This page loads a csv with coordinates, a UNIX timestamp, the severity of the accident, the road's speed limit, the weather, and the road's condition. This dataset is converted into a ttl file, so it can easily be loaded into our mu.semte.ch migrations service.

## Usage
- Make sure your dataset file is in this directory, and named accidents.csv
- Create a new virtual environment:
	```bash
	python -m venv .venv && source .venv/bin/activate
	```
- Install the dependencies:
	```bash
	pip install -r requirements.txt
	```
- Run the script:
	```bash
	python convert.py
	```

(Since the dataset is quite large, this could take a bit. For reference, it took ~13 seconds on my machine)
