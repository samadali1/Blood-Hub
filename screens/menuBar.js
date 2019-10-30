import React from "react"
import { View, Text, StyleSheet, Font,TouchableOpacity } from 'react-native';
import { Container, Header, Content, Title, Card, CardItem, List, ListItem, Item, Input, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';

import { connect } from 'react-redux';

class Menu extends React.Component {
    constructor(props) {
        super(props)
    }
    navlinks(nav, text) {
        return (
            <TouchableOpacity style={{ height: 50 }} onPress={() => this.props.navigation.navigate(nav)}>
                <Text style={styles.links}>{text}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        console.log("Menu =", this.props)
        return (
            <View style={styles.container}>
                <View style={styles.topLinks}>
                    <View style={styles.profile}>
                        <View style={styles.profileText}>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require('../assets/user.png')} />
                                    <Body>
                                        <Text style={{ color: "#212529", fontWeight: "bold" }}>{this.props.user.name}</Text>
                                        <Text style={{color:"#e74c3c", fontSize:20,fontWeight: "bold"}}>{this.props.user.bloodgroup}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomLinks}>
                    {this.navlinks("dashboard", "Home")}
                    {this.navlinks("myrequests", "My Requests")}
                    {this.navlinks("postbloodrequirements", "Post Blood Requirements")}
                    {this.navlinks("notifications", "Notifications")}
                    {this.navlinks("logout", "Logout")}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
    },
    profile: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: "#777777"
    },
    profileText: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "center"
    },
    displayName: {
        fontSize: 24,
        fontWeight: "600",
        paddingBottom: 5,
        color: "#e74c3c",
        textAlign: "left",
        marginLeft: 20
    }
    ,
    displayName2: {
        fontSize: 24,
        fontWeight: "600",
        paddingBottom: 5,
        color: "black",
        textAlign: "left",
        marginLeft: 20
    },
    links: {
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: "left",
        color: "#fff"
    },
    topLinks: {
        height: 140,
        backgroundColor: "white"
    },
    bottomLinks: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 450,
        backgroundColor: "#17a2b8"
    }
});

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}
export default connect(mapStateToProps, null)(Menu);