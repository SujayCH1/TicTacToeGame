import React, { useState, useCallback } from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const { width } = Dimensions.get('window');
const CELL_SIZE = (width - 24) / 3;

function App(): JSX.Element {
  const [isCross, setIsCross] = useState(false);
  const [gameWinner, setGameWinner] = useState('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty'));

  const checkIsWinner = useCallback((currentGameState: string[]) => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        currentGameState[a] !== 'empty' &&
        currentGameState[a] === currentGameState[b] &&
        currentGameState[a] === currentGameState[c]
      ) {
        return `${currentGameState[a]} won the game! 🥳`;
      }
    }
    if (!currentGameState.includes('empty')) return 'Draw game... ⌛️';
    return '';
  }, []);

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      });
    }

    const updatedGameState = [...gameState];

    if (updatedGameState[itemNumber] === 'empty') {
      updatedGameState[itemNumber] = isCross ? 'cross' : 'circle';
      const winner = checkIsWinner(updatedGameState);
      setGameState(updatedGameState);
      setIsCross(!isCross);

      if (winner) setGameWinner(winner);
    } else {
      Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#FFF',
      });
    }
  };

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View style={[styles.playerInfo, isCross ? styles.playerX : styles.playerO]}>
          <Text style={styles.gameTurnTxt}>Player {isCross ? 'X' : 'O'}'s Turn</Text>
        </View>
      )}
      <View style={styles.gridContainer}>
        {gameState.map((item, index) => (
          <Pressable key={index} style={styles.card} onPress={() => onChangeItem(index)}>
            <Icons name={item} />
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'Reload the game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playerInfo: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: { backgroundColor: '#38CC77' },
  playerO: { backgroundColor: '#F7CD2E' },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  card: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',
    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;
