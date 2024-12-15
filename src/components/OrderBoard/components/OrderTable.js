import React, { useState, useEffect } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import OrderStatusBar from "./OrderStatusBar.js";
import "./style.css";

function RowMenu({ onViewOrder }) {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem onClick={onViewOrder}>View Order</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderTable({ rows }) {
  // const [anchorEl, setAnchorEl] = useState(null);
  // State to track the anchor of each row's menu
  const [menuAnchors, setMenuAnchors] = useState({});
  const [order, setOrder] = React.useState("desc");
  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedCustomer, setSelectedCustomer] = React.useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRows, setCurrentRows] = useState(rows);

  const toggleOrderDetails = (order) => {
    setSelectedOrder(order);
    console.log("SelectedOrder", selectedOrder);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    setCurrentRows(rows);
  }, [rows]);

  const subtotal = selectedOrder?.cart.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (event, orderId) => {
    setMenuAnchors((prevAnchors) => ({
      ...prevAnchors,
      [orderId]: prevAnchors[orderId] ? null : event.currentTarget,
    }));
  };

  const handleClose = (orderId, status) => {
    setMenuAnchors((prevAnchors) => ({
      ...prevAnchors,
      [orderId]: null, // Close the menu
    }));
    if (status && orderId) {
      updateOrderStatus(orderId, status);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    // API call to update the status
    try {
      const response = await fetch(
        `http://localhost:3001/manager/updateOrderStatus/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Add your auth headers if needed
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const result = await response.json();
      // If the update was successful, update the local state
      if (response.ok) {
        const updatedRows = currentRows.map((row) => {
          if (row.orderId === orderId) {
            return { ...row, status: newStatus }; // Update the status of the specific order
          }
          return row; // Return unmodified for all other orders
        });

        setCurrentRows(updatedRows); // Update the state with the modified rows
      } else {
        // Handle errors or unsuccessful updates
        console.error("Failed to update order status:", result);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const statusOptions = [
    "Delivered",
    "Processing",
    "Placed",
    "Canceled",
    "Shipped",
    "Refunded",
  ];

  const sortOrder = (rows) => {
    if (order === "desc") {
      rows = rows?.sort((a, b) => b.orderId - a.orderId);
    } else {
      rows = rows?.sort((a, b) => a.orderId - b.orderId);
    }

    rows = rows?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return rows;
  };

  // Function to filter rows based on search input
  const filterRows = (rows) => {
    return rows.filter((row) => {
      const matchesSearch = row.customer.name
        .toLowerCase()
        .includes(searchInput.toLowerCase());

      const matchesStatus = selectedStatus
        ? row.status &&
          row.status.toLowerCase() === selectedStatus.toLowerCase()
        : true;

      const matchesCustomer = selectedCustomer
        ? row.customer.name &&
          row.customer.name
            .toLowerCase()
            .includes(selectedCustomer.toLowerCase())
        : true;

      const matchesCategory = selectedCategory
        ? row.category &&
          row.category.toLowerCase() === selectedCategory.toLowerCase()
        : true;

      return (
        matchesSearch && matchesStatus && matchesCustomer && matchesCategory
      );
    });
  };

  // Calculate the filtered rows
  const filteredRows = filterRows(rows);
  // Calculate total pages based on filtered rows
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  // Update currentItems to use filteredRows
  const currentItems = currentRows;

  const colorMap = {
    Delivered: "success",
    Shipped: "primary",
    Placed: "danger", //secondary, error, info, danger
    Processing: "warning",
    Canceled: "secondary",
    Refunded: "secondary",
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  // Functions to handle filter changes
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="your-select-class"
        >
          <option value="">All</option>
          <option value="placed">Placed</option>
          <option value="processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Closed Orders</FormLabel>
        <select
          size="sm"
          placeholder="Closed Orders"
          value={selectedStatus}
          onChange={handleStatusChange}
          className="your-select-class"
        >
          <option value="">All</option>
          <option value="Delivered">Completed Order</option>
          <option value="Refunded">Refunded</option>
          <option value="canceled">Canceled</option>
        </select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <select
          size="sm"
          placeholder="Filter by customer"
          value={selectedCustomer}
          onChange={handleCustomerChange}
          className="your-select-class"
        >
          <option value="">All</option>
          {rows
            .reduce((unique, row) => {
              if (
                !unique.some((obj) => obj.customer.name === row.customer.name)
              ) {
                unique.push(row);
              }
              return unique;
            }, [])
            .map((row, index) => (
              <option
                key={index}
                // key={row.customer.email}
                value={row.customer.name.split(" ")[0].toLowerCase()}
              >
                {row.customer.name}
              </option>
            ))}
        </select>
      </FormControl>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
          mr: -3,
          ml: 5,
          background: "none",
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          ml: "5%",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for order</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchChange}
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
          ml: "5%",
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? rows.map((row) => row.id) : []
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === rows.length
                      ? "primary"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  }}
                >
                  Invoice
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Date</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Status</th>
              <th style={{ width: 240, padding: "12px 6px" }}>Customer</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterRows(sortOrder(currentItems)).map((row) => (
              <tr key={row.orderId}>
                <td style={{ textAlign: "center", width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.orderId)}
                    color={
                      selected.includes(row.orderId) ? "primary" : undefined
                    }
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.orderId)
                          : ids.filter((itemId) => itemId !== row.orderId)
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{row.orderId}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">
                    {new Date(row.date).toLocaleDateString("en-GB")}
                  </Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Delivered: <CheckRoundedIcon />,
                        Processing: <AutorenewRoundedIcon />,
                        Placed: <NewReleasesIcon />,
                        Canceled: <BlockIcon />,
                        Shipped: <LocalShippingIcon />,
                        Refunded: <CurrencyExchangeIcon />,
                      }[row.status]
                    }
                    color={colorMap[row.status]}
                    onClick={(event) => handleClick(event, row.orderId)}
                  >
                    {row.status}
                  </Chip>
                  <Menu
                    anchorEl={menuAnchors[row.orderId]}
                    open={Boolean(menuAnchors[row.orderId])}
                    onClose={() => handleClose(row.orderId)}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem
                        // key={status}
                        key={status}
                        onClick={() => handleClose(row.orderId, status)}
                      >
                        {status}
                      </MenuItem>
                    ))}
                  </Menu>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar size="sm">{row.customer.initial}</Avatar>
                    <div>
                      <Typography level="body-xs">
                        {row.customer.name}
                      </Typography>
                      <Typography level="body-xs">
                        {row.customer.email}
                      </Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Link level="body-xs" component="button">
                      Download
                    </Link>
                    <RowMenu onViewOrder={() => toggleOrderDetails(row)} />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      {/* Modal for order details */}
      {isModalOpen && selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <div className="col-xl-4">
              <div className="card checkout-order-summary">
                <div className="card-body">
                  <div className="p-3 bg-light mb-3">
                    <h5
                      className="font-size-16 mb-0"
                      style={{ marginLeft: "5%", marginTop: "3%" }}
                    >
                      Order Summary
                    </h5>
                  </div>
                  <div
                    className="table-responsive"
                    style={{ width: "200%", marginLeft: "5%" }}
                  >
                    <table className="table table-centered mb-0 table-nowrap custom-table">
                      <thead>
                        <tr>
                          <th className="border-top-0" scope="col">
                            Product
                          </th>
                          <th className="border-top-0" scope="col">
                            Amount
                          </th>
                          <th className="border-top-0" scope="col">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.cart.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <img
                                className="img"
                                src={`data:image/jpeg;base64,${item.image}`}
                                alt={item.name}
                              />
                              <p className="font-size-16 text-truncate">
                                {item.name}
                              </p>
                            </td>
                            <td>{item.amount}</td>
                            <td>₪{item.price * item.amount}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan="2">
                            <h5 className="font-size-14 m-0">Sub Total :</h5>
                          </td>
                          <td>₪{subtotal}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <h5 className="font-size-14 m-0">
                              Shipping Charge :
                            </h5>
                          </td>
                          <td>₪{30}</td>
                        </tr>
                        <tr className="bg-light">
                          <td colSpan="2">
                            <h5 className="font-size-14 m-0">Total:</h5>
                          </td>
                          <td>₪{subtotal + 30}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <h5 className="font-size-14 m-0">Order Status :</h5>
                          </td>
                          <td>
                            <OrderStatusBar order={selectedOrder} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        {/* <Button
          size="sm"
          variant="outlined"
          color="neutral"
          // startDecorator={<KeyboardArrowLeftIcon />}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </Button> */}
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>

        <Typography level="body-sm" mx="auto">
          Page {currentPage} of {totalPages}
        </Typography>

        {/* <Button
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </Button> */}

        <Button
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          // startIcon={<KeyboardArrowRightIcon />}
          sx={{
            display: "inline-flex", // Ensures icon and text are inline
            alignItems: "center", // Aligns items vertically
          }}
        >
          Next &gt;
        </Button>
      </Box>
    </React.Fragment>
  );
}
