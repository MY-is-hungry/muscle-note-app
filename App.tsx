import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { RecoilRoot } from 'recoil';
import { TailwindProvider } from 'tailwind-rn';
import { customNavTheme, customPaperTheme } from './src/common/styles/themes';
import Layout from './src/containers/layout/templates/Layout';
import utilities from './tailwind.json';

LogBox.ignoreLogs(['Remote debugger']);

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 300000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <PaperProvider theme={customPaperTheme}>
          <NavigationContainer theme={customNavTheme}>
            <TailwindProvider utilities={utilities}>
              <Layout/>
            </TailwindProvider>
          </NavigationContainer>
        </PaperProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}
export default App
