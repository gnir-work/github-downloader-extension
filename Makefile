install:
	yarn install

pre-commit:
	yarn run format
	yarn run lint

lint: pre-commit

dev:
	yarn start


