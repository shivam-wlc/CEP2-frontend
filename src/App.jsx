import AppRoutes from "./routes/AppRoutes";
import { selectAlert } from "./redux/slices/alertSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AlertMessage from "./components/AlertMessage.jsx";

function App() {
  const alert = useSelector(selectAlert);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alert.message) {
      setOpen(true);
    }
  }, [alert]);

  return (
    <>
      <AlertMessage open={open} setOpen={setOpen} />
      <AppRoutes />
    </>
  );
}

export default App;
