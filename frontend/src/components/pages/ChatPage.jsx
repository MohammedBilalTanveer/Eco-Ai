import React, { useState } from 'react';
import { authFetch } from '../../services/api';

const ChatPage = () => {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="container mx-auto p-4 flex flex-col h-full max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-2 text-primary">GreenBot Advisor</h1>
      <p className="text-center text-gray-400 mb-8">Ask me anything about sustainable habits!</p>
      
      <div className="flex-grow bg-gray-900/50 p-4 rounded-xl border border-gray-800 flex flex-col">
        <div className="flex-grow space-y-4 overflow-y-auto pr-2">
          {history.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-lg max-w-md ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-700'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <div className="text-center text-gray-400">GreenBot is thinking...</div>}
        </div>
        <form onSubmit={sendMessage} className="mt-4 flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g., How can I reduce plastic use?"
            className="flex-grow p-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
          <button type="submit" disabled={loading} className="px-6 py-3 bg-primary rounded-lg font-bold hover:bg-opacity-80 disabled:opacity-50">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;