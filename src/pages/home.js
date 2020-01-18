import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Profile from "../components/profile/Profile";
import PropTypes from "prop-types";
import Painting from "../components/painting/Painting";
import PaintingSkeleton from "../util/PaintingSkeleton";

//Redux imports
import { getPosts } from "../redux/actions/dataActions";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.data;

    let recentPostsMarkup = !loading ? (
      posts.map(post => <Painting key={post.postId} post={post} />)
    ) : (
      <PaintingSkeleton />
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile></Profile>
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getPosts })(Home);
