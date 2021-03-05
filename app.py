import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv()) 

app = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
import models 
db.create_all()
player_ID = {}
spec = []

# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
#from models import Person

cors = CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('chat')
def on_chat(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('chat',  data, broadcast=True, include_self=False)

@socketio.on('click')
def on_click(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('click',  data, broadcast=True, include_self=False)


def on_database(data): # data is whatever arg you pass in your emit call on client
    if(models.Person.query.filter_by(username=data['setPlayer']).first() is None):
        #print(str(data))
        new_user = models.Person(username=data['setPlayer'], score=100)
        db.session.add(new_user)
        db.session.commit()
        all_people = models.Person.query.all()
        users = []
        for person in all_people:
            users.append(person.username)

def ranking():
    score = {}
    table = models.Person.query.order_by(models.Person.score.desc()).all()
    for i in table:
        score[i.username] = i.score
    return score

@socketio.on('login')
def on_login(login): # data is whatever arg you pass in your emit call on client
    print(str(login))
    if "X" not in player_ID:
        player_ID["X"] = login["setPlayer"]
    elif "O" not in player_ID:
        player_ID["O"] = login["setPlayer"]
    else:
        spec.append(login["setPlayer"])
        player_ID["spectator"] = spec
    
    on_database(login)
    score = ranking()
    socketio.emit('database', score, broadcast=True, include_self=False)
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('login',  player_ID, broadcast=True, include_self=False)
    
# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
# Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )

'''
import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv()) # This is to load your env variables from .env

app = Flask(__name__, static_folder='./build/static')
# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
import models
db.create_all()

cors = CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')
    all_people = models.Person.query.all()
    users = []
    for person in all_people:
        users.append(person.username)
    print(users)
    socketio.emit('user_list', {'users': users})

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('chat')
def on_chat(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('chat',  data, broadcast=True, include_self=False)

@socketio.on('join')
def on_join(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    new_user = models.Person(username=data['user'], email='{0}@stuff.com'.format(data['user']))
    db.session.add(new_user)
    db.session.commit()
    all_people = models.Person.query.all()
    users = []
    for person in all_people:
        users.append(person.username)
    socketio.emit('user_list', {'users': users})
    

# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
# Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )

'''