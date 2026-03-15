import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";


export type SortField =
  | "totalTask"
  | "finishedTask"
  | "dayStreak"
  | "mostDayStreak"
  | "taskOverall";

export type SortOrder = "asc" | "desc";


type Props = {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
};

export default function RankingOrderToggle({ value, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={() => onChange("desc")}
        style={[styles.btn, value === "desc" && styles.activeBtn]}
      >
        <Text style={[styles.text, value === "desc" && styles.activeText]}>
          Desc
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onChange("asc")}
        style={[styles.btn, value === "asc" && styles.activeBtn]}
      >
        <Text style={[styles.text, value === "asc" && styles.activeText]}>
          Asc
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.mint,
    padding: 4,
    marginTop: 10,
    marginBottom: 14,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  activeBtn: {
    backgroundColor: COLORS.brand,
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