import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  page: number;
  pageCount: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export default function PaginationControls({
  page,
  pageCount,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: Props) {
  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={onPrev}
        disabled={!hasPrev}
        style={[styles.btn, !hasPrev && styles.btnDisabled]}
      >
        <Text style={[styles.btnText, !hasPrev && styles.btnTextDisabled]}>
          Previous
        </Text>
      </Pressable>

      <Text style={styles.pageText}>
        Page {page} / {pageCount || 1}
      </Text>

      <Pressable
        onPress={onNext}
        disabled={!hasNext}
        style={[styles.btn, !hasNext && styles.btnDisabled]}
      >
        <Text style={[styles.btnText, !hasNext && styles.btnTextDisabled]}>
          Next
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.mint,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  btnDisabled: {
    opacity: 0.45,
  },
  btnText: {
    fontSize: 12,
    fontWeight: "900",
    color: COLORS.dark,
  },
  btnTextDisabled: {
    color: COLORS.dark,
  },
  pageText: {
    fontSize: 12,
    fontWeight: "900",
    color: COLORS.dark,
    opacity: 0.7,
  },
});