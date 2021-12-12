import React from "react";
import EventCard from "../components/EventCard";
import UserProfileCard from "./../components/UserProfileCard";
import CustomButton from "../components/CustomButton";
import EventList from "../components/EventList";

import { events } from "../../DummyData";
import { FlatList } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";


describe("Custom button", () => {
  it("Should call onPress method", async () => {
    const onPress = jest.fn();
    const { getByTestId } = await render(
      <CustomButton onPressHandler={onPress} title="button" />
    );
    const btn = getByTestId("customButton");
    fireEvent.press(btn);
    expect(btn).toHaveTextContent("button");
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe("Event card", () => {
  const event = {
    attending: [],
    cost: "10",
    details:
      "NIPD Genetics is a European biotechnology company that designs, develops, and provides advanced genetic tests.",
    endDateTime: "December 10, 2021 17:04",
    host: "Something ",
    image:
      "file:///var/mobile/Containers/Data/Application/CA7F298B-A6D8-4DC8-92E2-9F735DC10F05/Library/Caches/ExponentExperienceData/%2540kurosh97%252Fbash-app/ImagePicker/38D71B17-178B-43D0-A2D0-A59F34AB9836.jpg",
    key: "DA6kyyUkkDaxccXA7GcI",
    location: "Cyprus, nicosia",
    startDateTime: "December 10, 2021 12:55",
    title: "NIPD PCR TEST",
    type: "",
    userID: "dPWwDjVFaifUJvS2rOz80twJSxT2",
  };

  it("renders the title, Date, Detail, Location and host", () => {
    const { getByTestId } = render(<EventCard event={event} />);

    expect(getByTestId("eventTitleText")).toHaveTextContent("NIPD PCR TEST");
    expect(getByTestId("eventDateText")).toHaveTextContent(
      "December 10, 2021 12:55"
    );
    expect(getByTestId("eventDetailText")).toHaveTextContent(
      "NIPD Genetics is a European biotechnology company that designs, develops, and provides advanced genetic tests."
    );
    expect(getByTestId("eventLocationText")).toHaveTextContent(
      "Cyprus, nicosia"
    );
  });
});

describe("User profile Card", () => {
  const user = {
    firstName: "Kurosh",
    lastName: "Husseini",
    email: "admim@gmail.com",
    phoneNumber: "0456999222",
  };

  it("renders user information", () => {
    const { getByTestId } = render(
      <UserProfileCard
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        number={user.phoneNumber}
      />
    );
    expect(getByTestId("firstNameText")).toHaveTextContent("Kurosh");
    expect(getByTestId("lastNameText")).toHaveTextContent("Husseini");
    expect(getByTestId("emailText")).toHaveTextContent("admim@gmail.com");
    expect(getByTestId("numberText")).toHaveTextContent("0456999222");
  });
});

describe("Event list", () => {
  it("renders user information", () => {
    const {getByTestId} = render(<EventList event={events} />);
    console.log("🚀 ~ file: components.test.jsx ~ line 86 ~ it ~ events", events.length)

    expect(getByTestId("flat-list").length).toBe(events.length);
  });
});
