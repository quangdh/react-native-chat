import React from 'react';
import { StyleSheet, Text, TextInput, FlatList, KeyboardAvoidingView, View, Button } from 'react-native';


export default class ChatView extends React.Component {
    constructor(props) {
        super(props);

        this.handleSendMessage = this.onSendMessage.bind(this);
    }


    onSendMessage(e) {
        this.props.onSendMessage(e.nativeEvent.text);
        this.refs.input.clear();
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <FlatList data={this.props.messages}
                    renderItem={this.renderItem}
                    style={styles.messages}
                    ref="messages" />

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput autoFocus
                        keyboardType="default"
                        returnKeyType="done"
                        enablesReturnKeyAutomatically
                        style={styles.input}
                        blurOnSubmit={false}
                        onSubmitEditing={this.handleSendMessage}
                        ref="input"
                    />
                    <Button onPress={this.handleSendMessage} title="Send" />
                </View>
            </KeyboardAvoidingView>
        );
    }

    renderItem({ item }) {
        const action = item.action;
        const name = item.name;

        if (action == 'join') {
            return <Text style={styles.joinPart}>{name} has joined</Text>;
        } else if (action == 'part') {
            return <Text style={styles.joinPart}>{name} has left</Text>;
        } else if (action == 'message') {
            return <Text>{name}: {item.message}</Text>;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 20
    },
    messages: {
        alignSelf: 'stretch'
    },
    input: {
        alignSelf: 'stretch',
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: 'black'
    },
    joinPart: {
        fontStyle: 'italic'
    }
});


