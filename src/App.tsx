import { AuthInit } from "@app/modules/auth";
import { I18nProvider } from "@base/i18n/i18nProvider";
import { LayoutSplashScreen } from "@base/layout/BaseSplasyScreen";
import { MasterLayout } from "@base/layout/core/master-layout";
import { Suspense } from "react";

function App() {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <I18nProvider>
                <AuthInit>
                    <MasterLayout />
                </AuthInit>
            </I18nProvider>
        </Suspense>
    );
}

export default App;
