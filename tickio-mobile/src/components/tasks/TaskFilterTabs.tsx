import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";

export type TaskFilter = "all" | "active" | "done";

type Props = {
  value: TaskFilter;
  onChange: (value: TaskFilter) => void;
};

const items: { key: TaskFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "done", label: "Done" },
];

export default function TaskFilterTabs({ value, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      {items.map((item) => {
        const active = value === item.key;

        return (
          <Pressable
            key={item.key}
            onPress={() => onChange(item.key)}
            style={[styles.tab, active && styles.activeTab]}
          >
            <Text style={[styles.text, active && styles.activeText]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.mint,
    marginTop: 14,
    marginBottom: 14,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: COLORS.brand,
  },
  text: {
    fontSize: 13,
    fontWeight: "900",
    color: COLORS.dark,
    opacity: 0.7,
  },
  activeText: {
    color: COLORS.white,
    opacity: 1,
  },
});
