import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "@app/store";
import { Toaster } from "react-hot-toast";
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import { Base18nProvider } from '@base/i18n/Base18n';
import { AuthProvider } from '@app/modules/auth';
import AppRoutes from '@app/routes/AppRoutes';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <Toaster />
    <HelmetProvider>
      <Base18nProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Base18nProvider>
    </HelmetProvider>
  </Provider>
)
