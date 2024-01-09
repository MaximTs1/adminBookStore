import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { structure, signupSchema } from "./addCardStructure";
import "../Spinner.css";
import "./AddCard.css";
import axios from "axios";

const defaultTheme = createTheme();
const filterOptions = createFilterOptions();

const AddCard = () => {
  const [bookData, setBookData] = useState({
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
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://185.229.226.27:3001/book/get-books"
        );
        const fetchedBooks = response.data;

        // Extract authors and remove duplicates
        const extractedAuthors = fetchedBooks
          .map((book) => book.author)
          .filter((value, index, self) => self.indexOf(value) === index);

        // Map authors to the expected format
        const authorsData = extractedAuthors.map((author) => ({
          title: author,
        }));

        // Optionally, add a default option
        authorsData.unshift({ value: "", label: "Choose an Author" });

        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const validationResults = signupSchema.validate(bookData, {
      abortEarly: false,
      allowUnknown: true,
    });

    const newErrors = {};
    if (validationResults.error) {
      validationResults.error.details.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [bookData]);

  const handleAuthorChange = (event, newValue) => {
    let newAuthor = "";

    if (typeof newValue === "string") {
      newAuthor = newValue;
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      newAuthor = newValue.inputValue;
    } else {
      newAuthor = newValue ? newValue.title : "";
    }

    // Update bookData with the new author
    setBookData({ ...bookData, author: newAuthor });
  };

  const handleInputChange = (ev) => {
    const { name, value, files } = ev.target;

    if (name === "image") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1];
          setBookData({ ...bookData, image: base64String });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setBookData({ ...bookData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("bookData", bookData);

    try {
      const response = await axios.post(
        "http://185.229.226.27:3001/book/add-book",
        bookData
      );
      alert(response.data.message);
    } catch (error) {
      console.error(
        "There was an error edding the book (the file might be to large)",
        error
      );
      alert(
        error.response?.data?.message ||
          "There was an error edding the book (the file might be to large)"
      );
    }
  };

  return (
    <div className="home">
      <div className="AddCardFrame">
        <div className="CardPreview">
          {bookData.image && (
            <img
              src={`data:image/jpeg;base64,${bookData.image}`}
              alt="Preview"
              className="imagePreview"
            />
          )}
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
                        {s.type === "file" ? (
                          // File input for image
                          <input
                            type="file"
                            name={s.name}
                            onChange={handleInputChange}
                            required={s.required}
                          />
                        ) : s.label === "author" ? (
                          // Autocomplete for author field
                          <Autocomplete
                            value={{ title: bookData.author }}
                            onChange={handleAuthorChange}
                            filterOptions={(options, params) => {
                              const filtered = createFilterOptions()(
                                options,
                                params
                              );

                              const { inputValue } = params;
                              const isExisting = options.some(
                                (option) => inputValue === option.title
                              );
                              if (inputValue !== "" && !isExisting) {
                                filtered.push({
                                  inputValue,
                                  title: `Add "${inputValue}"`,
                                });
                              }

                              return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            id="free-solo-with-text-demo"
                            options={authors}
                            getOptionLabel={(option) => {
                              if (typeof option === "string") {
                                return option;
                              }
                              if (option.inputValue) {
                                return option.inputValue;
                              }
                              return option.title;
                            }}
                            renderOption={(props, option) => (
                              <li {...props}>{option.title}</li>
                            )}
                            freeSolo
                            renderInput={(params) => (
                              <TextField {...params} label="Author" />
                            )}
                          />
                        ) : (
                          // TextField for other text inputs
                          <TextField
                            name={s.name}
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
                    Add Book
                  </Button>
                  <Grid container justifyContent="center"></Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
