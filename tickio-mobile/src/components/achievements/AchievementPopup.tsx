import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { COLORS } from "../../constants/color";

type AchievementItem = {
  title: string;
  description: string;
};

type Props = {
  visible: boolean;
  achievements: AchievementItem[];
  onClose: () => void;
};

export default function AchievementPopup({
  visible,
  achievements,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.emoji}>🏆</Text>
          <Text style={styles.title}>Achievement Unlocked!</Text>
          <Text style={styles.subtitle}>
            You earned a new achievement.
          </Text>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {achievements.map((item, index) => (
              <View key={`${item.title}-${index}`} style={styles.item}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
              </View>
            ))}
          </ScrollView>

          <Pressable onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Awesome ✨</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.mint,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  emoji: {
    fontSize: 34,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.dark,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.dark,
    opacity: 0.65,
    textAlign: "center",
  },
  scroll: {
    maxHeight: 220,
    marginTop: 16,
  },
  scrollContent: {
    gap: 10,
  },
  item: {
    backgroundColor: COLORS.soft,
    borderRadius: 16,
    padding: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: COLORS.dark,
  },
  itemDesc: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.dark,
    opacity: 0.75,
    lineHeight: 18,
  },
  button: {
    marginTop: 18,
    backgroundColor: COLORS.brand,
    borderRadius: 16,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "900",
  },
});