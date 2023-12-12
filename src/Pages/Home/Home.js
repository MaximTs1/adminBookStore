// import React, { useState, useEffect, useContext } from "react";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import confetti from "canvas-confetti";
import "./home.css";
// import { GeneralContext } from "../../App";
// import Stack from "@mui/material/Stack";
import GraphDashBoard from "../../components/GraphDashBoard/GraphDashBoard";

const Home = () => {
  // const [BooksData, setBooksData] = useState([]);
  // const [currentNumbers, setCurrentNumbers] = useState([]);
  // const targets = [2, 10, 25, 50, 100];
  // const [targetsReached, setTargetsReached] = useState(
  //   new Array(targets.length).fill(false)
  // );
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [prizesClaimed, setPrizesClaimed] = useState(
  //   new Array(targets.length).fill(false)
  // );
  // const [prizesRevealed, setPrizesRevealed] = useState(
  //   new Array(targets.length).fill(false)
  // );
  // const { setLoader } = useContext(GeneralContext);

  // useEffect(() => {
  //   setLoader(true);
  //   fetch("http://185.229.226.27:3001/api/get-books")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setBooksData(data);
  //       const updatedCurrentNumbers = new Array(targets.length).fill(
  //         data.length
  //       );
  //       setCurrentNumbers(updatedCurrentNumbers);
  //       setTargetsReached(
  //         updatedCurrentNumbers.map((number, index) => number >= targets[index])
  //       );

  //       // Calculate total price based on fetched data
  //       const sum = data.reduce((acc, book) => acc + parseFloat(book.price), 0);
  //       setTotalPrice(sum);
  //       localStorage.setItem("totalPrice", sum.toString());
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "There has been a problem with your fetch operation:",
  //         error
  //       );
  //     })
  //     .finally(() => setLoader(false));
  // }, [setLoader]);

  // const calculateTotalPrice = () => {
  //   const sum = BooksData.reduce(
  //     (acc, book) => acc + parseFloat(book.price),
  //     0
  //   );
  //   setTotalPrice(sum);
  //   localStorage.setItem("totalPrice", sum.toString()); // Save to local storage
  //   console.log("Saved total price:", sum); // Log for confirmation
  // };

  // const handlePrizeButtonClick = (index) => {
  //   calculateTotalPrice();
  //   confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  //   const newPrizesClaimed = [...prizesClaimed];
  //   newPrizesClaimed[index] = true;
  //   setPrizesClaimed(newPrizesClaimed);
  //   const updatedPrizesRevealed = [...prizesRevealed];
  //   updatedPrizesRevealed[index] = true;
  //   setPrizesRevealed(updatedPrizesRevealed);

  //   fetch(`http://185.229.226.27:3001/api/targets/${targets[index]}`, {
  //     method: "POST",
  //   })
  //     .then((response) => response.json())
  //     .then((updatedTarget) => {
  //       // Update local state to reflect the goal completion
  //       console.log("Updated target response:", updatedTarget); // Log the response
  //       const newPrizesRevealed = [...prizesRevealed];
  //       newPrizesRevealed[index] = updatedTarget.isCompleted;
  //       setPrizesRevealed(newPrizesRevealed);
  //     })
  //     .catch((error) => console.error("Error updating target:", error));
  // };

  // useEffect(() => {
  //   fetch("http://185.229.226.27:3001/api/targets")
  //     .then((response) => response.json())
  //     .then((targetsFromDB) => {
  //       setTargetsReached(targetsFromDB.map((goal) => goal.isCompleted));
  //       setPrizesRevealed(targetsFromDB.map((goal) => goal.isCompleted));
  //     })
  //     .catch((error) => console.error("Error fetching targets:", error));
  // }, []);

  // useEffect(() => {
  //   const savedTotalPrice = localStorage.getItem("totalPrice");
  //   if (savedTotalPrice) {
  //     setTotalPrice(parseFloat(savedTotalPrice));
  //   }
  // }, []);

  return (
    <div className="Homeframe">
      <GraphDashBoard></GraphDashBoard>
      {/* <Stack
        direction="column"
        spacing={2}
        alignItems="flex-start"
        justifyContent="center"
        sx={{ width: "100%", mt: 2 }}
      >
        {targets.map((targetNumber, index) => (
          <Box
            key={index}
            className="mini-game-container"
            sx={{
              p: 2,
              border: "1px solid grey",
              borderRadius: "4px",
              textAlign: "center",
              maxWidth: "300px",
              width: "100%",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ textAlign: "center", width: "100%" }}
              gutterBottom
            >
              Number of Books Added:
            </Typography>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", width: "100%" }}
            >
              {currentNumbers[index]} / {targetNumber}
            </Typography>

            {!prizesRevealed[index] && targetsReached[index] && (
              <Button
                variant="contained"
                color="secondary"
                sx={{ textAlign: "center", width: "100%" }}
                onClick={() => handlePrizeButtonClick(index)}
              >
                Get Your Prize
              </Button>
            )}

            {prizesRevealed[index] && (
              <Typography
                variant="subtitle1"
                sx={{ textAlign: "center", width: "100%" }}
              >
                Total Price of Books: ₪{totalPrice}
              </Typography>
            )}
          </Box>
        ))}
      </Stack> */}
    </div>
  );
};

export default Home;
