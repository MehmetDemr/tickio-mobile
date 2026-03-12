import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  userName: string;
  email: string;
};

export default function ProfileHeader({ userName, email }: Props) {
  const firstLetter = userName?.charAt(0)?.toUpperCase() || "U";

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{firstLetter}</Text>
      </View>

      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.email}>{email}</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>Tickio Member</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.mint,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 999,
    backgroundColor: COLORS.brand,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "900",
  },
  name: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.dark,
  },
  email: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.dark,
    opacity: 0.65,
    textAlign: "center",
  },
  badge: {
    marginTop: 12,
    backgroundColor: COLORS.soft,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  badgeText: {
    color: COLORS.dark,
    fontSize: 12,
    fontWeight: "800",
  },
});