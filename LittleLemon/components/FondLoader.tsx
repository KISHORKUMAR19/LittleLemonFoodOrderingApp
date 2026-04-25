import { useState, useEffect} from "react";
import {View,ActivityIndicator} from 'react-native';
import { loadFonts,FontsLoaded } from "../utils/fonts";

export default function Fontloader({children}:{children:React.ReactNode}){
    const [fontsloaded, setFontsloaded] = useState(false);

     useEffect(() => {
    async function initializeFonts() {
      if (!FontsLoaded()) {
        await loadFonts();
      }
      setFontsloaded(true);
    }
    
    initializeFonts();
  }, []);

  if (!fontsloaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#495E57" />
      </View>
    );
  }

  return <>{children}</>;
}