import { StyleSheet, TextStyle } from 'react-native';
import React from 'react';
import { WorkingDaySchedule } from '../../interfaces/WorkingDaySchedule';
import { View, Text } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { clipboard, date, toast } from '../../utils/utils';
import { useLocale } from '../../hooks/useLocale';
import { useColorTheme } from '../../hooks/useColorTheme';
import { useGradientPalette } from '../../hooks/useGradientPalette';
import { Icon } from '../Icon';
import { CHANGE_VISIBLE_FOR_MINUTES } from '../../utils/constants';
import { useEnvironment } from '../../hooks/useEnvironment';
import { Touchable } from '../Touchable';

export const WorkingDayCard = ({ schedule }: { schedule: WorkingDaySchedule }) => {
  const isCikolaDown = schedule.cikola.length === 0;
  const isDoborgazDown = schedule.doborgaz.length === 0;
  const isJanicsDown = isCikolaDown && isDoborgazDown;

  const markedAsReadAfterLastModifiedDate =
    schedule.markedAsReadTime && schedule.lastModifiedDate && schedule.markedAsReadTime > schedule.lastModifiedDate;

  const { l } = useLocale();
  const { colors, isLightTheme } = useColorTheme();
  const { colorPalette, gradientEffects } = useGradientPalette();
  const { isDebug } = useEnvironment();

  const isCreatedDateADayBefore =
    schedule.createdDate && date(schedule.createdDate).within.last.minutes(CHANGE_VISIBLE_FOR_MINUTES);
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

      {isDebug && (
        <Touchable
          style={{ borderBottomWidth: 1, borderColor: colors.card.separatorLine }}
          onPress={() => clipboard().set(JSON.stringify(schedule)).toast()}
        >
          <View>
            <Text>{JSON.stringify(schedule)}</Text>
          </View>
        </Touchable>
      )}

      {!isJanicsDown && (
        <View style={styles.content}>
          <View style={styles.touchableWrapper}>
            <View style={styles.touchableWrapperWidth}>
              <Touchable
                style={styles.touchableFeedback}
                onLongPress={() => toast('Cikola')}>
            <View style={styles.leftSideOuter}>
              <View style={styles.leftSideInner}>
                {isCikolaDown && <Text style={[styles.worker, { color: colors.text.main }]}>-</Text>}
                {!isCikolaDown &&
                  schedule.cikola.map((p, i) => {
                    let showPlusSign = false;

                    const workerChange =
                      schedule.change &&
                      !isCreatedDateADayBefore &&
                      isOnlyPartiallyChanged &&
                      schedule.change.cikolaUpdateDetails.find((c) => c.workerName === p);

                    if (workerChange && workerChange.type === 'added') {
                      if (date(workerChange.timestamp).within.last.minutes(CHANGE_VISIBLE_FOR_MINUTES)) {
                        showPlusSign = true;
                      }
                    }

                    return (
                      <WorkerName
                        key={i}
                        iconPosition={'right'}
                        icon={showPlusSign ? 'added' : undefined}
                        workerName={p}
                      />
                    );
                  })}
                {schedule.change &&
                  schedule.change.cikolaUpdateDetails
                    .filter((c) => c.type === 'removed')
                    .filter((c) => date(c.timestamp).within.last.minutes(CHANGE_VISIBLE_FOR_MINUTES))
                    .filter((c) => !schedule.cikola.includes(c.workerName))
                    .map((p, i) => {
                      return <WorkerName key={i} workerName={p.workerName} icon={'removed'} iconPosition={'right'} />;
                    })}
              </View>
            </View>
          </Touchable>
            </View>
          </View>

          <View style={[styles.middleLine, { borderLeftColor: colors.card.separatorLine }]} />

          <View style={styles.touchableWrapper}>
            <View style={styles.touchableWrapperWidth}>
          <Touchable
            style={styles.touchableFeedback}
            onLongPress={() => toast('Doborgaz')}
          >
            <View style={styles.rightSideOuter}>
              <View style={styles.rightSideInner}>
                {isDoborgazDown && <Text style={[styles.worker, { color: colors.text.main }]}>-</Text>}
                {!isDoborgazDown &&
                  schedule.doborgaz.map((p, i) => {
                    let showPlusSign = false;

                    const workerChange =
                      schedule.change &&
                      !isCreatedDateADayBefore &&
                      isOnlyPartiallyChanged &&
                      schedule.change.doborgazUpdateDetails.find((c) => c.workerName === p);

                    if (workerChange && workerChange.type === 'added') {
                      if (date(workerChange.timestamp).within.last.minutes(CHANGE_VISIBLE_FOR_MINUTES)) {
                        showPlusSign = true;
                      }
                    }

                    return (
                      <WorkerName
                        key={i}
                        iconPosition={'left'}
                        icon={showPlusSign ? 'added' : undefined}
                        workerName={p}
                      />
                    );
                  })}
                {schedule.change &&
                  schedule.change.doborgazUpdateDetails
                    .filter((c) => c.type === 'removed')
                    .filter((c) => date(c.timestamp).within.last.minutes(CHANGE_VISIBLE_FOR_MINUTES))
                    .filter((c) => !schedule.doborgaz.includes(c.workerName))
                    .map((p, i) => {
                      return <WorkerName key={i} workerName={p.workerName} icon={'removed'} iconPosition={'left'} />;
                    })}
              </View>
            </View>
          </Touchable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const WorkerName = ({
  workerName,
  icon,
  iconPosition,
}: {
  iconPosition: 'left' | 'right';
  icon: 'added' | 'removed' | undefined;
  workerName: string;
}) => {
  const { colors } = useColorTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      {icon === 'added' && iconPosition === 'left' && <Icon name={'add-circle'} color={'#009100'} />}
      {icon === 'removed' && iconPosition === 'left' && <Icon name={'remove-circle'} color={'#bb0707'} />}
      <Text
        style={[
          styles.worker,
          {
            color: colors.text.main,
            textDecorationLine: icon === 'removed' ? 'line-through' : '',
          } as TextStyle,
        ]}
      >
        {workerName}
      </Text>
      {icon === 'removed' && iconPosition === 'right' && <Icon name={'remove-circle'} color={'#bb0707'} />}
      {icon === 'added' && iconPosition === 'right' && <Icon name={'add-circle'} color={'#009100'} />}
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
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  leftSideOuter: {
    width: '100%',
  },
  leftSideInner: {
    padding: 10,
    paddingLeft: 16,
    paddingTop: 15,
  },
  rightSideOuter: {
    width: '100%',
  },
  rightSideInner: {
    flexDirection: 'column',
    alignItems: 'flex-end',
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
  touchableWrapper: {
    flex: 1,
    
  },
  touchableWrapperWidth: {
    flex: 1,
  },
  touchableFeedback: {
    width: '100%',
    height: '100%',
  },
});
