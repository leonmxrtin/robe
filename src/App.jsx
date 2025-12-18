import { useState } from 'react'
import './App.css'

import messages from './messages.json'
const messagesPerPage = 10

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  
  const indexOfLastMessage = currentPage * messagesPerPage
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage)
  const totalPages = Math.ceil(messages.length / messagesPerPage)

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>¡HASTA SIEMPRE, ROBE!</h1>
          <p className="dates">16 de mayo de 1962 - 10 de diciembre de 2025</p>
        </div>
      </header>

      <div className="container">
        <section className="form-section">
          <div className="photo-container">
            <img src="/robe.webp" alt="Robe" className="sidebar-photo" />
            <img src="/hastasiempre.webp" alt="Hasta siempre Robe" className="sidebar-photo" />
          </div>
        </section>

        <section className="messages-section">
          <div className="messages-list">
            {currentMessages.map((msg) => (
              <div key={msg.id} className="message-card">
                <div className="message-header">
                  <strong>{msg.name}</strong>
                </div>
                <p className="message-text">
                  {msg.message}
                </p>
              </div>
            ))}
            
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  ← Anterior
                </button>
                
                <div className="pagination-info">
                  <span>Página {currentPage} de {totalPages}</span>
                </div>
                
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente →
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      <footer className="footer">
        <p className="footer-quote">"Tal vez, si pudiera hablarte, de si fuera cierto, que el poder del arte bien nos pudiera salvar..."</p>
        <p className="footer-text">En memoria de Roberto Iniesta Ojea, sus melodías, letras y su camino vivirán por siempre.</p>
        <p className="footer-text">¡Vuela alto, hombre pájaro!</p>
      </footer>
    </div>
  )
}

export default App
