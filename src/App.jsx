import React from "react";
import DeleteAccount from "./pages/DeleteAccount";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <DeleteAccount />

      {/* Toasts should live here (root level) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
