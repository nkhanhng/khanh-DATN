import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import axios from 'axios';
import { Button } from "@material-ui/core";
import Spinner from '../common/Spinner';
import { Link } from "react-router-dom";

const columns = [
  { id: "_id", label: "ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "left",
  },
  { id: "role", label: "Role", minWidth: 170 },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
  },
  {
    id: "Edit",
    label: "Delete",
    align: 'center',
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

export default function UserManagement() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [numPage, setNumPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("/api/users/all-user")
      .then((res) => {
        const { data } = res;
        setUsers(data.user);
        setNumPage(data.numPage);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [loading]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/users/${id}`)
        .then((res) => {
          setLoading(true);
        })
        .catch((err) => console.log(err))
  }

  return (
    <Paper className={classes.root}>
      <Link to="/admin/create-user">
        <Button variant="contained" color="primary">
          Add user
        </Button>
      </Link>
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
            {users 
            ?
            users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <React.Fragment>
                    <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                      <TableCell>{user._id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.date}</TableCell>
                      <TableCell>
                        <Button onClick={() => {
                          handleDelete(user._id);
                        }}>Delete</Button>
                      </TableCell>
                    </TableRow>        
                  </React.Fragment>
                );
              })
            : <Spinner/>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
