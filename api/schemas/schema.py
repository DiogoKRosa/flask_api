from api import ma
from marshmallow import Schema, fields

class ObraSchema(ma.Schema):
    class Meta:
        fields = ("_id", "titulo", "ano", "autor")
    _id = fields.Str()
    titulo = fields.Str(required=True)
    ano = fields.Str(required=True)
    autor = fields.Str(required=True)