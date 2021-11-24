
UI testing for 'happy path' is located at ./frontend/cypress/integration/UI_Test/index.js

The user name has been setted and can be ran once as the database only allow an unique user name. 

We have three different path to test.

Path1: 
Register > Create New Listing > Edit listing > Publishing listing > Unpublish listing > Logout > login > Delete listing

Path2(Same user):
Login >  Create New Listing > Publishing listing > Logout

Path3(another user): 
Register > Make a new booking