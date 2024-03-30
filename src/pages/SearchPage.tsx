import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import Input from '../shared/components/Input'

export default function NewRoomPage() {
  const [teacher, setTeacher] = useState("");
  const [room, setRoom] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const handleSubmit = () => {
    // TODO
    console.log(`teacher: ${teacher}, room: ${room}`);
  }

  return (
    <View style={styles.container}>
        <View style={styles.formContainer}>
            <Text>Adj meg pár adatot, hogy le tudjuk szűkíteni a találatokat!</Text>
            <Input
                label="Tanár neve"
                value={teacher}
                onChangeText={setTeacher}
            />
            <Input
                label="Meghívó kód"
                value={inviteCode}
                onChangeText={setInviteCode}
            />
            <Input
                label="Terem neve"
                value={room}
                onChangeText={setRoom}
            />
            <Button mode="contained" onPress={handleSubmit} style={styles.addMarginTop}>Keresés</Button>
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
