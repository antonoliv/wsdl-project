import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

sys.path.append('./app/queries')

from ontology import getEntityWithName, getEntityByValueInName, getOntologyClasses


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root():
    data = getOntologyClasses()
    return {"message": data}


@app.get("/entity/{entityName}", tags=["entityName"])
async def get_entity_with_name(entityName):

    data = getEntityWithName(entityName)
    return {"message" : data}

@app.get("/entities_name/{value}", tags=["value"])
async def get_entity_by_value(value):

    data = getEntityByValueInName(value)
    return {"message" : data}
