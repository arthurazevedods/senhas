/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, Users, Calendar, ArrowRight } from "lucide-react";
import { createFileRoute } from '@tanstack/react-router'
import useStore from "@/store/store";
import type { Category, Ticket } from "@/models/ticket";
import { useEffect } from "react";
import { useBroadcastChannelSync } from "@/hooks/useBroadcastChannelSync";

const nomes: Record<Category, string> = {
  GESTANTE: "Gestante",
  IDOSO: "Idoso",
  PCD: "PCD",
  REGULAR: "Regular"
};
const cores: Record<Category, string> = {
  GESTANTE: "bg-pink-100 border-pink-300",
  IDOSO: "bg-yellow-100 border-yellow-300",
  PCD: "bg-green-100 border-green-300",
  REGULAR: "bg-blue-100 border-blue-300",
};
const icones: Record<Category, any> = {
  GESTANTE: Calendar,
  IDOSO: User,
  PCD: Users,
  REGULAR: ArrowRight
};

export const Route = createFileRoute('/Chamadas')({
  component: ChamadasPage,
})

function ChamadasPage() {
  useBroadcastChannelSync();
  const setQueue = useStore((state) => state.setQueue);
  const setChamadas = useStore((state) => state.setChamadas);
  const chamadas = useStore((state) => state.chamadas);

  // Pega a chamada atual e as anteriores
  const chamadaAtual = chamadas.length > 0 ? chamadas[0] : null;
  const anteriores = chamadas.slice(1);

  const IconAtual = chamadaAtual ? icones[chamadaAtual.tipo] : null;

  // Sincronização entre abas (apenas recebe)
  useEffect(() => {
    const channel = new BroadcastChannel("fila-senhas");
    channel.onmessage = (event) => {
      if (event.data.type === "UPDATE") {
        setQueue(event.data.queue);
        setChamadas(event.data.chamadas);
      }
    };
    return () => channel.close();
  }, [setQueue, setChamadas]);

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