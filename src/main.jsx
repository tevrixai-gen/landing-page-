import React from 'react'
import ReactDOM from 'react-dom/client'
import { SpeedInsights } from "@vercel/speed-insights/react"
import App from './App.jsx'
import './index.css'

const removeFmOverride = () => {
  document.getElementById('fm-ssr')?.remove();
  document.removeEventListener('scroll', removeFmOverride);
  document.removeEventListener('click', removeFmOverride);
  document.removeEventListener('touchstart', removeFmOverride);
};
document.addEventListener('scroll', removeFmOverride, { passive: true, once: true });
document.addEventListener('click', removeFmOverride, { once: true });
document.addEventListener('touchstart', removeFmOverride, { once: true });
setTimeout(removeFmOverride, 10000);

const rootElement = document.getElementById('root');
const app = (
  <React.StrictMode>
    <SpeedInsights />
    <App />
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
