'use client';

import { useState } from 'react';
import { Send, Lightbulb } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';

const mockMessages = [
  { id: 1, type: 'assistant', text: 'Hello! I\'m your AI Academic Advisor. How can I help you today? I can assist with course recommendations, career guidance, study tips, and more!' },
  { id: 2, type: 'user', text: 'What courses should I take next semester?' },
  { id: 3, type: 'assistant', text: 'Based on your current GPA of 3.64 and your CS specialization, I recommend: CS401 (Machine Learning), CS402 (Web Development), and MATH201 (Linear Algebra). These courses align well with your interests and prerequisites.' },
];

const suggestions = [
  'Recommend next semester courses',
  'Career path guidance',
  'Study improvement tips',
  'Research opportunities',
];

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { id: messages.length + 1, type: 'user', text: input }]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'assistant',
        text: 'I understand your question. Based on your academic profile and interests, here are my recommendations...'
      }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role="student" />
      <div className="flex-1 ml-64">
        <DashboardHeader role="Student" currentPage="AI Advisor" />
        <main className="p-8">
          <div className="space-y-6 h-full">
            <h1 className="text-3xl font-bold">AI Academic Advisor</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              <div className="lg:col-span-2 flex flex-col">
                <div className="flex-1 bg-card border border-border rounded-lg p-6 overflow-y-auto space-y-4 mb-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-foreground px-4 py-3 rounded-lg">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask me anything about your academics..."
                    className="flex-1 px-4 py-2 border border-input rounded-lg bg-background"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Quick Suggestions
                  </h3>
                  <div className="space-y-2">
                    {suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInput(suggestion)}
                        className="w-full text-left p-3 rounded-lg bg-muted hover:bg-muted/80 transition text-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Your Profile</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current GPA</p>
                      <p className="font-bold">3.64</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Major</p>
                      <p className="font-bold">Computer Science</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Completed Credits</p>
                      <p className="font-bold">45 / 120</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
