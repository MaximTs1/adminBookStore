import React, { useState, useEffect } from "react";
import JoyOrderDashboardTemplate from "../../components/OrderBoard/JoyOrderDashboardTemplate";

const MuiOrder = () => {
  return (
    <div style={{ width: "90%", position: "relative", zIndex: 1 }}>
      <JoyOrderDashboardTemplate />
    </div>
  );
};

export default MuiOrder;
