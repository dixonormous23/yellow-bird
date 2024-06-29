'use client'

import React, { useEffect, useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import { ProviderProps } from '../@types';

export default function StyledComponentsRegistry({ children }: ProviderProps) {
    const [mounted, setMounted] = useState<boolean>(false);
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement()
        styledComponentsStyleSheet.instance.clearTag()
        return <>{styles}</>
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (typeof window !== 'undefined') return <>{children}</>

    return (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
            {children}
        </StyleSheetManager>
    );
};
