import os
import time

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

from models import db, SessionModel
from db_init import initialize_database
from resources import api

app = Flask(__name__)
CORS(app)

# use .env file for debugging.
# in production comment this line and use host environment variables
load_dotenv()

# create jwt manager object for configuring app with jwt
jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    print(jwt_payload)
    session_id = jwt_payload["sub"]["session_id"]
    return SessionModel.is_token_blocked(session_id)

print("sleeping...")   # time for full powering database image
time.sleep(3)
print("waked up!")

# configure database
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE_URI')  # PRODUCTION_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True

# configure cdn url
app.config["CDN_URL"] = os.getenv('CDN_URL')  # PRODUCTION_CDN_URL

# initialization app to database and creating superuser
db.init_app(app)
with app.app_context():
    initialize_database()

# initialization app to api
api.init_app(app)


# for debug uncomment next 2 line or run in cmd `flask start`
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port="5000")
