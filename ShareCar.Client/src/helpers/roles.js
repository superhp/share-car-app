import * as React from "react";

this.role = "";

export const RoleContext = React.createContext({
    role: this.role,
    changeRole: (newRole) => {
        this.role = newRole;
    }
});