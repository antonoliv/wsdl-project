from owlready2 import *


path1 = "file:///mnt/c/Users/berna/FEUP/Web Semântica e Dados Ligados/Trabalho/Testing/backend/app/ontology/updated_ontology.rdf"
path2 = "file:///home/treeman/school/wsdl/wsdl-project/backend/app/ontology/updated_ontology.rdf"

def get_sites():

    onto = get_ontology(path1).load()

    query = """
        PREFIX base: <http://example.org/>
        SELECT ?touristicSite ?label ?pic
        WHERE {
            ?touristicSite rdfs:label ?label .
            ?touristicSite base:hasPicture ?pic .
            ?touristicSite a base:TouristicPlace .
        }
    """

    entity = list(default_world.sparql(query))
    entity =  [str(entity) for entityList in entity for entity in entityList]

    ret = []
    ent = {}
    n_par = 1

    for elem in entity:

        if n_par == 1:
            if elem != "None":
                ent['id'] = elem.removeprefix("example.org.")
            else:
                ent['id'] = ""
        elif n_par == 2: 
            if elem != "None":
                ent['name'] = elem
            else:
                ent['name'] = ""
        elif n_par == 3:
            if elem != "None":
                ent['picture'] = elem
            else:
                ent['picture'] = ""
            n_par = 0
            ret.append(ent)
            ent = {}

        n_par += 1

    return ret

def get_site_types(id):
    onto = get_ontology(path1).load()

    query = f"""
        PREFIX base: <http://example.org/>
        SELECT ?types
        WHERE {{
            ?touristicSite a base:TouristicPlace .
            ?touristicSite base:hasType ?types .
            FILTER(?touristicSite = base:{id}) 
        }}
    """

    entity = default_world.sparql(query, error_on_undefined_entities=False)
    entity = [str(entity) for entityList in entity for entity in entityList]

    if entity == []:
        return {}
    else:
        return entity


def get_site_reviews(id):
    onto = get_ontology(path1).load()

    query = f"""
        PREFIX base: <http://example.org/>
        SELECT ?text ?publishTime ?rating ?author
        WHERE {{
            ?touristicSite a base:TouristicPlace .
            ?touristicSite base:hasReview ?review .
            ?review rdfs:label ?text
            ?review base:hasPublishTime ?publishTime
            ?review base:hasRating ?rating
            ?review base:hasAuthor ?author
            FILTER(?touristicSite = base:{id}) 
        }}
    """

    entity = default_world.sparql(query, error_on_undefined_entities=False)
    entity = [str(entity) for entityList in entity for entity in entityList]

    if entity == []:
        return {}

    ret = []
    rev = {}
    n_par = 1

    for elem in entity:

        if n_par == 1:
            if elem != "None":
                rev['text'] = elem
            else:
                rev['text'] = ""
        elif n_par == 2: 
            if elem != "None":
                rev['publish_time'] = elem
            else:
                rev['publish_time'] = ""
        elif n_par == 3: 
            if elem != "None":
                rev['rating'] = elem
            else:
                rev['rating'] = ""
        elif n_par == 4:
            if elem != "None":
                rev['author'] = elem
            else:
                rev['author'] = ""
            n_par = 0
            ret.append(rev)
            rev = {}

        n_par += 1

    return ret

def get_site_details(id):
    onto = get_ontology(path1).load()

    query = f"""
        PREFIX base: <http://example.org/>
        SELECT ?label ?desc ?pic ?rating ?ratingCount ?phoneNumber ?primaryType ?website ?openHours ?city_label ?parish_label
        WHERE {{
            ?touristicSite a base:TouristicPlace .
            ?touristicSite rdfs:label ?label .
            ?touristicSite base:hasDescription ?desc .
            ?touristicSite base:hasPicture ?pic .
            ?touristicSite base:hasRating ?rating .
            ?touristicSite base:hasUserRatingCount ?ratingCount .
            ?touristicSite base:hasPhoneNumber ?phoneNumber .
            ?touristicSite base:hasPrimaryType ?primaryType .
            ?touristicSite base:hasWebsite ?website .
            ?touristicSite base:hasOpeningHours ?openHours .
            ?touristicSite base:locateInCity ?city .
            ?city rdfs:label ?city_label
            ?touristicSite base:locateInParish ?parish .
            ?parish rdfs:label ?parish_label
            FILTER(?touristicSite = base:{id}) 
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
        ret['description'] = entity[1]
    else:
        ret['description'] = ""

    if entity[2] != "None":
        ret['picture'] = entity[2]
    else:
        ret['picture'] = ""

    if entity[3] != "None":
        ret['rating'] = entity[3]
    else:
        ret['rating'] = ""

    if entity[4] != "None":
        ret['rating_count'] = entity[4]
    else:
        ret['rating_count'] = ""

    if entity[5] != "None":
        ret['phone_number'] = entity[5]
    else:
        ret['phone_number'] = ""

    if entity[6] != "None":
        ret['primary_type'] = entity[6]
    else:
        ret['primary_type'] = ""

    if entity[7] != "None":
        ret['website'] = entity[7]
    else:
        ret['website'] = ""

    if entity[8] != "None":
        ret['opening_hours'] = entity[8]
    else:
        ret['opening_hours'] = ""
    
    if entity[9] != "None":
        ret['city'] = entity[9]
    else:
        ret['city'] = ""

    if entity[10] != "None":
        ret['parish'] = entity[10]
    else:
        ret['parish'] = ""
    
    ret['types'] = get_site_types(id)
    ret['reviews'] = get_site_reviews(id)
    return ret


def search_sites(query):
    print(query)
    onto = get_ontology(path1).load()
    
    q = """
        PREFIX base: <http://example.org/>
        SELECT ?touristicSite ?label ?picture
        WHERE {
            ?touristicSite a base:TouristicPlace .
            ?touristicSite base:hasPicture ?picture .
            ?touristicSite rdfs:label ?label . 
        """

    any_term = -1
    if "name" in query:
        any_term = 1
        q += f"""    
            FILTER (CONTAINS(UCASE(?label), UCASE("{query['name']}"))) .
        """

    if "parish" in query:
        any_term = 1
        q += f"""
        ?touristicSite base:locateInParish ?parish .
        ?parish rdfs:label ?parish_label .
        FILTER (CONTAINS(UCASE(?parish_label), UCASE("{query['parish']}"))) .
        """

    if "city" in query:
        any_term = 1
        q += f"""
        ?touristicSite base:locateInCity ?city .
        ?city rdfs:label ?city_label .
        FILTER (CONTAINS(UCASE(?city_label), UCASE("{query['city']}"))) .
        """
    
    if "rating" in query:
        any_term = 1
        q += f"""
            ?touristicSite base:hasRating ?rating .
            FILTER(?rating >= {query['rating']})  .
            FILTER(?rating != "None")  .
        """

    q += """}"""

    if any_term != -1:
        entities = list(default_world.sparql(q))
        entity = [str(entity) for entityList in entities for entity in entityList]
    else:
        return -1

    ret = []
    ent = {}
    n_par = 1

    for elem in entity:

        if n_par == 1:
            if elem != "None":
                ent['id'] = elem.removeprefix("example.org.")
            else:
                ent['id'] = ""
        elif n_par == 2: 
            if elem != "None":
                ent['name'] = elem
            else:
                ent['name'] = ""
        elif n_par == 3:
            if elem != "None":
                ent['picture'] = elem
            else:
                ent['picture'] = ""
            n_par = 0
            ret.append(ent)
            ent = {}

        n_par += 1

    return ret
    

# print(search_site(search_query))
            


        
