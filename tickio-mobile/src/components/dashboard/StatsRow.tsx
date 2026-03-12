import React from "react";
import { StyleSheet, View } from "react-native";
import StatCard from "./StatCard";

type Props = {
  streak: number;
  totalTasks: number;
  achievements: number;
  completedToday: number;
};

export default function StatsRow({
  streak,
  totalTasks,
  achievements,
  completedToday,
}: Props) {
  return (
    <View style={styles.row}>
      <StatCard label="Streak" value={streak} icon="🔥" hint={`Best: ${streak}`} />
      <View style={styles.gap} />
      <StatCard
        label="Tasks"
        value={totalTasks}
        icon="📋"
        hint={`${completedToday} completed`}
      />
      <View style={styles.gap} />
      <StatCard label="Achievements" value={achievements} icon="🏆" hint="Keep going" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", marginVertical: 10 },
  gap: { width: 10 },
});