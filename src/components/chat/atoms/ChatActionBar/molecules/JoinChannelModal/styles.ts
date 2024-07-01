import styled from "styled-components";
import { sharedButtonStyles } from "../../../ChannelList/sharedStyles";
import { breakpoint } from "@/styles/utils";

export const JoinChannelButton = styled.button`
    ${sharedButtonStyles};
    padding: 0.2rem 1rem;

    &:hover:not([disabled]) {
        background-color: white;
    }

    label {
        cursor: pointer;
        margin-right: 0.5rem;
    }

    ${breakpoint('mobile')} {
        label {
            display: none;
        }
    }
`;
