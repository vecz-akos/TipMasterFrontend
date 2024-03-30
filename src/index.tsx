import { useState } from "react";
import { View } from "react-native";
import { Appbar, BottomNavigation, Text } from "react-native-paper";

import LoginPage from "./pages/LoginPage";
import NewRoomPage from "./pages/NewRoomPage";
import SearchPage from "./pages/SearchPage";

export default function App() {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'login', title: 'Belépés', focusedIcon: 'login'},
        { key: 'newroom', title: 'Szoba létrehozása', focusedIcon: 'pencil-plus', unfocusedIcon: 'pencil-plus-outline' },
        { key: 'search', title: 'Szoba keresés', focusedIcon: 'magnify' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        login: LoginPage,
        newroom: NewRoomPage,
        search: SearchPage,
    });
    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="fogadApp" />
                {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
            </Appbar.Header>
            <View style={{flex: 1}}>
                <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene} />
            </View>
        </>
    )
}
