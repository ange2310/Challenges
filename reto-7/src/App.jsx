import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LinkedListPage from "./pages/LinkedListPage";
import DoublyLinkedListPage from "./pages/DoublyLinkedListPage";
import './styles/styles.css'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LinkedListPage" element={<LinkedListPage />} />
        <Route path="/doubly-linked-list" element={<DoublyLinkedListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;