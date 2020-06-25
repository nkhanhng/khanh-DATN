import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import moment from "moment";
import { Button, Typography } from "@material-ui/core";

const columns = [
  { id: "_id", label: "ID", minWidth: 100 },
  { id: "name", label: "Author", minWidth: 170 },
  {
    id: "text",
    label: "Content",
    minWidth: 170,
    align: "left",
  },
    { id: "comments", label: "Comments", minWidth: 80 },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "center",
    format: (value) => moment.format(value),
  },
  {
    id: "Edit",
    label: "Delete",
    align: "center",
    minWidth: 80,
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function PostManagement() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);
  const [numPage, setNumPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("/api/posts/all-posts")
      .then((res) => {
        const { data } = res;
        setPosts(data.post);
        setNumPage(data.numPage);
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, [loading]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/posts/${id}`)
        .then((res) => {
          setLoading(true);
        })
        .catch((err) => console.log(err))
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {posts
            ?
            posts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={post._id}>
                    <TableCell>{post._id}</TableCell>
                    <TableCell>{post.name}</TableCell>
                    <TableCell>{post.text}</TableCell>
                    <TableCell align="center">{post.comments.length}</TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleDelete(post._id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            : <Typography>
              No posts
              </Typography>}
          </TableBody>
        </Table>
      </TableContainer>
      {posts
      ?  <TablePagination
          component="div"
          count={posts.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      : null
      }
    </Paper>
  );
}
