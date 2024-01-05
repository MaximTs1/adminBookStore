import React from "react";
import { useState, useContext, useEffect } from "react";
import "./bookManage.css";
import { FaRegEdit } from "react-icons/fa";
import { BsFillHeartFill, BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineExpand } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { GeneralContext } from "../../App";
import { TextField } from "@mui/material";

const BookManage = () => {
  const [cards, setCards] = useState([]);
  const [book, setBook] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const { setLoader, snackbar } = useContext(GeneralContext);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = cards.filter(
      (card) =>
        query === "" ||
        card.name.toLowerCase().includes(query) ||
        card.author.toLowerCase().includes(query) ||
        card.publisher.toLowerCase().includes(query)
    );

    setFilteredData(filtered);
  };

  useEffect(() => {
    setLoader(true);
    fetch("http://185.229.226.27:3001/api/get-books")
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

  const fetchBookByCustomId = (customId) => {
    setLoader(true);
    fetch(`http://185.229.226.27:3001/api/book-by-custom-id/${customId}`)
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
    fetch(`http://185.229.226.27:3001/api/delete-book/${customId}`, {
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
                {c.author} <br />  {c.category}
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
                <Link to={`/cards/${c.customId}`}>
                  <span className="Expand">
                    <AiOutlineExpand size={26} />
                  </span>
                </Link>
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
