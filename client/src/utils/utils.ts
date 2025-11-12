import { useSocket } from "@/hooks/useSocket";
import type { ChatType } from "@/types/chatTypes";
import {format, isThisWeek, isToday, isYesterday} from "date-fns"
import { v4 as uuidv4 } from "uuid";

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

export const getOtherUsersAndGroup= (chat: ChatType, userId: string | null)=> {
  const isGroup = chat.isGroup
  if(isGroup) {
    return {
      name: chat.groupName || "N/A",
      subheading: `${chat.participants.length} memebers`,
      avatar: "",
      isGroup
    }
  }

  const otherUser = chat?.participants.find(
    p=> p._id !== userId
  )

  const isOnline = isUserOnline(otherUser?._id ?? "")

  return {
    name: otherUser?.name || "Unknown",
    subheading: isOnline,
    avatar: otherUser?.avatar || "",
    isGroup: false,
    isOnline
  }
}

export const formatChatTime = (date: string | Date) =>{
  if(!date) return ""
  const newDate = new Date(date)
  if(isNaN(newDate.getTime())) return "Invalid date"

  if(isToday(newDate)) return format(newDate, "h:mm a")
  if(isYesterday(newDate)) return "Yesterday"
  if(isThisWeek(newDate)) return format(newDate, " EEEE")
  return format(newDate, "M/d")
}

export const generateUUID=()=>{
  return uuidv4()
}