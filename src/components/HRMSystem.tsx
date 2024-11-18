'use client';
import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Calendar, 
  Users, 
  MessageCircle, 
  FileText,
  LogOut,
  Building,
  ChevronDown,
  Menu,
  UserCog
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Importar los componentes de los módulos
import VacationDashboard from './VacationDashboard';
import HiringDashboard from './HiringDashboard';
import ChatbotDashboard from './ChatbotDashboard';
import UserProfileManagement from './UserProfileManagement';
import EmployeeProfileCreation from './EmployeeProfileCreation';

// Mock de usuarios para simular autenticación
const mockUsers = {
  "juan.perez@printamax.com": {
    password: "123456",
    name: "Juan Pérez",
    role: "worker",
    department: "Ventas"
  },
  "maria.rodriguez@printamax.com": {
    password: "123456",
    name: "María Rodríguez",
    role: "hr_manager",
    department: "RRHH"
  },
  "carlos.sanchez@printamax.com": {
    password: "123456",
    name: "Carlos Sánchez",
    role: "hr_specialist",
    department: "RRHH"
  }
};

const HRMSystem = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeModule, setActiveModule] = useState("home");
  const [error, setError] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = mockUsers[email];
    
    if (user && user.password === password) {
      setCurrentUser({
        email,
        ...user
      });
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Credenciales inválidas");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveModule("home");
    setEmail("");
    setPassword("");
  };

  // Determinar los módulos disponibles según el rol
  const getAvailableModules = (role) => {
    const modules = {
      worker: [
        { id: "vacation", name: "Vacaciones", icon: Calendar },
        { id: "chatbot", name: "Soporte", icon: MessageCircle },
      ],
      hr_manager: [
        { id: "vacation", name: "Gestión de Vacaciones", icon: Calendar },
        { id: "profiles", name: "Gestión de Perfiles", icon: UserCog },
        { id: "chatbot", name: "Soporte", icon: MessageCircle },
      ],
      hr_specialist: [
        { id: "hiring", name: "Gestión de Candidatos", icon: Users },
        { id: "reports", name: "Creación de Perfil de Empleado", icon: FileText },
        { id: "vacation", name: "Gestión de Vacaciones", icon: Calendar },
        { id: "chatbot", name: "Soporte", icon: MessageCircle },
      ],
    };
    
    return modules[role] || [];
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Building className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-center">Printamax HRM</CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Correo Electrónico</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    placeholder="correo@printamax.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    placeholder="••••••"
                  />
                </div>
              </div>
              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ingresar
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600" />
              <span className="ml-2 font-semibold text-lg">Printamax HRM</span>
            </div>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-slate-400" />
                <span className="ml-2">{currentUser.name}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-2">Salir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-slate-400" />
                <span className="ml-2">{currentUser.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-2">Salir</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {getAvailableModules(currentUser.role).map((module) => {
                    const Icon = module.icon;
                    return (
                      <button
                        key={module.id}
                        onClick={() => setActiveModule(module.id)}
                        className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                          activeModule === module.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{module.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content area */}
          <div className="md:col-span-4">
            {activeModule === "vacation" && <VacationDashboard />}
            {activeModule === "hiring" && <HiringDashboard />}
            {activeModule === "chatbot" && <ChatbotDashboard />}
            {activeModule === "profiles" && <UserProfileManagement />}
            {activeModule === "reports" && <EmployeeProfileCreation />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRMSystem;