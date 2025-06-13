import React, { useMemo } from "react";
import { useAuthState } from "../../context/auth-context";
import useDeviceCompany from "../../shared-logic/hooks/useDeviceCompany";
import { Dropdown } from "react-native-element-dropdown";
import { View } from "react-native";

export interface Props {
  onPress?: (id: string) => void;
  deviceChoice?: string;
}

export const SearchDevice: React.FC<Props> = ({ onPress, deviceChoice }) => {
  const { state } = useAuthState();
  const userInfo = state?.userData;
  const { data } = useDeviceCompany(userInfo?.companyID);
  const deviceData = data?.data;
  const optionList = useMemo(() => {
    return deviceData?.map((device) => {
      return {
        label: device.carNumber,
        value: device.deviceID,
      };
    });
  }, [deviceData]);

  return (
    <View
      style={{
        width: 150,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        padding: 5,
        height: 43,
        justifyContent: "center",
      }}
    >
      <Dropdown
        data={optionList || []}
        labelField="label"
        valueField="value"
        value={deviceChoice}
        style={{
          borderColor: "#999",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 12,
          height: 50,
        }}
        placeholder=""
        selectedTextStyle={{
          color: "#333333",
          fontSize: 16,
        }}
        itemTextStyle={{
          color: "#CCCCCC",
          fontSize: 16,
        }}
        onChange={(item) => {
          onPress?.(item.value);
        }}
      />
    </View>
  );
};
