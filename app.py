'''RUN APP PYTHON'''
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
PLAYER_ID = {}
SPEC = []

# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
#from models import Person

cors = CORS(app, resources={r"/*": {"origins": "*"}})
SOCKETIO = SocketIO(app,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)


@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    '''INDEX'''
    return send_from_directory('./build', filename)


# When a client connects from this Socket connection, this function is run
@SOCKETIO.on('connect')
def on_connect():
    '''CONNECT'''
    print('User connected!')


# When a client disconnects from this Socket connection, this function is run
@SOCKETIO.on('disconnect')
def on_disconnect():
    '''DISCONNECT'''
    print('User disconnected!')


@SOCKETIO.on('click')
def on_click(
        data):  # data is whatever arg you pass in your emit call on client
    '''CLICK'''
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    SOCKETIO.emit('click', data, broadcast=True, include_self=False)


def click_test(data):
    '''CLICK TEST'''
    return data


@SOCKETIO.on('update')
def on_update(update):
    '''UPDATE'''
    print("Im here")
    print(update)
    explore_database(update)
    score = ranking()
    SOCKETIO.emit('updateScore', score, broadcast=True)


def explore_database(data):
    '''DATABASE UPDATE'''
    db.session.query(models.Person)\
       .filter(models.Person.username == data['dict2']['winner'])\
       .update({models.Person.score: models.Person.score + 1})
    db.session.query(models.Person)\
       .filter(models.Person.username == data['dict2']['loser'])\
       .update({models.Person.score: models.Person.score - 1})
    db.session.commit()


def on_database(
        data):  # data is whatever arg you pass in your emit call on client
    '''DATABASE'''
    if (models.Person.query.filter_by(username=data['setPlayer']).first() is
            None):
        #print(str(data))
        new_user = models.Person(username=data['setPlayer'], score=100)
        db.session.add(new_user)
        db.session.commit()
        all_people = models.Person.query.all()
        users = []
        for person in all_people:
            users.append(person.username)


def database_test(
        data):  # data is whatever arg you pass in your emit call on client
    '''DATABASE TEST'''
    #print(str(data))
    new_user = models.Person(username=data['setPlayer'], score=100)
    db.session.add(new_user)
    db.session.commit()
    all_people = models.Person.query.all()
    users = []
    for person in all_people:
        users.append(person.username)
    return users


def ranking():
    '''LEADERBOARD'''
    score = []
    table = models.Person.query.order_by(models.Person.score.desc()).all()
    for i in table:
        score.append({i.username: i.score})
    return score


@SOCKETIO.on('login')
def on_login(
        login):  # data is whatever arg you pass in your emit call on client
    '''LOGIN'''
    print(str(login))
    if "X" not in PLAYER_ID:
        PLAYER_ID["X"] = login["setPlayer"]
    elif "O" not in PLAYER_ID:
        PLAYER_ID["O"] = login["setPlayer"]
    else:
        SPEC.append(login["setPlayer"])
        PLAYER_ID["spectator"] = SPEC

    on_database(login)
    score = ranking()
    SOCKETIO.emit('database', score, broadcast=True, include_self=False)
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    SOCKETIO.emit('login', PLAYER_ID, broadcast=True, include_self=False)

def login_test(login):
    '''LOGIN TEST'''
    if "X" not in PLAYER_ID:
        PLAYER_ID["X"] = login["setPlayer"]
    elif "O" not in PLAYER_ID:
        PLAYER_ID["O"] = login["setPlayer"]
    elif login["setPlayer"] not in (SPEC, PLAYER_ID["X"], PLAYER_ID["O"]):
        SPEC.append(login["setPlayer"])
        PLAYER_ID["spectator"] = SPEC
    return PLAYER_ID


# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call SOCKETIO.run with app arg
    SOCKETIO.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
