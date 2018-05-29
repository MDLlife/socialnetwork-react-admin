.PHONY: socialnetwork install build test

install:
	@npm install && cd socialnetwork && npm install

start:
	cd socialnetwork && ../node_modules/.bin/webpack-dev-server --port 8085 --config ./webpack.config.js

build:
	@NODE_ENV=production ./node_modules/.bin/babel ./src -d lib --ignore '*.spec.js'

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --compilers js:babel-register './src/**/*.spec.js'
