import Home from "./screens/Home";
import RootContextProvider from "./context/RootContextProvider";
export default function App() {
  return (
    <RootContextProvider>
      <Home />
    </RootContextProvider>
  );
}
