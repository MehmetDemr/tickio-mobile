import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../src/constants/color";

import DashboardHeader from "../../src/components/dashboard/DashboardHeader";
import StatsRow from "@/src/components/dashboard/StatsRow";
import Section from "../../src/components/dashboard/Section";
import TaskItem from "../../src/components/dashboard/TaskItem";
import FloatingAddButton from "../../src/components/dashboard/FloatingAddButton";

type Task = { id: string; title: string; done: boolean; };

export default function MainPage() {
  const [todayTasks, setTodayTasks] = useState<Task[]>([
    { id: "1", title: "Drink water", done: false },
    { id: "2", title: "Workout 20 min", done: true },
    { id: "3", title: "Read 10 pages", done: false },
  ]);

  const completedToday = useMemo(() => todayTasks.filter(t => t.done).length, [todayTasks]);

  function toggleTask(id: string) {
    setTodayTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <DashboardHeader name="Memt" />

        <StatsRow
          streak={1}
          totalTasks={todayTasks.length}
          achievements={3}
          completedToday={completedToday}
        />

        <Section title="Today's Tasks" rightText={`${completedToday}/${todayTasks.length} completed`}>
          {todayTasks.length === 0 ? (
            <Text style={styles.empty}>No tasks for today</Text>
          ) : (
            todayTasks.map((t, i) => (
              <View key={t.id}>
                <TaskItem title={t.title} done={t.done} onPress={() => toggleTask(t.id)} />
                {i !== todayTasks.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            ))
          )}
        </Section>

        <Section title="Upcoming" rightText="Next 7 days">
          <Text style={styles.empty}>No upcoming tasks</Text>
        </Section>

        <View style={{ height: 90 }} />
      </ScrollView>

      <FloatingAddButton onPress={() => console.log("Add Task")} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.soft },
  content: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 24 },
  empty: { color: COLORS.dark, opacity: 0.55, fontWeight: "800" },
  divider: { height: 1, backgroundColor: COLORS.mint, opacity: 0.9 },
});