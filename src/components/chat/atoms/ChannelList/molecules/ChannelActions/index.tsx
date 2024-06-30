import { useEffect, useRef, useState } from "react";
import { Channel } from "@pubnub/chat";
import { Icon } from "@/components/common";
import { ActionsWrapper, ChannelActionButton, CopyChannelButton } from "./styles";

interface ChannelActionsProps {
    channel: Channel;
}

export const ChannelActions: React.FC<ChannelActionsProps> = ({ channel }) => {
    const [optionsOpen, setOptionsOpen] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const onClick = () => {
        setOptionsOpen(!optionsOpen);
    }

    const handleCopyRoomId = () => {
        if (!channel?.id) return;

        navigator.clipboard.writeText(channel.id);
        setOptionsOpen(!optionsOpen);
    };

    const listenForMouseMove = (e: any) => {
        setOptionsOpen(Boolean(containerRef.current?.contains(e.target)))
    }

    useEffect(() => {
        window.addEventListener('click', listenForMouseMove);

        return () => window.removeEventListener('click', listenForMouseMove);
    }, []);

    return (
        <>
            <ActionsWrapper ref={containerRef} $open={optionsOpen}>
                <CopyChannelButton onClick={(e) => {
                    e.stopPropagation();
                    handleCopyRoomId();
                }}>
                    Copy room code
                </CopyChannelButton>
            </ActionsWrapper>
            <ChannelActionButton onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}>
                <Icon variant="more" size={10} />
            </ChannelActionButton>
        </>
    )
}