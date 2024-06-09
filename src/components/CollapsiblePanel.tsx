import Collapsible from 'react-native-collapsible';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Icon } from './icons/Icon';
import { SettingsOptionContainer } from './settings/SettingsOptionContainer';

export const CollapsiblePanel = ({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const arrowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(arrowAnimation, {
      toValue: isCollapsed ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isCollapsed, arrowAnimation]);

  const rotateInterpolate = arrowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '0deg'],
  });

  const arrowStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  return (
    <View style={styles.maxWidth}>
      <SettingsOptionContainer
        icon={icon}
        title={title}
        onPress={() => setCollapsed((prev) => !prev)}
        rightSide={
          <Animated.View style={[styles.arrow, arrowStyle]}>
            <Icon name='keyboard-arrow-down' />
          </Animated.View>
        }
      />

      <Collapsible collapsed={isCollapsed}>
        <View style={styles.contentWrapper}>{children}</View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  maxWidth: {
    width: '100%',
  },
  arrow: {
    marginLeft: 10,
  },
  contentWrapper: {
    width: '100%',
    paddingLeft: 15,
  },
});
