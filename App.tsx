import {Button, StyleSheet, RefreshControl, SafeAreaView, FlatList} from 'react-native';
import React, { useState, useEffect } from 'react'
import { WorkingDayCard } from "./components/WorkingDayCard";
import { View, Text } from 'react-native';
import { usePultosokData } from "./hooks/usePultosokData";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "react-native-linear-gradient";
import Toast from "react-native-toast-message";
import {ColorPalette} from "./interfaces/ColorPalette";


export default function App() {
  const { workingDays, refresh: refreshPultosok, isRefreshing } = usePultosokData();

  const colorPalettes: ColorPalette[] = [
    { gradient: ['#B429F9', '#9C43F8','#855DF7','#6D77F6','#5591F5','#3EABF4', '#26C5F3'], textColor: '#FFF' },
    { gradient: ['#FCF3C4', '#FCDBBE','#FBC3B8','#FBABB2','#FA92AC','#FA7AA6', '#F962A0'], textColor: '#000' },
    { gradient: ['#E9B7CE', '#E5C1D4','#E2CBDA','#DED5E0','#DADFE5','#D7E9EB', '#D3F3F1'], textColor: '#000' },
    { gradient: ['#EEB86D', '#E0A579','#D29284','#C47F90','#B56C9B','#A759A7', '#9946B2'], textColor: '#000' },
    { gradient: ['#AED1EF', '#B9D3E7','#C5D6E0','#D0D8D8','#DBDAD0','#E7DDC9', '#F2DFC1'], textColor: '#000' },
  ];

  const today = new Date();
  const colorPalette = colorPalettes[(today.getDate() * 31) % colorPalettes.length];

  return (

    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LinearGradient
            colors={colorPalette.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{ width: '100%', height: '100%'}}
        >
          <View style={styles.tasksWrapper}>
            <SafeAreaView>
              {workingDays &&
                  <FlatList
                      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshPultosok} />}
                      data={workingDays}
                      renderItem={({ item }) => (<View style={{marginHorizontal: 20}}><WorkingDayCard  schedule={item} colorPalette={colorPalette} /></View>)} /> }
              {!workingDays &&
                  <View style={styles.loadingContainer}>
                    <View style={styles.loadingContainerInner}>
                      <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                  </View>
              }

            </SafeAreaView>
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
  loadingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loadingContainerInner: {
    width: '80%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',
    borderRadius: 10,
  },
  loadingText: {
    fontSize: 24,
  }
});
