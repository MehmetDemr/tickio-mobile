import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../src/constants/color";

import StatsRow from "@/src/components/dashboard/StatsRow";
import { getWhoAmI } from "../../src/api/auth/whoamiService";
import { getStatistic } from "../../src/api/statistics/getCurrentStatistics";
import DashboardHeader from "../../src/components/dashboard/DashboardHeader";
import FloatingAddButton from "../../src/components/dashboard/FloatingAddButton";
import Section from "../../src/components/dashboard/Section";
import TaskItem from "../../src/components/dashboard/TaskItem";
import { useFocusEffect } from "expo-router";

type Task = {
  id: string;
  title: string;
  done: boolean;
  date: Date;
};

type UserInfo = {
  userName: string;
  achievementCount: number;
};

function isSameDay(date: Date, now: Date) {
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

function isWithinLast7Days(date: Date, now: Date) {
  const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 7;
}

export default function MainPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  async function loadData() {
    try {
      const [statRes, whoAmIRes] = await Promise.all([
        getStatistic(),
        getWhoAmI(),
      ]);

      const mapped: Task[] = whoAmIRes.tasks.map((t: any) => ({
        id: t.id,
        title: t.taskName,
        done: t.taskStatus === "done",
        date: new Date(t.taskStartDate),
      }));

      setTasks(mapped);
      setStats(statRes);
      setUserInfo({
        userName: whoAmIRes.userName,
        achievementCount: whoAmIRes.achievementCount,
      });
    } catch (e) {
      //console.log("❌ Dashboard load error:", e);
    }
  }

  const now = new Date();

  const todayTasks = useMemo(() => {
    return tasks.filter((t) => isSameDay(t.date, now));
  }, [tasks]);

  const todayTasksLimited = todayTasks.slice(0, 3);

  const completedToday = todayTasks.filter((t) => t.done).length;

  const last7DaysTasks = useMemo(() => {
    return tasks.filter((t) => isWithinLast7Days(t.date, now));
  }, [tasks]);

  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader name={userInfo?.userName ?? "User"} />

        <StatsRow
          streak={stats?.dayStreak ?? 0}
          totalTasks={stats?.totalTask ?? 0}
          achievements={userInfo?.achievementCount ?? 0}
          completedToday={completedToday}
        />

        <Section
          title="Today's Tasks"
          rightText={`${completedToday}/${todayTasks.length}`}
        >
          {todayTasksLimited.length === 0 ? (
            <Text style={styles.empty}>No tasks for today</Text>
          ) : (
            todayTasksLimited.map((t, i) => (
              <View key={t.id}>
                <TaskItem title={t.title} done={t.done} onPress={() => {}} />
                {i !== todayTasksLimited.length - 1 ? (
                  <View style={styles.divider} />
                ) : null}
              </View>
            ))
          )}
        </Section>

        <Section
          title="Last 7 Days"
          rightText={`${last7DaysTasks.length} tasks`}
        >
          {last7DaysTasks.length === 0 ? (
            <Text style={styles.empty}>No tasks in last 7 days</Text>
          ) : (
            last7DaysTasks.map((t, i) => (
              <View key={t.id}>
                <TaskItem title={t.title} done={t.done} onPress={() => {}} />
                {i !== last7DaysTasks.length - 1 ? (
                  <View style={styles.divider} />
                ) : null}
              </View>
            ))
          )}
        </Section>

        <View style={{ height: 90 }} />
      </ScrollView>

      <FloatingAddButton onPress={() => {}} />
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
    paddingBottom: 24,
  },
  empty: {
    color: COLORS.dark,
    opacity: 0.55,
    fontWeight: "800",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.mint,
    opacity: 0.9,
  },
});
