import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGradientPalette } from '../hooks/useGradientPalette';
import { ColorPalette } from '../interfaces/ColorPalette';
import { LinearGradient } from 'react-native-linear-gradient';
import { useColorTheme } from '../hooks/useColorTheme';
import { range } from '../utils/utils';

export const DebugGradientPage = () => {
  const { gradients, getGradientForDay } = useGradientPalette();
  const { colors } = useColorTheme();

  const now = new Date();
  const statistics = {
    light: calculateGradientStatistics({ gradients: gradients.light, getGradientForDay }),
    dark: calculateGradientStatistics({ gradients: gradients.dark, getGradientForDay }),
  };

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 25, marginBottom: 20, color: colors.text.main }}>Gradient Calendar</Text>

        {range(15).map((i) => {
          const date = new Date(now.getTime());
          date.setDate(date.getDate() + i);
          return (
            <View key={i} style={{ marginBottom: 10 }}>
              <GradientDay date={date} />
            </View>
          );
        })}
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 25, marginBottom: 20, color: colors.text.main }}>Gradient Statistics</Text>
        <Text style={{ fontSize: 20, marginBottom: 20, color: colors.text.main }}>Light</Text>
        {statistics.light.map((stat) => {
          return (
            <View key={stat.gradient.id} style={[styles.row, { marginBottom: 10 }]}>
              <GradientBox gradient={stat.gradient} />
              <Text>: {stat.count}</Text>
            </View>
          );
        })}
        <Text style={{ fontSize: 20, marginBottom: 20, color: colors.text.main }}>Dark</Text>
        {statistics.dark.map((stat) => {
          return (
            <View key={stat.gradient.id} style={[styles.row, { marginBottom: 10 }]}>
              <GradientBox gradient={stat.gradient} />
              <Text>: {stat.count}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const GradientDay = ({ date }: { date: Date }) => {
  const { gradients, getGradientForDay } = useGradientPalette();
  const { colors } = useColorTheme();

  const dayGradients = {
    light: getGradientForDay(date, gradients.light),
    dark: getGradientForDay(date, gradients.dark),
    gold: getGradientForDay(date, gradients.golden),
  };

  return (
    <View>
      <View>
        <Text style={{ color: colors.text.main }}>{date.toLocaleDateString()}</Text>
      </View>
      <View>
        <View style={styles.row}>
          <GradientBox gradient={dayGradients.light} />
        </View>
        <View style={styles.row}>
          <GradientBox gradient={dayGradients.dark} />
        </View>
        <View style={styles.row}>
          <GradientBox gradient={dayGradients.gold} />
        </View>
      </View>
    </View>
  );
};

const GradientBox = ({ gradient }: { gradient: ColorPalette }) => {
  const { colors } = useColorTheme();

  return (
    <View style={[styles.row, { height: 20, gap: 5 }]}>
      <LinearGradient
        style={{ width: 80, height: '100%' }}
        colors={gradient.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      ></LinearGradient>
      <Text style={{ color: colors.text.main }}>{gradient.gradientName}</Text>
    </View>
  );
};

const calculateGradientStatistics = ({
  getGradientForDay,
  gradients,
}: {
  getGradientForDay: (date: Date, gradients: ColorPalette[]) => ColorPalette;
  gradients: ColorPalette[];
}) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  now.setDate(1);

  const statistics = gradients.map((gradient) => ({
    gradient: gradient,
    count: 0,
  }));

  while (currentMonth === now.getMonth()) {
    now.setDate(now.getDate() + 1);

    const currentGradient = getGradientForDay(now, gradients);

    const gradientStatistics = statistics.find((s) => s.gradient.id === currentGradient.id);
    if (gradientStatistics) {
      gradientStatistics.count++;
    }
  }

  return statistics;
};

const styles = StyleSheet.create({
  maxSize: {
    height: '100%',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
});
