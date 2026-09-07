#!/bin/bash

# Script de Validação - Task 001: Tela de Versão
# Valida se todas as correções UX estão funcionando corretamente

echo "🔍 Iniciando validação da Task 001 - Tela de Versão..."
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de testes
PASSED=0
FAILED=0

# Função para testar
test_endpoint() {
    local name=$1
    local url=$2
    local expected_status=$3
    
    echo -n "  Testando $name... "
    
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $status)"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (HTTP $status, esperado $expected_status)"
        ((FAILED++))
        return 1
    fi
}

echo "📡 1. Testando Endpoints da API"
echo "================================"
test_endpoint "Health Check (/api/versao)" "http://localhost:3001/api/versao" 200
test_endpoint "Lista de Tarefas (/api/tarefas)" "http://localhost:3001/api/tarefas" 200
echo ""

echo "🌐 2. Testando Interface Web"
echo "================================"
test_endpoint "Página Principal (/)" "http://localhost:3001/" 200
test_endpoint "Página About (/about)" "http://localhost:3001/about" 200
test_endpoint "Página Versão (/versao)" "http://localhost:3001/versao" 200
echo ""

echo "🔧 3. Validando Conteúdo da API"
echo "================================"
echo -n "  Verificando versão da API... "
version=$(curl -s http://localhost:3001/api/versao)
if [[ "$version" =~ ^Bia\ [0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo -e "${GREEN}✓ PASS${NC} ($version)"
    ((PASSED++))
else
    echo -e "${RED}✗ FAIL${NC} (Formato inválido: $version)"
    ((FAILED++))
fi
echo ""

echo "📦 4. Verificando Containers"
echo "================================"
echo -n "  Container 'bia' rodando... "
if docker compose ps | grep -q "bia.*Up"; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAIL${NC}"
    ((FAILED++))
fi

echo -n "  Container 'database' rodando... "
if docker compose ps | grep -q "database.*Up"; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ FAIL${NC}"
    ((FAILED++))
fi
echo ""

echo "📋 5. Verificando Arquivos das Correções"
echo "================================"
files=(
    "client/src/components/VersionInfo.jsx"
    "client/src/components/Version.jsx"
    "client/src/components/Header.jsx"
    "client/src/index.css"
)

for file in "${files[@]}"; do
    echo -n "  Verificando $file... "
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC} (arquivo não encontrado)"
        ((FAILED++))
    fi
done
echo ""

echo "📊 Resumo dos Testes"
echo "================================"
TOTAL=$((PASSED + FAILED))
echo "  Total de testes: $TOTAL"
echo -e "  ${GREEN}Passou: $PASSED${NC}"
echo -e "  ${RED}Falhou: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ TODOS OS TESTES PASSARAM!${NC}"
    echo ""
    echo "🎉 A Task 001 foi implementada com sucesso!"
    echo ""
    echo "📝 Próximos passos:"
    echo "  1. Acesse http://localhost:3001 no navegador"
    echo "  2. Verifique a bolinha verde no header (canto superior direito)"
    echo "  3. Clique na bolinha e confirme tooltip simplificado"
    echo "  4. Navegue até a tela 'Versão' pelo menu"
    echo "  5. Verifique os 3 cards de informações detalhadas"
    exit 0
else
    echo -e "${RED}❌ ALGUNS TESTES FALHARAM${NC}"
    echo ""
    echo "Por favor, revise os erros acima e corrija antes de prosseguir."
    exit 1
fi
