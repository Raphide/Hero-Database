import "./App.scss";
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
import NavBar from "./components/NavBar/NavBar";
import BattlePage from "./pages/BattlePage/BattlePage";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="border">
    <div className="app">
        <BrowserRouter>
      <QueryClientProvider client={queryClient}>
          <h1>HERiO</h1>
          <NavBar/>
       <Routes>
        <Route path="/" element={<HeroPage/>} />
        <Route path="/save/:id" element={<SaveHeroPage/>} />
        <Route path="/collection" element={<HeroCollectionPage/>}/>
        <Route path="/collection/update/:id" element={<UpdateHeroPage/>}/>
        <Route path="/collection/battle" element={<BattlePage/>}/>
       </Routes>
      </QueryClientProvider>
        </BrowserRouter>
    </div></div>
  );
}

export default App;
