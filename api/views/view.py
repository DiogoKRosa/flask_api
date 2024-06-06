from flask_restful import Resource
from api import api
from ..schemas import schema
from ..models import database
from ..services import service
from flask import make_response, jsonify, request

class CrudObra(Resource):
    def get(self):
        obras = service.get_obras()
        x = schema.ObraSchema(many=True)
        return make_response(x.jsonify(obras), 200)
    def post(self):
        x = schema.ObraSchema()
        validate = x.validate(request.json)
        if validate:
            return make_response(jsonify(validate), 400)
        else:
            titulo = request.json["titulo"]
            ano = request.json["ano"]
            autor = request.json["autor"]

            novo = database.Obras(titulo=titulo, ano=ano, autor=autor)
            result = service.add_obra(novo)
            res = x.jsonify(result)
            return make_response(res, 201)
        
class CrudObraId(Resource):
    def put(self, id):
        bd = service.get_obra_id(id)
        if bd is None:
            return make_response(jsonify("Obra não existe no banco de dados"), 404)
        x = schema.ObraSchema()
        validate = x.validate(request.json)
        if validate:
            return make_response(jsonify(validate), 404)
        else:
            titulo = request.json["titulo"]
            ano = request.json["ano"]
            autor = request.json["autor"]
            update = database.Obras(titulo=titulo, ano=ano, autor=autor)
            service.update_obra(update, id)
            obra_att = service.get_obra_id(id)
            return make_response(x.jsonify(obra_att),200)
        
    def delete(self, id):
        delete = service.get_obra_id(id)
        if delete is None:
            return make_response(jsonify("Obra não existe no banco de dados"), 404)
        service.delete_obra(id)
        return make_response(jsonify("Obra deletada com sucesso!"), 204)
    
api.add_resource(CrudObra, '/obras')
api.add_resource(CrudObraId, '/obras/<id>')
            