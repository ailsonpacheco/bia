#!/bin/bash

# Rollback Simples - Projeto BIA

set -e

REGION="us-east-1"
ECR_REPO="bia"
CLUSTER="cluster-bia"
SERVICE="service-bia"
TASK_FAMILY="task-def-bia"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

if [ "$1" = "list" ]; then
    echo "=== Versões Disponíveis ==="
    aws ecr describe-images --repository-name $ECR_REPO --region $REGION \
        --query 'sort_by(imageDetails,&imagePushedAt)[*].[imageTags[0],imagePushedAt]' \
        --output table
    exit 0
fi

if [ -z "$1" ]; then
    echo "Uso: $0 <commit-hash> ou $0 list"
    echo ""
    echo "Exemplos:"
    echo "  $0 list          # Lista versões disponíveis"
    echo "  $0 abc1234       # Rollback para versão abc1234"
    exit 1
fi

TARGET_TAG="$1"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_URI="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$ECR_REPO"

echo "=== Rollback BIA ==="
echo "Target: $TARGET_TAG"
echo ""

# Verificar se a imagem existe
if ! aws ecr describe-images --repository-name $ECR_REPO --region $REGION --image-ids imageTag=$TARGET_TAG > /dev/null 2>&1; then
    error "Imagem $TARGET_TAG não encontrada no ECR"
fi

read -p "Confirma rollback para $TARGET_TAG? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Rollback cancelado."
    exit 0
fi

# Criar nova task definition
log "Criando task definition para rollback..."
CURRENT_TASK=$(aws ecs describe-task-definition --task-definition $TASK_FAMILY --region $REGION --query 'taskDefinition')

NEW_TASK=$(echo $CURRENT_TASK | jq --arg image "$ECR_URI:$TARGET_TAG" '
    .containerDefinitions[0].image = $image |
    del(.taskDefinitionArn, .revision, .status, .requiresAttributes, .placementConstraints, .compatibilities, .registeredAt, .registeredBy)
')

NEW_REVISION=$(echo $NEW_TASK | aws ecs register-task-definition --region $REGION --cli-input-json file:///dev/stdin --query 'taskDefinition.revision' --output text)

# Update service
log "Atualizando serviço..."
aws ecs update-service --region $REGION --cluster $CLUSTER --service $SERVICE --task-definition $TASK_FAMILY:$NEW_REVISION > /dev/null

success "Rollback concluído!"
echo "Versão: $TARGET_TAG"
echo "Task Definition: $TASK_FAMILY:$NEW_REVISION"
