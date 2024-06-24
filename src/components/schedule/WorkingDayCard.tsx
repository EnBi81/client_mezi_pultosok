import { StyleSheet } from 'react-native';
import React from 'react';
import { WorkingDaySchedule } from '../../interfaces/WorkingDaySchedule';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { toast } from '../../utils/utils';
import { useLocale } from '../../hooks/useLocale';
import { useUIEffects } from '../../hooks/useUIEffects';
import { useColorTheme } from '../../hooks/useColorTheme';
import { useGradientPalette } from '../../hooks/useGradientPalette';
import { Icon } from '../Icon';

export const WorkingDayCard = ({ schedule }: { schedule: WorkingDaySchedule }) => {
  const isCikolaDown = schedule.cikola.length === 0;
  const isDoborgazDown = schedule.doborgaz.length === 0;
  const isJanicsDown = isCikolaDown && isDoborgazDown;

  const markedAsReadAfterLastModifiedDate =
    schedule.markedAsReadTime && schedule.lastModifiedDate && schedule.markedAsReadTime > schedule.lastModifiedDate;

  const { ripple } = useUIEffects();
  const { l } = useLocale();
  const { colors, isLightTheme } = useColorTheme();
  const { colorPalette, gradientEffects } = useGradientPalette();

  const nowTime = new Date().getTime();
  const newTagThreshold = nowTime - 24 * 60 * 60 * 1000;
  const isCreatedDateADayBefore = schedule.createdDate && newTagThreshold < schedule.createdDate;
  const isOnlyPartiallyChanged = schedule.change && schedule.change.type === 'partial';

  const isNew = !isJanicsDown && !markedAsReadAfterLastModifiedDate && isCreatedDateADayBefore;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card.bg,
          shadowColor: colors.card.shadow,
          opacity: isJanicsDown ? 0.7 : 1,
          borderColor: 'rgba(255,255,255,0.38)',
          borderWidth: 1,
        },
      ]}
    >
      <View
        style={{
          ...styles.header,
          borderBottomWidth: isJanicsDown ? 0 : 1,
          borderColor: colors.card.separatorLine,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.day, { color: colors.text.main }]}>{schedule.dayOfWeekString}</Text>
          {isNew && (
            <LinearGradient
              colors={isLightTheme ? colorPalette.gradient : gradientEffects.brighten(15)}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.newTag}
            >
              <Text style={{ fontWeight: 'bold', color: colorPalette.textColor }}>{l.schedule.new}</Text>
            </LinearGradient>
          )}
        </View>

        <Text style={[styles.date, { color: colors.text.main }]}>{schedule.dateStringShort}</Text>
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
                {isCikolaDown && <Text style={[styles.worker, { color: colors.text.main }]}>-</Text>}
                {!isCikolaDown &&
                  schedule.cikola.map((p, i) => {
                    const workerChange =
                      schedule.change &&
                      !isCreatedDateADayBefore &&
                      isOnlyPartiallyChanged &&
                      newTagThreshold < schedule.change.dateTime &&
                      schedule.change.cikolaUpdateDetails.find((c) => c.workerName === p);

                    return (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text
                          style={[
                            styles.worker,
                            {
                              color: colors.text.main,
                            },
                          ]}
                        >
                          {p}
                        </Text>
                        {workerChange && workerChange.type === 'added' && (
                          <Icon name={'add-circle'} color={'#009100'} />
                        )}
                      </View>
                    );
                  })}
              </View>
            </View>
          </TouchableNativeFeedback>

          <View style={[styles.middleLine, { borderLeftColor: colors.card.separatorLine }]} />

          <TouchableNativeFeedback
            style={styles.touchableFeedback}
            onLongPress={() => toast('Doborgaz')}
            background={ripple}
          >
            <View style={styles.rightSideOuter}>
              <View style={styles.rightSideInner}>
                {isDoborgazDown && <Text style={[styles.worker, { color: colors.text.main }]}>-</Text>}
                {!isDoborgazDown &&
                  schedule.doborgaz.map((p, i) => {
                    const workerChange =
                      schedule.change &&
                      !isCreatedDateADayBefore &&
                      isOnlyPartiallyChanged &&
                      newTagThreshold < schedule.change.dateTime &&
                      schedule.change.doborgazUpdateDetails.find((c) => c.workerName === p);

                    return (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        {workerChange && workerChange.type === 'added' && (
                          <Icon name={'add-circle'} color={'#009100'} />
                        )}
                        {workerChange && workerChange.type === 'removed' && (
                          <Icon name={'remove-circle'} color={'#bd0909'} />
                        )}
                        <Text
                          style={[
                            styles.worker,
                            {
                              color: colors.text.main,
                              textDecorationLine: workerChange && workerChange.type === 'removed' ? 'line-through' : '',
                            },
                          ]}
                        >
                          {p}
                        </Text>
                      </View>
                    );
                  })}
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
