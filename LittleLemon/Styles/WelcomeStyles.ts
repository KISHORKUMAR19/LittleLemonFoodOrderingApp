import { FONTS } from "../utils/fonts";
import { StyleSheet } from "react-native";


const WelcomeStyles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems:"center",
        padding: 20,     
    },
    logoContainer:{
        maxHeight:120,
        marginBottom:20,
        justifyContent:"center"
    },
    mainlogo:{
        resizeMode: "contain",
        width: '80%',
        maxHeight:100,
        aspectRatio:1.8,   
    },
    titleContainer: {
        backgroundColor: "#495E57",
        borderRadius: 12,
        paddingHorizontal:30,
        paddingVertical:15,
        marginBottom: 12
    },
    title:{
        fontFamily:FONTS.markaziTextMedium,
        fontSize: 64,
        textAlign: "center",
        color: "#F4CE14",
        lineHeight:70
                   
    },
    subtitle:{
        fontFamily:FONTS.markaziTextRegular,
        fontSize: 40,
        textAlign: "center",
        color: "#333333",
        marginBottom:40,
        lineHeight:46,
        paddingHorizontal:20
    },
    button: {
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 16,
        minWidth: 240, // Better for large screens
        alignItems: "center",
        backgroundColor: "#EE9972",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        alignSelf: 'center',
    },
    buttonText:{
        fontFamily:FONTS.karlaMedium,
        fontSize:22,
        color:"white",
        textAlign:"center",
        letterSpacing:0.5
    },
    
});

export default WelcomeStyles