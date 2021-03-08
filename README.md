# Project 2 Milestone 2

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`
3. `pip install flask_socketio`
4. `pip install flask_cors`
5. `pip install Flask-SQLAlchemy==2.1`
6. `pip install Flask`

## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy steps to Heroku
---
- Follow the steps below by copying them in the terminal:
1. heroku create --buildpack heroku/python
2. heroku addons:create heroku-postgresql:hobby-dev
3. heroku config
4. Add the link obtained from the previous step to the .env file in the format of URL = 'YOUR LINK'
---
- The next steps are for the python shell
5. python 
6. from app import db
7. import models
8. db.create_all()
9. userA = models.Person(username='userA', score=100)
10. userB = models.Person(username='userB', score=100)
11. db.session.add(userA)
12. db.session.add(userB)
13. db.session.commit()
14. exit()
---
15. heroku buildpacks:add --index 1 heroku/nodejs
16. git push heroku main

## Project Questions:
###Explains how someone who clones the repository can set up and run your project locally (what to install, any extra files to add)
- Starting off with all the libraries needed for this project, simply by looking into the requirements.txt, all the libraries are listed in the file. Then run the following commands: pip install -r requirements.txt, pip install flask_socketio, pip install flask_cors. Lastly, Run echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local. Now change into the project directory. 2 terminals will be needed to run the app. In the first terminal, run app.py, and the the second terminal run npm start.
- The extra file necessary is the .env file which needs to be hidden in the .gitignore.

###Detailed description of technical issues and how you solved it (your process, what you searched, what resources you used)
- A technical issue I ran into is during the heroku deployment where the libraries from the requirements didn't initally install properly. So by manually chaning the txt file, it solved the issue.

###Detailed description of known problems and how you would address them if you had more time. If none exist, what additional features might you implement, and how?
- A known problem right now is that fact that loggining in with the same username can allow the user to play as both X & O, which technically shouldn't be allowed.
- A few additional features I would add would include of keeping logged in users unique so that they woudn't overlap, a logout button and being able to chat while playing the game to make it more engaging. The logout button would make the app more user friendly and allow other to play rather than restarting the app itself. I would also rework my whole CSS situation because although it looks alright now, it can look much better if I put more time into it. 

### Technologies:
- Cloud9

### Framework:
- Flask
- SocketIO

### Libraries:
import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import io from 'socket.io-client';
