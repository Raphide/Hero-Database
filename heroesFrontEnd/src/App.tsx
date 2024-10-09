import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroPage from "./pages/HeroPage/HeroPage";
import SaveHeroPage from "./pages/SaveHeroPage/SaveHeroPage";
import HeroCollectionPage from "./pages/HeroCollectionPage/HeroCollectionPage";
import UpdateHeroPage from "./pages/UpdateHeroPage/UpdateHeroPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <h1>HERiO</h1>
       <Routes>
        <Route path="/" element={<HeroPage/>} />
        <Route path="/save/:id" element={<SaveHeroPage/>} />
        <Route path="/collection" element={<HeroCollectionPage/>}/>
        <Route path="/collection/update/:id" element={<UpdateHeroPage/>}/>
       </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
