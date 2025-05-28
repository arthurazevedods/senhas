import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createFileRoute } from '@tanstack/react-router'
import useStore from "@/store/store";
import type { Category, Ticket } from "@/models/ticket";
import { useBroadcastChannelSync } from "@/hooks/useBroadcastChannelSync";


const nomes: Record<Category, string> = {
  GESTANTE: "Gestante",
  IDOSO: "Idoso",
  PCD: "PCD",
  REGULAR: "Regular"
};
const corBadge: Record<Category, string> = {
  GESTANTE: "bg-pink-100 text-pink-700",
  IDOSO: "bg-yellow-100 text-yellow-800",
  PCD: "bg-green-100 text-green-700",
  REGULAR: "bg-blue-100 text-blue-700"
};

export const Route = createFileRoute('/Admin')({
  component: Admin,
})

function Admin() {
  const channelRef = useBroadcastChannelSync();
  const fila = useStore((state) => state.queue);
  const setFila = useStore((state) => state.setQueue);
  const chamadas = useStore((state) => state.chamadas);
  const setChamadas = useStore((state) => state.setChamadas);

  const chamarProxima = () => {
    if (fila.length > 0) {
      const novasChamadas = [fila[0], ...chamadas];
      const novaFila = fila.slice(1);
      setChamadas(novasChamadas);
      setFila(novaFila);
      channelRef.current?.postMessage({ type: "UPDATE", queue: novaFila, chamadas: novasChamadas });
    }
  };

  const reinserirFila = (senha: Ticket) => {
    const novaFila = [...fila, senha];
    const novasChamadas = chamadas.filter(s => !(s.tipo === senha.tipo && s.numero === senha.numero));
    setFila(novaFila);
    setChamadas(novasChamadas);
    channelRef.current?.postMessage({ type: "UPDATE", queue: novaFila, chamadas: novasChamadas });
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center p-8 bg-gradient-to-br from-yellow-50 to-gray-50 py-10">
      <div className="bg-white rounded-xl shadow-md p-8 w-full m-10 flex flex-col items-center">
        <h2 className="text-2xl font-bold  mb-6 text-yellow-700">Administração de Filas</h2>
        <div className="w-full mb-8">
          <h3 className="text-lg font-semibold mb-2">Fila Atual</h3>
          {fila.length === 0 ? <p className="text-gray-400">Fila vazia</p> :
            <ul className="space-y-2">
              {fila.map((s, i) => (
                <li key={i} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded shadow-sm">
                  <span className={`px-3 py-1 rounded ${corBadge[s.tipo]} font-medium mr-3`}>
                    {s.tipo[0]}{s.numero.toString().padStart(3, "0")}
                  </span>
                  <span className="text-gray-700">{nomes[s.tipo]}</span>
                  {i === 0 &&
                    <Button onClick={chamarProxima} className="ml-3" variant="outline" size="sm">
                      Chamar <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  }
                </li>
              ))}
            </ul>
          }
        </div>
        <div className="w-full mt-5">
          <h3 className="text-lg font-semibold mb-2">Chamadas Realizadas</h3>
          {chamadas.length === 0 ? <p className="text-gray-400">Nenhuma chamada</p> :
            <ul className="space-y-2">
              {chamadas.map((s, i) => (
                <li key={i} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded shadow">
                  <span className={`px-3 py-1 rounded ${corBadge[s.tipo]} font-medium mr-3`}>
                    {s.tipo[0]}{s.numero.toString().padStart(3, "0")}
                  </span>
                  <span className="text-gray-700">{nomes[s.tipo]}</span>
                  <Button onClick={() => reinserirFila(s)} className="ml-3" variant="ghost" size="sm">
                    Recolocar na fila
                  </Button>
                </li>
              ))}
            </ul>
          }
        </div>
      </div>
    </div>
  );
}