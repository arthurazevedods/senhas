/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { User, Users, Calendar, ArrowRight } from "lucide-react";
import { createFileRoute } from '@tanstack/react-router'


type Categoria = "REGULAR" | "GESTANTE" | "IDOSO" | "PCD";
type Senha = { tipo: Categoria, numero: number };

const cores: Record<Categoria, string> = {
  GESTANTE: "bg-pink-50 text-pink-700",
  IDOSO: "bg-yellow-50 text-yellow-800",
  PCD: "bg-green-50 text-green-700",
  REGULAR: "bg-blue-50 text-blue-700"
};

const nomes: Record<Categoria, string> = {
  GESTANTE: "Gestante",
  IDOSO: "Idoso",
  PCD: "PCD",
  REGULAR: "Regular"
};

const icones: Record<Categoria, any> = {
  GESTANTE: Calendar,
  IDOSO: User,
  PCD: Users,
  REGULAR: ArrowRight
};

export const Route = createFileRoute('/Chamadas')({
  component: ChamadasPage,
})

function ChamadasPage() {
  // Simulação de chamadas: os mais atuais vêm primeiro
  const [senhasChamadas, setSenhasChamadas] = useState<Senha[]>([
    { tipo: "IDOSO", numero: 2 },
    { tipo: "REGULAR", numero: 5 },
    { tipo: "GESTANTE", numero: 1 },
    { tipo: "PCD", numero: 1 },
    { tipo: "REGULAR", numero: 4 },
    { tipo: "IDOSO", numero: 1 },
  ]);

  const chamadaAtual = senhasChamadas[0];
  const anteriores = senhasChamadas.slice(1, 6);

  // Get the icon for the main display, if there is one
  const IconAtual = chamadaAtual ? icones[chamadaAtual.tipo] : null;

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white rounded-xl shadow-lg px-8 py-10 w-full max-w-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-green-900">Chamando Senha</h2>
        <div className={`flex flex-col items-center justify-center rounded-xl px-8 py-6 mb-3 shadow-md
          ${chamadaAtual ? cores[chamadaAtual.tipo] : "bg-gray-100"}
        `}>
          <div className="flex items-center gap-3 mb-2">
            {chamadaAtual && (
              <>
                {IconAtual && <span><IconAtual className="h-8 w-8" /></span>}
                <span className="text-xl font-semibold">{nomes[chamadaAtual.tipo]}</span>
              </>
            )}
          </div>
          <span className="text-5xl font-extrabold tracking-widest">
            {chamadaAtual ? chamadaAtual.tipo[0] + chamadaAtual.numero.toString().padStart(3, "0") : "--"}
          </span>
        </div>
        <p className="font-medium text-gray-500 text-sm mb-2">Chamadas anteriores:</p>
        <div className="flex flex-col gap-2 w-full max-w-md">
          {anteriores.length > 0 ? anteriores.map((c, i) => {
            const IconAnterior = icones[c.tipo];
            return (
              <div key={i} className={`flex items-center p-2 rounded font-bold shadow-sm
                ${cores[c.tipo]}`}>
                {IconAnterior && <IconAnterior className="h-5 w-5 mr-2" />}
                <span>{c.tipo[0] + c.numero.toString().padStart(3, "0")}</span>
                <span className="ml-2 text-xs text-gray-600">({nomes[c.tipo]})</span>
              </div>
            );
          }) : <span className="text-gray-400">Sem chamadas anteriores</span>}
        </div>
      </div>
    </div>
  );
}