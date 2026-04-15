param(
    [Parameter(Position = 0)]
    [ValidateSet("up", "down", "restart", "ps", "logs", "shell", "health")]
    [string]$Action = "ps"
)

$ErrorActionPreference = "Stop"

switch ($Action) {
    "up"      { docker compose up -d }
    "down"    { docker compose down }
    "restart" { docker compose restart studio }
    "ps"      { docker compose ps }
    "logs"    { docker compose logs -f studio }
    "shell"   { docker compose exec studio sh }
    "health"  { docker compose ps --format json }
}
