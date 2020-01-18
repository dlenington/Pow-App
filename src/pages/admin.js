import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TableDialog from "../table/tableDialog";

// import _ from "lodash";

//MUI Stuff
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TablePagination, ListItemText } from "@material-ui/core";

//Redux stuff
import { getPosts } from "../redux/actions/dataActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const styles = theme => ({
  ...theme.spreadThis
});

class Admin extends Component {
  state = {
    page: 0,
    newPage: 0,
    rowsPerPage: 5,
    dense: false,
    order: "asc",
    orderBy: "userHandle",
    open: false
  };
  componentDidMount() {
    this.props.getPosts();
  }

  desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  };

  getSorting = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => this.desc(a, b, orderBy)
      : (a, b) => -this.desc(a, b, orderBy);
  };

  render() {
    const { posts } = this.props.data;
    const { page, rowsPerPage, dense, orderBy, order, open } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, posts.length - page * rowsPerPage);

    //Table Methods
    const handleChangePage = (event, newPage) => {
      console.log("newPage" + newPage);
      this.setState({ page: newPage });
    };

    const handleChangeRowsPerPage = event => {
      console.log("handleChangeRows" + parseInt(event.target.value, 10));
      this.setState({ rowsPerPage: parseInt(event.target.value, 10) });

      this.setState({ page: 0 });
    };

    //Dialog Methods

    const handleClickOpen = () => {
      this.setState({ open: true });
    };

    const titles = [
      {
        label: "User"
      },
      {
        label: "Content"
      },
      { label: "Created At" }
    ];
    return (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                {titles.map(title => (
                  <TableCell>{title.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.stableSort(posts, this.getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((post, index) => {
                  return (
                    <TableRow key={post.postId}>
                      <TableCell id={post.postId} component="th" scope="row">
                        {post.userHandle}
                      </TableCell>
                      <TableCell>{post.body}</TableCell>
                      <TableCell>{post.createdAt}</TableCell>
                      <TableCell>
                        <TableDialog
                          postId={post.postId}
                          open={open}
                          onClose={this.handleClose}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={posts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

Admin.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default withStyles(styles)(
  connect(mapStateToProps, { getPosts })(Admin)
);
