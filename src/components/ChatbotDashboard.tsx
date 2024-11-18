import React, { useState } from 'react';
import { MessageCircle, Send, User, Bot, ArrowUpCircle, PlusCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const ChatbotDashboard = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '¡Hola! Soy tu asistente virtual de RRHH. ¿En qué puedo ayudarte hoy?',
      timestamp: '10:00'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  // Mock data - categorías frecuentes
  const commonTopics = [
    { id: 1, text: "Consultas sobre contrato" },
    { id: 2, text: "Permisos y ausencias" },
    { id: 3, text: "Control de asistencia" },
    { id: 4, text: "Liquidación de pago" }
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    // Agregar mensaje del usuario
    const newMessages = [
      ...messages,
      {
        id: messages.length + 1,
        type: 'user',
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setMessages(newMessages);
    setInputMessage('');

    // Simular respuesta del bot después de un breve delay
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          id: messages.length + 2,
          type: 'bot',
          content: 'Entiendo tu consulta. Déjame buscar la información relevante...',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };

  const escalateToSpecialist = () => {
    setNotifications([
      ...notifications,
      {
        type: "info",
        message: "Tu consulta ha sido escalada a un especialista de RRHH. Te contactarán pronto."
      }
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Panel de Chat Principal */}
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-6 w-6" />
              <CardTitle>Asistente Virtual RRHH</CardTitle>
            </div>
            <CardDescription>
              Disponible 24/7 para resolver tus consultas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col h-[600px]">
              {/* Área de mensajes */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-slate-50 rounded-lg">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[70%] ${
                        message.type === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      {message.type === 'user' ? (
                        <User className="h-8 w-8 p-1 bg-blue-100 rounded-full" />
                      ) : (
                        <Bot className="h-8 w-8 p-1 bg-green-100 rounded-full" />
                      )}
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border'
                        }`}
                      >
                        <p>{message.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Área de input */}
              <div className="border-t pt-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Escribe tu consulta aquí..."
                    className="flex-1 border rounded-lg p-2"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Temas Frecuentes */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <PlusCircle className="h-6 w-6" />
                <CardTitle>Temas Frecuentes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {commonTopics.map((topic) => (
                  <button
                    key={topic.id}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    onClick={() => setInputMessage(topic.text)}
                  >
                    {topic.text}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Escalamiento */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <ArrowUpCircle className="h-6 w-6" />
                <CardTitle>¿Necesitas más ayuda?</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <button
                onClick={escalateToSpecialist}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contactar Especialista
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Notificaciones */}
      <div className="fixed bottom-4 right-4 space-y-2">
        {notifications.map((notification, index) => (
          <Alert key={index} className="w-96">
            <AlertTitle>
              {notification.type === 'error' ? 'Error' : 'Información'}
            </AlertTitle>
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default ChatbotDashboard;
