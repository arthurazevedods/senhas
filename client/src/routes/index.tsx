import { createFileRoute } from '@tanstack/react-router'
import {  Link } from '@tanstack/react-router'
import { User, Users, ListCheck } from "lucide-react";

export const Route = createFileRoute('/')({
  component: Index,
})

function Index (){
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-blue-50 to-white">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-extrabold">Gestão de Filas <span className="text-blue-600">Consultório</span></h1>
        <p className="mt-2 text-gray-700">Organize e agilize o atendimento do seu consultório!</p>
      </div>
      <div className="flex space-x-8 mb-4">
        <Link to="/senha" className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 hover:bg-blue-100 transition">
          <User className="h-10 w-10 text-blue-500 mb-2" />
          <span className="font-medium">Pegar Senha</span>
        </Link>
        <Link to="/chamadas" className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 hover:bg-green-100 transition">
          <Users className="h-10 w-10 text-green-500 mb-2" />
          <span className="font-medium">Chamadas</span>
        </Link>
        <Link to="/admin" className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6 hover:bg-yellow-100 transition">
          <ListCheck className="h-10 w-10 text-yellow-500 mb-2" />
          <span className="font-medium">Admin</span>
        </Link>
      </div>
    </div>
  );
};

export default Index;
