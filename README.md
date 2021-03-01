# Project 2 Milestone 1

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`

## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku
1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`

## Project Questions:
### Explains how someone who clones the repository can set up and run your project locally (what to install, any extra files to add)
- Starting off with all the libraries needed for this project, simply by looking into the requirements.txt, all the libraries are listed in the file. Then run the following commands: pip install -r requirements.txt, pip install flask_socketio, pip install flask_cors. Lastly, Run echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local. Now change into the project directory. 2 terminals will be needed to run the app. In the first terminal, run app.py, and the the second terminal run npm start.
- For heroku, the steps include of running these specific commands in the terminal: heroku create --buildpack heroku/python, heroku buildpacks:add --index 1 heroku/nodejs, pip freeze > requirements.txt, git add ., git commit -m "anything", pip install flask-socketio, git push heroku milestone_1:main

### Detailed description of technical issues and how you solved it (your process, what you searched, what resources you used)
- A technical issue I ran into is during the heroku deployment where the libraries from the requirements didn't initally install properly. So by manually chaning the txt file, it solved the issue.

### Detailed description of known problems and how you would address them if you had more time. If none exist, what additional features might you implement, and how?
- One problem that still exists after deploying the app is that only the winner of the game is listed if a player wins, but if a draw occurs then it won't be shown. If I had more time, I would modify the Winner function but implementing a for loop which iterates through the list and check if the boxes in the board are filled. If they are all filled then just print "Draw".
- A few additional features I would add would include of adding a tally counter of how many wins each player has depeing on the games played, showing whose turn it is, and making it so that whoever turn it is, isn't allowed to reset the game until it ends, that would serve as an anti cheat since if a player is about to win, the opposing player can't reset and stop the win from happening.

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
