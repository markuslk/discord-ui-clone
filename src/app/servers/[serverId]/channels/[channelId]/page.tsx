"use client";
import { useParams } from "next/navigation";
import { Channel, data } from "../../layout";
import {
  Bell,
  CircleHelp,
  Hash,
  Inbox,
  Menu,
  MessageSquare,
  Pin,
  Search,
  Users,
} from "lucide-react";

const ChannelPage = () => {
  const { serverId } = useParams();
  const { channelId } = useParams();

  const server = data.find((server) => +server.id === +serverId);
  const channel = server?.categories
    .map((c) => c.channels)
    .flat()
    .find((channel) => +channel.id === +channelId) as Channel;

  return (
    <div className="flex min-w-0 flex-1 flex-shrink flex-col bg-gray-700">
      <div className="flex h-12 items-center px-2 shadow-md">
        <div className="flex items-center">
          <Menu className="size-6 cursor-pointer font-semibold text-gray-400 hover:text-gray-100 md:hidden" />
          <Hash className="mx-2 size-6 font-semibold text-gray-400" />
          <span className="mr-2 whitespace-nowrap font-semibold text-white">
            {channel?.label}
          </span>
        </div>
        {channel?.description && (
          <>
            <div className="mdlg:block mx-2 hidden h-6 w-px bg-white/[.06]" />
            <div className="mdlg:block mx-2 hidden truncate text-sm font-medium text-gray-200">
              {channel.description}
            </div>
          </>
        )}
        {/* Mobile buttons */}

        <div className="mdlg:hidden ml-auto flex items-center">
          <button className="text-gray-200 hover:text-gray-100">
            <MessageSquare className="mx-2 size-6" />
          </button>
          <button className="text-gray-200 hover:text-gray-100">
            <Users className="mx-2 size-6" />
          </button>
        </div>

        {/* Desktop buttons */}
        <div className="mdlg:flex ml-auto hidden items-center">
          <button className="text-gray-200 hover:text-gray-100">
            <MessageSquare className="mx-2 size-6" />
          </button>
          <button className="text-gray-200 hover:text-gray-100">
            <Bell className="mx-2 size-6" />
          </button>
          <button className="text-gray-200 hover:text-gray-100">
            <Pin className="mx-2 size-6" />
          </button>
          <button className="text-gray-200 hover:text-gray-100">
            <Users className="mx-2 size-6" />
          </button>
          <div className="relative mx-2">
            <input
              type="text"
              className="h-6 w-36 rounded border-none bg-gray-900 px-1.5 text-sm font-medium placeholder-gray-400"
              placeholder="Search"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Search className="mr-1.5 size-4 text-gray-400" />
            </div>
          </div>
          <button className="text-gray-200 hover:text-gray-100">
            <Inbox className="mx-2 size-6" />
          </button>
          <button className="text-gray-200 hover:text-gray-100">
            <CircleHelp className="mx-2 size-6" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-scroll pb-4">
        {channel.messages.map((message, i) => (
          <div key={i}>
            {i === 0 || message.user !== channel.messages[i - 1].user ? (
              <MessageWithUser message={message} />
            ) : (
              <Message message={message} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChannelPage;

export type Message = {
  user: string;
  date: string;
  text: string;
};

function MessageWithUser({ message }: { message: Message }) {
  return (
    <div className="mt-[17px] flex py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]">
      <div className="mr-4 mt-0.5 h-10 w-10 shrink-0 rounded-full bg-gray-300" />
      <div>
        <p className="flex items-baseline font-medium">
          <span className="mr-2 text-green-400">{message.user}</span>
          <span className="text-xs text-gray-400">{message.date}</span>
        </p>
        <p className="text-gray-100">{message.text}</p>
      </div>
    </div>
  );
}

function Message({ message }: { message: Message }) {
  return (
    <div className="py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]">
      <p className="pl-14 text-gray-100">{message.text}</p>
    </div>
  );
}
