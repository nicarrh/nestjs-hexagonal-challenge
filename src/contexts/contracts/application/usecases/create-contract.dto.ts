export interface createContractDto {
    clientName: string;
    email: string;
    accountNumber: string;
    amount: number;
    currency: string;
    initialDate?: string | Date;
}