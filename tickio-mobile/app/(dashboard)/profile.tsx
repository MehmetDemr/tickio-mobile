import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { COLORS } from "../../src/constants/color";

import ProfileHeader from "../../src/components/profile/ProfileHeader";
import ProfileStatsRow from "../../src/components/profile/ProfileStatsRow";
import ProfileSection from "../../src/components/profile/ProfileSection";
import ProfileInfoRow from "../../src/components/profile/ProfileInfoRow";
import TaskPreviewItem from "../../src/components/profile/TaskPreviewItem";
import AchievementPreviewItem from "../../src/components/profile/AchievementPreviewItem";
import { getWhoAmI, WhoAmIResponse } from "../../src/api/auth/whoamiService";

export default function ProfilePage() {
  const [profile, setProfile] = useState<WhoAmIResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getWhoAmI();
        setProfile(data);
      } catch (error) {
        console.log("Profile fetch failed:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderWrap}>
        <ActivityIndicator size="large" color={COLORS.brand} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loaderWrap}>
        <Text style={styles.empty}>Profile data could not be loaded.</Text>
      </View>
    );
  }

  const joinedDate = new Date(profile.createDate).toLocaleDateString("tr-TR");

  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader userName={profile.userName} email={profile.email} />

        <ProfileStatsRow
          taskCount={profile.taskCount}
          activeTaskCount={profile.activeTaskCount}
          achievementCount={profile.achievementCount}
        />

        <ProfileSection title="Account Info">
          <ProfileInfoRow label="Username" value={profile.userName} />
          <ProfileInfoRow label="Email" value={profile.email} />
          <ProfileInfoRow label="Join Date" value={joinedDate} />
          <ProfileInfoRow
            label="Finished Tasks"
            value={String(profile.finishedTaskCount)}
          />
        </ProfileSection>

        <ProfileSection title="Recent Tasks">
          {profile.tasks.length === 0 ? (
            <Text style={styles.empty}>No tasks yet.</Text>
          ) : (
            profile.tasks.slice(0, 3).map((task) => (
              <TaskPreviewItem key={task.id} task={task} />
            ))
          )}
        </ProfileSection>

        <ProfileSection title="Achievements">
          {profile.achievements.length === 0 ? (
            <Text style={styles.empty}>No achievements yet.</Text>
          ) : (
            profile.achievements.slice(0, 3).map((achievement) => (
              <AchievementPreviewItem
                key={achievement.primary_achievement_id}
                achievement={achievement}
              />
            ))
          )}
        </ProfileSection>

        <View style={{ height: 40 }} />
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
  loaderWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.soft,
    paddingHorizontal: 24,
  },
  empty: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.dark,
    opacity: 0.55,
    textAlign: "center",
  },
});