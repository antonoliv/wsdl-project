import queries as q
from owlready2 import *
import sys

#sys.path.append('./app/ontology')


onto = get_ontology("file://app/ontology/updated_ontology.rdf").load()

def getOntologyClasses():

    return q.getOntologyClasses()


def getEntityWithName(entityName):

    try:
        entity = q.getEntityWithName(entityName)
    except:
        return {"message":"err", "code":400}
    
    return {"data":entity, "code":200}


def getEntityByValueInName(value):

    entities = q.getTouristicPlaceByValueInName(value)

    return {"data":entities, "code":200}


def getEntitiesByCity(value):

    entities = q.getLocalIsLocatedInCity(value)

    return {"data":entities, "code":200}

