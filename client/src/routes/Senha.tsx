/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { User, Users, Calendar, ArrowRight } from "lucide-react";
import { createFileRoute } from '@tanstack/react-router'

type Categoria = "REGULAR" | "GESTANTE" | "IDOSO" | "PCD";

const categorias: { tipo: Categoria, nome: string, icone: any, cor: string }[] = [
  { tipo: "GESTANTE", nome: "Gestante", icone: Calendar, cor: "bg-pink-100 border-pink-300" },
  { tipo: "IDOSO", nome: "Idoso", icone: User, cor: "bg-yellow-100 border-yellow-300" },
  { tipo: "PCD", nome: "PCD", icone: Users, cor: "bg-green-100 border-green-300" },
  { tipo: "REGULAR", nome: "Regular", icone: ArrowRight, cor: "bg-blue-100 border-blue-300" },
];

type Senha = {
  tipo: Categoria;
  numero: number;
};

export const Route = createFileRoute('/Senha')({
  component: SenhaPage,
})

function SenhaPage() {
  const [ultimaSenha, setUltimaSenha] = useState<Senha | null>(null);
  const [senhas, setSenhas] = useState<Senha[]>([]);

  const gerarSenha = (tipo: Categoria) => {
    // Busca o maior número dessa categoria e incrementa
    const ultNum = senhas.filter(s => s.tipo === tipo).map(s => s.numero).reduce((a, b) => Math.max(a, b), 0);
    const novaSenha = { tipo, numero: ultNum + 1 };
    setSenhas([...senhas, novaSenha]);
    setUltimaSenha(novaSenha);
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Pegar Senha</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {categorias.map(cat => (
            <button
              key={cat.tipo}
              className={`flex flex-col items-center border-2 rounded-lg p-4 transition hover:scale-105 ${cat.cor}`}
              onClick={() => gerarSenha(cat.tipo)}
            >
              <cat.icone className="h-7 w-7 mb-1" />
              <span className="font-semibold text-sm">{cat.nome}</span>
            </button>
          ))}
        </div>
        {ultimaSenha &&
          <div className="mt-8 flex flex-col items-center">
            <span className="text-lg text-gray-600">Sua senha:</span>
            <span className="text-4xl font-bold bg-blue-100 px-6 py-2 rounded-lg mt-1 shadow">
              {ultimaSenha.tipo[0]}{ultimaSenha.numero.toString().padStart(3, "0")}
            </span>
            <span className="text-xs text-gray-500 mt-2">{ultimaSenha.tipo.charAt(0) + ultimaSenha.numero.toString().padStart(3, "0")}</span>
          </div>
        }
      </div>
    </div>
  );
}
