import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Painting from "../components/painting/Painting";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";
import PaintingSkeleton from "../util/PaintingSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    postIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const postId = this.props.match.params.postId;

    if (postId) this.setState({ postIdParam: postId });
    this.props.getUserData(handle);
    axios.get(`/user/${handle}`).then(res => {
      this.setState({
        profile: res.data.user
      });
    });
  }

  render() {
    const { posts, loading } = this.props.data;
    const { postIdParam } = this.state;

    const postsMarkup = loading ? (
      <PaintingSkeleton />
    ) : posts === null ? (
      <p>No posts from this user</p>
    ) : !postIdParam ? (
      posts.map(post => <Painting key={post.postId} post={post} />)
    ) : (
      posts.map(post => {
        if (post.postId !== postIdParam)
          return <Painting key={post.postId} post={post} />;
        else return <Painting key={post.postId} post={post} openDialog />;
      })
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {postsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}
user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
