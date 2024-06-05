import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { WorkingDaySchedule } from '../../interfaces/WorkingDaySchedule';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { ColorPalette } from '../../interfaces/ColorPalette';
import { toast } from '../../utils';
import { useLocale } from '../../hooks/useLocale';

export const WorkingDayCard = ({
  schedule,
  colorPalette,
}: {
  schedule: WorkingDaySchedule;
  colorPalette: ColorPalette;
}) => {
  const isCikolaDown = schedule.cikola.length === 0;
  const isDoborgazDown = schedule.doborgaz.length === 0;
  const isJanicsDown = isCikolaDown && isDoborgazDown;

  const [ripple] = useState(TouchableNativeFeedback.Ripple('#ccc', false));

  const { l } = useLocale();

  return (
    <View
      style={{
        ...styles.card,
        opacity: isJanicsDown ? 0.6 : 1,
      }}
    >
      <View
        style={{
          ...styles.header,
          borderBottomWidth: isJanicsDown ? 0 : 1,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.day}>{schedule.dayOfWeekString}</Text>
          {!isJanicsDown && schedule.isNew && (
            <LinearGradient
              colors={colorPalette.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.newTag}
            >
              <Text
                style={{ fontWeight: 'bold', color: colorPalette.textColor }}
              >
                {l.schedule.new}
              </Text>
            </LinearGradient>
          )}
        </View>

        <Text style={styles.date}>{schedule.dateStringShort}</Text>
      </View>

      {!isJanicsDown && (
        <View style={styles.content}>
          <TouchableNativeFeedback
            style={styles.touchableFeedback}
            onLongPress={() => toast('Cikola')}
            background={ripple}
          >
            <View style={styles.leftSideOuter}>
              <View style={styles.leftSideInner}>
                {isCikolaDown && <Text style={styles.worker}>-</Text>}
                {!isCikolaDown &&
                  schedule.cikola.map((p, i) => (
                    <Text key={i} style={styles.worker}>
                      {p}
                    </Text>
                  ))}
              </View>
            </View>
          </TouchableNativeFeedback>

          <View style={styles.middleLine} />

          <TouchableNativeFeedback
            style={styles.touchableFeedback}
            onLongPress={() => toast('Doborgaz')}
            background={ripple}
          >
            <View style={styles.rightSideOuter}>
              <View style={styles.rightSideInner}>
                {isDoborgazDown && <Text style={styles.worker}>-</Text>}
                {!isDoborgazDown &&
                  schedule.doborgaz.map((p, i) => (
                    <Text key={i} style={styles.worker}>
                      {p}
                    </Text>
                  ))}
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      )}
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
    elevation: 4,
    overflow: 'hidden',
  },
  newTag: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    paddingHorizontal: 13,
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
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    position: 'relative',
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
  },
  rightSideInner: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    paddingRight: 16,
    paddingTop: 15,
  },
  middleLine: {
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: '#00000020',
  },
  worker: {
    fontSize: 20,
    color: '#000',
  },
  touchableFeedback: {
    width: '100%',
    height: '100%',
  },
});
