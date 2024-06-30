import { useEffect, useMemo, useState } from "react"
import { MOBILE_BREAKPOINT } from "@/styles/theme";

interface UseWindowWidthOutput {
    windowWidth: number;
    isMobile: boolean;
}

export const useWindowWidth = (): UseWindowWidthOutput => {
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);

            const resizeListener = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', resizeListener);

            return () => window.removeEventListener('resize', resizeListener);
        }
    }, []);

    const isMobile = useMemo(() => windowWidth <= MOBILE_BREAKPOINT, [windowWidth]);

    return { windowWidth, isMobile };
}