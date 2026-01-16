export interface IAddRating {
    user: string;
    order:string | null;
    rating:number | undefined;
    comment: string | undefined;
}