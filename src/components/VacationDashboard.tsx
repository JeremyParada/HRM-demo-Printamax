import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
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

const VacationDashboard = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Mock data - en producción vendría de Azure SQL
  const userData = {
    nombre: "Juan Pérez",
    fechaIngreso: "2020-01-15",
    diasDisponibles: 15,
    diasProgresivos: 3,
    solicitudesHistoricas: [
      {
        id: 1,
        fechaInicio: "2024-12-20",
        fechaFin: "2024-12-31",
        estado: "Pendiente",
        comentarios: ""
      },
      {
        id: 2,
        fechaInicio: "2023-07-10",
        fechaFin: "2023-07-21",
        estado: "Aprobada",
        comentarios: "Disfrute sus vacaciones"
      }
    ]
  };

  const requestMeeting = () => {
    setNotifications([
      ...notifications,
      {
        type: "info",
        message: "Solicitud de reunión enviada al supervisor"
      }
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resumen de Vacaciones */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6" />
              <CardTitle>Resumen de Vacaciones</CardTitle>
            </div>
            <CardDescription>
              Gestiona tus días de vacaciones y solicitudes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-medium">Días Disponibles:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {userData.diasDisponibles}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-medium">Días Progresivos:</span>
                <span className="text-2xl font-bold text-green-600">
                  {userData.diasProgresivos}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solicitud de Vacaciones */}
        <Card>
          <CardHeader>
            <CardTitle>Nueva Solicitud</CardTitle>
            <CardDescription>
              Selecciona las fechas para tu próxima solicitud
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex flex-col space-y-2">
                  <label className="font-medium">Fecha de inicio</label>
                  <input
                    type="date"
                    className="border rounded-md p-2"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-medium">Fecha de término</label>
                  <input
                    type="date"
                    className="border rounded-md p-2"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Enviar Solicitud
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Historial de Solicitudes */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Historial de Solicitudes</CardTitle>
            <CardDescription>
              Revisa el estado de tus solicitudes anteriores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Fecha Inicio</th>
                    <th className="text-left p-2">Fecha Fin</th>
                    <th className="text-left p-2">Estado</th>
                    <th className="text-left p-2">Comentarios</th>
                    <th className="text-left p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.solicitudesHistoricas.map((solicitud) => (
                    <tr key={solicitud.id} className="border-b">
                      <td className="p-2">{solicitud.fechaInicio}</td>
                      <td className="p-2">{solicitud.fechaFin}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          solicitud.estado === 'Aprobada' 
                            ? 'bg-green-100 text-green-800'
                            : solicitud.estado === 'Pendiente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {solicitud.estado}
                        </span>
                      </td>
                      <td className="p-2">{solicitud.comentarios}</td>
                      <td className="p-2">
                        {solicitud.estado === 'Rechazada' && (
                          <button
                            onClick={requestMeeting}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Solicitar reunión
                          </button>
                        )}
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

export default VacationDashboard;
