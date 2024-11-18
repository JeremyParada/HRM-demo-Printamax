import React, { useState } from 'react';
import { UserPlus, Save, Briefcase, FileText, Calendar, Clock, BadgeCheck } from 'lucide-react';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const EmployeeProfileCreation = () => {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    // Información Personal
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    direccion: '',
    telefono: '',
    email: '',
    
    // Información Legal
    rut: '',
    tipoContrato: '',
    fechaContratacion: '',
    cargo: '',
    departamento: '',
    
    // Asistencia y Horarios
    horarioLaboral: '',
    modalidadTrabajo: '',
    
    // Licencias y Permisos
    diasVacaciones: '',
    licenciasMedicas: [],
    permisosEspeciales: [],
    
    // Información Salarial
    salarioBase: '',
    bonificaciones: '',
    afp: '',
    prevision: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // En producción, esto se conectaría con Azure SQL
    setNotifications([
      {
        type: "success",
        message: "Perfil de empleado creado exitosamente"
      }
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Creación de Perfil de Empleado</h1>
            <p className="text-gray-500">Complete la información del nuevo empleado</p>
          </div>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Guardar Perfil
          </Button>
        </div>

        {/* Main Form Content */}
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal" className="space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>Personal</span>
            </TabsTrigger>
            <TabsTrigger value="legal" className="space-x-2">
              <FileText className="h-4 w-4" />
              <span>Legal</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="space-x-2">
              <Clock className="h-4 w-4" />
              <span>Asistencia</span>
            </TabsTrigger>
            <TabsTrigger value="leaves" className="space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Licencias</span>
            </TabsTrigger>
            <TabsTrigger value="payroll" className="space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Nómina</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                  Datos personales del empleado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.nombre}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Apellidos</label>
                    <input
                      type="text"
                      name="apellidos"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.apellidos}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      name="fechaNacimiento"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.fechaNacimiento}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.telefono}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium">Dirección</label>
                    <input
                      type="text"
                      name="direccion"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.direccion}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal">
            <Card>
              <CardHeader>
                <CardTitle>Información Legal</CardTitle>
                <CardDescription>
                  Documentación legal y contractual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">RUT</label>
                    <input
                      type="text"
                      name="rut"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.rut}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo de Contrato</label>
                    <select
                      name="tipoContrato"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.tipoContrato}
                    >
                      <option value="">Seleccione...</option>
                      <option value="indefinido">Indefinido</option>
                      <option value="plazo-fijo">Plazo Fijo</option>
                      <option value="honorarios">Honorarios</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cargo</label>
                    <input
                      type="text"
                      name="cargo"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.cargo}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Departamento</label>
                    <select
                      name="departamento"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.departamento}
                    >
                      <option value="">Seleccione...</option>
                      <option value="rrhh">RRHH</option>
                      <option value="ventas">Ventas</option>
                      <option value="marketing">Marketing</option>
                      <option value="it">IT</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Asistencia y Horarios</CardTitle>
                <CardDescription>
                  Configuración de horarios y modalidad de trabajo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Horario Laboral</label>
                    <select
                      name="horarioLaboral"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.horarioLaboral}
                    >
                      <option value="">Seleccione...</option>
                      <option value="full-time">Tiempo Completo</option>
                      <option value="part-time">Medio Tiempo</option>
                      <option value="flexible">Horario Flexible</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Modalidad de Trabajo</label>
                    <select
                      name="modalidadTrabajo"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.modalidadTrabajo}
                    >
                      <option value="">Seleccione...</option>
                      <option value="presencial">Presencial</option>
                      <option value="remoto">Remoto</option>
                      <option value="hibrido">Híbrido</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaves">
            <Card>
              <CardHeader>
                <CardTitle>Licencias y Permisos</CardTitle>
                <CardDescription>
                  Gestión de vacaciones y permisos especiales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Días de Vacaciones Iniciales</label>
                    <input
                      type="number"
                      name="diasVacaciones"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.diasVacaciones}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Permisos Especiales</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      multiple
                    >
                      <option value="maternal">Permiso Maternal</option>
                      <option value="estudios">Permiso de Estudios</option>
                      <option value="medico">Permiso Médico</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll">
            <Card>
              <CardHeader>
                <CardTitle>Información de Nómina</CardTitle>
                <CardDescription>
                  Datos salariales y previsionales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Salario Base</label>
                    <input
                      type="number"
                      name="salarioBase"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.salarioBase}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bonificaciones</label>
                    <input
                      type="number"
                      name="bonificaciones"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.bonificaciones}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">AFP</label>
                    <select
                      name="afp"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.afp}
                    >
                      <option value="">Seleccione...</option>
                      <option value="capital">Capital</option>
                      <option value="cuprum">Cuprum</option>
                      <option value="habitat">Habitat</option>
                      <option value="provida">Provida</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Previsión de Salud</label>
                    <select
                      name="prevision"
                      className="w-full p-2 border rounded-md"
                      onChange={handleInputChange}
                      value={formData.prevision}
                    >
                      <option value="">Seleccione...</option>
                      <option value="fonasa">Fonasa</option>
                      <option value="isapre">Isapre</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Notificaciones */}
      <div className="fixed bottom-4 right-4 space-y-2">
        {notifications.map((notification, index) => (
          <Alert key={index} className={`w-96 ${
            notification.type === 'success' ? 'border-green-500' : 'border-red-500'
          }`}>
            <BadgeCheck className="h-4 w-4" />
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

export default EmployeeProfileCreation;
