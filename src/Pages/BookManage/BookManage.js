import React, { useState, useContext, useEffect } from "react";
import "./bookManage.css";
import { FaRegEdit } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineExpand } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { GeneralContext } from "../../App";
import { TextField, Button } from "@mui/material";

const BookManage = () => {
  const [cards, setCards] = useState([]);
  const [book, setBook] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  const { setLoader } = useContext(GeneralContext);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    setLoader(true);
    fetch("http://185.229.226.27:3001/book/get-books")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCards(data);
        setFilteredData(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      })
      .finally(() => setLoader(false));
  }, [setLoader]);

  useEffect(() => {
    let filtered = cards;

    if (selectedCategory === "outOfStock") {
      filtered = filtered.filter((card) => card.stock === 0);
    } else if (selectedCategory === "mostFavorite") {
      // Add your logic to determine 'mostFavorite' here
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (card) =>
          card.name.toLowerCase().includes(searchQuery) ||
          card.author.toLowerCase().includes(searchQuery) ||
          card.publisher.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredData(filtered);
  }, [selectedCategory, searchQuery, cards]);

  const handleAllBooksClick = () => setSelectedCategory("all");
  const handleOutOfStockClick = () => setSelectedCategory("outOfStock");
  const handleMostFavoriteClick = () => setSelectedCategory("mostFavorite");

  const fetchBookByCustomId = (customId) => {
    setLoader(true);
    fetch(`http://185.229.226.27:3001/book/book-by-custom-id/${customId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Book not found");
        }
        return response.json();
      })
      .then((book) => {
        const { image, ...bookWithoutImage } = book;
        setBook(bookWithoutImage);
        console.log("bookWithoutImage:", bookWithoutImage);
        navigate("/editCard", { state: { book: bookWithoutImage } });
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setLoader(false));
  };

  const deleteBookByCustomId = (customId) => {
    if (!window.confirm("Are you sure you want to remove this card?")) {
      return;
    }
    setLoader(true);
    fetch(`http://185.229.226.27:3001/book/delete-book/${customId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting book");
        }
        return response.json();
      })
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setLoader(false));
  };

  return (
    <div className="mainDiv">
      <span className="title8">
        <h1>Books</h1>
      </span>
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
          sx={{ mb: -4, mt: 1 }}
        />
      </div>

      <Button variant="contained" onClick={handleAllBooksClick}>
        All Books
      </Button>
      <Button variant="contained" onClick={handleOutOfStockClick}>
        Books out of stock
      </Button>
      <Button variant="contained" onClick={handleMostFavoriteClick}>
        Most favorite
      </Button>

      <div className="Cardframe">
        {filteredData.map((c) => (
          <div key={c.customId} className="Card3">
            <div
              className="img"
              style={{
                backgroundImage: c.image.includes("/9j")
                  ? `url("data:image/jpeg;base64,${c.image}")`
                  : `url(${c.image})`,
                border: "0",
              }}
            ></div>
            <h1>{c.title}</h1>
            <div className="my-p">
              <p>
                <b>Book Name:</b> <br />
                {c.name}
              </p>
              <p>
                <b>Author:</b> <br />
                {c.author} <br /> {c.category}
              </p>
              <p>
                <b>Card Number:</b>
                {c.customId}
              </p>
            </div>
            <div className="myIcons">
              <div className="icons1">
                <span> </span>
                {/* Icons and Link here */}
              </div>
              <div className="sep"></div>
              <div className="icons2">
                <BsFillTrash3Fill
                  className="Trash"
                  size={26}
                  onClick={(ev) => deleteBookByCustomId(c.customId)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookManage;
