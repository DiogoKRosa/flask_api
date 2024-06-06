from api import mongo
from ..models import database
from bson import ObjectId

def add_obra(obra):
    mongo.db.obras.insert_one({
        'titulo': obra.titulo,
        'ano': obra.ano,
        'autor': obra.autor
    })

@staticmethod
def get_obras():
    return list(mongo.db.obras.find())

@staticmethod
def get_obra_id(id):
    return mongo.db.obras.find_one({'_id': ObjectId(id)})

def update_obra(self, id):
    mongo.db.obras.update_one({'_id': ObjectId(id)},
                              {'$set':{
                                  'titulo': self.titulo,
                                  'ano': self.ano,
                                  'autor': self.autor
                              }})

@staticmethod
def delete_obra(id):
    mongo.db.obras.delete_one({'_id': ObjectId(id)})