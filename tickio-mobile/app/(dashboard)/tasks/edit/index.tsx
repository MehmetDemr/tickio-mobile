import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { markTaskAsDone } from "../../../../src/api/tasks/doneTasksService";
import { updateTask } from "../../../../src/api/tasks/updateTasksService";
import AchievementPopup from "../../../../src/components/achievements/AchievementPopup";
import { PrimaryButton } from "../../../../src/components/auth/AuthPrimaryButton";
import TaskDateField from "../../../../src/components/tasks/TaskDateField";
import TaskOptionGroup from "../../../../src/components/tasks/TaskOptionGroup";
import { COLORS } from "../../../../src/constants/color";

const TASK_TYPES = [
  { label: "Study", value: "study" },
  { label: "Sport", value: "sport" },
  { label: "Daily", value: "daily" },
  { label: "Hobby", value: "hobby" },
  { label: "Jogging", value: "jogging" },
  { label: "Work", value: "work" },
  { label: "Goal", value: "goal" },
  { label: "Travel", value: "travel" },
];

const TASK_STATUS = [
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in_progress" },
  { label: "Done", value: "done" },
];

type AchievementPopupItem = {
  title: string;
  description: string;
};

export default function EditTaskPage() {
  const params = useLocalSearchParams<{
    id: string;
    taskName: string;
    taskDescription: string;
    taskType: string;
    taskStatus: string;
    taskStartDate: string;
    taskFinishDate: string;
    active: string;
  }>();

  const initialStatus = params.taskStatus || "pending";

  const [taskName, setTaskName] = useState(params.taskName || "");
  const [taskDescription, setTaskDescription] = useState(
    params.taskDescription || "",
  );
  const [taskType, setTaskType] = useState(params.taskType || "study");
  const [taskStatus, setTaskStatus] = useState(initialStatus);
  const [taskStartDate, setTaskStartDate] = useState(
    params.taskStartDate || "",
  );
  const [taskFinishDate, setTaskFinishDate] = useState(
    params.taskFinishDate || "",
  );
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [achievementVisible, setAchievementVisible] = useState(false);
  const [awardedAchievements, setAwardedAchievements] = useState<
    AchievementPopupItem[]
  >([]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskNameError = useMemo(() => {
    if (!taskName) return "Task name cannot be empty.";
    if (taskName.trim().length < 3)
      return "Task name must be at least 3 characters.";
    return null;
  }, [taskName]);

  const taskDescriptionError = useMemo(() => {
    if (!taskDescription.trim()) return "Description cannot be empty.";
    return null;
  }, [taskDescription]);

  const startDateError = useMemo(() => {
    if (!taskStartDate) return "Start date cannot be empty.";
    const start = new Date(taskStartDate);
    start.setHours(0, 0, 0, 0);
    if (start < today) return "Start date cannot be before today.";
    return null;
  }, [taskStartDate]);

  const finishDateError = useMemo(() => {
    if (!taskFinishDate) return "Finish date cannot be empty.";
    const finish = new Date(taskFinishDate);
    finish.setHours(0, 0, 0, 0);
    if (finish < today) return "Finish date cannot be before today.";
    if (taskStartDate) {
      const start = new Date(taskStartDate);
      start.setHours(0, 0, 0, 0);
      if (finish < start) return "Finish date cannot be before start date.";
    }
    return null;
  }, [taskFinishDate, taskStartDate]);

  const hasErrors =
    !!taskNameError ||
    !!taskDescriptionError ||
    !!startDateError ||
    !!finishDateError;

  const canSubmit = !hasErrors && !loading;

  const showError = (err: string | null) => (submitted ? err : null);

  async function handleUpdateTask() {
    setSubmitted(true);
    if (!canSubmit || !params.id) return;

    setLoading(true);
    try {
      const becameDone = initialStatus !== "done" && taskStatus === "done";

      if (becameDone) {
        const doneRes = await markTaskAsDone(params.id);

        const awarded =
          doneRes.awarded?.map((item) => ({
            title: item.primaryAchievement.title,
            description: item.primaryAchievement.description,
          })) ?? [];

        if (awarded.length > 0) {
          setAwardedAchievements(awarded);
          setAchievementVisible(true);
        } else {
          Alert.alert("Success", "Task completed successfully.");
          router.back();
        }

        return;
      }

      await updateTask(params.id, {
        taskName: taskName.trim(),
        taskDescription: taskDescription.trim(),
        taskType,
        taskStatus,
        taskStartDate,
        taskFinishDate: taskFinishDate || undefined,
        isActive: params.active === "true",
      });

      Alert.alert("Success", "Task updated successfully.");
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Task could not be updated.");
    } finally {
      setLoading(false);
    }
  }

  function handleCloseAchievementPopup() {
    setAchievementVisible(false);
    router.back();
  }

  return (
    <View style={styles.page}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Task Details</Text>
          <Text style={styles.subtitle}>Update your task and get going.</Text>

          <View style={styles.card}>
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Task Name</Text>
              <TextInput
                value={taskName}
                onChangeText={setTaskName}
                placeholder="Enter task name"
                placeholderTextColor="#6b7280"
                style={[
                  styles.input,
                  submitted && taskNameError ? styles.inputError : null,
                ]}
              />
              {showError(taskNameError) ? (
                <Text style={styles.error}>{taskNameError}</Text>
              ) : null}
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                value={taskDescription}
                onChangeText={setTaskDescription}
                placeholder="Enter description"
                placeholderTextColor="#6b7280"
                style={[
                  styles.input,
                  styles.textArea,
                  submitted && taskDescriptionError ? styles.inputError : null,
                ]}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              {showError(taskDescriptionError) ? (
                <Text style={styles.error}>{taskDescriptionError}</Text>
              ) : null}
            </View>

            <TaskOptionGroup
              label="Task Type"
              options={TASK_TYPES}
              value={taskType}
              onChange={setTaskType}
            />

            <TaskOptionGroup
              label="Task Status"
              options={TASK_STATUS}
              value={taskStatus}
              onChange={setTaskStatus}
            />

            <TaskDateField
              label="Start Date"
              value={taskStartDate}
              onChange={setTaskStartDate}
              error={showError(startDateError)}
              minimumDate={today}
              disabled={true}
            />

            <TaskDateField
              label="Finish Date"
              value={taskFinishDate}
              onChange={setTaskFinishDate}
              error={showError(finishDateError)}
              minimumDate={taskStartDate ? new Date(taskStartDate) : today}
            />

            <PrimaryButton
              title="Update Task"
              onPress={handleUpdateTask}
              loading={loading}
              disabled={loading}
            />
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <AchievementPopup
        visible={achievementVisible}
        achievements={awardedAchievements}
        onClose={handleCloseAchievementPopup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.soft },
  flex: { flex: 1 },
  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 24,
  },
  title: { fontSize: 24, fontWeight: "900", color: COLORS.dark },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.dark,
    opacity: 0.65,
    marginBottom: 14,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.mint,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  fieldWrap: { marginBottom: 14 },
  label: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.dark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.mint,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.dark,
  },
  inputError: {
    borderColor: COLORS.accent,
  },
  textArea: { minHeight: 110 },
  error: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.accent,
  },
});
