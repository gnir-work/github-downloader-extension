install:
	yarn install

pre-commit:
	yarn run format
	yarn run lint

lint: pre-commit
