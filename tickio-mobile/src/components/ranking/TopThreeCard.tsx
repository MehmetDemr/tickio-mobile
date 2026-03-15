import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";
import { Statistic } from "../../api/statistics/getAllStatistics";

export type SortField =
  | "totalTask"
  | "finishedTask"
  | "dayStreak"
  | "mostDayStreak"
  | "taskOverall";

export type SortOrder = "asc" | "desc";

type Props = {
  user: Statistic;
  place: 1 | 2 | 3;
  sortField: SortField;
};

function getPlaceLabel(place: 1 | 2 | 3) {
  if (place === 1) return "🥇";
  if (place === 2) return "🥈";
  return "🥉";
}

function getMetric(user: Statistic, sortField: SortField) {
  switch (sortField) {
    case "totalTask":
      return `${user.totalTask} Tasks`;
    case "finishedTask":
      return `${user.finishedTask} Finished`;
    case "dayStreak":
      return `${user.dayStreak} Streak`;
    case "mostDayStreak":
      return `${user.mostDayStreak} Best`;
    case "taskOverall":
      return `${user.taskOverall}% Overall`;
    default:
      return `${user.totalTask} Tasks`;
  }
}

export default function TopThreeCard({ user, place, sortField }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.medal}>{getPlaceLabel(place)}</Text>
      <Text style={styles.name} numberOfLines={1}>
        {user.user.userName}
      </Text>
      <Text style={styles.role}>{user.user.role}</Text>

      <View style={styles.metricBox}>
        <Text style={styles.metricText}>{getMetric(user, sortField)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.mint,
    alignItems: "center",
  },
  medal: {
    fontSize: 26,
    marginBottom: 6,
  },
  name: {
    fontSize: 15,
    fontWeight: "900",
    color: COLORS.dark,
  },
  role: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.dark,
    opacity: 0.55,
    textTransform: "capitalize",
  },
  metricBox: {
    marginTop: 12,
    backgroundColor: COLORS.soft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  metricText: {
    fontSize: 12,
    fontWeight: "900",
    color: COLORS.dark,
  },
});