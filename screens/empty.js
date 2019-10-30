import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';

class MyRequests extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myRequests: [],
        }
    }
    static navigationOptions = {
        title: 'My Requests',
        headerStyle: {
            backgroundColor: '#17a2b8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };


    componentDidMount() {

        fetch('http://192.168.0.104:3002/users/myRequests', {
            method: 'POST',
            body: JSON.stringify({
                id: this.props.user._id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log("response", data)
            this.setState({ myRequests: data })
        })
    }
    render() {
        const { myRequests } = this.state;
        console.log(myRequests)
        return (
            <View style={styles.container}>

                {this.myRequests !== [] && myRequests.map((v, i) => {
                    return <Container>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={require('../assets/user.png')} />
                                    <Body>
                                        <Text style={{ color: "#212529", fontWeight: "bold" }}>{v.userName}</Text>
                                        <Text note>{v.postedTime}</Text>
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
                                    <Button transparent onPress={(data)=>{this.props.navigation.navigate("postDetailedScreen", v)}}>
                                        <Text style={{ color: "#17a2b8"}}>Open Post Detailed Screen</Text>
                                    </Button>
                                </Body>


                            </CardItem>
                        </Card>


                    </Container>
                })}



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
export default connect(mapStateToProps, null)(MyRequests);
// export default MyRequests