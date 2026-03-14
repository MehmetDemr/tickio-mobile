import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getTasks, TaskItem } from "../../src/api/tasks/getTasksService";
import TaskCard from "../../src/components/tasks/TaskCard";
import TaskFilterTabs, {
  TaskFilter,
} from "../../src/components/tasks/TaskFilterTabs";
import TaskMiniStat from "../../src/components/tasks/TaskMiniStat";
import { COLORS } from "../../src/constants/color";

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pageCount: 0,
    hasNext: false,
    hasPrev: false,
  });

  useEffect(() => {
    async function loadTasks() {
      try {
        const res = await getTasks(1, 10);
        setTasks(res.data);
        setMeta(res.meta);
      } catch (error) {
        console.log("Task fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    if (filter === "done") {
      return tasks.filter((task) => task.taskStatus === "done");
    }
    return tasks.filter((task) => task.taskStatus !== "done");
  }, [tasks, filter]);

  const totalCount = tasks.length;
  const doneCount = tasks.filter((task) => task.taskStatus === "done").length;
  const activeCount = tasks.filter((task) => task.taskStatus !== "done").length;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.brand} />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>
          Stay organized and keep your momentum alive.
        </Text>

        <View style={styles.statsRow}>
          <TaskMiniStat label="Total" value={totalCount} />
          <View style={styles.gap} />
          <TaskMiniStat label="Active" value={activeCount} />
          <View style={styles.gap} />
          <TaskMiniStat label="Done" value={doneCount} />
        </View>

        <TaskFilterTabs value={filter} onChange={setFilter} />

        {filteredTasks.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No tasks found.</Text>
          </View>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDetails={() =>
                router.push({
                  pathname: "/(dashboard)/edit-task",
                  params: {
                    id: task.id,
                    taskName: task.taskName,
                    taskDescription: task.taskDescription ?? "",
                    taskType: task.taskType,
                    taskStatus: task.taskStatus,
                    taskStartDate: String(task.taskStartDate),
                    taskFinishDate: task.taskFinishDate
                      ? String(task.taskFinishDate)
                      : "",
                    active: String(task.active),
                  },
                })
              }
            />
          ))
        )}

        <View style={styles.paginationBox}>
          <Text style={styles.paginationText}>
            Page {meta.page} / {meta.pageCount || 1}
          </Text>
          <Text style={styles.paginationSub}>Total {meta.total} tasks</Text>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      <Pressable
        style={styles.fab}
        onPress={() => router.push("/(dashboard)/create-task")}
      >
        <Text style={styles.fabText}>＋</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.soft,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 30,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.soft,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.dark,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.dark,
    opacity: 0.65,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 14,
  },
  gap: {
    width: 10,
  },
  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.mint,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.dark,
    opacity: 0.55,
    textAlign: "center",
  },
  paginationBox: {
    marginTop: 8,
    alignItems: "center",
  },
  paginationText: {
    fontSize: 13,
    fontWeight: "900",
    color: COLORS.dark,
  },
  paginationSub: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.dark,
    opacity: 0.55,
  },
  fab: {
    position: "absolute",
    right: 18,
    bottom: 22,
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.brand,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  fabText: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "900",
    marginTop: -2,
  },
});
