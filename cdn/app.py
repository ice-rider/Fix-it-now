from flask import Flask, abort, jsonify, request, send_file
from PIL import Image
import time
from io import BytesIO
import base64


app = Flask(__name__)


@app.route('/')
def index():
    return "Fix it now cdn"

@app.route('/upload', methods=["POST"])
def upload():
    if not request.get_json() or not request.get_json().get('image'):
        return abort(400, 'image is required arg')
    
    b64_image = request.get_json().get('image').split(',')[-1]
    image_bytes = base64.b64decode(b64_image)

    filename = f"images/{int(time.time())}.jpg"
    file = open(filename, 'w+')
    file.close()

    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    image.save(filename)

    return jsonify({'url': filename}), 201


@app.route('/images/<filename>')
def get_image(filename):
    return send_file("images/" + filename)


app.run("0.0.0.0", port="7000")
