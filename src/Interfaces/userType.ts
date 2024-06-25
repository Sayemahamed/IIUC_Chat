interface friend{
    uid: string;
    chatNode: string;
}
export default interface userType {
    name: string;
    uid: string;
    photoURL: string;
    email: string;
    friends: friend[];
}