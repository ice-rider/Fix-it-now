from flask import Flask
from flasgger import Swagger

from models import db
from resources import api

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('PRODUCTION_DATABASE_URL')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True

db.init_app(app)

# initialization app to api
api.init_app(app)
# initialization app to swagger
swagger = Swagger(app)

# run app on port 5050
app.run(port="5050")
