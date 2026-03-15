import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";

export type SortField =
  | "totalTask"
  | "finishedTask"
  | "dayStreak"
  | "mostDayStreak"
  | "taskOverall";

export type SortOrder = "asc" | "desc";

type Props = {
  value: SortField;
  onChange: (value: SortField) => void;
};

const ITEMS: { label: string; value: SortField }[] = [
  { label: "Total", value: "totalTask" },
  { label: "Finished", value: "finishedTask" },
  { label: "Streak", value: "dayStreak" },
  { label: "Best Streak", value: "mostDayStreak" },
  { label: "Overall", value: "taskOverall" },
];

export default function RankingSortTabs({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.wrap}
    >
      {ITEMS.map((item) => {
        const active = item.value === value;

        return (
          <Pressable
            key={item.value}
            onPress={() => onChange(item.value)}
            style={[styles.tab, active && styles.activeTab]}
          >
            <Text style={[styles.text, active && styles.activeText]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
    paddingVertical: 4,
  },
  tab: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.mint,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: COLORS.brand,
    borderColor: COLORS.brand,
  },
  text: {
    fontSize: 12,
    fontWeight: "900",
    color: COLORS.dark,
  },
  activeText: {
    color: COLORS.white,
  },
});