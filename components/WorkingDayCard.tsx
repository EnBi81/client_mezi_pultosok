import {StyleSheet} from "react-native";
import React from "react";
import {WorkingDaySchedule} from "../interfaces/WorkingDaySchedule";
import {View, Text, Button, Image, ImageBackground} from 'react-native';

export const WorkingDayCard = ({ schedule }: { schedule: WorkingDaySchedule }) => {
    const date = new Date(schedule.date);

    const isCikolaDown = schedule.cikola.length === 0;
    const isDoborgazDown = schedule.doborgaz.length === 0;
    const isJanicsDown = isCikolaDown && isDoborgazDown;

    return (
        <View style={{ ...styles.card, opacity: isJanicsDown ? 0.6 : 1 }}>
            <View style={styles.header}>
                <Text style={styles.day}>{date.toLocaleDateString(undefined, { weekday: 'long' })}</Text>
                <Text style={styles.date}>{date.toLocaleDateString(undefined, { dateStyle: "short" })}</Text>
            </View>
            {!isJanicsDown &&
                <View style={styles.content}>
                    {!isJanicsDown && isCikolaDown &&
                        <View style={styles.leftSide}>
                            <Text style={styles.cityNameRight}>(Cikola)</Text>
                            <Text style={styles.worker}>-</Text>
                        </View>}
                    {!isJanicsDown && !isCikolaDown &&
                        <View style={styles.leftSide}>
                            <Text style={styles.cityNameRight}>(Cikola)</Text>
                            <View>
                                {schedule.cikola.map((p, i) => (<Text key={i} style={styles.worker}>{p}</Text>))}
                            </View>
                        </View>}

                    {!isJanicsDown && isDoborgazDown &&
                        <View style={styles.rightSide}>
                            <Text style={styles.cityNameLeft}>(Doborgaz)</Text>
                            <Text style={styles.worker}>-</Text>
                        </View>
                    }
                    {!isJanicsDown && !isDoborgazDown &&
                        <View style={styles.rightSide}>
                            <Text style={styles.cityNameLeft}>(Doborgaz)</Text>
                            <View>
                                {schedule.doborgaz.map((p, i) => (<Text key={i} style={styles.worker}>{p}</Text>))}
                            </View>
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
        overflow: 'hidden',
        marginVertical: 8,
        shadowColor: '#000',
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        elevation: 8,
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
    leftSide: {
        width: '50%',
        padding: 10,
        paddingTop: 15,
    },
    rightSide: {
        width: '50%',
        flexDirection: "row",
        justifyContent: 'flex-end',
        padding: 10,
        paddingTop: 15,
        borderLeftWidth: 1,
        borderLeftColor: '#00000020'
    },
    worker: {
        fontSize: 20,
        color: '#000'
    },
    cityNameRight: {
        fontStyle: 'italic',
        position: "absolute",
        width: '100%',
        paddingLeft: 10,
        textAlign: 'center'
    },
    cityNameLeft: {
        fontStyle: 'italic',
        position: "absolute",
        width: '100%',
        paddingRight: 10,
        textAlign: 'center'
    }
});
