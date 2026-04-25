import { NavigatorScreenParams } from "@react-navigation/native";
import {MenuItemDisplay} from '../types';
// Define your navigation types
export type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Home: undefined;
  Login: undefined;
  Profile: undefined;
  MenuItemDetails: { menuItem: MenuItemDisplay };
  // Add other screens here later
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
};

export type HomeTabParamList = {
  Menu: undefined;
  Reservations: undefined;
  Profile: undefined;
};