import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Settings extends React.Component {
    static navigationOptions = {
        title: 'Settings',
        headerStyle: {
          backgroundColor: '#17a2b8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
    render() {
        return (
            <View style={styles.container}>
                <Text>Settings</Text>
            </View>
        );
    }
}

export default Settings 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});