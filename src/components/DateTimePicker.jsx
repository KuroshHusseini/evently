import React from "react";
import { Button } from "react-native-paper";

import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateTimePicker = ({
  title,
  value,
  handleConfirm,
  hideDateTimePicker,
  showDateTimePicker,
  isDateTimePickerVisible,
}) => {
  return (
    <>
      <Button mode="contained"icon="clock" dark={true} color="#000" onPress={showDateTimePicker}>
        {value === null ? title : value}
      </Button>
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDateTimePicker}
      />
    </>
  );
};

export default DateTimePicker;
