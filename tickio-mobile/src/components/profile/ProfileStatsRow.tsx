import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";

type ItemProps = {
  label: string;
  value: number | string;
};

function StatItem({ label, value }: ItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

type Props = {
  taskCount: number;
  activeTaskCount: number;
  achievementCount: number;
};

export default function ProfileStatsRow({
  taskCount,
  activeTaskCount,
  achievementCount,
}: Props) {
  return (
    <View style={styles.row}>
      <StatItem label="Tasks" value={taskCount} />
      <StatItem label="Active" value={activeTaskCount} />
      <StatItem label="Achievements" value={achievementCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    gap: 10,
  },
  item: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.mint,
  },
  value: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.dark,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.dark,
    opacity: 0.6,
  },
});