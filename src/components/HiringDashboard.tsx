import React, { useState } from 'react';
import { FileText, Upload, UserCheck } from 'lucide-react';
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

const HiringDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  // Mock data - en producción vendría de Azure SQL
  const candidateData = {
    nombre: "María González",
    puesto: "Desarrollador Frontend",
    estado: "Documentación Pendiente",
    documentosRequeridos: [
      { id: 1, nombre: "Identificación Oficial", estado: "Pendiente" },
      { id: 2, nombre: "Comprobante de Estudios", estado: "Recibido" },
      { id: 3, nombre: "Referencias Laborales", estado: "Pendiente" },
      { id: 4, nombre: "Comprobante de Domicilio", estado: "Recibido" }
    ],
    historialProceso: [
      {
        id: 1,
        fecha: "2024-11-10",
        accion: "Solicitud de documentos enviada",
        estado: "Completado"
      },
      {
        id: 2,
        fecha: "2024-11-12",
        accion: "Documentos parcialmente recibidos",
        estado: "En Proceso"
      }
    ]
  };

  const sendDocumentRequest = () => {
    setNotifications([
      ...notifications,
      {
        type: "info",
        message: "Solicitud de documentos enviada al candidato"
      }
    ]);
  };

  const sendContract = () => {
    setNotifications([
      ...notifications,
      {
        type: "info",
        message: "Contrato enviado al candidato para firma"
      }
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información del Candidato */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <UserCheck className="h-6 w-6" />
              <CardTitle>Información del Candidato</CardTitle>
            </div>
            <CardDescription>
              Datos del candidato y estado del proceso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-medium">Nombre:</span>
                <span className="font-bold">
                  {candidateData.nombre}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-medium">Puesto:</span>
                <span className="font-bold">
                  {candidateData.puesto}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-medium">Estado:</span>
                <span className="px-2 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                  {candidateData.estado}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gestión de Documentos */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <CardTitle>Gestión de Documentos</CardTitle>
            </div>
            <CardDescription>
              Control de documentación requerida
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                {candidateData.documentosRequeridos.map((doc) => (
                  <div key={doc.id} className="flex justify-between items-center p-2 border rounded-lg">
                    <span>{doc.nombre}</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      doc.estado === 'Recibido' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.estado}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <button 
                  onClick={sendDocumentRequest}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Solicitar Documentos Faltantes
                </button>
                <button 
                  onClick={sendContract}
                  className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Enviar Contrato
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Historial del Proceso */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Upload className="h-6 w-6" />
              <CardTitle>Historial del Proceso</CardTitle>
            </div>
            <CardDescription>
              Seguimiento de acciones y documentos recibidos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Fecha</th>
                    <th className="text-left p-2">Acción</th>
                    <th className="text-left p-2">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {candidateData.historialProceso.map((evento) => (
                    <tr key={evento.id} className="border-b">
                      <td className="p-2">{evento.fecha}</td>
                      <td className="p-2">{evento.accion}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          evento.estado === 'Completado' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {evento.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
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

export default HiringDashboard;
