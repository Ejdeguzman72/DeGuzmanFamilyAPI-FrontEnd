import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ContactInfoService from '../../../services/contact-info-service';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ContactInfoTable() {
  const [personid, setPersonid] = useState(0);
  const [birthdate, setBirthdate] = useState(0);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [contactInfo, setContactInfo] = useState([]);
  const classes = useStyles();

useEffect(() => {
  ContactInfoService.getContactInfo().then((response) => {
    setContactInfo(response.data);
  });
}, []);

  return (
    <TableContainer component={Paper}>
      
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Person ID:</StyledTableCell>
            <StyledTableCell align="right">BirthDate</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Firstname</StyledTableCell>
            <StyledTableCell align="right">Lastname</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(contactInfo)}
          {contactInfo.map((row) => (
            <StyledTableRow key={row.personid}>
              <StyledTableCell component="th" scope="row">
                {row.personid}
              </StyledTableCell>
              <StyledTableCell align="right">{row.birthdate}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.firstname}</StyledTableCell>
              <StyledTableCell align="right">{row.lastname}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
