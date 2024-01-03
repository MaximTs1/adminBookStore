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
  }, []);

  return (
    <div className="Usersframe">
      <p>Users Manage</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          onChange={handleSearchChange}
          sx={{ mb: 1, mt: 2 }}
        />
      </div>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", overflowX: "auto", mb: 1, mt: 2 }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {users[0] &&
                Object.keys(users[0])
                  .filter(
                    (key) =>
                      key !== "_id" &&
                      key !== "__v" &&
                      key !== "zip" &&
                      key !== "houseNumber"
                  )
                  .map((key) => <TableCell key={key}>{key}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((user, index) => (
              <TableRow key={index}>
                {Object.entries(user)
                  .filter(
                    ([key, _]) =>
                      key !== "_id" &&
                      key !== "__v" &&
                      key !== "zip" &&
                      key !== "houseNumber"
                  )
                  .map(([key, value], cellIndex) => {
                    // Check if the key is 'orderHistory' or 'likedBooks'
                    if (
                      (key === "orderHistory" || key === "likedBooks") &&
                      Array.isArray(value)
                    ) {
                      // Return a TableCell with the length of the array
                      return (
                        <TableCell key={cellIndex}>{value.length}</TableCell>
                      );
                    } else {
                      // For other keys, return a TableCell with the value
                      return (
                        <TableCell key={cellIndex}>
                          {value.toString()}
                        </TableCell>
                      );
                    }
                  })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserManage;
