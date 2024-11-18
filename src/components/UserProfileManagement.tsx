import React, { useState } from 'react';
import { Users, UserMinus, Bell } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const UserProfileManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data - en producción vendría de Azure SQL
  const employeesData = [
    {
      id: 1,
      nombre: "Juan Pérez",
      departamento: "Ventas",
      supervisor: "María González",
      estado: "Activo",
      fechaContratacion: "2020-01-15",
    },
    {
      id: 2,
      nombre: "Ana Rodríguez",
      departamento: "Marketing",
      supervisor: "Carlos Ruiz",
      estado: "Activo",
      fechaContratacion: "2021-03-20",
    }
  ];

  const handleDeactivateProfile = (userId) => {
    // En producción, esto se conectaría con Azure SQL y Notification Hubs
    setNotifications([
      ...notifications,
      {
        type: "success",
        message: "Perfil desactivado exitosamente. Se ha notificado al supervisor correspondiente."
      }
    ]);
    
    // Actualizar el estado en la UI
    setSelectedUser(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gestión de Perfiles de Usuario</h1>
            <p className="text-gray-500">Administre los perfiles de empleados desvinculados o inactivos</p>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-gray-500" />
            <span className="font-medium">Total usuarios activos: {employeesData.length}</span>
          </div>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Perfiles de Usuario</CardTitle>
            <CardDescription>
              Lista de empleados y estado de sus perfiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Nombre</th>
                    <th className="text-left p-2">Departamento</th>
                    <th className="text-left p-2">Supervisor</th>
                    <th className="text-left p-2">Estado</th>
                    <th className="text-left p-2">Fecha Contratación</th>
                    <th className="text-left p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {employeesData.map((employee) => (
                    <tr key={employee.id} className="border-b">
                      <td className="p-2">{employee.nombre}</td>
                      <td className="p-2">{employee.departamento}</td>
                      <td className="p-2">{employee.supervisor}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          employee.estado === 'Activo' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {employee.estado}
                        </span>
                      </td>
                      <td className="p-2">{employee.fechaContratacion}</td>
                      <td className="p-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="destructive"
                              size="sm"
                              onClick={() => setSelectedUser(employee)}
                            >
                              <UserMinus className="h-4 w-4 mr-2" />
                              Eliminar Acceso
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirmar Eliminación de Acceso</DialogTitle>
                              <DialogDescription>
                                ¿Está seguro que desea eliminar el acceso al perfil de {employee.nombre}?
                                Esta acción:
                                <ul className="list-disc pl-6 mt-2">
                                  <li>Eliminará todos los permisos del usuario</li>
                                  <li>Notificará al supervisor ({employee.supervisor})</li>
                                  <li>Actualizará el estado a "Inactivo"</li>
                                </ul>
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => setSelectedUser(null)}
                              >
                                Cancelar
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleDeactivateProfile(employee.id)}
                              >
                                Confirmar Eliminación
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
          <Alert key={index} className={`w-96 ${
            notification.type === 'success' ? 'border-green-500' : 'border-red-500'
          }`}>
            <Bell className="h-4 w-4" />
            <AlertTitle>
              {notification.type === 'success' ? 'Éxito' : 'Error'}
            </AlertTitle>
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default UserProfileManagement;
