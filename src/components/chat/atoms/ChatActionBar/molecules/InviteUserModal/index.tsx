import { Modal } from "@/components/common";
import { useState } from "react";
import { UserInterface } from "../../../../../../../@types";

export const InviteUserModal: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [users, setUsers] = useState<UserInterface[]>([]);

    return (
        <>
            <button onClick={() => setOpen(!open)}>Invite user</button>
            <Modal
                open={open}
                handleClose={() => setOpen(!open)}
                title="Invite user"
            >
                <div></div>
            </Modal>
        </>
    )
}