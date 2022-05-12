import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, View } from 'react-native';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { RecoilRoot } from 'recoil';
import AppNavigator from './src/navigations/AppNavigator';

LogBox.ignoreLogs(['Remote debugger']);

const App = () => {
  let renderComponent = <AppNavigator initialRouteName='Test' />

  return (
    <RecoilRoot>
      <PaperProvider>
        <NavigationContainer>
          <TailwindProvider utilities={utilities}>
            <View style={styles.container}>
              <StatusBar style="auto" />
              {renderComponent}
              {/* <Test/> */}
            </View>
          </TailwindProvider>
        </NavigationContainer>
      </PaperProvider>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App
