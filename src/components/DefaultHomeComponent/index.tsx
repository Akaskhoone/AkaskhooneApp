import I18n from "@utils/i18n";
import { Button, Text, View } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { scale } from "react-native-size-matters";

const { height } = Dimensions.get("window");

interface Props {
  [propName: string]: any;
}
const DefaulthomeComponent = () => {
  return (
    <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          color: "gray",
          justifyContent: "center",
          textAlign: "center",
          marginHorizontal: scale(15)
        }}
      >
        {I18n.t("defaultHomeText")}
      </Text>
      <Button
        block={true}
        transparent={true}
        bordered={true}
        large={true}
        style={{ marginHorizontal: scale(20), marginTop: scale(15) }}
      >
        <Text>{I18n.t("inviteFriends")}</Text>
      </Button>
    </View>
  );
};
export default DefaulthomeComponent;
