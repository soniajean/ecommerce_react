import { useFirebaseApp, AuthProvider, DatabaseProvider } from "reactfire";
import App from "./App";
import DataProvider from "./context/DataProvider";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const ProviderLayer = () => {


    const app = useFirebaseApp();
    // SDK initialization for the DB
    const db = getDatabase(app); 
    const auth = getAuth(app);


    return(
        <DataProvider>
            <AuthProvider sdk={auth}>
                <DatabaseProvider sdk={db}>
                    <App />
                </DatabaseProvider>
            </AuthProvider>
        </DataProvider>
    )
}

export default ProviderLayer;