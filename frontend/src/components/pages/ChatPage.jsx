import React, { useState, useEffect, useRef } from 'react';
import { authFetch } from '../../services/api';
import Footer from '../Footer';
const ChatPage = () => {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const newHistory = [...history, { role: 'user', text: message }];
    setHistory(newHistory);
    setMessage('');
    setLoading(true);

    try {
      const res = await authFetch('/chat/', {
        method: 'POST',
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get response');
      setHistory([...newHistory, { role: 'assistant', text: data.reply }]);
    } catch (error) {
      setHistory([...newHistory, { role: 'assistant', text: `Error: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (<>
    <div className="bg-[#050414] min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-gray-900/70 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(130,69,236,0.4)] flex flex-col h-[80vh]">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2 text-white">
          GreenBot <span className="text-[#8245ec]">Advisor</span>
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Ask me anything about sustainable habits!
        </p>

        {/* Scrollable chat window */}
        <div className="flex-grow overflow-y-auto space-y-4 pr-2 mb-4 custom-scrollbar">
          {history.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-3 rounded-lg max-w-md break-words ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#8245ec] to-purple-500 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-center text-gray-400">
              GreenBot is thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input box fixed at bottom */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g., How can I reduce plastic use?"
            className="flex-grow p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-[#8245ec] outline-none text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-[#8245ec] to-purple-500 rounded-lg font-bold text-white hover:from-purple-500 hover:to-[#8245ec] transition-all disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
    <Footer/>
  </>
  );
};

export default ChatPage;