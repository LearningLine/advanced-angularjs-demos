@IF EXIST node_modules GOTO start-bower
	call npm install

:start-bower
@IF EXIST bower_components GOTO start-server
	call bower install

:start-server
call gulp
npm start
