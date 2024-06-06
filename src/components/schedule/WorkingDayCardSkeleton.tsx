import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { StyleSheet, View } from 'react-native';
import { useColorTheme } from '../../hooks/useColorTheme';

export const WorkingDayCardSkeleton = () => {
  const { colors } = useColorTheme();

  const backgroundColor = colors.effect.skeleton.dark;
  const highlightColor = colors.effect.skeleton.light;

  const speed = 2000;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card.bg,
          shadowColor: colors.card.shadow,
          borderColor: 'rgba(255,255,255,0.38)',
          borderWidth: 1,
        },
      ]}
    >
      <View style={[styles.header, { borderColor: colors.card.separatorLine }]}>
        <SkeletonPlaceholder
          backgroundColor={backgroundColor}
          highlightColor={highlightColor}
          speed={speed}
        >
          <View style={{ width: 120, height: 30 }}></View>
        </SkeletonPlaceholder>

        <SkeletonPlaceholder
          backgroundColor={backgroundColor}
          highlightColor={highlightColor}
          speed={speed}
        >
          <View style={{ width: 100, height: 30 }}></View>
        </SkeletonPlaceholder>
      </View>

      <View style={styles.content}>
        <View style={styles.leftSideOuter}>
          <View style={styles.leftSideInner}>
            <SkeletonPlaceholder
              backgroundColor={backgroundColor}
              highlightColor={highlightColor}
              speed={speed}
            >
              <View style={{ width: 70, height: 30 }}></View>
            </SkeletonPlaceholder>
            <View style={{ height: 5 }}></View>
            <SkeletonPlaceholder
              backgroundColor={backgroundColor}
              highlightColor={highlightColor}
              speed={speed}
            >
              <View style={{ width: 70, height: 30 }}></View>
            </SkeletonPlaceholder>
          </View>
        </View>

        <View
          style={[
            styles.middleLine,
            { borderLeftColor: colors.card.separatorLine },
          ]}
        />

        <View style={styles.rightSideOuter}>
          <View style={styles.rightSideInner}>
            <SkeletonPlaceholder
              backgroundColor={backgroundColor}
              highlightColor={highlightColor}
              speed={speed}
            >
              <View style={{ width: 70, height: 30 }}></View>
            </SkeletonPlaceholder>
            <View style={{ height: 5 }}></View>
            <SkeletonPlaceholder
              backgroundColor={backgroundColor}
              highlightColor={highlightColor}
              speed={speed}
            >
              <View style={{ width: 70, height: 30 }}></View>
            </SkeletonPlaceholder>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginVertical: 8,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    elevation: 4,
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
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    paddingRight: 16,
    paddingTop: 15,
  },
  middleLine: {
    height: '100%',
    borderLeftWidth: 1,
  },
});
