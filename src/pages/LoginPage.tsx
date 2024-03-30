import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import Input from "../shared/components/Input";
import RegistrationPage from "./RegistrationPage";

export default function LoginPage() {
    const [usernameInput, setUsernameInput] = useState("");
    const [pwInput, setPwInput] = useState("");
    const [isLoginPage, setIsLoginPage] = useState(true);
    
    const handlePwShow = () => {
        // TODO
        console.log("pw hide/show");
    }
    
    const handleSubmit = (email:string, pw:string) => {
        // TODO
        console.log(`belepes: "${email}" - "${pw}"`);
    }

    const handleChangeRegistration = () => {
        setIsLoginPage(!isLoginPage);
    }

    return isLoginPage ?
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Input
                        label="Felhasználónév"
                        value={usernameInput}
                        onChangeText={setUsernameInput}
                    />
                    <Input
                        label="Jelszó"
                        value={pwInput}
                        onChangeText={setPwInput}
                        secure={true}
                    />
                    <Button mode="contained" onPress={() => handleSubmit(usernameInput, pwInput)} style={styles.addMarginTop}>Belépés</Button>
                    <Button mode="outlined" onPress={handleChangeRegistration} style={styles.addMarginTop}>Regisztráció</Button>
                </View>
            </View>
            : <RegistrationPage loginPageSetter={setIsLoginPage} />
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 12,
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        formContainer: {
            width: '100%',
            alignItems: 'center',
        },
        addMarginTop: {
            marginTop: 8,
        }
    })
