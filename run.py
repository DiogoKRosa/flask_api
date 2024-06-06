from api import app, mongo
from api.models.database import Obras
from api.services import service

if __name__ == "__main__":
    with app.app_context():
        if 'obras' not in mongo.db.list_collection_names():
            obra = Obras(
                titulo='',
                ano=0,
                autor='')
            service.add_obra(obra)
    app.run(host='localhost', port=5000, debug=True)