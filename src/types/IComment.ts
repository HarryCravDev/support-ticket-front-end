export default interface IComment {
    _id: string;
    user: string;
    ticket: string;
    comment: string;
    username: string;
    isStaff?: boolean;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}