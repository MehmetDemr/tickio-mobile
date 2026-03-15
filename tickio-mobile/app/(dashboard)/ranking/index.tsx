import React, { useMemo, useState,useCallback } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../../../src/constants/color";
import {
  getAllStatistics,
  Statistic,
} from "../../../src/api/statistics/getAllStatistics";

import TopThreeCard from "../../../src/components/ranking/TopThreeCard";
import RankingRow from "../../../src/components/ranking/RankingRow";
import PaginationControls from "../../../src/components/ranking/PaginationControls";
import RankingSortTabs from "../../../src/components/ranking/RankingSortTabs";
import { useFocusEffect } from "expo-router";

export type SortField =
  | "totalTask"
  | "finishedTask"
  | "dayStreak"
  | "mostDayStreak"
  | "taskOverall";

export type SortOrder = "asc" | "desc";

export default function RankingPage() {
  const [data, setData] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>("totalTask");
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pageCount: 0,
    hasNext: false,
    hasPrev: false,
  });

  async function loadRanking(page: number, field: SortField, ) {
    try {
      setLoading(true);

      const res = await getAllStatistics({
        page,
        limit: 10,
        sortField: field,
      });

      setData(res.data);
      setMeta(res.meta);
    } catch (error) {
      console.log("Ranking fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadRanking(1, sortField);
    }, [sortField]) 
  );       

  const topThree = useMemo(() => data.slice(0, 3), [data]);
  const rest = useMemo(() => data.slice(3), [data]);

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
        <Text style={styles.title}>Ranking</Text>
        <Text style={styles.subtitle}>
          Sort users by their performance and productivity stats.
        </Text>

        <RankingSortTabs value={sortField} onChange={setSortField} />

        {meta.page === 1 && topThree.length > 0 ? (
          <View style={styles.topThreeWrap}>
            {topThree[0] ? (
              <TopThreeCard user={topThree[0]} place={1} sortField={sortField} />
            ) : null}
            <View style={styles.topGap} />
            {topThree[1] ? (
              <TopThreeCard user={topThree[1]} place={2} sortField={sortField} />
            ) : null}
            <View style={styles.topGap} />
            {topThree[2] ? (
              <TopThreeCard user={topThree[2]} place={3} sortField={sortField} />
            ) : null}
          </View>
        ) : null}

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Leaderboard</Text>
          <Text style={styles.sectionMeta}>{meta.total} users</Text>
        </View>

        {data.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No ranking data found.</Text>
          </View>
        ) : (
          (meta.page === 1 ? rest : data).map((item, index) => (
            <RankingRow
              key={item.id}
              item={item}
              sortField={sortField}
              index={
                meta.page === 1
                  ? index + 4
                  : index + 1 + (meta.page - 1) * meta.limit
              }
            />
          ))
        )}

        <PaginationControls
          page={meta.page}
          pageCount={meta.pageCount}
          hasPrev={meta.hasPrev}
          hasNext={meta.hasNext}
          onPrev={() =>
            meta.hasPrev &&
            loadRanking(meta.page - 1, sortField)
          }
          onNext={() =>
            meta.hasNext &&
            loadRanking(meta.page + 1, sortField)
          }
        />

        <View style={{ height: 26 }} />
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
    marginBottom: 14,
  },
  topThreeWrap: {
    flexDirection: "row",
    marginBottom: 18,
  },
  topGap: {
    width: 10,
  },
  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.dark,
  },
  sectionMeta: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.dark,
    opacity: 0.6,
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
});