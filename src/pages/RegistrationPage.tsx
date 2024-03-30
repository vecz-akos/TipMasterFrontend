import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, } from "react-native-paper";
import Input from "../shared/components/Input";

type AppProps = {
    loginPageSetter: any;
  };

export default function RegistrationPage({ loginPageSetter }: AppProps) {
    const [usernameInput, setUsernameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [pwInput1, setPwInput1] = useState("");
    const [pwInput2, setPwInput2] = useState("");
    
    const handleSubmit = () => {
        // TODO
        if (pwInput1 === pwInput2) {
            console.log("success!")
        } else {
            console.log("something is off :(")
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
                <Input
                    label="Email"
                    value={emailInput}
                    onChangeText={setEmailInput}
                />
                <Input
                    label="Jelszó"
                    value={pwInput1}
                    onChangeText={setPwInput1}
                    secure={true}
                />
                <Input
                    label="Jelszó még egyszer"
                    value={pwInput2}
                    onChangeText={setPwInput2}
                    secure={true}
                />
                <Button mode="contained" onPress={handleSubmit} style={styles.addMarginTop}>Regisztráció</Button>
                <Button mode="outlined" onPress={() => loginPageSetter(true)} style={styles.addMarginTop}>Vissza a belépéshez</Button>
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
