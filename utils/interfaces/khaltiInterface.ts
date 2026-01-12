export interface IInitiateKhalti {
    amount: number;
    orderId: string | null;
    food: string
}

export interface IVerifyKhalti {
    pidx:string | null;
    orderId:string | null;
}

