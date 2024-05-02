import { auth } from "@clerk/nextjs"

const allowedUsers = [
    "user_2fpXkPBR0xV8EErwLQQufkrLzsr"
]

export const isAdmin = () => {
    const {userId} = auth()
    if(!userId){
        return false;
    }
    return allowedUsers.indexOf(userId) !== -1  // this will check if the userId from auth is inside array it return any index otherwise it return -1
}