import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import chatImg from "@/assets/Group_Chat-amico1.png"

interface ChatPlaceholderProps {
  title?: string;
  description?: string;
}
const ChatPlaceholder = ({
  title = "No chat selected",
  description = "Pick a chat or start new one",
}: ChatPlaceholderProps) => {
  return (
    <Empty className="w-full h-full flex items-center justify-center ">
      <EmptyHeader>
        <EmptyMedia variant="default" className=" w-[600px]">
          <img src={chatImg} alt="Chat placeholder" className="" />
        </EmptyMedia>
        <EmptyTitle className="font-semibold text-2xl">{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default ChatPlaceholder;
