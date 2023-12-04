from owlready2 import *



def getOntologyClasses():

    query = """SELECT * { ?x a owl:Class . FILTER(ISIRI(?x)) }"""

    ontologyEntities = list(default_world.sparql(query))
    ontologyEntities = [str(entity) for entityList in ontologyEntities for entity in entityList]

    return ontologyEntities

def getEntityWithName(entityName):

    query = """
        SELECT * 
        WHERE {
            ?touristicPlace rdfs:label ??.
        }
    """

    entity = list(default_world.sparql(query, [entityName]))    
    return [str(entity) for entityList in entity for entity in entityList]


def getTouristicPlaceByValueInName(value):

    query = """
        PREFIX base: <file:///c:/Users/mcm23/OneDrive/Desktop/WSLD/ontology.rdf#>
        SELECT ?label
        WHERE {
            ?touristicSite rdfs:label ?label .
            ?touristicSite owl:Class "TouristicPlace" . 
            FILTER (CONTAINS(UCASE(?label), UCASE(??)))
        }
    """

    entity = list(default_world.sparql(query, [value]))
    return [str(entity) for entityList in entity for entity in entityList]


def getLocalIsLocatedInParish(parishName):

    query = """
        PREFIX base: <file:///c:/Users/mcm23/OneDrive/Desktop/WSLD/ontology.rdf#>
        SELECT ?label 
        WHERE {
            ?touristicSite rdfs:label ?label .
            ?touristicSite base:locateInParish ??
        }
    """

    entities = list(default_world.sparql(query, [parishName]))
    return [str(entity) for entityList in entities for entity in entityList]


def getLocalIsLocatedInParish(cityName):

    query = """
        PREFIX base: <file:///c:/Users/mcm23/OneDrive/Desktop/WSLD/ontology.rdf#>
        SELECT ?label 
        WHERE {
            ?touristicSite rdfs:label ?label .
            ?touristicSite base:locateInCity ??
        }
    """

    entities = list(default_world.sparql(query, [cityName]))
    return [str(entity) for entityList in entities for entity in entityList]


def getPlaceIsOpen():

    query = """
        PREFIX base: <file:///c:/Users/mcm23/OneDrive/Desktop/WSLD/ontology.rdf#>
        SELECT ?label ?openingHours
        WHERE {
            ?touristicSite rdfs:label ?label .
            ?touristicSite base:hasOpeningHours ?openingHours
        }
    """

    entities = list(default_world.sparql(query))
    return [str(entity) for entityList in entities for entity in entityList]

def getPlaceRating():

    query = """
        PREFIX base: <file:///c:/Users/mcm23/OneDrive/Desktop/WSLD/ontology.rdf#>
        SELECT ?label ?openingHours
        WHERE {
            ?touristicSite rdfs:label ?label .
            ?touristicSite base:hasOpeningHours ?hasRating
        }
    """

    entities = list(default_world.sparql(query))
    return [str(entity) for entityList in entities for entity in entityList]


#place is open
#rating