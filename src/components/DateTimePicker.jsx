import React from "react";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomButton from "./CustomButton";

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
      <CustomButton
        onPressHandler={showDateTimePicker}
        title={value === null ? title : value}
        icon={"clock"}
      />
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
