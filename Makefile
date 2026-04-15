COMPOSE := docker compose
SERVICE := studio

.PHONY: up down restart ps logs shell health

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) restart $(SERVICE)

ps:
	$(COMPOSE) ps

logs:
	$(COMPOSE) logs -f $(SERVICE)

shell:
	$(COMPOSE) exec $(SERVICE) sh

health:
	$(COMPOSE) ps --format json
