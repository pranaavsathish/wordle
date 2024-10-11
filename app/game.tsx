import { View, Text, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import * as Haptics from 'expo-haptics';
import {  useFonts, AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface';
import { useRouter } from 'expo-router';
import getRandomWord from '@/utils/wordGenerator';
import verifyWord from '@/utils/verifyWord';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';


//Character does not exist: 1   #A29EA3
//Character misplaced:      2   #BDB250
//Character correct:        3   #68BB59

const game = () => {

    //Game states
    const [word, setWord] = useState('APPLE'); //Current word to find
    const [chances, setChances] = useState(0); //Number of chances played
    const [guess, setGuess] = useState(''); //Current guess by the user
    const [grid, setGrid] = useState(
        Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ['']))
    );
    const [status, setStatus] = useState(
        Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => [0]))
    );
    const [currRow, setCurrRow] = useState(0);
    const [currCol, setCurrCol] = useState(0);
    const [word1, setWord1] = useState<string[]>([]);
    const [word2, setWord2] = useState<string[]>([]);
    const [word3, setWord3] = useState<string[]>([]);

    //Hooks
    const router = useRouter();

    useEffect(() => {
        setWord(getRandomWord().toUpperCase());
        // const w = getRandomWord();
        // setWord(w.toUpperCase());
        // console.log(w)
    }, []);

    // useEffect(() => {
    //     const printGrid = () => {
    //         for(const row of grid){
    //             console.log(row);
    //         }
    //         console.log('\n');
    //     };
    //     printGrid();
    // }, [grid]);

    // useEffect(() => {
    //     console.log(guess);
    // }, [guess]);

    // useEffect(() => {
    //     console.log(word1);
    //     console.log(word2);
    //     console.log(word3);
    // }, [word1, word2, word3]);

    //Animations
    const translateX = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translateX.value}]}
    });

    const [flipped, setFlipped] = useState(false);
    const rotation = useSharedValue(0);

    const flipCard = () => {
        rotation.value = withTiming(flipped ? 0 : 1, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
        });
        setFlipped(!flipped);
    };

    const animatedStyleFlip = useAnimatedStyle(() => {
        const rotateX = rotation.value * Math.PI *2;
        return {
            transform: [{ rotateX: `${rotateX}rad` }],
        };
    });

    const animationSelector = () => {
        
    };

    const [fontsLoaded] = useFonts({
        AbrilFatface_400Regular,
      });
    
      if (!fontsLoaded) {
        return null;
      }

    //Constants
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
    ];

    // const grey = '#A29EA3';
    // const green = '#68BB59';
    // const yellow = '#BDB250';

    //Functions
    const handleKey = (val:string) => {
        if(currCol === 5){
            return;
        }
        // console.log(currRow, currCol);
        setGuess(prevGuess => prevGuess+val);
        setCurrCol(prevCurr => {
            const newCol = prevCurr + 1;
            setGrid(prevGrid => {
                var newGrid = prevGrid.map(row => row.slice());
                newGrid[currRow][currCol][0] = val;
                return newGrid;
            });
            return newCol;
        });
    };

    const handleBackspace = () => {
        if(currCol === 0){
            return;
        }
        // console.log(currRow, currCol);
        setGuess(prevGuess => prevGuess.slice(0,-1));
        setCurrCol(prevCol => {
            const newCol = prevCol - 1;
            setGrid(prevGrid => {
                const newGrid = prevGrid.map(row => row.slice());
                newGrid[currRow][newCol][0] = '';
                return newGrid;
            });
            return newCol;
        });
    };

    const handleEnter = async () => {
        if(guess.length !== 5){
            return;
        }
        if(currRow === 5){
            setTimeout(() => router.push('/lost'), 2000);
        }
        try{
            const res = await verifyWord(guess);
            setCurrRow(currRow+1);
            setCurrCol(0);
            setGuess('');
            // console.log(res);
            compareWordAndSetState();
            flipCard();
        }
        catch(err){
            translateX.value = withRepeat(withTiming(8, { duration: 50 }), 6, true);
            return;
        }
    };

    const handleType = (key:string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        if(key === 'ENTER') handleEnter();
        else if(key === 'BACKSPACE') handleBackspace();
        else handleKey(key);
    };

    const compareWordAndSetState = () => {
        const res:number[][] = [[0],[0],[0],[0],[0]];
        for(var i=0;i<5;i++){
            if(word.includes(guess[i]) && guess[i] !== word[i] ){ 
                res[i][0] = 2;
                setWord2(prevWord => [...prevWord, guess[i]] );
            }
            else if(!word.includes(guess[i]) ){ 
                res[i][0] = 1; 
                setWord1(prevWord => [...prevWord, guess[i]] );
            }
            else if(guess[i] === word[i]) {
                res[i][0] = 3;
                setWord3(prevWord => [...prevWord, guess[i]] );
            }
        }
        const isWin = res.every(item => item[0] === 3);
        if (isWin) handleWin();

        setStatus(prevStatus => {
            var newStatus = status.map((row) => row.slice());
            newStatus[currRow] = res;
            return newStatus;
        });
    };
    
    const handleWin = () => setTimeout(() => router.push('/win'), 5000)


  return (
    <View className='w-full h-full'>

        {/* Header */}
        <View className='flex flex-row justify-between items-center border-b-[1px] border-b-gray-200 pb-2'>
            <View className='flex flex-row items-center gap-x-2 pl-4'>
                <TouchableOpacity onPress={() => router.back()} ><AntDesign name="left" size={18} color="black" /></TouchableOpacity>
                <Text className='text-3xl' style={{fontFamily: 'AbrilFatface_400Regular'}} >Wordle</Text>
            </View>

            <View className='flex flex-row items-center space-x-3 pr-4'>
                <TouchableOpacity><Feather name="help-circle" size={20} color="black" /></TouchableOpacity>
                <TouchableOpacity><Entypo name="bar-graph" size={20} color="black" /></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('./animated')} ><Ionicons name="settings-sharp" size={20} color="black" /></TouchableOpacity>
            </View>
        </View>

        {/* Wordbox */}
        <View className='w-full flex gap-y-[6px] items-center mt-14'>
            {
                grid.map((row) => 
                (
                    <Animated.View key={grid.indexOf(row)} className='flex flex-row gap-x-[6px]' style={[{},currRow === grid.indexOf(row) && animatedStyle || currRow-1 === grid.indexOf(row) && animatedStyleFlip]}>
                    {
                        row.map(
                            (item) =>
                            (
                                <View key={row.indexOf(item)} 
                                    className={`border-[1px] ${status[grid.indexOf(row)][row.indexOf(item)][0] === 0 ? 'border-gray-300' : 'border-none border-0'} h-[60px] w-[60px] flex items-center justify-center`}
                                    style={{
                                        backgroundColor: (() => {
                                            const s = status[grid.indexOf(row)][row.indexOf(item)][0];
                                            if (s === 0) return 'white';
                                            else if (s === 1) return '#a29ea3';
                                            else if (s === 2) return '#d4b62f';
                                            else if (s === 3) return '#68bb59';
                                            return 'transparent'; // fallback color
                                        })(),
                                    }}
                                >
                                    <Text className={`text-3xl ${status[grid.indexOf(row)][row.indexOf(item)][0] === 0 ? 'text-black' : 'text-white'} font-bold`}>{grid[grid.indexOf(row)][row.indexOf(item)]}</Text>
                                </View>
                            ) 
                        )
                    }
                    </Animated.View>
                )
                )
            }
        </View>

        {/* Keyboard */}
        <View className='w-[101vw] h-[50vh] gap-y-[10px] mt-16'>
            {
                keys.map((row) => 
                    <View key={keys.indexOf(row)} className='w-full flex flex-row gap-x-2 justify-center'>
                        {
                            row.map((key) => 
                                <TouchableOpacity key={key} onPress={() => handleType(key)}>
                                    <View className='flex flex-row'>
                                        {
                                            (key === 'ENTER') 
                                            ?
                                                <Text key={key} className='bg-gray-200 text-[11px] text-center rounded-[3px] font-bold w-[45px] pt-4 pb-4'>{key}</Text>
                                            :
                                            (
                                                (key === 'BACKSPACE')
                                                ?
                                                <View className='bg-gray-200 text-center rounded-[3px] w-[36px] pt-3 pb-3 flex flex-row justify-center'>
                                                    <Ionicons name="backspace-outline" size={23} color="black" />
                                                </View>
                                                :
                                                <Text key={key} 
                                                className='bg-gray-200 text-[17px] text-center rounded-[3px] font-bold w-[29px] pt-3 pb-3' 
                                                style={{
                                                    backgroundColor: (() => {
                                                        if (word3.includes(key)) return '#68bb59';
                                                        else if (word2.includes(key)) return '#d4b62f';
                                                        else if (word1.includes(key)) return '#a29ea3';
                                                        return 'lightgrey'; // fallback color
                                                    })(),
                                                }}
                                                >{key}</Text>
                                            )
                                        }
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                )
            }
        </View>

    </View>
  )
}

export default game;