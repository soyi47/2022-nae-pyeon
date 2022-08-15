import React, { useEffect } from "react";
import styled from "@emotion/styled";

import useParamValidate from "@/hooks/useParamValidate";
import useInput from "@/hooks/useInput";
import useCheckLogin from "@/pages/InvitePage/hooks/useCheckLogin";
import useCheckTeamJoined from "@/pages/InvitePage/hooks/useCheckTeamJoined";

import useTeamDetailWithInviteToken from "@/pages/InvitePage/hooks/useTeamDetailWithInviteToken";
import useJoinTeamWithInviteToken from "@/pages/InvitePage/hooks/useJoinTeamWithInviteToken";

import UnderlineInput from "@/components/UnderlineInput";
import LineButton from "@/components/LineButton";

import TeamDescriptionBox from "@/pages/InvitePage/components/TeamDescriptionBox";

import { REGEX } from "@/constants";

const InvitePage = () => {
  const { inviteToken } = useParamValidate(["inviteToken"]);

  const { value: nickname, handleInputChange } = useInput("");
  const checkLogin = useCheckLogin(inviteToken);
  const handleTeamDetailWithInviteTokenSuccess = useCheckTeamJoined();

  const { data: teamDetail, isLoading } = useTeamDetailWithInviteToken({
    inviteToken,
    onSuccess: handleTeamDetailWithInviteTokenSuccess,
  });

  const joinTeamWithInviteToken = useJoinTeamWithInviteToken(teamDetail?.id);

  const handleTeamJoinSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    joinTeamWithInviteToken({
      nickname,
      inviteToken,
    });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  if (isLoading || !teamDetail) {
    return <div>로딩 중</div>;
  }

  return (
    <StyledPage>
      <TeamDescriptionBox
        color={teamDetail.color}
        emoji={teamDetail.emoji}
        name={teamDetail.name}
        description={teamDetail.description}
      />
      <StyledJoinForm onSubmit={handleTeamJoinSubmit}>
        <p>모임에서 사용할 닉네임을 입력해주세요. (1 ~ 20자)</p>
        <UnderlineInput
          value={nickname}
          pattern={REGEX.TEAM_NICKNAME.source}
          errorMessage="1 ~ 20자 사이의 닉네임을 입력해주세요"
          onChange={handleInputChange}
        />
        <LineButton type="submit">모임 가입하기</LineButton>
      </StyledJoinForm>
    </StyledPage>
  );
};

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  height: 100vh;
  padding-top: 40px;
`;

const StyledJoinForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90%;

  p {
    margin: 20px 0 100px;
  }

  button {
    margin-top: 8px;
  }
`;

export default InvitePage;
