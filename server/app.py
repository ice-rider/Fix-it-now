from flask import Flask
from flasgger import Swagger
from resources import api

app = Flask(__name__)

# initialization app to api
api.init_app(app)
# initialization app to swagger
swagger = Swagger(app)

# run app on port 5050
app.run(port="5050")
