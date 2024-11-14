import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../store/auth-context';

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState('');

  const authContext = useContext(AuthContext);
  const token = authContext.token;

  useEffect(() => {
    async function fetchMessage() {
      try {
        console.log('hi');
        const response = await axios.get(
          'https://rnexpenses-app-default-rtdb.firebaseio.com/message.json?auth=' +
            authContext.token,
        );
        console.log('Fetched message:', response.data); // This should now log the string
        setFetchedMessage(response.data); // Set the string to the state
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    }
    fetchMessage();
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
