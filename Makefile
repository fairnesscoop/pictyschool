help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

compose = docker-compose -p pictyschool
exec = ${compose} exec
run = ${compose} run
logs = ${compose} logs -f

install: ## Install API and client
	cp api/ormconfig.json.dist api/ormconfig.json
	if [ ! -f 'api/.env' ]; then cp api/.env.dist api/.env; fi;
	#if [ ! -f 'client/config.js' ]; then cp client/config.js.dist client/config.js; fi;
	docker run -it --rm -v ${PWD}/api:/app -w /app node:16 npm i
	docker run -it --rm -v ${PWD}/kit:/app -w /app node:16 npm i
	make start-container
	make api-build-dist
	make database-migrate
	#make watch-tailwind
stop: ## Stop docker containers
	${compose} stop
rm: ## Remove docker containers
	${compose} rm
ps: ## List docker containers
	${compose} ps
start: ## Start the application
	make start-container
	make watch-tailwind
restart: ## Restart containers
	make stop
	make start
start-container: ## Start docker containers
	${compose} up -d
watch-tailwind:
	${exec} client npm run watch:tailwind
build-tailwind: ## Build Tailwind in production mode
	${exec} client npm run build:tailwind
test: ## Run test suite
	${exec} api npm run test
test-watch: ## Run test suite
	${exec} api npm run test:watch
linter: ## Linter
	${exec} api npm run lint
	${exec} client npm run lint
api-logs: ## Display API logs
	${logs} api
api-bash: ## Connect to API container
	${exec} api bash
api-build-dist: ## Build API dist
	${exec} api npm run build
client-logs: ## Display Client logs
	${logs} client
client-bash: ## Connect to client container
	${exec} client bash
kit-logs: ## Display kit logs
	${logs} kit
kit-bash: ## Connect to kit container
	${exec} kit bash
database-migrate: ## Database migrations
	${exec} api npm run migration:migrate
database-diff: ## Generate database diff
	${exec} api npm run migration:diff $(MIGRATION_NAME)
database-connect: ## Connect to the database container
	${exec} database psql -h database -d pictyschool
ci: ## Run CI checks
	${run} api npm run test:cov
	${run} api npm run lint
