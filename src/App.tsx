import { Provider as StoreProvider } from 'react-redux';
import store from '~/store';
import AppRoutes from '~/routes';

function App() {
  return (
    <StoreProvider store={store}>
      <AppRoutes />
    </StoreProvider>
  );
}

export default App;
