import { Box, Typography } from "@material-ui/core";
import React, { Component } from "react";
import "./ForgotPasswordHeader.web.css";

type PropsType = {
  title: string;
  paragraph: React.ReactNode;
};

export default class ForgotPassHeader extends Component<PropsType> {
  render() {
    return (
      <Box className="forgotpassHeader">
        <Typography
          variant="h2"
          className="title loginHeader"
          data-test-id="forgotpass_title"
        >
          {this.props.title}
        </Typography>
        <Typography
          variant="body1"
          className="paragraph leftSideBody"
          data-test-id="forgotpass_paragraph"
        >
          {this.props.paragraph}
        </Typography>
      </Box>
    );
  }
}
