import React, { ReactNode, useEffect } from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationContainer, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { linking } from "./linking";

const {Screen, Navigator} = createNativeStackNavigator();

enum NavigationStackKey {
  Home = 'Profile',
  Feed= 'Feed',
  Messages = 'Messages',
  Profile = 'Profile',
  Settings = 'Settings',
}

type NavigationStackParamList = {
  [NavigationStackKey.Profile]: { id: string }
}

export type RootStackParamListType = {
  [NavigationStackKey.Home]: undefined;
  [NavigationStackKey.Feed]: undefined;
  [NavigationStackKey.Settings]: undefined;
  [NavigationStackKey.Messages]: undefined;
};

type HomeScreenNavigateType =
  NativeStackNavigationProp<RootStackParamListType, NavigationStackKey.Home>;

type SettingsScreenNavigateType =
  NativeStackNavigationProp<RootStackParamListType, NavigationStackKey.Settings>;

const Container = ({children}: { children: ReactNode }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{children}</Text>
  </View>
);

const Feed = () => <Container>Feed</Container>;

const Messages = () => <Container>Messages</Container>;

const Profile = () => {
  const { params: { id } } =
    useRoute<RouteProp<NavigationStackParamList, NavigationStackKey.Profile>>();

  useEffect(() => {
    if (id) {
      Alert.alert('', `ID ~ ${id}`);
    }
  }, [id])

  return <Container>Profile</Container>
};

const Settings = () => {
  const { navigate } = useNavigation<SettingsScreenNavigateType>();

  const onFeedPress = () => navigate(NavigationStackKey.Feed);

  const onMessagesPress = () => navigate(NavigationStackKey.Messages);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <Button title={NavigationStackKey.Feed} onPress={onFeedPress} />
        <Button title={NavigationStackKey.Messages} onPress={onMessagesPress} />
      </View>
    </View>
  );
};

const Home = () => {
  const { navigate } = useNavigation<HomeScreenNavigateType>();

  const onProfilePress = () => navigate(NavigationStackKey.Profile);

  const onSettingsPress = () => navigate(NavigationStackKey.Settings);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button title={NavigationStackKey.Profile} onPress={onProfilePress} />
      <Button title={NavigationStackKey.Settings} onPress={onSettingsPress} />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer linking={linking}>
      <Navigator>
        <Screen name="Home" component={Home} />
        <Screen name="Profile" component={Profile} />
        <Screen name="Settings" component={Settings} />
        <Screen name="Feed" component={Feed} />
        <Screen name="Messages" component={Messages} />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 22,
  }
})
