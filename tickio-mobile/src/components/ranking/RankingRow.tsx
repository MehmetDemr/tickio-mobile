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
  item: Statistic;
  index: number;
  sortField: SortField;
};

function getSecondaryValue(item: Statistic, sortField: SortField) {
  switch (sortField) {
    case "totalTask":
      return `${item.totalTask} total`;
    case "finishedTask":
      return `${item.finishedTask} finished`;
    case "dayStreak":
      return `${item.dayStreak} streak`;
    case "mostDayStreak":
      return `${item.mostDayStreak} best streak`;
    case "taskOverall":
      return `${item.taskOverall}% overall`;
    default:
      return `${item.totalTask} total`;
  }
}

export default function RankingRow({ item, index, sortField }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.rankCircle}>
        <Text style={styles.rankText}>{index}</Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.user.userName}</Text>
        <Text style={styles.userRole}>{item.user.role}</Text>
      </View>

      <View style={styles.rightInfo}>
        <Text style={styles.mainValue}>{getSecondaryValue(item, sortField)}</Text>
        <Text style={styles.subValue}>
          {item.finishedTask} done • {item.activeTask} active
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.mint,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 1,
  },
  rankCircle: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: COLORS.brand,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rankText: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 14,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: "900",
    color: COLORS.dark,
  },
  userRole: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.dark,
    opacity: 0.55,
    textTransform: "capitalize",
  },
  rightInfo: {
    alignItems: "flex-end",
    maxWidth: 120,
  },
  mainValue: {
    fontSize: 12,
    fontWeight: "900",
    color: COLORS.dark,
    textAlign: "right",
  },
  subValue: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.dark,
    opacity: 0.6,
    textAlign: "right",
  },
});