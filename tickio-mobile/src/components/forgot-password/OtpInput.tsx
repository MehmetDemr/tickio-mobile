import React, { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function OtpInput({ value, onChange }: Props) {
  const inputs = useRef<Array<TextInput | null>>([]);

  const digits = Array.from({ length: 6 }, (_, i) => value[i] || "");

  function handleChange(text: string, index: number) {
    const clean = text.replace(/[^0-9]/g, "").slice(-1);
    const arr = [...digits];
    arr[index] = clean;
    const joined = arr.join("");
    onChange(joined);

    if (clean && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }

  function handleKeyPress(e: { nativeEvent: { key: string } }, index: number) {
    if (e.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  return (
    <View style={styles.row}>
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          style={styles.box}
          textAlign="center"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  box: {
    flex: 1,
    height: 54,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.mint,
    borderRadius: 16,
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.dark,
  },
});
