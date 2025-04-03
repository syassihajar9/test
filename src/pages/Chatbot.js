import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([
    { 
      text: "Bonjour ! Je suis votre guide virtuel pour Marrakech. Posez-moi vos questions sur les activités, restaurants ou hôtels.", 
      sender: "bot" 
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatboxRef = useRef(null);

  const quickQuestions = [
    "Quels sont les meilleurs restaurants?",
    "Où puis-je trouver des hôtels pas chers?",
    "Quelles activités recommandez-vous?"
  ];

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { 
              role: "system", 
              content: "Tu es un guide touristique expert sur Marrakech. Réponds de manière concise et utile." 
            },
            { role: "user", content: input }
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botResponse = response.data.choices[0].message.content;
      setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { 
        text: "Désolé, je rencontre un problème technique. Veuillez réessayer plus tard.", 
        sender: "bot" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatboxRef.current?.scrollTo(0, chatboxRef.current.scrollHeight);
  }, [messages]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Guide Virtuel Marrakech</h1>
      <div style={styles.chatbox} ref={chatboxRef}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
            {msg.text}
          </div>
        ))}
        {loading && <div style={styles.botMessage}>Je recherche la réponse...</div>}
      </div>
      
      <div style={styles.quickQuestions}>
        {quickQuestions.map((question, i) => (
          <button 
            key={i} 
            style={styles.quickBtn}
            onClick={() => setInput(question)}
            disabled={loading}
          >
            {question}
          </button>
        ))}
      </div>
      
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Posez votre question sur Marrakech..."
          style={styles.input}
          disabled={loading}
        />
        <button 
          onClick={sendMessage} 
          style={styles.button} 
          disabled={loading || !input.trim()}
        >
          {loading ? "..." : "Envoyer"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    maxWidth: "800px", 
    margin: "0 auto", 
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  title: { 
    color: "#e63946", 
    textAlign: "center", 
    marginBottom: "20px" 
  },
  chatbox: {
    height: "400px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    overflowY: "auto",
    marginBottom: "15px",
    backgroundColor: "#f8f9fa",
  },
  userMessage: {
    backgroundColor: "#e63946",
    color: "white",
    padding: "10px 15px",
    borderRadius: "18px 18px 0 18px",
    margin: "8px 0",
    maxWidth: "80%",
    alignSelf: "flex-end",
    wordWrap: "break-word",
  },
  botMessage: {
    backgroundColor: "#f1f1f1",
    color: "#333",
    padding: "10px 15px",
    borderRadius: "18px 18px 18px 0",
    margin: "8px 0",
    maxWidth: "80%",
    wordWrap: "break-word",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#e63946",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  quickQuestions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "15px",
  },
  quickBtn: {
    padding: "8px 12px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ddd",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s",
  },
};

export default Chatbot;