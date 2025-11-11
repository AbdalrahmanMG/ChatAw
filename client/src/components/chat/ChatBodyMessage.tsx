import { useAuth } from "@/hooks/useAuth";
import type { MessageType } from "@/types/chatTypes";
import {
  containerClasses,
  contentWrapperClasses,
  messageClasses,
  replyBoxClasses,
} from "@/utils/styleHelper";
import AvatarBadge from "../AvatarBadge";
import { formatChatTime } from "@/utils/utils";
import { cn } from "@/lib/utils";
import { ReplyIcon } from "lucide-react";
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  message: MessageType;
  onReply?: (message: MessageType) => void;
}

const ChatBodyMessage = ({ message, onReply }: ChatMessageProps) => {
  const { user } = useAuth();
  const userId = user?._id || null;
  const isCurrentUser = message.sender?._id === userId;
  const senderName = isCurrentUser ? "You" : message.sender?.name;
  const replySenderName =
    message.replyTo?.sender?._id === userId
      ? "You"
      : message.replyTo?.sender?.name;

  return (
    <div className={containerClasses(isCurrentUser)}>
      {!isCurrentUser && (
        <div className="flex shrink-0 items-start">
          <AvatarBadge
            name={message.sender?.name || "No name"}
            src={message.sender?.avatar || ""}
          />
        </div>
      )}

      <div className={contentWrapperClasses(isCurrentUser)}>
        <div
          className={cn(
            "flex items-center gap-1",
            isCurrentUser && "flex-row-reverse"
          )}
        >
          <div className={messageClasses(isCurrentUser)}>
            {/* {Header} */}

            <div className="flex items-center gap-2 mb-0.5 pb-1">
              <span className="text-xs font-semibold">{senderName}</span>
              <span className="text-[11px] text-gray-700 dark:text-gray-300">
                {formatChatTime(message?.createdAt)}
              </span>
            </div>
            {message.replyTo && (
              <div className={replyBoxClasses(isCurrentUser)}>
                <h5 className="font-medium">{replySenderName}</h5>
                <p
                  className="font-normal text-muted-foreground
                 max-w-[250px]  truncate
                "
                >
                  {message?.replyTo?.content ||
                    (message?.replyTo?.image ? "📷 Photo" : "")}
                </p>
              </div>
            )}

            {message?.image && (
              <img
                src={message?.image || ""}
                alt=""
                className="rounded-lg max-w-xs"
              />
            )}

            {message.content && <p>{message.content}</p>}
          </div>

          {/* {Reply Icon Button} */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onReply?.(message)}
            className="flex opacity-0 group-hover:opacity-100
            transition-opacity rounded-full size-8!
            "
          >
            <ReplyIcon
              size={16}
              className={cn(
                "text-gray-500 dark:text-white stroke-[1.9]!",
                isCurrentUser && "scale-x-[-1]"
              )}
            />
          </Button>
        </div>

        {message.status && (
          <span
            className="block
           text-[10px] text-gray-400 mt-0.5"
          >
            {message.status}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatBodyMessage;
