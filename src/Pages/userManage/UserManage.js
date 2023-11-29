import React from "react";
import { useState, useContext, useEffect } from "react";
import "./UserManage.css";
import { structure, usersData, UserManageSchema } from "./userManageStructure";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        query === "" ||
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );

    setFilteredData(filtered);
  };

  useEffect(() => {
    fetch("http://185.229.226.27:3001/user/all-users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setFilteredData(data);
        console.log("data:", data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
    // .finally(() => ;
  }, []);

  // const handleEditClick = (user) => {
  //   // Implement your logic here
  //   // For example, you could open an edit form or redirect to an edit page
  //   alert("Edit clicked for user:", user);
  // };

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://185.229.226.27:3001/api/your-endpoint"
  //     );
  //     setUsers(response.data); // Update the state with the fetched data
  //   } catch (error) {
  //     console.error("There was an error fetching the data:", error);
  //     alert(
  //       error.response?.data?.message || "There was an error fetching the data."
  //     );
  //   }
  // };

  // // useEffect to call fetchData when the component mounts
  // useEffect(() => {
  //   fetchData();
  // }, []); // The empty array ensures the effect runs only once

  // ...

  return (
    <div className="Usersframe">
      <p>Users Manage</p>
      <TextField
        label="Search"
        variant="outlined"
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", overflowX: "auto", mb: 1, mt: 2 }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {users[0] &&
                Object.keys(users[0])
                  .filter((key) => key !== "_id" && key !== "__v")
                  .map((key) => <TableCell key={key}>{key}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(
              (
                user,
                index // Use filteredData here
              ) => (
                <TableRow key={index}>
                  {Object.entries(user)
                    .filter(([key, _]) => key !== "_id" && key !== "__v")
                    .map(([key, value], cellIndex) => (
                      <TableCell key={cellIndex}>{value.toString()}</TableCell>
                    ))}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserManage;
