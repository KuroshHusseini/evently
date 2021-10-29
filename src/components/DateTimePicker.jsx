import React from "react";
import { Button, View } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
const DateTimePicker = ({
  handleConfirm,
  hideDateTimePicker,
  showDateTimePicker,
  isDateTimePickerVisible,
}) => {
  return (
    <View>
      <Button onPress={showDateTimePicker}>Show Date Picker</Button>
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDateTimePicker}
      />
    </View>
  );
};

export default DateTimePicker;
