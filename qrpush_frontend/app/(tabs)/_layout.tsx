import { Tabs } from "expo-router";
import Toast from "react-native-toast-message";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Toast />
    </Tabs>
  );
}