import React from 'react';
import { StyleSheet, ScrollView,View, Text, } from 'react-native';
import { Container, Header, Content, Title, Card, CardItem, List, ListItem, Item, Input, Thumbnail,  Button, Icon, Left, Body, Right } from 'native-base';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import moment from "moment";

class PostDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            post: '',
            comment: ''
        }
    }
    static navigationOptions = {
        title: 'My Post Details',
        headerStyle: {
            backgroundColor: '#17a2b8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    api() {
        this.setState({ post: this.props.navigation.state.params })
    }
    componentDidMount() {
        this.api()
    }
    updateV(userId) {
        fetch('http://192.168.0.106:3002/users/updateVolunteer', {
            method: 'POST',
            body: JSON.stringify({
                postId: this.state.post._id,
                userId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            this.setState({ post: data[0] })
        })
    }
    postComment() {
        console.log(this.state.comment)
        if (this.state.comment !== "") {
            fetch('http://192.168.0.106:3002/users/postComment', {
                method: 'POST',
                body: JSON.stringify({
                    postId: this.state.post._id,
                    userId: this.props.user._id,
                    name: this.props.user.name,
                    comment: this.state.comment
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res)=>{
                return res.json()
            }).then((data)=>{
                
                this.setState({ post: data[0] })
            })
        }
    }
    render() {
        const { post, comment } = this.state;

        var vflag = false;
        var cflag = false;
        return (
            <View style={styles.container}>
                <ScrollView>
                {post !== "" && <View><Container>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={require('../assets/user.png')} />
                                <Body>
                                    <Text style={{ color: "#212529", fontWeight: "bold" }}>{post.userName}</Text>
                                    <Text>{post.postedTime}</Text>
                                    {post.status === "Not Fulfilled" && <AntDesign name="staro" size={22} />}
                                    {post.status === "Fulfilled" && <AntDesign name="star" color='orange' size={22} />}
                                </Body>
                            </Left>
                        </CardItem>

                        <CardItem>
                            <Text style={{ color: "#e74c3c", fontWeight: 'bold' }}>Units Required: </Text><Text> {post.unitsRequired}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ color: "#e74c3c", fontWeight: 'bold' }}>Blood Group: </Text><Text> {post.bloodgroup}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ color: "#e74c3c", fontWeight: 'bold' }}>Urgency: </Text><Text> {post.urgency}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ color: "#e74c3c", fontWeight: 'bold' }}>Hospital: </Text><Text> {post.hospital}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ color: "#e74c3c", fontWeight: 'bold' }}>Contact: </Text><Text> {post.contactNo}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ color: "#e74c3c", fontWeight: 'bold' }}>Relation: </Text><Text> {post.relationWithPatient}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ color: "#e74c3c", fontWeight: 'bold' }}>Location: </Text><Text> {post.city}, {post.state}, {post.country}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{ color: "#e74c3c", fontWeight: 'bold' }}>Instruction: </Text><Text> {post.additionalInstruction}</Text>
                        </CardItem>
                    </Card>
                </Container>
                    <Container>
                        <Header style={{ backgroundColor: "#d2d6d9" }}>
                            <Left />
                            <Body>
                                <Title style={{ color: "#212529", fontWeight: "bold" }}>Volunteers</Title>
                            </Body>
                            <Right />
                        </Header>
                        {post.volunteers.map((v, i) => {
                            vflag = true;
                            return <List>
                                <ListItem thumbnail>
                                    <Body>
                                        <Text>{v.name} -- {v.bloodgroup}</Text>
                                        {v.bloodgroup === post.bloodgroup && <Text note numberOfLines={1}>Eligible</Text>}
                                        {v.bloodgroup !== post.bloodgroup && <Text note numberOfLines={1}>Exchange Donation</Text>}
                                        <Text>{v.status}</Text>
                                    </Body>
                                    <Right>
                                        {v.status === "Not Donated" && <Button transparent onPress={() => { this.updateV(v.userId) }}>
                                            <Text>Approve Donation</Text>
                                        </Button>}
                                        {v.status === "Donated" && <Button transparent>
                                            <Text style={{ color: "#e74c3c" }}>Approved</Text>
                                        </Button>}
                                    </Right>
                                </ListItem>
                            </List>

                        })}
                        {post !== '' && post.volunteers.length === 0 && <Text style={{ alignSelf: 'center', padding: 12, color: "#a1a6ab" }}>No Volunteers Yet.</Text>}
                    </Container>

                    <Container>
                        <Header style={{ backgroundColor: "#d2d6d9" }}>
                            <Left />
                            <Body>
                                <Title style={{ color: "#212529", fontWeight: "bold" }}>Comments</Title>
                            </Body>
                            <Right />
                        </Header>

                        {post.comments.map((v, i) => {
                            cflag = true;
                            return <Card>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={require('../assets/user.png')} />
                                        <Body>
                                            <Text style={{ color: "#212529", fontWeight: "bold" }}>{v.name}</Text>
                                            <Text note>{v.comment}</Text>
                                            <Text style={{fontSize:14,color:"#e74c3c", padding:6}}>{moment(v.postedTime).format('LLLL')}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card>
                        })}
                        {post !== '' && post.comments.length === 0 && <Text style={{ alignSelf: 'center', padding: 12, color: "#a1a6ab" }}>No Comments Yet.</Text>}
                        <Item regular>
                            <Input style={{ borderColor: '#17a2b8' }} placeholder='Say Something..' onChangeText={(e) => { this.setState({ comment: e }) }} />
                            <Button style={{ backgroundColor: "#e74c3c" }} onPress={() => { this.postComment() }}>
                                <Text style={{color:"white"}}>Post</Text>
                        </Button>
                        </Item>
                     
                    </Container>
                </View>

                }
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
export default connect(mapStateToProps, null)(PostDetail);