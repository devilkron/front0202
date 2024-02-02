import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/appRouter";
import { useState } from "react";


function App() {
  const { loading, theme } = useAuth();

  if(loading){
    return (
      <p className="text-4xl text-primary">LOADING</p>
    )
  }
  return (
    <div data-theme={theme ? "dark": "light"} className="min-h-screen">
      <AppRouter />
    </div>
  );
}

export default App;
