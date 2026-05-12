export interface IContact {
    name: string;
    email: string;
    message: string;
    createdAt?: Date; // Question mark ka matlab hai ye optional hai
}

export type FormState = {
    success?: boolean;
    message?: string;
    error?: string;
}