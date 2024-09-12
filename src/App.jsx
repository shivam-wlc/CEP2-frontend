import AppRoutes from "./routes/AppRoutes";
import { selectAlert } from "./redux/slices/alertSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AlertMessage from "./components/AlertMessage.jsx";
import { backgroundVector } from "./assets/assest.js";

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
