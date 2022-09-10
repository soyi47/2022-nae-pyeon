import React, { useState, useEffect } from "react";

import { divideArrayByIndexRemainder } from "@/util";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";

const useSliceMessageList = (messageList: (Element | EmotionJSX.Element)[]) => {
  const [slicedMessageLists, setSlicedMessageLists] = useState<
    (Element | EmotionJSX.Element)[][]
  >(Array.from(Array(4), () => []));

  const updateSlicedMessageListByWindowWidth = () => {
    const width = window.innerWidth;

    let newSlicedMessageList;
    if (width < 960) {
      newSlicedMessageList = [messageList];
    } else if (width < 1280) {
      newSlicedMessageList = divideArrayByIndexRemainder(messageList, 2);
    } else {
      newSlicedMessageList = divideArrayByIndexRemainder(messageList, 3);
    }

    setSlicedMessageLists(newSlicedMessageList);
  };

  useEffect(() => {
    updateSlicedMessageListByWindowWidth();
  }, [messageList]);

  useEffect(() => {
    window.addEventListener("resize", updateSlicedMessageListByWindowWidth);
    return () =>
      window.removeEventListener(
        "resize",
        updateSlicedMessageListByWindowWidth
      );
  }, []);

  return slicedMessageLists;
};

export default useSliceMessageList;
