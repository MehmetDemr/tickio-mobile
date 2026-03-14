import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";
import { TaskItem } from "../../api/tasks/getTasksService";

type Props = {
  task: TaskItem;
  onDetails?: () => void;
};

function getTypeColor(type: string) {
  switch (type) {
    case "study":
      return COLORS.brand;
    case "sport":
      return COLORS.accent;
    case "daily":
      return COLORS.lemon;
    default:
      return COLORS.dark;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "done":
      return COLORS.brand;
    case "in_progress":
      return COLORS.accent;
    case "pending":
      return COLORS.dark;
    default:
      return COLORS.dark;
  }
}

export default function TaskCard({ task, onDetails }: Props) {
  const typeColor = getTypeColor(task.taskType);
  const statusColor = getStatusColor(task.taskStatus);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={1}>
          {task.taskName}
        </Text>

        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{task.taskStatus}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {task.taskDescription || "No description"}
      </Text>

      <View style={styles.bottomRow}>
        <View style={[styles.typeBadge, { borderColor: typeColor }]}>
          <Text style={[styles.typeText, { color: typeColor }]}>
            {task.taskType}
          </Text>
        </View>

        <Text style={styles.date}>
          {new Date(task.taskStartDate).toLocaleDateString("tr-TR")}
        </Text>
      </View>

      <Pressable onPress={onDetails} style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Details</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.mint,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "900",
    color: COLORS.dark,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "capitalize",
  },
  description: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.dark,
    opacity: 0.65,
    lineHeight: 18,
  },
  bottomRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  typeBadge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  typeText: {
    fontSize: 11,
    fontWeight: "900",
    textTransform: "capitalize",
  },
  date: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.dark,
    opacity: 0.55,
  },
  detailsButton: {
    marginTop: 12,
    backgroundColor: COLORS.soft,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.mint,
  },
  detailsButtonText: {
    color: COLORS.dark,
    fontSize: 13,
    fontWeight: "900",
  },
});
