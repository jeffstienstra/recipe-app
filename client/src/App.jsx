import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import RecipeModal from "./components/RecipeModal";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/recipe/new" element={<RecipeModal />} />
        <Route path="/recipe/edit/:id" element={<RecipeModal />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
