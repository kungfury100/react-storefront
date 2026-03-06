import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.js'
import { CartSumContextProvider } from './context/CartSumContext.js'
import { AuthContextProvider } from './context/AuthContext.js'
import { DarkModeContextProvider } from './context/DarkModeContext.js'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'

const PRODUCTS_STORAGE_KEY = 'storefront-products'
localStorage.removeItem(PRODUCTS_STORAGE_KEY)

// Calculate scrollbar width and set CSS variable
const calculateScrollbarWidth = () => {
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  document.body.appendChild(outer)
  
  const inner = document.createElement('div')
  outer.appendChild(inner)
  
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
  document.body.removeChild(outer)
  
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
}

calculateScrollbarWidth()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartSumContextProvider>
        <AuthContextProvider>
          <DarkModeContextProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </DarkModeContextProvider>
        </AuthContextProvider>
      </CartSumContextProvider>
    </BrowserRouter>
  </StrictMode>,
)

//1. E 12.01 - react algus, reactis navigeerimine
//2. K 14.01 - useState, dünaamiline väljakuvamine &&, function, dünaamiline CSS, ref, alamkomponendid
//3. E 19.01 - kalkulaator, firebase
//4. K 21.01 - arrays
//5. E 26.01 - objektid, lisamine (ref/onChange)
//6. E 02.02 - useParams(), muutmine
//7. K 04.02 - darkmode/lightmode. keel. localStorage. ostukorv. localStorage array
//8. E 09.02 - API päringud. makse.
//9. K 11.02 - emaili saatmine. kaardirakendus. CSS library (Bootstrap + MUI + Tailwind). KOJU: uus inglise keelne veebipood.
//10.E 16.02 - (uus ENG). andmebaas.
//11.K 18.02 - kogus ostukorvis
//12.T 24.02 - typescript
//13.N 26.02 - reitingu skooriasi, Context
//14.E 02.03 - Redux, emaili saatmine tellides, Dialog
//15.K 04.03 - sisselogimine
//16.E 09.03
//17.K 11.03
//18.K 25.03 poolik päev, lõpuprojekti esitlemine

//ManageShops.tsx hook