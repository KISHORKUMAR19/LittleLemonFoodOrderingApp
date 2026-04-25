import { View,Text,Image,Pressable} from "react-native";
import WelcomeStyles from "../Styles/WelcomeStyles";
import { useNavigation } from "@react-navigation/native";


export default function WelcomeScreen() {
    const navigation = useNavigation(); 
    return(
        <View style={WelcomeStyles.container}>
            <View style={WelcomeStyles.logoContainer}>
                <Image
                source={require("../assets/branding/logo_large.png")}
                style={WelcomeStyles.mainlogo}
                accessible={true}
                accessibilityLabel="Main Logo"
                />
            </View>

            <View style={WelcomeStyles.titleContainer}>    
                    
                <Text style={WelcomeStyles.title}>
                    Welcome{'\n'}
                    to{'\n'}
                    Little Lemon
                </Text>

            </View>
                
                <Text style={WelcomeStyles.subtitle}>Your Mediterranean Escape</Text>

            <Pressable
                style={({ pressed }) => [
                    WelcomeStyles.button,
                    {
                        backgroundColor: pressed ? "#F4CE14" : "#EE9972",
                    },
                ]}
                onPress={() => navigation.navigate ("Onboarding")} 
            >
                
                <Text style={WelcomeStyles.buttonText}>Get started</Text>

            </Pressable>

            <Pressable
                style={({ pressed }) => [
                    WelcomeStyles.button,
                    { 
                        backgroundColor: pressed ? "#F4CE14" : "#EDEFEE",
                        marginTop: 20
                    }
                ]}
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={[WelcomeStyles.buttonText, { color: '#333' }]}>Login</Text>
            </Pressable>
        </View>
    )
};


