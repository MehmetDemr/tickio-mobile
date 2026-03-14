import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export default function TaskOptionGroup({
  label,
  options,
  value,
  onChange,
}: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        {options.map((option) => {
          const active = value === option.value;

          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              style={[styles.option, active && styles.optionActive]}
            >
              <Text
                style={[styles.optionText, active && styles.optionTextActive]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.dark,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.mint,
    backgroundColor: COLORS.white,
  },
  optionActive: {
    backgroundColor: COLORS.brand,
    borderColor: COLORS.brand,
  },
  optionText: {
    fontSize: 12,
    fontWeight: "900",
    color: COLORS.dark,
  },
  optionTextActive: {
    color: COLORS.white,
  },
});
