import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { backgroundVector } from "./assets/assest.js";
import AlertMessage from "./components/AlertMessage.jsx";
import { selectAlert } from "./redux/slices/alertSlice";
import AppRoutes from "./routes/AppRoutes";
// import "./App.css";

function App() {
  const alert = useSelector(selectAlert);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alert.message) {
      setOpen(true);
    }
  }, [alert]);

  return (
    <div
      style={{
        backgroundImage: `url("./${backgroundVector}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AlertMessage open={open} setOpen={setOpen} />
      <AppRoutes />
    </div>
  );
}

export default App;
