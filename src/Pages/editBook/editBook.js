import React, { useState, useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { GeneralContext } from "../../App";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import { structure, authors, signupSchema } from "../addCard/addCardStructure";
import "../Spinner.css";
import "../addCard/AddCard.css";
import axios from "axios";

const defaultTheme = createTheme();

const EditBook = () => {
  const location = useLocation();
  const bookFromLocation = location.state?.book;

  const [bookData, setBookData] = useState(
    bookFromLocation || {
      customId: "",
      name: "",
      author: "",
      category: "",
      price: "",
      image: "",
      condition: "",
      book_parts: "",
      stock: "",
      hand: "",
      publishing_year: "",
      translation: "",
      publisher: "",
      description: "",
    }
  );

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // const handleChange = (e) => {
  //   setUserData({ ...userData, [e.target.name]: e.target.value });
  // };
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleAuthorChange = (event, newValue) => {
    setSelectedAuthor(newValue);
    const authorValue = newValue ? newValue.label : "";
    setBookData({ ...bookData, author: authorValue });
  };

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setBookData({ ...bookData, [name]: value });
    // The actual validation will now be handled by useEffect
  };

  //   const handleInputChange = (ev) => {
  //     const { name, value } = ev.target;
  //     const addBookData = {
  //       ...bookData,
  //       [name]: value,
  //     };

  //     setBookData(addBookData);

  useEffect(() => {
    const validationResults = signupSchema.validate(bookData, {
      abortEarly: false, // To get all errors in the schema, not just the first one
      allowUnknown: true,
    });

    const newErrors = {};
    if (validationResults.error) {
      validationResults.error.details.forEach((error) => {
        if (error.path && error.path.length > 0) {
          newErrors[error.path[0]] = error.message;
        }
      });
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [bookData]);

  //     const validationResults = signupSchema.validate(addBookData, {
  //       abortEarly: true,
  //       allowUnknown: true,
  //     });

  //     const newErrors = {};

  //     validationResults.error?.details.find((error) => {
  //       if (error.path && error.path.length > 0 && value.trim() !== "") {
  //         newErrors[error.path[0]] = error.message;
  //       }
  //     });
  //     setErrors(newErrors);
  //     setIsValid(!Object.keys(newErrors).length);
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://185.229.226.27:3001/api/update-book/${bookData.customId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating book");
      }

      const updatedBook = await response.json();
      console.log("Updated Book:", updatedBook);
      // Handle success - maybe navigate back to the book list or show a success message
    } catch (error) {
      console.error("Error:", error);
      // Handle the error - maybe show an error message to the user
    }
  };

  return (
    <div className="home">
      <div className="Frame">
        <div className="CardPreview">
          <img src={bookData.image} alt="Preview" className="imagePreview" />

          <div className="textContainer">
            <div>{bookData.name}</div>
            <div>{bookData.author}</div>
            <div>{bookData.price}</div>
          </div>
          <div className="buttonContainer">
            <button className="cartButton"> Add to Cart 🛒</button>
            <button className="buyButton">Buy Now !</button>
          </div>
        </div>
        <div className="formContainer">
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  direction: "ltr",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add Book
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    {structure.map((s) => (
                      <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                        {s.label === "author" ? (
                          <Autocomplete
                            disablePortal
                            options={authors}
                            value={bookData[s.name]}
                            required={s.required}
                            onChange={handleAuthorChange}
                            sx={{
                              width: "100%",
                              maxWidth: { sm: 300, md: 400, lg: 500 },
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                id={s.name}
                                label={s.label}
                                type={s.type}
                                name={s.name}
                              />
                            )}
                          />
                        ) : (
                          <TextField
                            name={s.name}
                            value={bookData[s.name]} // Dynamically access the property in bookData
                            required={s.required}
                            fullWidth
                            id={s.name}
                            label={s.label}
                            type={s.type}
                            error={!!errors[s.name]}
                            helperText={errors[s.name] || ""}
                            onChange={handleInputChange}
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>

                  <Button
                    className={`spinner-button ${isValid ? "valid" : ""}`}
                    disabled={!isValid}
                    display={!isValid}
                    style={{ display: isValid ? "none" : "" }}
                    sx={{ mt: 2, mb: 0 }}
                  >
                    <span className="spinner"></span>
                    {isValid ? "Valid" : "Finish the required field..."}
                  </Button>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 3 }}
                    disabled={!isValid}
                  >
                    Edit Book
                  </Button>
                  <Grid container justifyContent="center"></Grid>
                </Box>
              </Box>
              {/* <button className="BackButton">
                <Link to={"/"}>🔙</Link>
              </button> */}
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
