import Collapsible from 'react-native-collapsible';
import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Animated,
} from 'react-native';
import { useUIEffects } from '../../../hooks/useUIEffects';
import { useColorTheme } from '../../../hooks/useColorTheme';
import { Icon } from '../../icons/Icon';

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
  const { ripple } = useUIEffects();
  const { colors } = useColorTheme();

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
      <TouchableNativeFeedback
        background={ripple}
        onPress={() => setCollapsed((prev) => !prev)}
      >
        <View style={[styles.row, styles.button]}>
          <View style={styles.icon}>{icon && icon}</View>
          <Text style={[styles.title, { color: colors.text.main }]}>
            {title}
          </Text>
          <Animated.View style={[styles.arrow, arrowStyle]}>
            <Icon name='keyboard-arrow-down' />
          </Animated.View>
        </View>
      </TouchableNativeFeedback>

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    padding: 15,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    marginLeft: 10,
  },
  contentWrapper: {
    width: '100%',
    paddingLeft: 15,
  },
});
