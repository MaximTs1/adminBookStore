import React, { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import feather from "feather-icons";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import useScript from "./useScript";
import OrderTable from "./components/OrderTable";
import OrderList from "./components/OrderList";
import Header from "./components/Header";

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export default function JoyOrderDashboardTemplate() {
  const status = useScript("https://unpkg.com/feather-icons");

  const [rows, setRows] = useState([
    {
      id: "INV-1243",
      date: "Feb 3, 2023",
      status: "Refunded",
      customer: {
        initial: "O",
        name: "Olivia Ryhe",
        email: "olivia@email.com",
      },
    },
    {
      id: "INV-1242",
      date: "Feb 3, 2023",
      status: "Paid",
      customer: {
        initial: "S",
        name: "Steve Hampton",
        email: "steve.hamp@email.com",
      },
    },
    {
      id: "INV-1241",
      date: "Feb 3, 2023",
      status: "Refunded",
      customer: {
        initial: "C",
        name: "Ciaran Murray",
        email: "ciaran.murray@email.com",
      },
    },
    {
      id: "INV-1240",
      date: "Feb 3, 2023",
      status: "Refunded",
      customer: {
        initial: "M",
        name: "Maria Macdonald",
        email: "maria.mc@email.com",
      },
    },
    {
      id: "INV-1239",
      date: "Feb 3, 2023",
      status: "Cancelled",
      customer: {
        initial: "C",
        name: "Charles Fulton",
        email: "fulton@email.com",
      },
    },
    {
      id: "INV-1238",
      date: "Feb 3, 2023",
      status: "Cancelled",
      customer: {
        initial: "J",
        name: "Jay Hooper",
        email: "hooper@email.com",
      },
    },
    {
      id: "INV-1237",
      date: "Feb 3, 2023",
      status: "Refunded",
      customer: {
        initial: "K",
        name: "Krystal Stevens",
        email: "k.stevens@email.com",
      },
    },
    {
      id: "INV-1236",
      date: "Feb 3, 2023",
      status: "Paid",
      customer: {
        initial: "S",
        name: "Sachin Flynn",
        email: "s.flyn@email.com",
      },
    },
    {
      id: "INV-1235",
      date: "Feb 3, 2023",
      status: "Cancelled",
      customer: {
        initial: "B",
        name: "Bradley Rosales",
        email: "brad123@email.com",
      },
    },
    {
      id: "INV-1234",
      date: "Feb 3, 2023",
      status: "Paid",
      customer: {
        initial: "O",
        name: "Olivia Ryhe",
        email: "olivia@email.com",
      },
    },
    {
      id: "INV-1233",
      date: "Feb 3, 2023",
      status: "Cancelled",
      customer: {
        initial: "S",
        name: "Steve Hampton",
        email: "steve.hamp@email.com",
      },
    },
    {
      id: "INV-1232",
      date: "Feb 3, 2023",
      status: "Paid",
      customer: {
        initial: "C",
        name: "Ciaran Murray",
        email: "ciaran.murray@email.com",
      },
    },
    {
      id: "INV-1231",
      date: "Feb 3, 2023",
      status: "Refunded",
      customer: {
        initial: "M",
        name: "Maria Macdonald",
        email: "maria.mc@email.com",
      },
    },
    {
      id: "INV-1230",
      date: "Feb 3, 2023",
      status: "Paid",
      customer: {
        initial: "C",
        name: "Charles Fulton",
        email: "fulton@email.com",
      },
    },
    {
      id: "INV-1229",
      date: "Feb 3, 2023",
      status: "Cancelled",
      customer: {
        initial: "J",
        name: "Jay Hooper",
        email: "hooper@email.com",
      },
    },
    {
      id: "INV-1228",
      date: "Feb 3, 2023",
      status: "Cancelled",
      customer: {
        initial: "K",
        name: "Krystal Stevens",
        email: "k.stevens@email.com",
      },
    },
    {
      id: "INV-1227",
      date: "Feb 3, 2023",
      status: "Paid",
      customer: {
        initial: "S",
        name: "Sachin Flynn",
        email: "s.flyn@email.com",
      },
    },
    {
      id: "INV-1226",
      date: "Feb 3, 2023",
      status: "Cancelled",
      customer: {
        initial: "B",
        name: "Bradley Rosales",
        email: "brad123@email.com",
      },
    },
  ]);

  useEnhancedEffect(() => {
    if (typeof feather !== "undefined") {
      feather.replace();
    }
  }, [status]);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}></Box>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography level="h2" component="h1">
              {/* Orders */}
            </Typography>
            <Button
              color="primary"
              startDecorator={<DownloadRoundedIcon />}
              size="sm"
            >
              Download PDF
            </Button>
          </Box>
          <OrderTable rows={rows} />
          <OrderList rows={rows} />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
