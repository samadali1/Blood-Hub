import React from 'react';
import {
    StyleSheet,
    ScrollView,
    Alert,
    Text, 

} from 'react-native';
import { connect } from 'react-redux';

import { Container,View, Textarea, Header, Content, Form, Item, Picker, Icon, Input, Button, } from 'native-base';
class PostBlood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unitsRequired: undefined,
            urgency: '',
            bloodgroup: '',
            country: '',
            state: '',
            city: '',
            hospital: '',
            relationWithPatient: '',
            contactNo: '',
            additionalInstruction: '',
            userId: '',
            userName: '',
        }
    }
    onValueChange1(value) {
        this.setState({
            bloodgroup: value
        });
    }
    onValueChange2(value) {
        this.setState({
            urgency: value
        });
    }
    onValueChange3(value) {
        this.setState({
            country: value
        });
    }
    onValueChange4(value) {
        this.setState({
            state: value
        });
    }
    onValueChange5(value) {
        this.setState({
            city: value
        });
    }
    onValueChange6(value) {
        this.setState({
            hospital: value
        });
    }
    onValueChange7(value) {
        this.setState({
            relationWithPatient: value
        });
    }
    static navigationOptions = {
        title: 'Blood Requirement',
        headerStyle: {
            backgroundColor: '#17a2b8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    postRequirement() {
        const { unitsRequired, state, city, country, bloodgroup, urgency, relationWithPatient, additionalInstruction, hospital, contactNo } = this.state;
        const post = {
            unitsRequired,
            state,
            city,
            country,
            bloodgroup,
            urgency,
            relationWithPatient,
            additionalInstruction,
            hospital,
            contactNo,
            userId: this.props.user._id,
            userName: this.props.user.name
        }
        if (unitsRequired !== undefined, state !== '', state !== "", city !== "", country !== "", bloodgroup !== "", urgency !== "", relationWithPatient !== "", additionalInstruction !== "", hospital !== "", contactNo !== "") {
            fetch('http://192.168.0.106:3002/users/createPost', {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(()=>{
                this.props.navigation.navigate("myrequests")
            })

        }
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>

                    <View style={{ padding: 20 }}>
                        <View style={{ justifyContent: 'center' }}><Text style={styles.header3}> Please Provide Correct Info.</Text></View>

                        <Item picker style={{ borderColor: '#f1f5f8' }}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select Blood Group"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.bloodgroup}
                                onValueChange={this.onValueChange1.bind(this)}
                                style={{ borderRadius: 20, borderWidth: 1, borderColor: '#17a2b8', overflow: 'hidden', backgroundColor: 'white', marginBottom: 14, padding: 8 }}

                            >
                                <Picker.Item label="Select Blood Group" value="" />
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O" value="O-" />

                            </Picker>
                        </Item>
                        <Item picker style={{ borderColor: '#f1f5f8' }}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Urgency"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.urgency}
                                onValueChange={this.onValueChange2.bind(this)}
                                style={{ borderRadius: 20, borderWidth: 1, borderColor: '#17a2b8', overflow: 'hidden', backgroundColor: 'white', marginBottom: 14, padding: 8 }}

                            >
                                <Picker.Item label="Select Urgency" value="" />
                                <Picker.Item label="Urgent" value="Urgent" />
                                <Picker.Item label="Within 1 day" value="within 1 day" />
                                <Picker.Item label="Within 2 days" value="within 2 days" />
                                <Picker.Item label="Within 3 days" value="within 3 days" />
                                <Picker.Item label="Within 4 days" value="within 4 days" />
                                <Picker.Item label="Within 5 days" value="within 5 days" />
                                <Picker.Item label="Within a week" value="within a week" />

                            </Picker>
                        </Item>

                        <Item picker style={{ borderColor: '#f1f5f8' }}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Country"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.country}
                                onValueChange={this.onValueChange3.bind(this)}
                                style={{ borderRadius: 20, borderWidth: 1, borderColor: '#17a2b8', overflow: 'hidden', backgroundColor: 'white', marginBottom: 14, padding: 8 }}

                            >
                                <Picker.Item label="Select Country" value="" />
                                <Picker.Item label="Pakistan" value="Pakistan" />

                            </Picker>
                        </Item>
                        <Item picker style={{ borderColor: '#f1f5f8' }}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="State"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.state}
                                onValueChange={this.onValueChange4.bind(this)}
                                style={{ borderRadius: 20, borderWidth: 1, borderColor: '#17a2b8', overflow: 'hidden', backgroundColor: 'white', marginBottom: 14, padding: 8 }}

                            >
                                <Picker.Item label="Select State" value="" />
                                <Picker.Item label="Sindh" value="Sindh" />
                                <Picker.Item label="Punjab" value="Punjab" />
                                <Picker.Item label="Balochistan" value="Balochistan" />
                                <Picker.Item label="KPK" value="Kpk" />
                                <Picker.Item label="Fata" value="Fata" />
                                <Picker.Item label="Kashmir" value="Kashmir" />

                            </Picker>
                        </Item>
                        <Item picker style={{ borderColor: '#f1f5f8' }}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="City"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.city}
                                onValueChange={this.onValueChange5.bind(this)}
                                style={{ borderRadius: 20, borderWidth: 1, borderColor: '#17a2b8', overflow: 'hidden', backgroundColor: 'white', marginBottom: 14, padding: 8 }}

                            >
                                <Picker.Item label="Select City" value="" />
                                <Picker.Item label="Karachi" value="karachi" />
                                <Picker.Item label="Hyderabad" value="Hyderabad" />
                                <Picker.Item label="Thatta" value="Thatta" />
                                <Picker.Item label="Lahore" value="Lahore" />
                                <Picker.Item label="Rawalpindi" value="Rawalpindi" />
                                <Picker.Item label="Faisalabad" value="Faisalabad" />
                                <Picker.Item label="Islamabad" value="Islamabad" />
                                <Picker.Item label="Gilgit Baltistan" value="Gilgit Baltistan" />
                                <Picker.Item label="Peshawar" value="Peshawar" />
                                <Picker.Item label="Quetta" value="Quetta" />
                                <Picker.Item label="Muzafarabad" value="Muzafarabad" />
                                <Picker.Item label="Bajor Agency" value="Bajor Agency" />
                            </Picker>
                        </Item>

                        <Item picker style={{ borderColor: '#f1f5f8' }}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Hospital"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.hospital}
                                onValueChange={this.onValueChange6.bind(this)}
                                style={{ borderRadius: 20, borderWidth: 1, borderColor: '#17a2b8', overflow: 'hidden', backgroundColor: 'white', marginBottom: 14, padding: 8 }}

                            >
                                <Picker.Item label="Select Hospital" value="" />
                                <Picker.Item label="Liaquat National Hospital" value="Liaquat National Hospital" />
                                <Picker.Item label="Agha Khan Hospital" value="Agha Khan Hospital" />
                                <Picker.Item label="Shoukat Khannam Hospital" value="Shoukat Khannam Hospital" />
                                <Picker.Item label="Abbasi Shaheed Hospital" value="Abbasi Shaheed Hospital" />
                                <Picker.Item label="Civil Hospital" value="Civil Hospital" />
                                <Picker.Item label="Jinnah Hospital" value="Jinnah Hospital" />
                                <Picker.Item label="Lahore City Hopsital" value="Lahore City Hopsital" />
                                <Picker.Item label="Atia General Hospital" value="Atia General Hospital" />
                                <Picker.Item label="Kutiyana Memon Hospital" value="Kutiyana Memon Hospital" />
                            </Picker>
                        </Item>
                        <Item picker style={{ borderColor: '#f1f5f8' }}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Relation"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.relationWithPatient}
                                onValueChange={this.onValueChange7.bind(this)}
                                style={{ borderRadius: 20, borderWidth: 1, borderColor: '#17a2b8', overflow: 'hidden', backgroundColor: 'white', marginBottom: 14, padding: 8 }}

                            >
                                <Picker.Item label="Your Relation" value="" />
                                <Picker.Item label="Father" value="Father" />
                                <Picker.Item label="Mother" value="Mother" />
                                <Picker.Item label="Brother" value="Brother" />
                                <Picker.Item label="Sister" value="Sister" />
                                <Picker.Item label="Cousin" value="Cousin" />
                                <Picker.Item label="Friend" value="Friend" />
                                <Picker.Item label="Relative" value="Relative" />
                                <Picker.Item label="Stranger" value="Stranger" />

                            </Picker>
                        </Item>
                        <Item>
                            <Input placeholder='Units Required' onChangeText={(e) => { this.setState({ unitsRequired: Number(e) }) }} keyboardType={'numeric'} />
                        </Item>
                        <Item>
                            <Input placeholder='Contact No' onChangeTex={(e) => { this.setState({ contactNo: e }) }} keyboardType={'numeric'} />
                        </Item>
                        <Textarea style={{ marginTop: 12, borderColor: '#17a2b8', padding: 4 }} onChangeText={(e) => { this.setState({ additionalInstruction: e }) }} rowSpan={5} bordered placeholder="Additional Instruction..." />
                        <Button iconLeft style={{ backgroundColor: "#e74c3c", marginTop: 8 }} onPress={() => { this.postRequirement() }}>

                            <Text>Post Blood Requirment</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
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
    header3: {
        marginBottom: '8px',
        padding: 10,
        borderRadius: 10,
        fontSize: 18,
        marginBottom: 10,
        backgroundColor: '#212529',
        color: 'white',
    },
});

const mapStateToProps = state => {
    return {
        user: state.user,
    }
  }
export default connect(mapStateToProps, null)(PostBlood);