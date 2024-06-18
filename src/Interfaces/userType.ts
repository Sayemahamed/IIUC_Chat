export default interface userType {
    name: string;
    uid: string;
    photoURL: string;
    email: string;
    friends: [{"uid": string,"chatNode": string}];
}