import { useEffect, useState, useCallback } from "react";
import { NetworkStatusChip } from "./styles";

export const NetworkConnectionStatus: React.FC = () => {
    const [online, setOnline] = useState<boolean | null>(null);
    const [offline, setOffline] = useState<boolean>(false);

    const handleOffline = useCallback(() => {
        setOffline(!offline);
        setOnline(!online);
    }, [offline, online]);

    const handleOnline = useCallback(() => {
        setOffline(!offline);
        setOnline(!online);
    }, [offline, online]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('offline', handleOffline);
            window.addEventListener('online', handleOnline);

            return () => {
                window.removeEventListener('offline', handleOffline);
                window.removeEventListener('online', handleOnline); 
            }
        }
    }, [handleOnline, handleOffline]);
    
    if (online) {
        return (
            <NetworkStatusChip $online>
                <label>Back online!</label>
            </NetworkStatusChip>
        )
    }

    if (!offline) return null;

    return (
        <NetworkStatusChip>
            <label>You are currently offline..</label>
        </NetworkStatusChip>
    );
}