from owlready2 import *

def get_city(id):
    onto = get_ontology("file:///home/treeman/school/wsdl/wsdl-project/backend/app/ontology/updated_ontology.rdf").load()

    query = f"""
        PREFIX base: <http://example.org/>
        PREFIX ns1: <http://www.w3.org/2003/01/geo/wgs84_pos#>
        SELECT ?name ?population ?area ?latitude ?longitude ?website ?flag ?coat ?district_label
        WHERE {{
            ?city a base:City .
            ?city rdfs:label ?name .
            ?city base:hasPopulation ?population .
            ?city base:hasArea ?area .
            ?city ns1:lat ?latitude .
            ?city ns1:long ?longitude .
            ?city base:hasWebsite ?website .
            ?city base:hasFlag ?flag .
            ?city base:hasCoat ?coat .
            ?city base:locatedInDistrict ?district .
            ?district rdfs:label ?district_label
            FILTER(?city = base:{id}) 
        }}
    """

    entity = default_world.sparql(query, error_on_undefined_entities=False)
    entity = [str(entity) for entityList in entity for entity in entityList]

    if entity == []:
        return {}
    ret = {}

    if entity[0] != "None":
        ret['name'] = entity[0]
    else:
        ret['name'] = ""
        
    if entity[1] != "None":
        ret['population'] = entity[1]
    else:
        ret['population'] = ""

    if entity[2] != "None":
        ret['area'] = entity[2]
    else:
        ret['area'] = ""

    if entity[3] != "None":
        ret['latitude'] = entity[3]
    else:
        ret['latitude'] = ""

    if entity[3] != "None":
        ret['longitude'] = entity[4]
    else:
        ret['longitude'] = ""

    if entity[3] != "None":
        ret['website'] = entity[5]
    else:
        ret['website'] = ""

    if entity[3] != "None":
        ret['flag'] = entity[6]
    else:
        ret['flag'] = ""

    if entity[3] != "None":
        ret['coat'] = entity[7]
    else:
        ret['coat'] = ""

    if entity[3] != "None":
        ret['district'] = entity[8]
    else:
        ret['district'] = ""



    return ret