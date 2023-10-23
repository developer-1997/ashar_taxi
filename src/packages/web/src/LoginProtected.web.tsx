import React, { PureComponent } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

export type Props = RouteProps & {
  history: any;
};

interface S {
  isLoggedInUser: any;
  loading: any;
}

export default class LoginProtected extends PureComponent<Props, S> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedInUser: true,
      loading: true
    };
  }

  componentDidMount = async () => {
    let isLoggedInUser = await localStorage.getItem('token');
    if (isLoggedInUser) {
      this.setState({ isLoggedInUser: false, loading: false });
    } else {
      this.setState({ loading: false });
    }
  };
  render() {
    return !this.state.loading ? (
      !this.state.isLoggedInUser ? (
          <Redirect to={{ pathname: '/LandingPage' }} />
          ) : (
        <Route {...this.props} />
      )
    ) : null;
  }
}
