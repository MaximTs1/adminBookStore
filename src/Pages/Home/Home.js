// import React from "react";
// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { booksData } from "./bookData";
// import confetti from "canvas-confetti";
// import "./home.css";
// import { GeneralContext } from "../../App";
// import Stack from "@mui/material/Stack";

// const Home = () => {
//   const [BooksData, setBooksData] = useState([]);
//   const [currentNumber, setCurrentNumber] = useState([]);
//   const [targetNumber, setTargetNumber] = useState(0);
//   ///
//   const targets = [2, 10, 25, 50, 100];
//   const [currentNumbers, setCurrentNumbers] = useState(
//     new Array(targets.length).fill(0)
//   );
//   const [targetsReached, setTargetsReached] = useState(
//     new Array(targets.length).fill(false)
//   );
//   ///
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [showPrizeButton, setShowPrizeButton] = useState(false);
//   const { setLoader, snackbar } = useContext(GeneralContext);
//   const [prizesClaimed, setPrizesClaimed] = useState(
//     new Array(targets.length).fill(false)
//   );

//   const prizes = ["Prize 1", "Prize 2", "Prize 3", "Prize 4", "Prize 5"];
//   const [prizesRevealed, setPrizesRevealed] = useState(
//     new Array(targets.length).fill(false)
//   );

//   useEffect(() => {
//     setLoader(true);
//     fetch("http://185.229.226.27:3001/api/get-books")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setBooksData(data);
//       })
//       .catch((error) => {
//         console.error(
//           "There has been a problem with your fetch operation:",
//           error
//         );
//       })
//       .finally(() => setLoader(false));
//   }, []);

//   useEffect(() => {
//     setCurrentNumber(BooksData.length);
//     if (currentNumber >= targetNumber) {
//       setShowPrizeButton(true);
//     }
//   }, [BooksData.length]);

//   useEffect(() => {
//     if (currentNumber >= targetNumber) {
//       setShowPrizeButton(true);
//     }
//   }, [currentNumber]);

//   const launchFireworks = () => {
//     confetti({
//       particleCount: 100,
//       spread: 70,
//       origin: { y: 0.6 },
//     });
//   };

//   const calculateTotalPrice = () => {
//     const sum = BooksData.reduce(
//       (acc, book) => acc + parseFloat(book.price),
//       0
//     );
//     setTotalPrice(sum);
//   };

//   const handlePrizeButtonClick = (index) => {
//     setTargetsReached(true);
//     setShowPrizeButton(false);
//     calculateTotalPrice();
//     launchFireworks();

//     const newPrizesClaimed = [...prizesClaimed];
//     newPrizesClaimed[index] = true;
//     setPrizesClaimed(newPrizesClaimed);
//     const updatedPrizesRevealed = [...prizesRevealed];
//     updatedPrizesRevealed[index] = true;
//     setPrizesRevealed(updatedPrizesRevealed);
//   };

//   useEffect(() => {
//     const updatedCurrentNumbers = targets.map((_, index) => BooksData.length);
//     setCurrentNumbers(updatedCurrentNumbers);

//     const updatedTargetsReached = updatedCurrentNumbers.map(
//       (number, index) => number >= targets[index]
//     );
//     setTargetsReached(updatedTargetsReached);
//   }, [BooksData.length]);

//   return (
//     <div className="frame">
//       <Stack
//         direction="column"
//         spacing={2}
//         alignItems="flex-start"
//         justifyContent="center" // Centers the content
//         sx={{ width: "100%", mt: 2 }} // Additional styling, if needed
//       >
//         {targets.map((targetNumber, index) => (
//           <Box
//             key={index}
//             className="mini-game-container"
//             sx={{
//               p: 2,
//               border: "1px solid grey",
//               borderRadius: "4px",
//               textAlign: "center",
//               maxWidth: "300px",
//               width: "100%",
//               mb: 2,
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{ textAlign: "center", width: "100%" }}
//               gutterBottom
//             >
//               Number of Books Added:
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{ textAlign: "center", width: "100%" }}
//             >
//               {currentNumbers[index]} / {targetNumber}
//             </Typography>

//             {!prizesRevealed[index] && (
//               <>
//                 {/* Show button only if the target is reached and prize not revealed */}
//                 {targetsReached[index] && (
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => handlePrizeButtonClick(index)}
//                   >
//                     Get Your Prize
//                   </Button>
//                 )}
//               </>
//             )}

//             {prizesClaimed[index] && (
//               <>
//                 <Typography
//                   variant="h5"
//                   color="green"
//                   gutterBottom
//                   sx={{ textAlign: "center", width: "100%" }}
//                 >
//                   Great!
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   sx={{ textAlign: "center", width: "100%" }}
//                 >
//                   You've made it!
//                 </Typography>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ textAlign: "center", width: "100%" }}
//                 >
//                   Total Price of Books: ₪{totalPrice}
//                 </Typography>
//               </>
//             )}
//           </Box>
//         ))}
//       </Stack>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import confetti from "canvas-confetti";
import "./home.css";
import { GeneralContext } from "../../App";
import Stack from "@mui/material/Stack";

const Home = () => {
  const [BooksData, setBooksData] = useState([]);
  const [currentNumbers, setCurrentNumbers] = useState([]);
  const targets = [2, 10, 25, 50, 100];
  const [targetsReached, setTargetsReached] = useState(
    new Array(targets.length).fill(false)
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [prizesClaimed, setPrizesClaimed] = useState(
    new Array(targets.length).fill(false)
  );
  const [prizesRevealed, setPrizesRevealed] = useState(
    new Array(targets.length).fill(false)
  );
  const { setLoader } = useContext(GeneralContext);

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
        setBooksData(data);
        const updatedCurrentNumbers = new Array(targets.length).fill(
          data.length
        );
        setCurrentNumbers(updatedCurrentNumbers);
        setTargetsReached(
          updatedCurrentNumbers.map((number, index) => number >= targets[index])
        );

        // Calculate total price based on fetched data
        const sum = data.reduce((acc, book) => acc + parseFloat(book.price), 0);
        setTotalPrice(sum);
        localStorage.setItem("totalPrice", sum.toString());
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      })
      .finally(() => setLoader(false));
  }, [setLoader]);

  const calculateTotalPrice = () => {
    const sum = BooksData.reduce(
      (acc, book) => acc + parseFloat(book.price),
      0
    );
    setTotalPrice(sum);
    localStorage.setItem("totalPrice", sum.toString()); // Save to local storage
    console.log("Saved total price:", sum); // Log for confirmation
  };

  const handlePrizeButtonClick = (index) => {
    calculateTotalPrice();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    const newPrizesClaimed = [...prizesClaimed];
    newPrizesClaimed[index] = true;
    setPrizesClaimed(newPrizesClaimed);
    const updatedPrizesRevealed = [...prizesRevealed];
    updatedPrizesRevealed[index] = true;
    setPrizesRevealed(updatedPrizesRevealed);

    fetch(`http://185.229.226.27:3001/api/targets/${targets[index]}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((updatedTarget) => {
        // Update local state to reflect the goal completion
        console.log("Updated target response:", updatedTarget); // Log the response
        const newPrizesRevealed = [...prizesRevealed];
        newPrizesRevealed[index] = updatedTarget.isCompleted;
        setPrizesRevealed(newPrizesRevealed);
      })
      .catch((error) => console.error("Error updating target:", error));
  };

  useEffect(() => {
    fetch("http://185.229.226.27:3001/api/targets")
      .then((response) => response.json())
      .then((targetsFromDB) => {
        setTargetsReached(targetsFromDB.map((goal) => goal.isCompleted));
        setPrizesRevealed(targetsFromDB.map((goal) => goal.isCompleted));
      })
      .catch((error) => console.error("Error fetching targets:", error));
  }, []);

  useEffect(() => {
    const savedTotalPrice = localStorage.getItem("totalPrice");
    if (savedTotalPrice) {
      setTotalPrice(parseFloat(savedTotalPrice));
    }
  }, []);

  return (
    <div className="frame">
      <Stack
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
      </Stack>
    </div>
  );
};

export default Home;
