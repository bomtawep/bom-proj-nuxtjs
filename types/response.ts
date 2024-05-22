import type { TUsers } from '~/types/users/users';
export interface TResponse {
    data: TUsers;
    status: number;
    message: string;
}