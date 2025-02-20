import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/api";
import { putNotificationsAll } from "@/api/notification";

const useDeleteNotificationsAll = () =>
  useMutation<null, AxiosError>(() => putNotificationsAll(), {
    onSuccess: () => {
      queryClient.refetchQueries(["notifications"]);
    },
  });

export default useDeleteNotificationsAll;
