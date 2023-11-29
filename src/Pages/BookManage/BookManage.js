import React from "react";
import { useState, useContext, useEffect } from "react";
import "./bookManage.css";

// import './Cards.css'
// import './CardEffects.css'
// import './Title.css'
import { FaRegEdit } from "react-icons/fa";
import { BsFillHeartFill, BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineExpand } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { GeneralContext } from "../../App";

const BookManage = () => {
  const [cards, setCards] = useState([]);
  const [book, setBook] = useState(null); // State to store the fetched book
  const navigate = useNavigate();
  const { setLoader, snackbar } = useContext(GeneralContext);

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
        console.log("Book:", book);
        setBook(book);
        navigate("/editCard", { state: { book } });
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
        console.log("Delete Response:", data);
        // Handle success - maybe refresh the list of books or navigate away
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error - maybe show an error message to the user
      })
      .finally(() => setLoader(false));
  };

  return (
    <div className="mainDiv">
      <p>Book Manage</p>

      <span className="title8">
        <h1>Cardify+</h1>
        <p>Here are some Cards from our Clients around the world </p>
      </span>
      <div className="Cardframe">
        {cards.map((c) => (
          <div key={c.customId} className="Card3">
            <div
              className="img"
              style={{ backgroundImage: `url(${c.image})`, border: "0" }}
            ></div>
            <h1>{c.title}</h1>
            <div className="my-p">
              <p>
                <b>Phone:</b>
                {c.name}
              </p>
              <p>
                <b>Adress:</b> {c.houseNumber} {c.street} <br /> {c.country},{" "}
                {c.author} {c.category}
              </p>
              <p>
                <b>Card Number:</b>
                {c.customId}
              </p>
            </div>
            <div className="myIcons">
              <div className="icons1">
                <span> </span>

                {/* <Link to={{ pathname: "/editCard", state: { book: book } }}>
                    <span className="Expand">
                      <FaRegEdit
                        size={26}
                        onClick={(ev) => fetchBookByCustomId(c.customId)}
                      />
                    </span>
                  </Link> */}
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
