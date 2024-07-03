import { useEffect, useMemo, useState } from "react";
import { usePubNubContext } from "@/context/PubNubContext";
import { useAuthContext } from "@/context/AuthContext";
import { StyledTypingIndicator } from "./styles";

export const TypingIndicator: React.FC = () => {
    const { user } = useAuthContext();
    const { activeChannel, activeChannelMembers } = usePubNubContext();
    const [usersTyping, setUsersTyping] = useState<string[]>([]);

    useEffect(() => {
        const getTypingUsers = () => {
            activeChannel?.getTyping((ids) => setUsersTyping(ids))
        };

        getTypingUsers();
    }, [activeChannel]);

    // @TODO - Should spend some time to support multiple users typing, e.g userOne and userTwo are typing.
    const typingUsers = useMemo(() => {
        if (!user) return;
        // Don't display typing indicator if the current, local user is the one typing
        const users = activeChannelMembers.filter((member) => usersTyping.includes(member.id) && member.id !== user.uid);
        return users.map((user) => user.name).join(', ');
    }, [activeChannelMembers, usersTyping, user]);

    return <StyledTypingIndicator>{typingUsers?.length ? `${typingUsers} is typing..` : ""}</StyledTypingIndicator>
}