"use client"

import { useState } from "react"
import { Calendar, Clock, User, Scissors, Star, Phone, MapPin, Instagram, Facebook, Settings, LogOut, Edit, Trash2, Plus, Save, X, Eye, EyeOff, Users, DollarSign, BarChart3, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

// Initial data - in a real app, this would come from a database
const initialServices = [
  { id: 1, name: "Corte Tradicional", price: 25, duration: 30, description: "Corte clássico com acabamento perfeito", active: true },
  { id: 2, name: "Corte + Barba", price: 40, duration: 45, description: "Corte completo com barba alinhada", active: true },
  { id: 3, name: "Barba Completa", price: 20, duration: 25, description: "Barba aparada e finalizada", active: true },
  { id: 4, name: "Corte Premium", price: 35, duration: 40, description: "Corte moderno com styling", active: true },
  { id: 5, name: "Sobrancelha", price: 15, duration: 15, description: "Design e alinhamento", active: true },
  { id: 6, name: "Pacote Completo", price: 55, duration: 60, description: "Corte + Barba + Sobrancelha", active: true }
]

const initialBarbers = [
  { id: 1, name: "Carlos Silva", specialty: "Cortes Clássicos", rating: 4.9, image: "👨‍🦲", active: true, email: "carlos@jmbarbearia.com", phone: "(34) 99999-0001" },
  { id: 2, name: "João Santos", specialty: "Barbas & Bigodes", rating: 4.8, image: "🧔", active: true, email: "joao@jmbarbearia.com", phone: "(34) 99999-0002" },
  { id: 3, name: "Pedro Costa", specialty: "Cortes Modernos", rating: 4.9, image: "👨", active: true, email: "pedro@jmbarbearia.com", phone: "(34) 99999-0003" },
  { id: 4, name: "Rafael Lima", specialty: "Styling Premium", rating: 5.0, image: "👨‍🦱", active: true, email: "rafael@jmbarbearia.com", phone: "(34) 99999-0004" }
]

const initialTimeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
]

const initialWorkingHours = {
  monday: { start: "08:00", end: "18:00", active: true },
  tuesday: { start: "08:00", end: "18:00", active: true },
  wednesday: { start: "08:00", end: "18:00", active: true },
  thursday: { start: "08:00", end: "18:00", active: true },
  friday: { start: "08:00", end: "18:00", active: true },
  saturday: { start: "08:00", end: "17:00", active: true },
  sunday: { start: "09:00", end: "15:00", active: false }
}

const mockAppointments = [
  { id: 1, customerName: "João Silva", service: "Corte + Barba", barber: "Carlos Silva", date: "2024-01-15", time: "09:00", status: "confirmed", phone: "(34) 99999-1111", price: 40 },
  { id: 2, customerName: "Maria Santos", service: "Corte Premium", barber: "Pedro Costa", date: "2024-01-15", time: "10:30", status: "pending", phone: "(34) 99999-2222", price: 35 },
  { id: 3, customerName: "Carlos Oliveira", service: "Barba Completa", barber: "João Santos", date: "2024-01-15", time: "14:00", status: "completed", phone: "(34) 99999-3333", price: 20 },
  { id: 4, customerName: "Ana Costa", service: "Pacote Completo", barber: "Rafael Lima", date: "2024-01-16", time: "09:30", status: "confirmed", phone: "(34) 99999-4444", price: 55 }
]

export default function BarberShopApp() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  
  // Admin panel state
  const [adminView, setAdminView] = useState("dashboard")
  const [services, setServices] = useState(initialServices)
  const [barbers, setBarbers] = useState(initialBarbers)
  const [workingHours, setWorkingHours] = useState(initialWorkingHours)
  const [appointments, setAppointments] = useState(mockAppointments)
  
  // Customer booking state
  const [selectedService, setSelectedService] = useState("")
  const [selectedBarber, setSelectedBarber] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [currentStep, setCurrentStep] = useState(1)

  // Edit modals state
  const [editingService, setEditingService] = useState(null)
  const [editingBarber, setEditingBarber] = useState(null)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [isBarberModalOpen, setIsBarberModalOpen] = useState(false)

  // Login function
  const handleLogin = () => {
    // Simple authentication - in a real app, this would validate against a database
    if (loginEmail === "admin@jmbarbearia.com" && loginPassword === "admin123") {
      setIsLoggedIn(true)
      setCurrentUser({ name: "Administrador", email: loginEmail })
      toast.success("Login realizado com sucesso!")
    } else {
      toast.error("Email ou senha incorretos")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setLoginEmail("")
    setLoginPassword("")
    setAdminView("dashboard")
    toast.success("Logout realizado com sucesso!")
  }

  // Service management
  const handleSaveService = (serviceData) => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...serviceData, id: editingService.id } : s))
      toast.success("Serviço atualizado com sucesso!")
    } else {
      const newService = { ...serviceData, id: Date.now() }
      setServices([...services, newService])
      toast.success("Serviço criado com sucesso!")
    }
    setEditingService(null)
    setIsServiceModalOpen(false)
  }

  const handleDeleteService = (serviceId) => {
    setServices(services.filter(s => s.id !== serviceId))
    toast.success("Serviço removido com sucesso!")
  }

  // Barber management
  const handleSaveBarber = (barberData) => {
    if (editingBarber) {
      setBarbers(barbers.map(b => b.id === editingBarber.id ? { ...barberData, id: editingBarber.id } : b))
      toast.success("Barbeiro atualizado com sucesso!")
    } else {
      const newBarber = { ...barberData, id: Date.now() }
      setBarbers([...barbers, newBarber])
      toast.success("Barbeiro adicionado com sucesso!")
    }
    setEditingBarber(null)
    setIsBarberModalOpen(false)
  }

  const handleDeleteBarber = (barberId) => {
    setBarbers(barbers.filter(b => b.id !== barberId))
    toast.success("Barbeiro removido com sucesso!")
  }

  // Working hours management
  const handleWorkingHoursChange = (day, field, value) => {
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        [field]: value
      }
    })
  }

  const saveWorkingHours = () => {
    toast.success("Horários de funcionamento atualizados!")
  }

  // Appointment management
  const updateAppointmentStatus = (appointmentId, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ))
    toast.success("Status do agendamento atualizado!")
  }

  // Customer booking functions (same as before)
  const selectedServiceData = services.find(s => s.id.toString() === selectedService && s.active)
  const selectedBarberData = barbers.find(b => b.id.toString() === selectedBarber && b.active)
  const activeServices = services.filter(s => s.active)
  const activeBarbers = barbers.filter(b => b.active)

  const handleBooking = () => {
    if (!selectedService || !selectedBarber || !selectedDate || !selectedTime || !customerName || !customerPhone) {
      toast.error("Por favor, preencha todos os campos obrigatórios")
      return
    }

    const newAppointment = {
      id: Date.now(),
      customerName,
      service: selectedServiceData.name,
      barber: selectedBarberData.name,
      date: selectedDate,
      time: selectedTime,
      status: "pending",
      phone: customerPhone,
      price: selectedServiceData.price,
      notes
    }

    setAppointments([...appointments, newAppointment])
    toast.success("Agendamento realizado com sucesso! Entraremos em contato para confirmar.")
    
    // Reset form
    setSelectedService("")
    setSelectedBarber("")
    setSelectedDate("")
    setSelectedTime("")
    setCustomerName("")
    setCustomerPhone("")
    setCustomerEmail("")
    setNotes("")
    setCurrentStep(1)
  }

  const nextStep = () => {
    if (currentStep === 1 && !selectedService) {
      toast.error("Selecione um serviço")
      return
    }
    if (currentStep === 2 && !selectedBarber) {
      toast.error("Selecione um barbeiro")
      return
    }
    if (currentStep === 3 && (!selectedDate || !selectedTime)) {
      toast.error("Selecione data e horário")
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-4 rounded-2xl inline-block mb-4">
              <Scissors className="w-12 h-12 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">JMBARBEARIA</h1>
            <p className="text-amber-400">Painel Administrativo</p>
          </div>

          {/* Login Form */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-center">Acesso Restrito</CardTitle>
              <CardDescription className="text-white/60 text-center">
                Entre com suas credenciais para acessar o painel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="admin@jmbarbearia.com"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-white">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white pr-10"
                    placeholder="••••••••"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-500 hover:to-orange-600"
              >
                Entrar
              </Button>

              <div className="text-center text-sm text-white/60 mt-4">
                <p>Credenciais de teste:</p>
                <p>Email: admin@jmbarbearia.com</p>
                <p>Senha: admin123</p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Access */}
          <div className="text-center mt-8">
            <p className="text-white/60 mb-4">Quer fazer um agendamento?</p>
            <Button 
              variant="outline"
              onClick={() => {
                // Show customer booking interface
                setIsLoggedIn(true)
                setCurrentUser({ name: "Cliente", email: "cliente" })
              }}
              className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
            >
              Agendar Horário
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Admin Panel
  if (currentUser?.email !== "cliente") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Admin Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-2 rounded-lg">
                  <Scissors className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">JMBARBEARIA</h1>
                  <p className="text-amber-400 text-sm">Painel Administrativo</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-white/80">Olá, {currentUser?.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <Tabs value={adminView} onValueChange={setAdminView} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white/5 border border-white/10">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="appointments" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
                <Calendar className="w-4 h-4 mr-2" />
                Agendamentos
              </TabsTrigger>
              <TabsTrigger value="services" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
                <Scissors className="w-4 h-4 mr-2" />
                Serviços
              </TabsTrigger>
              <TabsTrigger value="barbers" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
                <Users className="w-4 h-4 mr-2" />
                Barbeiros
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-amber-400 data-[state=active]:text-black">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </TabsTrigger>
            </TabsList>

            {/* Dashboard */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-white/10 bg-white/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-sm font-medium">Agendamentos Hoje</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-amber-400">12</div>
                    <p className="text-xs text-white/60">+2 desde ontem</p>
                  </CardContent>
                </Card>
                
                <Card className="border-white/10 bg-white/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-sm font-medium">Receita do Mês</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">R$ 3.240</div>
                    <p className="text-xs text-white/60">+15% vs mês anterior</p>
                  </CardContent>
                </Card>
                
                <Card className="border-white/10 bg-white/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-sm font-medium">Clientes Ativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-400">156</div>
                    <p className="text-xs text-white/60">+8 novos este mês</p>
                  </CardContent>
                </Card>
                
                <Card className="border-white/10 bg-white/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-white text-sm font-medium">Taxa de Ocupação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-400">87%</div>
                    <p className="text-xs text-white/60">Média da semana</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-white/10 bg-white/5">
                  <CardHeader>
                    <CardTitle className="text-white">Próximos Agendamentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {appointments.filter(apt => apt.status === 'confirmed').slice(0, 5).map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <p className="text-white font-medium">{apt.customerName}</p>
                            <p className="text-white/60 text-sm">{apt.service} - {apt.barber}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-amber-400 font-medium">{apt.time}</p>
                            <p className="text-white/60 text-sm">R$ {apt.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/5">
                  <CardHeader>
                    <CardTitle className="text-white">Serviços Mais Populares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {services.slice(0, 5).map((service) => (
                        <div key={service.id} className="flex items-center justify-between">
                          <span className="text-white">{service.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-white/10 rounded-full h-2">
                              <div className="bg-amber-400 h-2 rounded-full" style={{width: `${Math.random() * 100}%`}}></div>
                            </div>
                            <span className="text-white/60 text-sm">R$ {service.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Appointments */}
            <TabsContent value="appointments" className="space-y-6">
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-white">Gerenciar Agendamentos</CardTitle>
                  <CardDescription className="text-white/60">
                    Visualize e gerencie todos os agendamentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-white font-medium">{apt.customerName}</p>
                              <p className="text-white/60 text-sm">{apt.phone}</p>
                            </div>
                            <div>
                              <p className="text-white">{apt.service}</p>
                              <p className="text-white/60 text-sm">{apt.barber}</p>
                            </div>
                            <div>
                              <p className="text-white">{new Date(apt.date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                              <p className="text-white/60 text-sm">{apt.time}</p>
                            </div>
                            <div>
                              <p className="text-amber-400 font-medium">R$ {apt.price}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={apt.status === 'confirmed' ? 'default' : apt.status === 'completed' ? 'secondary' : 'outline'}
                            className={
                              apt.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                              apt.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                              'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            }
                          >
                            {apt.status === 'confirmed' ? 'Confirmado' : 
                             apt.status === 'completed' ? 'Concluído' : 'Pendente'}
                          </Badge>
                          
                          <div className="flex gap-1">
                            {apt.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
                            {apt.status === 'confirmed' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services */}
            <TabsContent value="services" className="space-y-6">
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Gerenciar Serviços</CardTitle>
                      <CardDescription className="text-white/60">
                        Edite preços, durações e descrições dos serviços
                      </CardDescription>
                    </div>
                    <Dialog open={isServiceModalOpen} onOpenChange={setIsServiceModalOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          onClick={() => {
                            setEditingService(null)
                            setIsServiceModalOpen(true)
                          }}
                          className="bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-500 hover:to-orange-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Novo Serviço
                        </Button>
                      </DialogTrigger>
                      <ServiceModal 
                        service={editingService} 
                        onSave={handleSaveService}
                        onClose={() => setIsServiceModalOpen(false)}
                      />
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => (
                      <Card key={service.id} className="border-white/10 bg-white/5">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-white text-lg">{service.name}</CardTitle>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingService(service)
                                  setIsServiceModalOpen(true)
                                }}
                                className="border-white/20 text-white hover:bg-white/10"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteService(service.id)}
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <CardDescription className="text-white/60">
                            {service.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white/80">
                              <Clock className="w-4 h-4 text-amber-400" />
                              <span className="text-sm">{service.duration} min</span>
                            </div>
                            <Badge variant="secondary" className="bg-amber-400/20 text-amber-400 border-amber-400/30">
                              R$ {service.price}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Barbers */}
            <TabsContent value="barbers" className="space-y-6">
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Gerenciar Barbeiros</CardTitle>
                      <CardDescription className="text-white/60">
                        Adicione, edite ou remova barbeiros da equipe
                      </CardDescription>
                    </div>
                    <Dialog open={isBarberModalOpen} onOpenChange={setIsBarberModalOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          onClick={() => {
                            setEditingBarber(null)
                            setIsBarberModalOpen(true)
                          }}
                          className="bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-500 hover:to-orange-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Novo Barbeiro
                        </Button>
                      </DialogTrigger>
                      <BarberModal 
                        barber={editingBarber} 
                        onSave={handleSaveBarber}
                        onClose={() => setIsBarberModalOpen(false)}
                      />
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {barbers.map((barber) => (
                      <Card key={barber.id} className="border-white/10 bg-white/5">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="text-4xl">{barber.image}</div>
                              <div>
                                <CardTitle className="text-white text-xl">{barber.name}</CardTitle>
                                <CardDescription className="text-white/60 mb-2">
                                  {barber.specialty}
                                </CardDescription>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                  <span className="text-amber-400 font-semibold">{barber.rating}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingBarber(barber)
                                  setIsBarberModalOpen(true)
                                }}
                                className="border-white/20 text-white hover:bg-white/10"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteBarber(barber.id)}
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm text-white/80">
                            <div className="flex items-center gap-2">
                              <span>Email:</span>
                              <span>{barber.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>Telefone:</span>
                              <span>{barber.phone}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-white">Horários de Funcionamento</CardTitle>
                  <CardDescription className="text-white/60">
                    Configure os horários de funcionamento da barbearia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(workingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                        <div className="w-24">
                          <Label className="text-white capitalize">
                            {day === 'monday' ? 'Segunda' :
                             day === 'tuesday' ? 'Terça' :
                             day === 'wednesday' ? 'Quarta' :
                             day === 'thursday' ? 'Quinta' :
                             day === 'friday' ? 'Sexta' :
                             day === 'saturday' ? 'Sábado' : 'Domingo'}
                          </Label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={hours.active}
                            onChange={(e) => handleWorkingHoursChange(day, 'active', e.target.checked)}
                            className="rounded"
                          />
                          <span className="text-white/60 text-sm">Ativo</span>
                        </div>
                        
                        {hours.active && (
                          <>
                            <div className="flex items-center gap-2">
                              <Label className="text-white/60 text-sm">Início:</Label>
                              <Input
                                type="time"
                                value={hours.start}
                                onChange={(e) => handleWorkingHoursChange(day, 'start', e.target.value)}
                                className="bg-white/10 border-white/20 text-white w-32"
                              />
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Label className="text-white/60 text-sm">Fim:</Label>
                              <Input
                                type="time"
                                value={hours.end}
                                onChange={(e) => handleWorkingHoursChange(day, 'end', e.target.value)}
                                className="bg-white/10 border-white/20 text-white w-32"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                    
                    <Button 
                      onClick={saveWorkingHours}
                      className="bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-500 hover:to-orange-600"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Horários
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  // Customer Booking Interface (same as before but using dynamic data)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-3 rounded-xl">
                <Scissors className="w-8 h-8 text-black" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">JMBARBEARIA</h1>
                <p className="text-amber-400 text-sm">Estilo e tradição desde 1995</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="text-sm">Rua Aberlado Pena 576</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span className="text-sm">(34) 99758-8780</span>
              </div>
              <div className="flex gap-2">
                <Instagram className="w-5 h-5 text-amber-400 hover:text-amber-300 cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 text-amber-400 hover:text-amber-300 cursor-pointer transition-colors" />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    currentStep >= step 
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-black" 
                      : "bg-white/10 text-white/60"
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-12 h-1 mx-2 transition-all ${
                      currentStep > step ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-white/10"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">
                {currentStep === 1 && "Escolha seu Serviço"}
                {currentStep === 2 && "Selecione o Barbeiro"}
                {currentStep === 3 && "Data e Horário"}
                {currentStep === 4 && "Seus Dados"}
              </h2>
              <p className="text-white/60">
                {currentStep === 1 && "Selecione o serviço desejado"}
                {currentStep === 2 && "Escolha seu barbeiro preferido"}
                {currentStep === 3 && "Defina quando quer ser atendido"}
                {currentStep === 4 && "Finalize seu agendamento"}
              </p>
            </div>
          </div>

          {/* Step 1: Services */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {activeServices.map((service) => (
                <Card 
                  key={service.id} 
                  className={`cursor-pointer transition-all hover:scale-105 border-2 ${
                    selectedService === service.id.toString()
                      ? "border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/20"
                      : "border-white/10 bg-white/5 hover:border-amber-400/50"
                  }`}
                  onClick={() => setSelectedService(service.id.toString())}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{service.name}</CardTitle>
                      <Badge variant="secondary" className="bg-amber-400/20 text-amber-400 border-amber-400/30">
                        R$ {service.price}
                      </Badge>
                    </div>
                    <CardDescription className="text-white/60">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-white/80">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="text-sm">{service.duration} min</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Step 2: Barbers */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {activeBarbers.map((barber) => (
                <Card 
                  key={barber.id}
                  className={`cursor-pointer transition-all hover:scale-105 border-2 ${
                    selectedBarber === barber.id.toString()
                      ? "border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/20"
                      : "border-white/10 bg-white/5 hover:border-amber-400/50"
                  }`}
                  onClick={() => setSelectedBarber(barber.id.toString())}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{barber.image}</div>
                      <div className="flex-1">
                        <CardTitle className="text-white text-xl">{barber.name}</CardTitle>
                        <CardDescription className="text-white/60 mb-2">
                          {barber.specialty}
                        </CardDescription>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-amber-400 font-semibold">{barber.rating}</span>
                          <span className="text-white/60 text-sm ml-1">(150+ avaliações)</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}

          {/* Step 3: Date and Time */}
          {currentStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-400" />
                    Selecione a Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" />
                    Horários Disponíveis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {initialTimeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className={selectedTime === time 
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-500 hover:to-orange-600" 
                          : "border-white/20 text-white hover:bg-white/10"
                        }
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Customer Info */}
          {currentStep === 4 && (
            <Card className="border-white/10 bg-white/5 mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-400" />
                  Seus Dados
                </CardTitle>
                <CardDescription className="text-white/60">
                  Preencha seus dados para finalizar o agendamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Telefone *</Label>
                    <Input
                      id="phone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="(34) 99999-9999"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-white">E-mail (opcional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="peryclesflorencio@yahoo.com"
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-white">Observações (opcional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Alguma observação especial..."
                    rows={3}
                  />
                </div>

                {/* Booking Summary */}
                {selectedServiceData && selectedBarberData && (
                  <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-white font-semibold mb-3">Resumo do Agendamento</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/80">
                        <span>Serviço:</span>
                        <span>{selectedServiceData.name}</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Barbeiro:</span>
                        <span>{selectedBarberData.name}</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Data:</span>
                        <span>{selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR') : '-'}</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Horário:</span>
                        <span>{selectedTime || '-'}</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Duração:</span>
                        <span>{selectedServiceData.duration} min</span>
                      </div>
                      <Separator className="bg-white/10" />
                      <div className="flex justify-between text-white font-semibold">
                        <span>Total:</span>
                        <span className="text-amber-400">R$ {selectedServiceData.price}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Voltar
            </Button>
            
            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-500 hover:to-orange-600"
              >
                Próximo
              </Button>
            ) : (
              <Button
                onClick={handleBooking}
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-500 hover:to-orange-600"
              >
                Confirmar Agendamento
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">JMBARBEARIA</h3>
              <p className="text-white/60 text-sm mb-4">
                Tradição e qualidade em cada corte. Mais de 25 anos cuidando do seu estilo.
              </p>
              <div className="flex gap-3">
                <Instagram className="w-5 h-5 text-amber-400 hover:text-amber-300 cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 text-amber-400 hover:text-amber-300 cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Horário de Funcionamento</h3>
              <div className="space-y-2 text-sm text-white/60">
                <div className="flex justify-between">
                  <span>Segunda - Sexta:</span>
                  <span>8h às 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span>8h às 17h</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span>Fechado</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Contato</h3>
              <div className="space-y-2 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Rua Aberlado Pena 576</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>(34) 99758-8780</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>peryclesflorencio@yahoo.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="bg-white/10 my-6" />
          
          <div className="text-center text-white/60 text-sm">
            © 2024 JMBARBEARIA. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

// Service Modal Component
function ServiceModal({ service, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: service?.name || "",
    price: service?.price || "",
    duration: service?.duration || "",
    description: service?.description || "",
    active: service?.active ?? true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.price || !formData.duration) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration)
    })
  }

  return (
    <DialogContent className="bg-slate-800 border-white/10 text-white">
      <DialogHeader>
        <DialogTitle>{service ? "Editar Serviço" : "Novo Serviço"}</DialogTitle>
        <DialogDescription className="text-white/60">
          {service ? "Modifique as informações do serviço" : "Adicione um novo serviço ao catálogo"}
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="serviceName" className="text-white">Nome do Serviço *</Label>
          <Input
            id="serviceName"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Ex: Corte Masculino"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="servicePrice" className="text-white">Preço (R$) *</Label>
            <Input
              id="servicePrice"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="bg-white/10 border-white/20 text-white"
              placeholder="25.00"
            />
          </div>
          
          <div>
            <Label htmlFor="serviceDuration" className="text-white">Duração (min) *</Label>
            <Input
              id="serviceDuration"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="bg-white/10 border-white/20 text-white"
              placeholder="30"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="serviceDescription" className="text-white">Descrição</Label>
          <Textarea
            id="serviceDescription"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Descrição do serviço..."
            rows={3}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="serviceActive"
            checked={formData.active}
            onChange={(e) => setFormData({...formData, active: e.target.checked})}
            className="rounded"
          />
          <Label htmlFor="serviceActive" className="text-white">Serviço ativo</Label>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose} className="border-white/20 text-white hover:bg-white/10">
            Cancelar
          </Button>
          <Button type="submit" className="bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-500 hover:to-orange-600">
            {service ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}

// Barber Modal Component
function BarberModal({ barber, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: barber?.name || "",
    specialty: barber?.specialty || "",
    email: barber?.email || "",
    phone: barber?.phone || "",
    image: barber?.image || "👨",
    rating: barber?.rating || 5.0,
    active: barber?.active ?? true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.specialty || !formData.email) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }
    onSave({
      ...formData,
      rating: parseFloat(formData.rating)
    })
  }

  return (
    <DialogContent className="bg-slate-800 border-white/10 text-white">
      <DialogHeader>
        <DialogTitle>{barber ? "Editar Barbeiro" : "Novo Barbeiro"}</DialogTitle>
        <DialogDescription className="text-white/60">
          {barber ? "Modifique as informações do barbeiro" : "Adicione um novo barbeiro à equipe"}
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="barberName" className="text-white">Nome Completo *</Label>
          <Input
            id="barberName"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Ex: João Silva"
          />
        </div>
        
        <div>
          <Label htmlFor="barberSpecialty" className="text-white">Especialidade *</Label>
          <Input
            id="barberSpecialty"
            value={formData.specialty}
            onChange={(e) => setFormData({...formData, specialty: e.target.value})}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Ex: Cortes Clássicos"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="barberEmail" className="text-white">Email *</Label>
            <Input
              id="barberEmail"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-white/10 border-white/20 text-white"
              placeholder="joao@jmbarbearia.com"
            />
          </div>
          
          <div>
            <Label htmlFor="barberPhone" className="text-white">Telefone</Label>
            <Input
              id="barberPhone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="bg-white/10 border-white/20 text-white"
              placeholder="(34) 99999-0000"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="barberImage" className="text-white">Emoji Avatar</Label>
            <Input
              id="barberImage"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="bg-white/10 border-white/20 text-white"
              placeholder="👨"
            />
          </div>
          
          <div>
            <Label htmlFor="barberRating" className="text-white">Avaliação</Label>
            <Input
              id="barberRating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: e.target.value})}
              className="bg-white/10 border-white/20 text-white"
              placeholder="5.0"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="barberActive"
            checked={formData.active}
            onChange={(e) => setFormData({...formData, active: e.target.checked})}
            className="rounded"
          />
          <Label htmlFor="barberActive" className="text-white">Barbeiro ativo</Label>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose} className="border-white/20 text-white hover:bg-white/10">
            Cancelar
          </Button>
          <Button type="submit" className="bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:from-amber-500 hover:to-orange-600">
            {barber ? "Atualizar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}