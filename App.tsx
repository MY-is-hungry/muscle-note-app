import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, View } from 'react-native';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { RecoilRoot } from 'recoil';
import AppNavigator from './src/navigations/AppNavigator';
import { customPaperTheme } from './src/common/styles/themes';
import AuthNavigator from './src/navigations/AuthNavigator';
import { firebaseAuth } from './src/common/utils/firebase';
import { onAuthStateChanged } from '@firebase/auth';
import { useEffect, useState } from 'react';

// LogBox.ignoreLogs(['Remote debugger']);

const App = () => {
  const [renderComponent, setRenderComponent] = useState<JSX.Element>(
    firebaseAuth?.currentUser ? <AppNavigator initialRouteName='Home' /> : <AuthNavigator initialRouteName='Login' />
  )

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // サインイン中
        console.log('ログイン済み')
        setRenderComponent(<AppNavigator initialRouteName='Home' />)
      } else {
        // サインアウト中
        console.log('非ログイン')
        setRenderComponent(<AuthNavigator initialRouteName='Login' />)
      }
    })
  }, [])

  return (
    <RecoilRoot>
      <PaperProvider theme={customPaperTheme}>
        <NavigationContainer>
          <TailwindProvider utilities={utilities}>
            <View style={styles.container}>
              <StatusBar style="auto" />
              {renderComponent}
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
