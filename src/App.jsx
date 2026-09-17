import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { IkBackground } from "@/components/IkBackground";

function App() {
  return (
    <>
      <IkBackground />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </>
  );
}

export default App;
