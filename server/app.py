from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
from models import db
from db_init import initialize_database
from resources import api

app = Flask(__name__)
CORS(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('PRODUCTION_DATABASE_URL')
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://fix_it_now_db:eiVKtRIUMBRLSbrz1sUKr0TKM3WLRTlK@dpg-cl2gvbg310os73b5jh20-a.frankfurt-postgres.render.com/fix_it_now_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True

# initialization app to db and creating superuser
db.init_app(app)
with app.app_context():
    initialize_database()

# initialization app to api
api.init_app(app)
# initialization app to swagger
swagger = Swagger(app)

# run app on port 5050
app.run(port="5050")
