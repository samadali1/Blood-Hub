import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    ScrollView,

} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Container, Header, Content, Form, Item, Picker, Icon } from 'native-base';
import { connect } from 'react-redux';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            bloodgroup: '',
            status: "",
        }
    }
    onValueChange2(value) {
        this.setState({
            bloodgroup: value
        });
    }
    onClickListener = (viewId) => {
        const { email, password, name, bloodgroup } = this.state;
        if (email !== "", password !== "", name !== "", bloodgroup !== "") {
            fetch('http://192.168.0.106:3002/users/signup', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name,
                    bloodgroup: bloodgroup,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                return res.json();
            }).then((d) => {
                console.log(d)
                if (d._message === 'Users validation failed') {
                    this.setState({ status: 'Enter email and password correctly!' })
                }
                else {
                    this.props.navigation.navigate('login')

                }
            })
        }
    }
    static navigationOptions = { header: null }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <MaterialCommunityIcons name="medical-bag" size={60} color="#17a2b8" />
                    <View><Text style={styles.header}>BloodHub</Text></View>
                    <View style={{ justifyContent: 'center' }}><Text style={styles.header3}>Join Us.</Text></View>
                    <View><Text style={styles.header2}>{this.state.status}</Text></View>

                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={require('../assets/name.png')} />
                        <TextInput style={styles.inputs}
                            placeholder="Name"
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            onChangeText={(name) => this.setState({ name })} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/metro/2x/filled-message.png' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Email"
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            onChangeText={(email) => this.setState({ email })} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={require('../assets/pass.png')} />
                        <TextInput style={styles.inputs}
                            placeholder="Password"
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(password) => this.setState({ password })} />
                    </View>

                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Select your SIM"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.bloodgroup}
                            onValueChange={this.onValueChange2.bind(this)}
                            style={{ borderRadius: 20, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden', backgroundColor: 'white', marginBottom: 14, padding: 8 }}

                        >
                            <Picker.Item label="Select Blood Group" value="" />
                            <Picker.Item label="A+" value="a+" />
                            <Picker.Item label="A-" value="a-" />
                            <Picker.Item label="B+" value="b+" />
                            <Picker.Item label="B-" value="b-" />
                            <Picker.Item label="O+" value="o+" />
                            <Picker.Item label="O" value="-" />

                        </Picker>
                    </Item>
                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
                        <Text style={styles.loginText}>CREATE ACCOUNT</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
                        <Text onPress={() => { this.props.navigation.navigate("login") }}>Already have account? Login here
            </Text>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccd5db',
    },
    header: {
        fontSize: 35,
        color: '#e74c3c',
        margin: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 5,
        marginBottom: 12,
    },
    header2: {
        padding: 4,
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    header3: {
        fontSize: '20px',
        marginBottom: '8px',
        padding: 10,
        borderRadius: 10,
        fontSize: 18,
        marginBottom: 10,
        backgroundColor: '#e74c3c',
        color: 'white'
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#17a2b8",
    },
    loginText: {
        color: 'white',
    }
});

export default Signup