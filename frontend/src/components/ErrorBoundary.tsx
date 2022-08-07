import React, { Component, ReactNode } from "react";
import axios from "axios";
import { CustomError } from "@/types";
import { UserConsumer } from "@/context/UserContext";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  asyncErrorInfo: CustomError;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    asyncErrorInfo: {
      errorCode: null,
      message: null,
    },
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    if (axios.isAxiosError(error) && error.response?.data) {
      const asyncErrorInfo = error.response.data as CustomError;

      return {
        hasError: true,
        asyncErrorInfo,
      };
    }

    return {
      hasError: true,
      asyncErrorInfo: {
        errorCode: null,
        message: null,
      },
    };
  }

  public render() {
    if (this.state.hasError && this.state.asyncErrorInfo.errorCode === "3011") {
      alert("accessToken이 잘못되었습니다. 로그아웃합니다.");
      return (
        <UserConsumer>
          {(props) => {
            alert("accessToken이 잘못되었습니다. 로그아웃합니다.");
            props.logout();

            return <h1>Sorry.. there was an error</h1>;
          }}
        </UserConsumer>
      );
    }

    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
