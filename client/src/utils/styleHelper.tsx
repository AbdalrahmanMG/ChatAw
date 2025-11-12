import { cn } from "@/lib/utils";

export const containerClasses = (isCurrentUser: boolean) => {
  return cn(
    "group flex gap-2 py-3 px-4",
    isCurrentUser && "flex-row-reverse text-left"
  );
};

export const contentWrapperClasses = (isCurrentUser: boolean) => {
  return cn(
    "max-w-[70%] flex flex-col relative",
    isCurrentUser && "items-end"
  );
};

export const messageClasses = (isCurrentUser: boolean) => {
  return cn(
    "min-w-[200px] px-3 py-4 text-sm break-words shadow-sm",
    isCurrentUser ? "bg-accent bg-primary/20 dark:bg-primary/40 rounded-tr-xl rounded-l-xl" 
    : "bg-[#F5F5F5] dark:bg-accent rounded-bl-xl rounded-r-xl"
  );
};

export const replyBoxClasses = (isCurrentUser: boolean) => {
  return cn(
    "mb-2 p-2 text-xs rounded-md border-l-4 shadow-md text-left!",
    isCurrentUser ? "bg-primary/20 border-l-primary" 
    : "bg-gray-200 dark:bg-secondary border-l-[#CC4A31"
  );
};
