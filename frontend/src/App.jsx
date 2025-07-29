import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name submitted: ${name}`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        padding: '2rem',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          padding: '2rem 3rem',
          borderRadius: '12px',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
          Career Application
        </h2>

        <label style={{ display: 'block', marginBottom: '1rem', color: '#555' }}>
          Full Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginTop: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '1rem',
            }}
          />
        </label>

        <button
          type="save"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#c42f15ff',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#5a67d8')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#667eea')}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default App;
