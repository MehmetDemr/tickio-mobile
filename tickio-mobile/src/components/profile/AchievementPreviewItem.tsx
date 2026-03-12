import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";
import { WhoAmIAchievement } from "@/src/api/auth/whoamiService";

type Props = {
  achievement: WhoAmIAchievement;
};

export default function AchievementPreviewItem({ achievement }: Props) {
  return (
    <View style={styles.item}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>🏆</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{achievement.primaryAchievementName}</Text>
        <Text style={styles.desc}>
          {achievement.primaryAchievementDescription}
        </Text>
        <Text style={styles.rate}>
          Unlocked by {achievement.primaryAchievementUserPercentage}% of users
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.mint,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.soft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "900",
    color: COLORS.dark,
  },
  desc: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.dark,
    opacity: 0.7,
  },
  rate: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.brand,
  },
});