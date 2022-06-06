import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { RecoilRoot } from 'recoil';
import { customPaperTheme, customNavTheme } from './src/common/styles/themes';
import Layout from './src/containers/Layout/templates/Layout'
import { ImageBackground } from 'react-native';

// LogBox.ignoreLogs(['Remote debugger']);

const App = () => {
  return (
    <RecoilRoot>
      <PaperProvider theme={customPaperTheme}>
        <NavigationContainer theme={customNavTheme}>
          <TailwindProvider utilities={utilities}>
            <Layout/>
          </TailwindProvider>
        </NavigationContainer>
      </PaperProvider>
    </RecoilRoot>
  )
}
export default App
