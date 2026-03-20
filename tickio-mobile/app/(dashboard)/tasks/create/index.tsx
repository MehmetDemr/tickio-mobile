import { router } from "expo-router";
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

import { addTasks } from "../../../../src/api/tasks/addTasksService";
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
];

export default function CreateTaskPage() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskType, setTaskType] = useState("study");
  const [taskStatus, setTaskStatus] = useState("pending");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskFinishDate, setTaskFinishDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const taskStatusError = useMemo(() => {
    if (taskStatus === "done")
      return "Task status cannot be 'Done' at creation.";
    return null;
  }, [taskStatus]);

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
    !!taskStatusError ||
    !!startDateError ||
    !!finishDateError;

  const canSubmit = !hasErrors && !loading;

  async function handleCreateTask() {
    setSubmitted(true);
    if (!canSubmit) return;

    setLoading(true);
    try {
      await addTasks({
        taskName: taskName.trim(),
        taskDescription: taskDescription.trim(),
        taskType,
        taskStatus,
        taskStartDate,
        taskFinishDate,
        isActive: true,
      });

      Alert.alert("Success", "Task created successfully.");
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Task could not be created.");
    } finally {
      setLoading(false);
    }
  }
  const showError = (err: string | null) => (submitted ? err : null);

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
          <Text style={styles.title}>Create Task</Text>
          <Text style={styles.subtitle}>
            Add a new task and keep your momentum alive.
          </Text>

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
            {showError(taskStatusError) ? (
              <Text style={styles.error}>{taskStatusError}</Text>
            ) : null}

            <TaskDateField
              label="Start Date"
              value={taskStartDate}
              onChange={setTaskStartDate}
              error={showError(startDateError)}
              minimumDate={today}
            />

            <TaskDateField
              label="Finish Date"
              value={taskFinishDate}
              onChange={setTaskFinishDate}
              error={showError(finishDateError)}
              minimumDate={taskStartDate ? new Date(taskStartDate) : today}
            />

            <PrimaryButton
              title="Create Task"
              onPress={handleCreateTask}
              loading={loading}
              disabled={loading}
            />
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </KeyboardAvoidingView>
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
