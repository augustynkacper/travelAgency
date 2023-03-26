import { BoughtTrip } from "./BoughtTrip";

export interface Roles {
    admin: boolean;
        client:boolean;
        manager:boolean;
}

export interface User {
    email: string;
    nick: string;
    bought: BoughtTrip[];
    id:string;
    ban:boolean;
    roles: {
        admin: boolean;
        client:boolean;
        manager:boolean;
    };
}