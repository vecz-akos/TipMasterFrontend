import { useCallback, useContext, useEffect, useState } from "react";
// import * as Keychain from 'react-native-keychain';

import { AuthContext } from "../context/AuthContext";
import { AxiosContext } from "../context/AxiosContext";

import { Alert, StyleSheet, View } from "react-native";
import { Banner, Button, HelperText, Icon, Text } from "react-native-paper";
import Input from "../shared/components/Input";
import RegistrationPage from "./RegistrationPage";
import Spinner from "../shared/components/Spinner";
import { HttpStatusCode } from "axios";

export default function LoginPage() {
    const { authState, setAuthState, logout } = useContext(AuthContext);
    const { publicAxios, authAxios } = useContext(AxiosContext);
    const [status, setStatus] = useState('loading');
    const [bannerShow, setBannerShow] = useState(false);
    const [bannerMsg, setBannerMsg] = useState("");

    const [usernameInput, setUsernameInput] = useState("");
    const [pwInput, setPwInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoginPage, setIsLoginPage] = useState(true);


    const [testText, setTestText] = useState("");

    const loadJWT = useCallback(async () => {
        try {
        //   const value: any = await Keychain.getGenericPassword();
        //   const jwt = JSON.parse(value?.password);
            const jwt = authState;
    
            setAuthState({
                accessToken: jwt.accessToken || null,
                refreshToken: jwt.refreshToken || null,
                authenticated: jwt.accessToken !== null,
            });
            setStatus('success');
        } catch (error: any) {
            setStatus('error');
            console.log(`Keychain Error: ${error.message}`);
            setAuthState({
                accessToken: null,
                refreshToken: null,
                authenticated: false,
            });
        }
      }, []);
    
    useEffect(() => {
        loadJWT();
    }, [loadJWT]);
    
    const onLogin = async () => {
        publicAxios.post('/auth/login', {
                "username": usernameInput,
                "password": pwInput,
            },
            { headers: {
                'Content-Type': 'application/json'
            }}
        ).then(response => {
            const { accessToken, refreshToken }: any = response.data;
            
            setAuthState({
                accessToken: accessToken,
                refreshToken: refreshToken,
                authenticated: true,
            });

            setUsernameInput("");
            setPwInput("");
        
            // await Keychain.setGenericPassword(
            //     'token',
            //     JSON.stringify({
            //         accessToken,
            //         refreshToken,
            //     }),
            // );
        }).catch(error => {
            setErrorMsg(error.response.data.exceptionMessage);
        });
    }

    const showBanner = (msg: any) => {
        setIsLoginPage(true);
        setBannerShow(true);
        setBannerMsg(msg);
    }

    const handleTestUser = async () => {
        const response = await authAxios.get("/test/user");
        setTestText(await response.data.toString())
    };

    const handleChangeRegistration = () => {
        setIsLoginPage(!isLoginPage);
    }

    if (status === 'loading') {
        return <Spinner />;
    }

    return isLoginPage ?
            authState?.authenticated ?
            <>
                <Button mode="contained" onPress={logout} style={styles.addMarginTop}>Kijelentkezés</Button>
                <Button mode="outlined" onPress={handleTestUser} style={styles.addMarginTop}>Teszt</Button>
                <Text>{testText ? `Szerver válasz: ${testText}` : ""}</Text>
            </>
            :
            <>
                <Banner visible={bannerShow} actions={[{label: "Ok", onPress: () => setBannerShow(false)}]} icon={({size}) => (
                    <Icon
                        source="check-outline"
                        size={size}
                    />
                )}>
                    {bannerMsg}
                </Banner>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <HelperText type="error" visible={errorMsg !== ""}>{errorMsg}</HelperText>
                        <Input
                            label="Felhasználónév"
                            value={usernameInput}
                            onChangeText={setUsernameInput}
                        />
                        <Input
                            label="Jelszó"
                            value={pwInput}
                            onChangeText={setPwInput}
                            needHide={true}
                        />
                        <Button mode="contained" onPress={onLogin} style={styles.addMarginTop}>Belépés</Button>
                        <Button mode="outlined" onPress={handleChangeRegistration} style={styles.addMarginTop}>Regisztráció</Button>
                    </View>
                </View>
            </>
            : <RegistrationPage setIsLoginPage={setIsLoginPage} showBanner={showBanner} />
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
