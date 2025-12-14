import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:3000/api'

function App() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [notification, setNotification] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const messagesPerPage = 10

  // Cargar mensajes al iniciar
  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/messages`)
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Error al cargar mensajes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    const formData = new FormData(e.target)
    const name = formData.get('name')?.trim()
    const message = formData.get('message')?.trim()
    
    if (name && message) {
      try {
        const response = await fetch(`${API_URL}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, message }),
        })

        if (response.ok) {
          e.target.reset()
          setNotification('Mensaje enviado. Será visible tras revisión.')
          setTimeout(() => setNotification(null), 5000)
        } else {
          setNotification('Error al enviar mensaje. Inténtalo de nuevo.')
          setTimeout(() => setNotification(null), 5000)
        }
      } catch (error) {
        console.error('Error al enviar mensaje:', error)
        setNotification('Error de conexión. Inténtalo de nuevo.')
        setTimeout(() => setNotification(null), 5000)
      } finally {
        setSubmitting(false)
      }
    }
  }

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
          <h3>Deja tu mensaje</h3>
          {notification && (
            <div className="notification">
              {notification}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                maxLength={50}
                required
                disabled={submitting}
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Tu mensaje de condolencia..."
                rows={4}
                maxLength={500}
                required
                disabled={submitting}
              />
            </div>
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>
        </section>

        <section className="messages-section">
          <h3>Mensajes ({messages.length})</h3>
          <div className="messages-list">
            {loading ? (
              <p className="no-messages">Cargando mensajes...</p>
            ) : messages.length === 0 ? (
              <p className="no-messages">Aún no hay mensajes. Sé el primero en dejar tu condolencia.</p>
            ) : (
              (() => {
                const indexOfLastMessage = currentPage * messagesPerPage
                const indexOfFirstMessage = indexOfLastMessage - messagesPerPage
                const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage)
                const totalPages = Math.ceil(messages.length / messagesPerPage)

                return (
                  <>
                    {currentMessages.map((msg) => (
                      <div key={msg.id} className="message-card">
                        <div className="message-header">
                          <strong>{msg.name}</strong>
                        </div>
                        <p className="message-text">{msg.message}</p>
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
                  </>
                )
              })()
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
