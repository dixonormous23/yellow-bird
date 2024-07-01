import { useCallback, useEffect, useState } from "react";
import { NetworkDisconnectedContainer } from "./styles";

export const NetworkStatus: React.FC = () => {
    const [offline, setOffline] = useState<boolean>(false);

    const listenForOffline = useCallback(() => {
        setOffline(true);
    }, []);

    const listenForOnline = useCallback(() => {
        setOffline(false);
    }, []);

    useEffect(() => {
        if (typeof navigator !== 'undefined' && typeof window !== 'undefined') {
            window.addEventListener('online', listenForOnline);
            window.addEventListener('offline', listenForOffline);

            return () => {
                window.removeEventListener('online', listenForOnline);
                window.removeEventListener('offline', listenForOffline);
            }
        }
    }, [listenForOffline, listenForOnline]);

    return (
        <NetworkDisconnectedContainer>You are currently offline..</NetworkDisconnectedContainer>
    )
}