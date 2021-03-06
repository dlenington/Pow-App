import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";

//MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

//Redux stuff
import { connect } from "react-redux";
import { getPost } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis
});

class TableDialog extends Component {
  state = { open: false };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getPost(this.props.postId);
  };

  render() {
    const {
      post: { postId, body, createdAt, userHandle }
    } = this.props;

    const { open } = this.state;

    const dialogMarkup = (
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="body1">{body}</Typography>
          <hr border="none" />
          <Typography variant="body1">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
        </Grid>
      </Grid>
    );
    return (
      <Fragment>
        <Button variant="contained" color="primary" onClick={this.handleOpen}>
          Details
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="Detail View"
          open={open}
        >
          <DialogTitle id="detail-view">{userHandle}</DialogTitle>
          <DialogContent>{dialogMarkup}</DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

TableDialog.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.data.post
});

const mapActionsToProps = {
  getPost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(TableDialog));
