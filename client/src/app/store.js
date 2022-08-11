import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "../features/user";
import appointmentReducer from "../features/appointment";
import branchOfficeReducer from "../features/branchOffice";
import editAppointmentReducer from "../features/editAppointment";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    appointment: appointmentReducer,
    branchOffice: branchOfficeReducer,
    editApp: editAppointmentReducer,
  },
});

export default store;
