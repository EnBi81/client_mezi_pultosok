import {Button, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react'
import { WorkingDayCard } from "./components/WorkingDayCard";
import { View, Text } from 'react-native';
import { usePultosokData } from "./hooks/usePultosokData";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "react-native-linear-gradient";
import Toast from "react-native-toast-message";

export default function App() {
  const { workingDays, refresh: refreshPultosok } = usePultosokData();

  const colorPalettes = [
    ['#B429F9', '#9C43F8','#855DF7','#6D77F6','#5591F5','#3EABF4', '#26C5F3'],
    ['#FCF3C4', '#FCDBBE','#FBC3B8','#FBABB2','#FA92AC','#FA7AA6', '#F962A0'],
    ['#E9B7CE', '#E5C1D4','#E2CBDA','#DED5E0','#DADFE5','#D7E9EB', '#D3F3F1'],
    ['#EEB86D', '#E0A579','#D29284','#C47F90','#B56C9B','#A759A7', '#9946B2'],
    ['#AED1EF', '#B9D3E7','#C5D6E0','#D0D8D8','#DBDAD0','#E7DDC9', '#F2DFC1'],
  ];

  const today = new Date();
  const colorPalette = colorPalettes[(today.getDate() * 31) % colorPalettes.length];

  return (
    <View style={styles.container}>
      <Button title="Refresh Data" style={styles.refreshDataButton} onPress={refreshPultosok}  />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LinearGradient
            colors={colorPalette}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{ width: '100%'}}
        >
          <View style={styles.tasksWrapper}>
            <ScrollView>
              <View style={styles.workingDayContainer}>
                {workingDays.map((day, i) => (<View key={i} style={{marginHorizontal: 20}}><WorkingDayCard  schedule={day} /></View>))}
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
      </GestureHandlerRootView>
      <Toast/>
    </View>
  );
}

const styles = StyleSheet.create({
  workingDayContainer: {
    gap: 2,
    marginBottom: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#EBEAED',
  },
  tasksWrapper: {
    paddingTop: 50,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10
  },
});
