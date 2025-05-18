import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [mensajes, setMensajes] = useState([]);

  const enviarMensaje = async () => {
    if (!input.trim()) return;
    setMensajes([...mensajes, { id: Date.now(), texto: input, tipo: 'usuario' }]);

    try {
      const response = await fetch('https://lia-backend.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: input }),
      });
      const data = await response.json();
      setMensajes(prev => [...prev, { id: Date.now() + 1, texto: data.respuesta, tipo: 'ia' }]);
    } catch (e) {
      setMensajes(prev => [...prev, { id: Date.now() + 1, texto: 'Error de conexión', tipo: 'ia' }]);
    }

    setInput('');
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>Lia IA Chat</h1>
      <div style={{ minHeight: 300, border: '1px solid #ccc', padding: 10, marginBottom: 10, overflowY: 'auto' }}>
        {mensajes.map(m => (
          <div key={m.id} style={{ textAlign: m.tipo === 'usuario' ? 'right' : 'left', margin: 5 }}>
            <span style={{ backgroundColor: m.tipo === 'usuario' ? '#d1e7dd' : '#f8d7da', padding: 8, borderRadius: 5 }}>
              {m.texto}
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && enviarMensaje()}
        placeholder="Escribe tu mensaje..."
        style={{ width: '80%', padding: 10 }}
      />
      <button onClick={enviarMensaje} style={{ padding: 10, marginLeft: 10 }}>Enviar</button>
    </div>
  );
}
