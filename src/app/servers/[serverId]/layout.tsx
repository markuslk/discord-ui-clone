"use client";
import {
  Badge,
  BookCheck,
  Check,
  ChevronDown,
  Hash,
  LucideProps,
  Megaphone,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import { useParams } from "next/navigation";

const ServerPageLayout = ({
  params,
  children,
}: {
  params: { serverId: string };
  children: ReactNode;
}) => {
  return (
    <>
      <div className="flex w-60 flex-col bg-gray-800">
        <button className="flex h-12 items-center px-4 text-[15px] font-bold shadow-md transition hover:bg-gray-550/[0.16]">
          <div className="relative mr-1 flex h-4 w-4 items-center justify-center">
            <Badge className="absolute size-5 fill-gray-550 text-gray-550" />
            <Check className="absolute size-3.5" />
          </div>
          Tailwind CSS
          <ChevronDown className="ml-auto size-[18px] opacity-80" />
        </button>
        <div className="flex-1 space-y-[21px] overflow-y-auto py-3 font-medium text-gray-300">
          {data["1"].categories.map((category) => (
            <div key={category.id}>
              {category.label && (
                <button className="flex w-full items-center px-0.5 text-xs uppercase tracking-wide hover:text-gray-100">
                  <ChevronDown className="mr-0.5 size-3" />
                  {category.label}
                </button>
              )}
              <div className="mt-[5px] space-y-0.5">
                {category.channels.map((channel) => (
                  <ChannelLink
                    key={channel.id}
                    channel={channel}
                    server={params.serverId}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>{children}</div>
    </>
  );
};
export default ServerPageLayout;

type Channel = {
  id: number;
  label: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  unread?: boolean;
};

const ChannelLink = ({
  channel,
  server,
}: {
  channel: Channel;
  server: string;
}) => {
  const { id, label, icon: Icon } = channel;
  const { channelId } = useParams();
  let active = +channel.id === +channelId;
  let state: "active" | "inactiveUnread" | "inactiveRead" = active
    ? "active"
    : channel.unread
      ? "inactiveUnread"
      : "inactiveRead";

  let classes = {
    active: "bg-gray-550/[0.32] text-white",
    inactiveUnread: "text-white hover:bg-gray-550/[0.16] hover:text-gray-100",
    inactiveRead: "text-gray-300 hover:bg-gray-550/[0.16] hover:text-gray-100",
  };

  return (
    <Link
      key={id}
      href={`/servers/${server}/channels/${channel.id}`}
      className={`${classes[state]} group relative mx-2 flex items-center rounded px-2 py-1 font-normal`}
    >
      {state === "inactiveUnread" && (
        <div className="absolute left-0 -ml-2 h-2 w-1 rounded-r-full bg-white" />
      )}
      {Icon ? (
        <Icon className="mr-1.5 size-5 text-gray-400" />
      ) : (
        <Hash className="mr-1.5 size-5 text-gray-400" />
      )}
      {label}
      <UserPlus className="ml-auto size-4 fill-gray-200 text-gray-200 opacity-0 hover:fill-gray-100 hover:text-gray-100 group-hover:opacity-100" />
    </Link>
  );
};

let data = {
  "1": {
    label: "Tailwind CSS",
    categories: [
      {
        id: 1,
        label: "",
        channels: [
          { id: 1, label: "welcome", icon: BookCheck },
          { id: 2, label: "announcements", icon: Megaphone },
        ],
      },
      {
        id: 2,
        label: "Tailwind CSS",
        channels: [
          { id: 3, label: "general", unread: true },
          { id: 4, label: "plugins", unread: true },
          { id: 5, label: "help" },
          { id: 6, label: "internals" },
        ],
      },
      {
        id: 3,
        label: "Tailwind Labs",
        channels: [
          { id: 7, label: "tailwind-ui", unread: true },
          { id: 8, label: "headless-ui" },
          { id: 9, label: "refactoring-ui" },
          { id: 10, label: "heroicons", unread: true },
        ],
      },
      {
        id: 4,
        label: "Off topic",
        channels: [
          { id: 11, label: "design" },
          { id: 12, label: "development", unread: true },
          { id: 13, label: "random", unread: true },
        ],
      },
      {
        id: 5,
        label: "Community",
        channels: [
          { id: 14, label: "jobs" },
          { id: 15, label: "showcase" },
          { id: 16, label: "bots", unread: true },
        ],
      },
    ],
  },
};
