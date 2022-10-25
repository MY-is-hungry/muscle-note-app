import React from 'react'
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { RecoilRoot } from 'recoil';
import { customPaperTheme, customNavTheme } from './src/common/styles/themes';
import Layout from './src/containers/layout/templates/Layout'
import { LogBox } from 'react-native';
import { QueryClientProvider, QueryClient } from 'react-query'

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
