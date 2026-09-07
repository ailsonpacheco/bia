import React, { useState, useEffect } from "react";
import { useLog } from "../contexts/LogContext.jsx";

const Version = () => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const { logApiRequest, logApiResponse, logApiError, addLog } = useLog();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

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
        timestamp: new Date().toLocaleString()
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
        <h2>📋 Status da API</h2>
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
      </div>
    </div>
  );
};

export default Version;
