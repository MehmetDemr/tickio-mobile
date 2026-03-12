import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";
import { WhoAmITask } from "@/src/api/auth/whoamiService";

type Props = {
  task: WhoAmITask;
};

export default function TaskPreviewItem({ task }: Props) {
  const isDone = task.taskStatus === "done";

  return (
    <View style={styles.row}>
      <View style={[styles.dot, isDone ? styles.dotDone : styles.dotPending]} />
      <View style={styles.content}>
        <Text style={styles.title}>{task.taskName}</Text>
        <Text style={styles.meta}>
          {task.taskType} • {task.taskStatus}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.mint,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    marginRight: 12,
  },
  dotDone: {
    backgroundColor: COLORS.brand,
  },
  dotPending: {
    backgroundColor: COLORS.accent,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "900",
    color: COLORS.dark,
  },
  meta: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.dark,
    opacity: 0.6,
    textTransform: "capitalize",
  },
});