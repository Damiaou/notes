import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { padding } from './utils/usefull';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

const corresponding = {
	1: 'a',
	2: 'b',
	3: 'c',
	4: 'd',
	5: 'e',
	6: 'f',
	7: 'g',
};

const victoryState = [
  'WIN',
  'LOSE',
  'EARLY'
]

export default function App() {
	const [started, setStarted] = useState(false);
	const [userInput, setUserInput] = useState(null);
  const [computernote, setComputerNote] = useState(null);
  const [isVictory, setIsVictory] = useState('EARLY')
	function cancelHandler() {
		setStarted(false);
    setUserInput(null);
    setComputerNote(null);
    setIsVictory('EARLY');
	}
	function startHandler() {
		setStarted(true);
		// Find a random number (1 = A...)
		const rand = Math.floor(Math.random() * 7 + 1);
    const randomNote = corresponding[rand];
    setComputerNote(randomNote)
		// Play it
		playNote(randomNote);
		// Wait for user choice
		// If good, display well done, else a poop emoji
	}

	function handlePress(userNote) {
		playNote(userNote);
    if (userNote === computernote) {
      setIsVictory('WIN');
      setTimeout(function(){ cancelHandler() }, 1000);
    } else {
      setIsVictory('LOSE');
      setTimeout(function(){ cancelHandler() }, 1000);

    }
	}

	async function playNote(note) {
		let source = source_a;
		switch (note) {
			case 'a': {
				// Keep the a
				break;
			}
			case 'b': {
				source = source_b;
				break;
			}
			case 'c': {
				source = source_c;
				break;
			}
			case 'd': {
				source = source_d;
				break;
			}
			case 'e': {
				source = source_e;
				break;
			}
			case 'f': {
				source = source_f;
				break;
			}
			case 'g': {
				source = source_g;
				break;
			}
		}

		const { sound } = await Audio.Sound.createAsync(source);
		await sound.playAsync();
	}
	ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
	const source_a = require('./assets/notes/a-4.mp3');
	const source_b = require('./assets/notes/b4.mp3');
	const source_c = require('./assets/notes/c-4.mp3');
	const source_d = require('./assets/notes/d-4.mp3');
	const source_e = require('./assets/notes/e4.mp3');
	const source_f = require('./assets/notes/f-4.mp3');
	const source_g = require('./assets/notes/g-4.mp3');

	return (
		<View style={styles.container}>
			<View style={{ height: '40%', justifyContent: 'center', alignItems: 'center'}}>
        {started ? (
          typeof isVictory !== 'EARLY' 
          ? <Text style={{ fontSize: 24, color: 'darkslategrey' }}>Find the correct note</Text>
          : isVictory === 'WIN'
            ? <Text style={{ fontSize: 24, color: 'darkslategrey' }}>Yay !</Text>
            :<Text style={{ fontSize: 24, color: 'darkslategrey' }}>Nope :(</Text>

        ):(
          <Text style={{ fontSize: 24, color: 'darkslategrey' }}>Hi! Try to guess what notes is played</Text>
          )}
          
          
				{started ? (
					<Button buttonStyle={styles.actionButton} title="Cancel" onPress={() => cancelHandler()} />
				) : (
					<Button title="Start" onPress={() => startHandler()} />
				)}
			</View>
			<View style={styles.tilesContainer}>
				<View style={styles.tile}>
					<TouchableOpacity
						onPressIn={() => handlePress('a')}
						style={styles.tiles}
						style={{ backgroundColor: '#7d007b', height: 100, flex: 1, opacity: 1 }}
					></TouchableOpacity>
				</View>

				<View style={styles.tile}>
					<TouchableOpacity
						onPressIn={() => handlePress('b')}
						style={styles.tiles}
						style={{ backgroundColor: 'orange', height: 100, flex: 1, opacity: 1 }}
					></TouchableOpacity>
				</View>

				<View style={styles.tile}>
					<TouchableOpacity
						onPressIn={() => handlePress('c')}
						style={styles.tiles}
						style={{ backgroundColor: 'green', height: 100, flex: 1, opacity: 1 }}
					></TouchableOpacity>
				</View>

				<View style={styles.tile}>
					<TouchableOpacity
						onPressIn={() => handlePress('d')}
						style={styles.tiles}
						style={{ backgroundColor: 'red', height: 100, flex: 1, opacity: 1 }}
					></TouchableOpacity>
				</View>

				<View style={styles.tile}>
					<TouchableOpacity
						onPressIn={() => handlePress('e')}
						style={styles.tiles}
						style={{ backgroundColor: 'blue', height: 100, flex: 1, opacity: 1 }}
					></TouchableOpacity>
				</View>

				<View style={styles.tile}>
					<TouchableOpacity
						onPressIn={() => handlePress('f')}
						style={styles.tiles}
						style={{ backgroundColor: 'yellow', height: 100, flex: 1, opacity: 1 }}
					></TouchableOpacity>
				</View>

				<View style={styles.tile}>
					<TouchableOpacity
						onPressIn={() => handlePress('g')}
						style={styles.tiles}
						style={{ backgroundColor: '#ff00fb', height: 100, flex: 1, opacity: 1 }}
					></TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		height: '20%',
		flex: 1,
		// backgroundColor: 'rgba(255,255,255,1)',
		width: '100%',
	},
	tilesContainer: {
		height: '80%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
		width: '100%',
    
	},
	tile: {
		width: '14%',
	},
	tiles: {
		height: 100,
		flex: 1,
		backgroundColor: 'rgba(247, 202, 24, 1)',
	},
  actionButton: {
    padding:4,
    marginTop:4
  }
});
