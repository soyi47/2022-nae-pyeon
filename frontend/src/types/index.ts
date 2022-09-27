import { PickWithPrefix, ValueOf } from "naepyeon-types";
import { RECIPIENT } from "@/constants";

export interface Team {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
  joined: boolean;
  secret: boolean;
}

export interface Message {
  id: number;
  content: string;
  from: string;
  color: string;
  anonymous: boolean;
  secret: boolean;
  editable: boolean;
  visible: boolean;
}

export interface Rollingpaper {
  id: number;
  title: string;
  to: string;
  recipient: Recipient;
  messages: Message[];
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface TeamMember {
  id: number;
  nickname: string;
}

export interface ReceivedRollingpaper
  extends Pick<Rollingpaper, "id" | "title">,
    PickWithPrefix<Team, "id" | "name", "team"> {}

export interface SentMessage
  extends Pick<Message, "id" | "content" | "color">,
    PickWithPrefix<Team, "id" | "name", "team">,
    PickWithPrefix<Rollingpaper, "id" | "title", "rollingpaper"> {
  to: Rollingpaper["to"];
}

export type CustomError = {
  errorCode: number;
  message: string;
};

export type Recipient = ValueOf<typeof RECIPIENT>;
