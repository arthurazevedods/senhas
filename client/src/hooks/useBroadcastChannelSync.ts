import { useEffect, useRef } from "react";
import useStore from "@/store/store";

export function useBroadcastChannelSync() {
  const setQueue = useStore((state) => state.setQueue);
  const setChamadas = useStore((state) => state.setChamadas);
  const channelRef = useRef<BroadcastChannel>(null);

  useEffect(() => {
    const channel = new BroadcastChannel("fila-senhas");
    channelRef.current = channel;
    channel.onmessage = (event) => {
      if (event.data.type === "UPDATE") {
        setQueue(event.data.queue);
        setChamadas(event.data.chamadas);
      }
    };
    return () => channel.close();
  }, [setQueue, setChamadas]);

  // Retorna o canal para uso em ações locais (ex: postMessage)
  return channelRef;
}