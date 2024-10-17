export type User = {
    username: string
    github: string
}

export type UserID = string;

export interface UserWithID extends User {
    id: string
}