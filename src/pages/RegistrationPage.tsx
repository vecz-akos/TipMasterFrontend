import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Text, } from "react-native-paper";
import Input from "../shared/components/Input";
import { AxiosContext } from "../context/AxiosContext";
import { HttpStatusCode } from "axios";

type AppProps = {
    setIsLoginPage: Function;
    showBanner: Function;
  };

export default function RegistrationPage({ setIsLoginPage, showBanner }: AppProps) {
    const { publicAxios, authAxios } = useContext(AxiosContext);

    const [usernameInput, setUsernameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [pwInput1, setPwInput1] = useState("");
    const [pwInput2, setPwInput2] = useState("");
    
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pwError, setPwError] = useState("");
    
    const handleSubmit = async () => {
        if (pwInput1 === pwInput2) {
            publicAxios.post('/auth/register', {
                "username": usernameInput,
                "email": emailInput,
                "password": pwInput1,
            }).then(response => {
                if (response.status === HttpStatusCode.Created) {
                    showBanner(`Felhasználó létrehozva "${response.data.username}" felhasználónévvel. Tippelésre fel!`)
                }
            }).catch(error => {
                setUsernameError(error.response.data?.username);
                setEmailError(error.response.data?.email);
                setPwError(error.response.data?.password);
            });
        } else {
            setPwError("A jelszavak nem egyeznek.")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Input
                    label="Felhasználónév"
                    value={usernameInput}
                    onChangeText={setUsernameInput}
                />
                <HelperText type="error" visible={usernameError !== ""}>{usernameError}</HelperText>
                <Input
                    label="Email"
                    value={emailInput}
                    onChangeText={setEmailInput}
                />
                <HelperText type="error" visible={emailError !== ""}>{emailError}</HelperText>
                <Input
                    label="Jelszó"
                    value={pwInput1}
                    onChangeText={setPwInput1}
                    needHide={true}
                />
                <Input
                    label="Jelszó még egyszer"
                    value={pwInput2}
                    onChangeText={setPwInput2}
                    needHide={true}
                />
                <HelperText type="error" visible={pwError !== ""}>{pwError}</HelperText>
                <Button mode="contained" onPress={handleSubmit} style={styles.addMarginTop}>Regisztráció</Button>
                <Button mode="outlined" onPress={() => setIsLoginPage(true)} style={styles.addMarginTop}>Vissza a belépéshez</Button>
            </View>
        </View>
    )
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
