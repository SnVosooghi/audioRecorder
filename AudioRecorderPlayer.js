import React , { useState }  from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Alert
} from 'react-native';

import SoundRecorder from 'react-native-sound-recorder';

import { styles } from "./App"

export default recorder =() => {

    const [recording, setRecording] = useState (false);
 
    const onStartRecord = async () => {
        if (recording) {
            Alert.alert( 'Already recording!' );
            return ;
        }
        Alert.alert ('Recording', 'Your recording started');
        permission ();
        SoundRecorder.start (SoundRecorder.PATH_CACHE + '/test.mp4')
            .then( function () {
                console.log ('stopped recording');
                });
        setRecording (true);

    };

    const onStopRecord = async () => {
        SoundRecorder.stop ()
            .then (function (result) {
                console.log ('stopped recording, audio file saved at: ' + result.path) ;
                Alert.alert ('your file is at:' , result.path);
                setRecording (false);
	        });
    };


    const permission = async() => {
        if (Platform.OS === 'android') {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                  title: 'Permissions for write access',
                  message: 'Give permission to your storage to write a file',
                  buttonPositive: 'ok',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the storage');
              } else {
                console.log('permission denied');
                return;
              }
            } catch (err) {
              console.warn(err);
              return;
            }
          }
          if (Platform.OS === 'android') {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                  title: 'Permissions for write access',
                  message: 'Give permission to your storage to write a file',
                  buttonPositive: 'ok',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
              } else {
                console.log('permission denied');
                return;
              }
            } catch (err) {
              console.warn(err);
              return;
            }
          }
    }

    return (
        <View>
            <TouchableOpacity style={styles.sectionContainer} onPress= { () => onStartRecord() }>
                <Text style={styles.sectionTitle}>Start record</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sectionContainer} onPress= { () => onStopRecord() }>
                <Text style={styles.sectionTitle}>Stop record</Text>
            </TouchableOpacity>
            
        </View>
    )

}