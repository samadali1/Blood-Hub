import React from 'react';
import { StyleSheet,Text,ScrollView, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import moment from "moment";

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            allData: "",
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'News Feed',
            headerStyle: {
                backgroundColor: '#17a2b8',
            },
            headerLeft: (
                <Ionicons name="md-menu" size={38} color="white" style={{ margin: 8 }} onPress={() => { this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }} />
            ),
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    };
    componentDidMount() {
        fetch('http://192.168.0.106:3002/users/allPosts').then((res) => {
            return res.json()
        }).then((data) => {
            this.setState({ allData: data })
        })

    }
    updateV(postId) {
        console.log("Making Volunteer")
        fetch('http://192.168.0.106:3002/users/makeVolunteer', {
            method: 'POST',
            body: JSON.stringify({
                postId: postId,
                userId: this.props.user._id,
                name: this.props.user.name,
                bloodgroup: this.props.user.bloodgroup,
                status: 'Not Donated'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
                return res.json()
            }).then((data) => {
                fetch('http://192.168.0.106:3002/users/allPosts').then((res) => {
                    return res.json()
                }).then((data) => {
                    this.setState({ allData: data })
                })
            })

    }
    render() {
        const { allData } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                
                {allData !== "" && allData.map((v, i) => {
                    if (v.userId !== this.props.user._id){
                        var flag = true;
                        for(var z =0;z<v.volunteers.length;z++){
                            if(v.volunteers[z].userId===this.props.user._id){flag = false;}   
                        }
                        return <Container>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require('../assets/user.png')} />
                                    <Body>
                                        <Text style={{ color: "#212529", fontWeight: "bold" }}>{v.userName}</Text>
                                        <Text note>{moment(v.postedTime).format('LLLL')}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem>
                                <Text>{v.unitsRequired} units of {v.bloodgroup} blood required.</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{ color: "#e74c3c", fontWeight: 'bold' }}>Urgency: </Text><Text> {v.urgency}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{ color: "#e74c3c", fontWeight: 'bold' }}>Hospital: </Text><Text> {v.hospital}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{ color: "#e74c3c", fontWeight: 'bold' }}>Contact: </Text><Text> {v.contactNo}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{ color: "#e74c3c", fontWeight: 'bold' }}>Instruction: </Text><Text> {v.additionalInstruction}</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    {flag &&  <Button icon={require('../assets/account.png')} mode="contained" compact='true' style={{ backgroundColor: "#e74c3c" }} onPress={() => this.updateV(v._id)}>
                                        Volunteer
                                    </Button>}
                                    {!flag &&  <Button icon={require('../assets/account.png')} disabled="true" mode="contained" compact='true'>
                                        Volunteer
                                    </Button>}
                                </Body>
                                <Body>
                                    <Button icon={require('../assets/message-reply-text.png')} mode="contained" compact='true' style={{ backgroundColor: "#e74c3c" }} onPress={() => this.props.navigation.navigate("publicDetailedScreen", v)}>
                                        Comments
                                    </Button>
                                </Body>

                            </CardItem>
                        </Card>


</Container>
} 

})}
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
export default connect(mapStateToProps, null)(Dashboard);
