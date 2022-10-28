install:
	npm install

pre-commit:
	npm run format
	npm run lint

lint: pre-commit