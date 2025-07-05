import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Animated, Easing, Image } from 'react-native';
import { Audio } from 'expo-av';

// Import the local image asset
import MuseoLogo from '../assets/images/MuseoLogo.png';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const rotation = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
          Animated.timing(rotation, {
            toValue: 1,
            duration: 8000,
            easing: Easing.linear,
            useNativeDriver: true,
          })
      ).start();
    } else {
      rotation.stopAnimation(() => {
        rotation.setValue(0);
      });
    }
  }, [isPlaying]);

  async function playPauseSound() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });

      if (!soundRef.current) {
        setIsLoading(true);
        const { sound } = await Audio.Sound.createAsync(
            { uri: 'http://stream.radiosolutions.dk/museolocalradio' },
            { shouldPlay: true }
        );
        soundRef.current = sound;
        setIsPlaying(true);
        setIsLoading(false);
      } else {
        if (isPlaying) {
          await soundRef.current.pauseAsync();
          setIsPlaying(false);
        } else {
          await soundRef.current.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (err) {
      setIsLoading(false);
    }
  }

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
      <View style={styles.background}>
        <Image source={MuseoLogo} style={styles.logo} resizeMode="contain" />
        <View style={styles.container}>
          {isLoading ? (
              <ActivityIndicator size="large" color="#FF4081" />
          ) : (
              <TouchableOpacity style={styles.button} onPress={playPauseSound} activeOpacity={0.7}>
                <Text style={styles.icon}>{isPlaying ? 'Pause' : 'Play'}</Text>
              </TouchableOpacity>
          )}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000', // Black background
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 320,
    height: 320,
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    opacity: 0.85, // Optional for subtlety
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#000',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '300',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 40,
    fontSize: 14,
    color: '#888',
  },
});