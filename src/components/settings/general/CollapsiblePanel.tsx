import Collapsible from 'react-native-collapsible';
import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUIEffects } from '../../../hooks/useUIEffects';

export const CollapsiblePanel = ({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: string | React.ReactNode;
}) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const arrowAnimation = useRef(new Animated.Value(0)).current;
  const { ripple } = useUIEffects();

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
          <View style={styles.icon}>
            {icon && typeof icon === 'string' && (
              <Icon name={icon} size={20} color='#000' />
            )}
            {icon && typeof icon === 'object' && icon}
          </View>
          <Text style={styles.title}>{title}</Text>
          <Animated.View style={[styles.arrow, arrowStyle]}>
            <Icon name='keyboard-arrow-down' size={20} color='black' />
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
    color: 'black',
  },
  arrow: {
    marginLeft: 10,
  },
  contentWrapper: {
    width: '100%',
    paddingLeft: 15,
  },
});
