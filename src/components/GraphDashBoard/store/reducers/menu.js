// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  openItem: ['dashboard'],
  defaultId: 'dashboard',
  openComponent: 'buttons',
  drawerOpen: false,
  componentDrawerOpen: true
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    openDrawer(state, action) {
      state.drawerOpen = action.payload.drawerOpen;
    }
  }
});

export default menu.reducer;

export const { openDrawer } = menu.actions;
