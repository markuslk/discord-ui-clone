"use client";
import {
  Activity,
  Airplay,
  AppWindow,
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
import { useParams } from "next/navigation";
import {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useState,
} from "react";
import { format } from "date-fns";
import { faker } from "@faker-js/faker";
import { Message } from "./channels/[channelId]/page";

faker.seed(123);

const ServerPageLayout = ({ children }: { children: ReactNode }) => {
  const [closedCategories, setClosedCategories] = useState<Number[]>([]);
  const { serverId } = useParams();

  const server = data.find((server) => +server.id === +serverId);

  function toggleCategory(categoryId: number) {
    setClosedCategories((closedCategories) =>
      closedCategories.includes(categoryId)
        ? closedCategories.filter((id) => id !== categoryId)
        : [...closedCategories, categoryId],
    );
  }

  return (
    <>
      <div className="hidden w-60 flex-col bg-gray-800 md:flex">
        <button className="flex h-12 items-center px-4 text-[15px] font-bold shadow-md transition hover:bg-gray-550/[0.16]">
          <div className="relative mr-1 flex h-4 w-4 items-center justify-center">
            <Badge className="absolute size-5 fill-gray-550 text-gray-550" />
            <Check className="absolute size-3.5" />
          </div>
          Tailwind CSS
          <ChevronDown className="ml-auto size-[18px] opacity-80" />
        </button>
        <div className="flex-1 space-y-[21px] overflow-y-auto py-3 font-medium text-gray-300">
          {server?.categories.map((category) => (
            <div key={category.id}>
              {category.label && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex w-full items-center px-0.5 text-xs uppercase tracking-wide hover:text-gray-100"
                >
                  <ChevronDown
                    className={`${closedCategories.includes(category.id) ? "-rotate-90" : ""} mr-0.5 size-3`}
                  />
                  {category.label}
                </button>
              )}
              <div className="mt-[5px] space-y-0.5">
                {category.channels
                  .filter((channel: Channel) => {
                    let categoryIsOpen = !closedCategories.includes(
                      category.id,
                    );

                    return categoryIsOpen || channel.unread;
                  })
                  .map((channel) => (
                    <ChannelLink key={channel.id} channel={channel} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <>{children}</>
    </>
  );
};
export default ServerPageLayout;

export type Channel = {
  id: number;
  label: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  description?: string;
  unread?: boolean;
  messages: Message[];
};

const ChannelLink = ({ channel }: { channel: Channel }) => {
  const { id, label, icon: Icon } = channel;
  const { serverId } = useParams();
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
      href={`/servers/${serverId}/channels/${channel.id}`}
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

export const data = [
  {
    id: 1,
    label: "Tailwind CSS",
    icon: Activity,
    categories: [
      {
        id: 1,
        label: "",
        channels: [
          {
            id: 1,
            label: "welcome",
            icon: BookCheck,
            description:
              "Introduction to the Tailwind CSS framework and community.",
            messages: getMessages(),
          },
          {
            id: 2,
            label: "announcements",
            icon: Megaphone,
            messages: getMessages(),
          },
        ],
      },
      {
        id: 2,
        label: "Tailwind CSS",
        channels: [
          {
            id: 3,
            label: "general",
            unread: true,
            description:
              "General discussion of Tailwind CSS (please move off-topic discussion in the off-topic channels).",
            messages: getMessages(),
          },
          {
            id: 4,
            label: "plugins",
            unread: true,
            description: "Tailwind CSS plugins.",
            messages: getMessages(),
          },
          {
            id: 5,
            label: "help",
            description:
              "Help with Tailwind CSS and build process integration.",
            messages: getMessages(),
          },
          {
            id: 6,
            label: "internals",
            description: "Development of the Tailwind CSS framework itself.",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 3,
        label: "Tailwind Labs",
        channels: [
          {
            id: 7,
            label: "tailwind-ui",
            unread: true,
            description: "General discussion of Tailwind UI.",
            messages: getMessages(),
          },
          {
            id: 8,
            label: "headless-ui",
            description: "General discussion of Headless UI.",
            messages: getMessages(),
          },
          {
            id: 9,
            label: "refactoring-ui",
            description: "General discussion of Refactoring UI.",
            messages: getMessages(),
          },
          {
            id: 10,
            label: "heroicons",
            unread: true,
            description: "General discussion of Heroicons.",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 4,
        label: "Off topic",
        channels: [
          {
            id: 11,
            label: "design",
            description: "General discussion of web design.",
            messages: getMessages(),
          },
          {
            id: 12,
            label: "development",
            unread: true,
            description: "General discussion of web development.",
            messages: getMessages(),
          },
          {
            id: 13,
            label: "random",
            unread: true,
            description: "General discussion of everything else!",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 5,
        label: "Community",
        channels: [
          {
            id: 14,
            label: "jobs",
            description:
              "Job board. Please put [HIRING] or [FOR HIRE] at the beginning of your post.",
            messages: getMessages(),
          },
          {
            id: 15,
            label: "showcase",
            description: "Share your projects built with Tailwind CSS!",
            messages: getMessages(),
            unread: true,
          },
          {
            id: 16,
            label: "bots",
            description: "Bot spam containment.",
            messages: getMessages(),
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Next.js",
    icon: Airplay,
    categories: [
      {
        id: 6,
        label: "",
        channels: [
          {
            id: 17,
            label: "welcome",
            icon: BookCheck,
            messages: getMessages(),
          },
          {
            id: 18,
            label: "announcements",
            icon: Megaphone,
            description:
              "Announcements related to this Discord server and Next.js",
            messages: getMessages(),
          },
          {
            id: 19,
            label: "introductions",
            unread: true,
            description:
              "Welcome to the server! Feel free to introduce yourself",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 7,
        label: "Need-Help",
        channels: [
          {
            id: 20,
            label: "community-help",
            description:
              "Members of the community can help each other here, but we recommend checking GitHub discussions first: ",
            messages: getMessages(),
          },
        ],
      },
      {
        id: 8,
        label: "Community",
        channels: [
          {
            id: 21,
            label: "general",
            description: "Discussions about Next.js in general",
            messages: getMessages(),
          },
          {
            id: 22,
            label: "off-topic",
            unread: true,
            description:
              "Discussions about topics not related to Next.js or other channels",
            messages: getMessages(),
          },
          {
            id: 23,
            label: "showcase",
            unread: true,
            messages: getMessages(),
          },
          {
            id: 24,
            label: "jobs-board",
            description:
              "Is your company looking for Next.js developers? Discuss here!",
            messages: getMessages(),
          },
          {
            id: 25,
            label: "hire-me",
            unread: true,
            description: "Are you a developer looking to work with Next.js?",
            messages: getMessages(),
          },
          {
            id: 26,
            label: "makers",
            description:
              "Share as you build in public. Welcoming all makers and indie hackers.",
            messages: getMessages(),
          },
          {
            id: 27,
            label: "moderation-feedback",
            description:
              "Discussion about this Discord server and moderation topics",
            messages: getMessages(),
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Mirage JS",
    icon: AppWindow,
    categories: [
      {
        id: 9,
        label: "Text Channels",
        channels: [
          { id: 28, label: "general", messages: getMessages() },
          { id: 29, label: "graphql", unread: true, messages: getMessages() },
          {
            id: 30,
            label: "typescript",
            unread: true,
            messages: getMessages(),
          },
        ],
      },
    ],
  },
];

function getMessages() {
  return [...Array(faker.number.int({ min: 7, max: 25 }))]
    .map(() => {
      let user = faker.internet.userName();

      return [...Array(faker.number.int({ min: 1, max: 4 }))].map(() => ({
        id: faker.number.int(),
        user,
        date: format(new Date(faker.date.past()), "MM/dd/yyyy"),
        text: faker.lorem.sentences(3),
      }));
    })
    .flat();
}
