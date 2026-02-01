#!/bin/bash

# Deploy Simples - Projeto BIA
# Script alternativo focado em simplicidade

set -e

# Configurações
REGION="us-east-1"
ECR_REPO="bia"
CLUSTER="cluster-bia"
SERVICE="service-bia"
TASK_FAMILY="task-def-bia"

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# Obter commit hash
COMMIT_HASH=$(git rev-parse --short=7 HEAD 2>/dev/null || error "Não é um repositório Git")
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_URI="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$ECR_REPO"

echo "=== Deploy Simples BIA ==="
echo "Commit: $COMMIT_HASH"
echo "ECR: $ECR_URI:$COMMIT_HASH"
echo "Cluster: $CLUSTER"
echo "Service: $SERVICE"
echo ""

# Confirmar antes de prosseguir
read -p "Continuar com o deploy? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deploy cancelado."
    exit 0
fi

# 1. Login ECR
log "Login no ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

# 2. Build
log "Build da imagem..."
docker build -t $ECR_URI:$COMMIT_HASH -t $ECR_URI:latest .

# 3. Push
log "Push para ECR..."
docker push $ECR_URI:$COMMIT_HASH
docker push $ECR_URI:latest

# 4. Nova Task Definition
log "Criando task definition..."
CURRENT_TASK=$(aws ecs describe-task-definition --task-definition $TASK_FAMILY --region $REGION --query 'taskDefinition')

NEW_TASK=$(echo $CURRENT_TASK | jq --arg image "$ECR_URI:$COMMIT_HASH" '
    .containerDefinitions[0].image = $image |
    del(.taskDefinitionArn, .revision, .status, .requiresAttributes, .placementConstraints, .compatibilities, .registeredAt, .registeredBy)
')

TEMP_FILE=$(mktemp)
echo $NEW_TASK > $TEMP_FILE
NEW_REVISION=$(aws ecs register-task-definition --region $REGION --cli-input-json file://$TEMP_FILE --query 'taskDefinition.revision' --output text)
rm -f $TEMP_FILE

# 5. Update Service
log "Atualizando serviço..."
aws ecs update-service --region $REGION --cluster $CLUSTER --service $SERVICE --task-definition $TASK_FAMILY:$NEW_REVISION > /dev/null

success "Deploy concluído!"
echo "Versão: $COMMIT_HASH"
echo "Task Definition: $TASK_FAMILY:$NEW_REVISION"
