from owlready2 import *

def executeQuery(query, params):

    entities = list(default_world.sparql(query, params))
    print(entities)
    return [str(entity) for entityList in entities for entity in entityList]