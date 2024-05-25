import {StyleSheet} from "react-native";
import React from "react";
import {WorkingDaySchedule} from "../interfaces/WorkingDaySchedule";
import {View, Text, Button, Image, ImageBackground} from 'react-native';
import { Tooltip } from 'react-native-paper';
import { LinearGradient } from "react-native-linear-gradient";
import {ColorPalette} from "../interfaces/ColorPalette";


export const WorkingDayCard = ({ schedule, colorPalette }: { schedule: WorkingDaySchedule, colorPalette: ColorPalette }) => {
    const isCikolaDown = schedule.cikola.length === 0;
    const isDoborgazDown = schedule.doborgaz.length === 0;
    const isJanicsDown = isCikolaDown && isDoborgazDown;
    const tooltipTouchDelay = 300;

    return (
        <View style={{
            ...styles.card,
            opacity: isJanicsDown ? 0.6 : 1,
        }}>
            <View style={styles.header}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.day}>{schedule.dateStringLong}</Text>
                    { !isJanicsDown && schedule.isNew &&
                        <LinearGradient
                                colors={colorPalette.gradient}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 1}}
                                style={styles.newTag}
                            >
                            <Text style={{fontWeight: 'bold', color: colorPalette.textColor}}>New</Text>
                        </LinearGradient>
                    }
                </View>

                <Text style={styles.date}>{schedule.dateStringShort}</Text>
            </View>
            {!isJanicsDown &&
                <View style={styles.content}>
                    {!isJanicsDown && isCikolaDown &&
                        <View style={styles.leftSideOuter}>
                            <Tooltip enterTouchDelay={tooltipTouchDelay} title={'Cikola'}>
                                <View style={styles.leftSideInner}>
                                    <Text style={styles.worker}>-</Text>
                                </View>
                            </Tooltip>
                        </View>
                        }
                    {!isJanicsDown && !isCikolaDown &&
                        <View style={styles.leftSideOuter}>
                            <Tooltip enterTouchDelay={tooltipTouchDelay} title={'Cikola'}>
                                <View style={styles.leftSideInner}>
                                    {schedule.cikola.map((p, i) => (<Text key={i} style={styles.worker}>{p}</Text>))}
                                </View>
                            </Tooltip>
                        </View>
                    }

                    <View style={styles.middleLine}/>

                    {!isJanicsDown && isDoborgazDown &&
                        <View style={styles.rightSideOuter}>
                            <Tooltip enterTouchDelay={tooltipTouchDelay} title={'Doborgaz'}>
                                <View style={styles.rightSideInner}>
                                    <Text style={styles.worker}>-</Text>
                                </View>
                            </Tooltip>
                        </View>
                    }
                    {!isJanicsDown && !isDoborgazDown &&
                        <View style={styles.rightSideOuter}>
                            <Tooltip enterTouchDelay={tooltipTouchDelay} title={'Doborgaz'}>
                                <View style={styles.rightSideInner}>
                                    {schedule.doborgaz.map((p, i) => (<Text key={i} style={styles.worker}>{p}</Text>))}
                                </View>
                            </Tooltip>
                        </View>
                    }
                </View>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginVertical: 8,
        shadowColor: '#000',
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        elevation: 8,
    },
    newTag: {
        borderRadius: 20,
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    day: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    date: {
        fontSize: 18,
        color: '#000000',
        opacity: 0.7
    },
    content: {
        flexDirection: 'row',
        position: 'relative'
    },
    leftSideOuter: {
        width: '50%',
    },
    leftSideInner: {
        padding: 10,
        paddingLeft: 16,
        paddingTop: 15,
    },
    rightSideOuter: {
        width: '50%',
        borderLeftWidth: 1,
        borderLeftColor: '#00000020'
    },
    rightSideInner: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        padding: 10,
        paddingRight: 16,
        paddingTop: 15,
    },
    middleLine: {
        height: '100%',
        borderLeftWidth: 1,
        borderLeftColor: '#00000020'
    },
    worker: {
        fontSize: 20,
        color: '#000'
    },
});
