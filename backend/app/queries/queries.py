from owlready2 import *
import utils as uls



def getOntologyClasses():

    query = """SELECT * { ?x a owl:Class . FILTER(ISIRI(?x)) }"""
    return uls.executeQuery(query, [])


def getEntityWithName(entityName):

    query = """
        SELECT * 
        WHERE {
            ?touristicPlace rdfs:label ??.
        }
    """
    return uls.executeQuery(query, [entityName])


def getTouristicPlaceByValueInName(value):

    query = """
        PREFIX base: <file:///c:/Users/mcm23/OneDrive/Desktop/WSLD/ontology.rdf#>
        SELECT ?label
        WHERE {
            ?touristicSite a <http://example.org/TouristicPlace> .
            ?touristicSite rdfs:label ?label . 
            FILTER (CONTAINS(UCASE(?label), UCASE(??)))
        }
    """

    return uls.executeQuery(query, [value])


def getLocalIsLocatedInParish(parishName):

    query = """
        PREFIX base: <file:///c:/Users/mcm23/OneDrive/Desktop/WSLD/ontology.rdf#>
        SELECT ?label 
        WHERE {
            ?touristicSite a <http://example.org/TouristicPlace> .
            ?touristicSite rdfs:label ?label .
            ?touristicSite base:locateInParish ??
        }
    """

    return uls.executeQuery(query, [parishName])



#def getLocalIsLocatedInCity(cityName):
#
#    query = """
#        PREFIX city: <file:///g:/Il%20mio%20Drive/Universit%C3%A0/Magistrale/II%20Anno/I%20Semestre/Semantic%20Web%20%26%20Linked%20Data/.Project/ontology.rdf#>
#        SELECT ?label 
#        WHERE {
#            ?touristicSite a <http://example.org/TouristicPlace> .
#            ?touristicSite rdfs:label ?label .
#            ?touristicSite city:locatedInCity ?? .
#        }
#    """
#    
#    return uls.executeQuery(query, [cityName])


def getPlaceIsOpen():

    query = """
        PREFIX base: <file:///c:/Users/mcm23/OneDrive/Desktop/WSLD/ontology.rdf#>
        SELECT ?label ?openingHours
        WHERE {
            ?touristicSite a <http://example.org/TouristicPlace> .
            ?touristicSite rdfs:label ?label .
            ?touristicSite base:hasOpeningHours ?openingHours
        }
    """

    return uls.executeQuery(query, [])

def getPlaceRating():

    query = """
        PREFIX base: <file:///c:/Users/mcm23/OneDrive/Desktop/WSLD/ontology.rdf#>
        SELECT ?label ?openingHours
        WHERE {
            ?touristicSite a <http://example.org/TouristicPlace> .
            ?touristicSite rdfs:label ?label .
            ?touristicSite base:hasOpeningHours ?hasRating
        }
    """

    return uls.executeQuery(query, [])


#place is open
#rating