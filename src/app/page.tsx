"use client";

import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function Home() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = [
    {
      title: "Wygeneruj Content",
      description: "Pomoge ci napisać atrakcyjny wpis na social media",
      prompt: "Pomóz mi i zaproponuj atrakcyjną treść do wrzucenia na social media"
    },
    {
      title: "Podaj mi 3 hooki wideo",
      description: "Pomogę ci wygenerować atrakcyjne hooki angażujące widzów",
      prompt: "Can you help me analyze this dataset?"
    },
    {
      title: "Pomoc w tworzeniu grafik",
      description: "Moge pomóc Tobie stworzyć atrakcyjne grafiki do Twoich treści",
      prompt: "What is machine learning?"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'This is a sample response. Connect to your backend to get real responses.' 
      }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 mb-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-white mb-2">
                Viralowy Asystent Contentu
              </h1>
              <p className="text-gray-400 text-lg">
                Masz ochote dziś podbić social media? :)
              </p>
            </div>

            <div className="flex flex-nowrap gap-4 w-full max-w-4xl overflow-x-auto pb-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.prompt)}
                  className="flex-shrink-0 w-64 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-left border border-gray-700 hover:border-gray-600"
                >
                  <h3 className="text-white font-semibold mb-2">{suggestion.title}</h3>
                  <p className="text-gray-400 text-sm">{suggestion.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 space-y-4 mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl rounded-lg p-4 ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-white'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Wpisz tutaj treść..."
            className="w-full p-4 pr-12 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 disabled:text-gray-600"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </main>
    </div>
  );
}