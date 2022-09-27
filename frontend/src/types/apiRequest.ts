import { Message, Rollingpaper, Team, TeamMember } from ".";
import { PickWithPrefix } from "naepyeon-types";

type RollingpaperId = PickWithPrefix<Rollingpaper, "id", "rollingpaper">;
type TeamId = PickWithPrefix<Team, "id", "team">;

// kakao oauth
export interface postKakaoOauthRequest {
  authorizationCode: string;
  redirectUri: string;
}

// google oauth
export interface postGoogleOauthRequest {
  authorizationCode: string;
  redirectUri: string;
}

// member
export interface GetMyReceivedRollingpapersRequest {
  page: number;
  count: number;
}

export interface GetMySentMessagesRequest {
  page: number;
  count: number;
}

// message
export interface PostMessageRequest
  extends Pick<Message, "content" | "color" | "anonymous" | "secret">,
    RollingpaperId {}
export interface PutMessageRequest
  extends Pick<Message, "id" | "content" | "color" | "anonymous" | "secret">,
    RollingpaperId {}

export interface DeleteMessageRequest extends RollingpaperId {
  id: Message["id"];
}

// rollingpaper
export interface GetRollingpaperRequest extends TeamId {
  id: Rollingpaper["id"];
}

export interface PostTeamRollingpaperRequest extends TeamId {
  title: Rollingpaper["title"];
}

export interface PostMemberRollingpaperRequest extends TeamId {
  title: Rollingpaper["title"];
  addresseeId: TeamMember["id"];
}

// teams
export interface GetTeamSearchResultRequest {
  keyword: string;
  count: number;
}

export interface PostTeamRequest extends Omit<Team, "id" | "joined"> {
  nickname: TeamMember["nickname"];
}

export interface PostTeamMemberWithInviteTokenRequest {
  inviteToken: string;
  nickname: TeamMember["nickname"];
}
