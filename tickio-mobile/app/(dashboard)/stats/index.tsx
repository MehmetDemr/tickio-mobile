import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../../../src/constants/color";
import {
  getStatistic,
  GetStatisticResponse,
} from "../../../src/api/statistics/getCurrentStatistics";

import StatisticCard from "../../../src/components/statistics/StatisticCard";

import StatisticInfoRow from "../../../src/components/statistics/StatisticInfoRow";


export default function StatisticsPage() {
  const [stats, setStats] = useState<GetStatisticResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStatistic() {
      try {
        const data = await getStatistic();
        setStats(data);
      } catch (error) {
        console.log("Statistic page error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStatistic();
  }, []);


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.brand} />
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Statistics could not be loaded.</Text>
      </View>
    );
  }

  const lastLogin = stats.lastLoginDate
    ? new Date(stats.lastLoginDate).toLocaleDateString("tr-TR")
    : "-";

  const mostValuableDay = stats.mostValuableDay ?? "Not enough data";
  const mostValuableDate = stats.mostValuableDate
    ? new Date(stats.mostValuableDate).toLocaleDateString("tr-TR")
    : "Not enough data";
  const favouriteCategory = stats.mostFavouriteCategory ?? "Not enough data";

  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your Statistics</Text>
        <Text style={styles.subtitle}>
          Track your progress and keep your momentum alive.
        </Text>

        <View style={styles.row}>
          <StatisticCard label="Total Tasks" value={stats.totalTask} icon="📋" />
          <View style={styles.gap} />
          <StatisticCard
            label="Finished"
            value={stats.finishedTask}
            icon="✅"
          />
        </View>

        <View style={styles.row}>
          <StatisticCard
            label="Active Tasks"
            value={stats.activeTask}
            icon="⚡"
          />
          <View style={styles.gap} />
          <StatisticCard
            label="Overall"
            value={`${stats.taskOverall}%`}
            icon="📈"
          />
        </View>


        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Detailed Overview</Text>

          <StatisticInfoRow
            label="Today's Tasks"
            value={String(stats.todayTask)}
          />
          <StatisticInfoRow
            label="This Month"
            value={String(stats.monthTask)}
          />
          <StatisticInfoRow
            label="This Year"
            value={String(stats.yearTask)}
          />
          <StatisticInfoRow
            label="Current Streak"
            value={`${stats.dayStreak} day`}
          />
          <StatisticInfoRow
            label="Best Streak"
            value={`${stats.mostDayStreak} day`}
          />
          <StatisticInfoRow
            label="Most Valuable Day"
            value={mostValuableDay}
          />
          <StatisticInfoRow
            label="Most Valuable Date"
            value={mostValuableDate}
          />
          <StatisticInfoRow
            label="Favourite Category"
            value={favouriteCategory}
          />
          <StatisticInfoRow
            label="Last Login"
            value={lastLogin}
          />
        </View>

        <View style={{ height: 28 }} />
      </ScrollView>
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
    paddingHorizontal: 24,
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
  row: {
    flexDirection: "row",
    marginTop: 14,
  },
  gap: {
    width: 10,
  },
  infoCard: {
    marginTop: 14,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.mint,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.dark,
    marginBottom: 8,
  },
  empty: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.dark,
    opacity: 0.6,
    textAlign: "center",
  },
});