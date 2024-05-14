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
  const [allUsers, setallUsers] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    fetch("https://ariellasv-api.onrender.com/book/get-books")
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
  }, []);

  useEffect(() => {
    fetch("https://ariellasv-api.onrender.com/user/all-users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setallUsers(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);

  useEffect(() => {
    let filtered = [...cards];

    if (selectedCategory === "outOfStock") {
      filtered = filtered.filter((card) => card.stock === 0);
    } else if (selectedCategory === "mostFavorite") {
      const filteredMostFavoriteBooks = new Array(filtered.length).fill(0);
      allUsers.forEach((user) => {
        user.likedBooks.forEach((bookNumber) => {
          // Check if the bookNumber is between 1 and 10
          if (
            bookNumber >= 1 &&
            bookNumber <= filtered[filtered.length - 1].customId
          ) {
            // Increment the count for this bookNumber in filteredMostFavoriteBooks
            filteredMostFavoriteBooks[bookNumber - 1]++; // Subtract 1 to convert bookNumber to array index
          }
        });
      });
      // Transform filteredMostFavoriteBooks into an array of objects with book number and count
      const booksWithCounts = filteredMostFavoriteBooks.map((count, index) => ({
        bookNumber: index + 1, // Add 1 because book numbers start at 1, not 0
        count,
      }));

      // Sort the array of objects based on the count, in descending order
      const sortedBooks = booksWithCounts.sort((a, b) => b.count - a.count);

      // Create a mapping from book number to its rank based on popularity
      const popularityRank = {};
      sortedBooks.forEach((book, index) => {
        popularityRank[book.bookNumber] = index;
      });

      // Sort the filtered array in place based on the popularity rank
      filtered.sort((a, b) => {
        // Adjusting book numbers to array indices
        let rankA = popularityRank[a.customId];
        let rankB = popularityRank[b.customId];

        // Compare based on popularity rank
        return rankA - rankB;
      });
    } else if (selectedCategory === "all") {
      // If 'All Books' is selected, 'filtered' should already be a copy of 'cards'
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
    fetch(`https://ariellasv-api.onrender.com/book/book-by-custom-id/${customId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Book not found");
        }
        return response.json();
      })
      .then((book) => {
        const { image, ...bookWithoutImage } = book;
        setBook(bookWithoutImage);
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
    fetch(`https://ariellasv-api.onrender.com/book/delete-book/${customId}`, {
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "45px",
        }}
      >
        <Button variant="contained" onClick={handleAllBooksClick}>
          All Books
        </Button>
        <Button variant="contained" onClick={handleOutOfStockClick}>
          Books out of stock
        </Button>
        <Button variant="contained" onClick={handleMostFavoriteClick}>
          Most favorite
        </Button>
      </div>
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
                <span
                  className="Expand"
                  onClick={() => fetchBookByCustomId(c.customId)}
                >
                  <FaRegEdit size={26} />
                </span>
                {/* <Link to={`/cards/${c.customId}`}>
                  <span className="Expand">
                    <AiOutlineExpand size={26} />
                  </span>
                </Link> */}
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
