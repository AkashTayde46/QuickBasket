import React, { useState } from 'react';
import axios from 'axios';

const LoginDebug = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_API_BASE_URL;

  const testLogin = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      console.log('🔍 Testing login with:', { email, password, backendUrl });
      
      const response = await axios.post(
        `${backendUrl}/api/v1/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      console.log('✅ Login response:', response.data);
      setResult(`Success: ${JSON.stringify(response.data, null, 2)}`);
      
    } catch (error) {
      console.error('❌ Login error:', error);
      setResult(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testBackendHealth = async () => {
    setLoading(true);
    setResult('Testing backend health...');
    
    try {
      const response = await axios.get(`${backendUrl}/api/v1/products`);
      setResult(`Backend is healthy. Products count: ${response.data.products?.length || 0}`);
    } catch (error) {
      setResult(`Backend health check failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Login Debug Tool</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Backend URL: {backendUrl}</h3>
        <button onClick={testBackendHealth} disabled={loading}>
          Test Backend Health
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={testLogin} disabled={loading}>
          Test Login
        </button>
      </div>

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '10px', 
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace',
        fontSize: '12px'
      }}>
        {result}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Instructions:</h3>
        <ol>
          <li>First test backend health to ensure the API is accessible</li>
          <li>Enter valid email and password</li>
          <li>Click "Test Login" to see the response</li>
          <li>Check browser console for detailed logs</li>
        </ol>
      </div>
    </div>
  );
};

export default LoginDebug; 