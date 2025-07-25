import "./styles/global.scss"

import { StrictMode } from "react"

import AppProviders from "./providers"
import { RouterProviderComponent } from "./router/router-provider"

export const App = () => (
  <StrictMode>
    <AppProviders>
      <RouterProviderComponent />
    </AppProviders>
  </StrictMode>
)
