import { useSocket } from "@/hooks/useSocket";

export const isUserOnline = (userId?: string) =>{
  if(!userId) return false;
  // use getstate() because your are out of component
  const {onlineUsers} = useSocket.getState();
  return onlineUsers.includes(userId)
}

export const avatarFallback =(name: string): string =>{
  if(!name || name.trim().length === 0) {
    return "N/A"
  }

  const names = name.trim().split(" ")
  if(names.length === 1) {
    return names[0].charAt(0).toUpperCase()
  }

  const returnedName = names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase

  return returnedName
}