import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getMyTeams } from "@/api/team";
import { CustomError } from "@/types";

interface Team {
  id: number;
  name: string;
  description: string;
  emoji: string;
  color: string;
}

interface ResponseMyTeamList {
  teams: Team[];
  currentPage: number;
  totalCount: number;
}

const useGetMyTeams = (pagingCount: number) => {
  return useInfiniteQuery<ResponseMyTeamList>(
    ["my-teams"],
    getMyTeams(pagingCount),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage * pagingCount < lastPage.totalCount) {
          return lastPage.currentPage + 1;
        }
      },
      suspense: true,
    }
  );
};

export default useGetMyTeams;
