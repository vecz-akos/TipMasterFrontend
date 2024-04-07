import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { AxiosContext } from "../context/AxiosContext";

import { Alert, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Input from "../shared/components/Input";
import RegistrationPage from "./RegistrationPage";

export default function LoginPage() {
    const authContext = useContext(AuthContext);
    const { publicAxios, setToken, token } = useContext(AxiosContext);

    const [usernameInput, setUsernameInput] = useState("");
    const [pwInput, setPwInput] = useState("");
    const [pwHide, setPwHide] = useState(true);
    const [isLoginPage, setIsLoginPage] = useState(true);

    const [testText, setTestText] = useState("Default text.")
    
    const handlePwShow = () => {
        setPwHide(!pwHide);
    }
    
    const onLogin = async () => {
        try {
            const payload = {
                "username": usernameInput,
                "password": pwInput,
            };
            
            const data = new FormData();
            data.append( "json", JSON.stringify( payload ) );

            const response = await fetch("http://localhost:8080/auth/login",
                {
                    body: `{"username":"${usernameInput}","password":"${pwInput}"}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                }
            );
            // const response = await publicAxios.post('/auth/login', {
            //     "username": usernameInput,
            //     "password": pwInput,
            // });
            
            console.log(response);
            const { accessToken } = await response.json();
            setToken(accessToken);
            
            // authContext.setAuthState({
            //   accessToken,
            //   authenticated: true,
            // });
        } catch (error: any) {
            Alert.alert('Login Failed', error.response.data.message);
        }
    }

    const handleTestUser = async () => {
        // const response = await fetch("http://localhost:8080/test/user",
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${token}`
        //         },
        //         method: "GET",
        //     }
        // );
        const response = await publicAxios.get("http://localhost:8080/test/user");
        setTestText(await response.data.toString())
    };

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
                        secure={pwHide}
                    />
                    <Button mode="contained" onPress={onLogin} style={styles.addMarginTop}>Belépés</Button>
                    <Button mode="outlined" onPress={handleChangeRegistration} style={styles.addMarginTop}>Regisztráció</Button>
                    <Button mode="outlined" onPress={handleTestUser} style={styles.addMarginTop}>Teszt</Button>
                    <Text>{testText}</Text>
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
