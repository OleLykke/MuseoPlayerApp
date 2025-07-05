import { Stack } from "expo-router";

export const options = {
  headerShown: false,
  title: ""
};

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false, title: "" }} />;
}