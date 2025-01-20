import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import CalculatorBox from "./components/CalculatorBox";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CalculatorBox />
    </QueryClientProvider>
  );
}

export default App;
