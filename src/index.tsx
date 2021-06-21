import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import GlobalStyles from "./styles/globalStyles";

// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
