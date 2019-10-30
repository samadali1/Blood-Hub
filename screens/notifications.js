import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text,  TouchableOpacity} from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, } from 'native-base';
import { connect } from 'react-redux';
import moment from "moment";


class Notifications extends Component {
    constructor(){
        super();
        this.state = {
            notifications:"",
        }
    }
    static navigationOptions = {
        title: 'Notifications',
        headerStyle: {
            backgroundColor: '#17a2b8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    componentDidMount() {
        fetch('http://192.168.0.106:3002/users/allPosts').then((res) => {
            return res.json()
        }).then((data) => {
            console.log("Response", data)
            this.setState({ notifications: data })
        })

    }
    render() {
            
        return (
            <View style={styles.container}>
                <ScrollView>
            <Container>

                <Content>
                    <List>
                    {this.state.notifications!=="" && this.state.notifications.map((v,i)=>{
                        if(v.userId!==this.props.user._id){
                            return <ListItem avatar onPress={() => this.props.navigation.navigate("publicDetailedScreen", v)}>
                        <Body>
                            <Text style={{fontWeight:"bold"}}>{v.userName}</Text> 
                            <Text>Posted a {v.bloodgroup} blood requirement.</Text>
                            <Text note style={{color:"#e74c3c"}}>{moment(v.postedTime).format('LLLL')}</Text>
                        </Body>
                        <Right>
                            <Thumbnail source={require('../assets/user.png')} />
                        </Right>
                    </ListItem>
                        }
                        
                    })}

                    </List>
                </Content>

                
            </Container>
            </ScrollView>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5f8',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
const mapStateToProps = state => {
    return {
        user: state.user,
    }
  }
export default connect(mapStateToProps, null)(Notifications);