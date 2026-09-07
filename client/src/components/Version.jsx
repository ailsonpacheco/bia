import React, { useState, useEffect } from "react";
import { useLog } from "../contexts/LogContext.jsx";

const Version = () => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const { logApiRequest, logApiResponse, logApiError, addLog } = useLog();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const getEnvironmentInfo = () => {
    const { protocol, hostname, port } = window.location;
    
    // Detectar tipo de ambiente
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return {
        type: 'local',
        icon: '🏠',
        label: 'Desenvolvimento Local',
        description: `${hostname}:${port}`,
        color: '#3b82f6' // azul
      };
    }
    
    // IP direto sem HTTPS
    if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname) && protocol === 'http:') {
      return {
        type: 'ip-http',
        icon: '🌐',
        label: 'Acesso via IP (HTTP)',
        description: `${hostname}${port ? ':' + port : ''}`,
        color: '#f59e0b' // amarelo/laranja
      };
    }
    
    // ALB/Load Balancer sem HTTPS
    if (protocol === 'http:' && hostname.includes('.elb.')) {
      return {
        type: 'alb-http',
        icon: '⚖️',
        label: 'Application Load Balancer (HTTP)',
        description: hostname,
        color: '#ef4444' // vermelho
      };
    }
    
    // Domínio com HTTPS (produção)
    if (protocol === 'https:') {
      return {
        type: 'domain-https',
        icon: '🔒',
        label: 'Produção (HTTPS)',
        description: hostname,
        color: '#22c55e' // verde
      };
    }
    
    // Outros casos
    return {
      type: 'other',
      icon: '❓',
      label: 'Ambiente Desconhecido',
      description: `${hostname}${port ? ':' + port : ''}`,
      color: '#6b7280' // cinza
    };
  };

  const fetchVersionInfo = async () => {
    setLoading(true);
    setError(null);
    
    const url = `${apiUrl}/api/versao`;
    logApiRequest('GET', url);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const res = await fetch(url, {
        signal: controller.signal,
        method: 'GET',
        cache: 'no-cache'
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.text();
      
      logApiResponse('GET', url, res.status, data);
      
      setApiData({
        version: data,
        status: 'online',
        timestamp: new Date().toLocaleString(),
        environment: getEnvironmentInfo()
      });
      
      addLog('SUCCESS', 'Versão carregada', `API respondeu: ${data}`);
    } catch (error) {
      logApiError('GET', url, error);
      setError(error.message);
      addLog('ERROR', 'Falha ao carregar versão', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    addLog('INFO', 'Tela de versão carregada', `Verificando API: ${apiUrl}`);
    fetchVersionInfo();
  }, []);

  const handleRefresh = () => {
    fetchVersionInfo();
  };

  const openVersionEndpoint = () => {
    window.open(`${apiUrl}/api/versao`, '_blank');
  };

  return (
    <div className="version-page">
      <div className="version-header">
        <h2>📋 Informações da Aplicação</h2>
        <button 
          className="refresh-btn"
          onClick={handleRefresh}
          disabled={loading}
          title="Atualizar informações"
        >
          🔄 {loading ? 'Verificando...' : 'Atualizar'}
        </button>
      </div>

      <div className="version-cards">
        {/* Card de Status da API */}
        <div className="version-card">
          <div className="card-header">
            <h3>🔌 Status da API</h3>
            <span className={`status-badge ${error ? 'offline' : 'online'}`}>
              {loading ? '🟡 Verificando...' : error ? '🔴 Offline' : '🟢 Online'}
            </span>
          </div>
          
          <div className="card-content">
            {loading ? (
              <div className="loading-state">
                <p>Verificando conectividade com a API...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <p><strong>Erro:</strong> {error}</p>
                <p><strong>URL da API:</strong> {apiUrl}</p>
                <p><strong>Endpoint:</strong> {apiUrl}/api/versao</p>
              </div>
            ) : (
              <div className="success-state">
                <p><strong>Versão:</strong> {apiData.version}</p>
                <p><strong>Status:</strong> Operacional</p>
                <p><strong>Última verificação:</strong> {apiData.timestamp}</p>
                <button 
                  className="version-link" 
                  onClick={openVersionEndpoint}
                  title="Abrir endpoint em nova aba"
                  style={{ marginTop: '0.5rem' }}
                >
                  🔗 Abrir /api/versao
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Card de Ambiente */}
        {!loading && !error && apiData && (
          <div className="version-card">
            <div className="card-header">
              <h3>{apiData.environment.icon} Ambiente</h3>
              <span 
                className="env-badge"
                style={{ backgroundColor: apiData.environment.color }}
              >
                {apiData.environment.label}
              </span>
            </div>
            
            <div className="card-content">
              <p><strong>Tipo:</strong> {apiData.environment.label}</p>
              <p><strong>Localização:</strong> {apiData.environment.description}</p>
              <p><strong>Protocolo:</strong> {window.location.protocol.replace(':', '').toUpperCase()}</p>
              <p><strong>URL da API:</strong> {apiUrl}</p>
            </div>
          </div>
        )}

        {/* Card de Informações do Frontend */}
        <div className="version-card">
          <div className="card-header">
            <h3>⚛️ Frontend</h3>
          </div>
          
          <div className="card-content">
            <p><strong>Framework:</strong> React + Vite</p>
            <p><strong>Origem:</strong> {window.location.origin}</p>
            <p><strong>User Agent:</strong> {navigator.userAgent.split(' ').slice(0, 3).join(' ')}...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Version;
