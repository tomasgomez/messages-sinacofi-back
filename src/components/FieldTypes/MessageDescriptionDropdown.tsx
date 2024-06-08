import { getMessageDescriptions } from "@/app/services/common";
import { useEffect, useState } from "react";
import Dropdrown from "../Dropdown";

const MessageTypesDropdown = ({
  label = "Descripción",
  defaultValue,
  width,
  value,
  placeholder,
  onChange = () => {},
}: {
  label: string;
  defaultValue?: any;
  width?: number | string;
  value: any;
  placeholder: string;
  onChange?: Function;
}) => {
  const [messageTypes, setMessageTypes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getMessageDescriptions().then((messageTypes: any) => {
      const formattedMessageTypes = (messageTypes || [])?.map(
        (messageType: any) => ({
          value: messageType.messageCode,
          label: `${messageType.messageCode} - ${messageType.description}`,
        })
      );
      setMessageTypes(formattedMessageTypes);
      setLoading(false);
    });
  }, []);

  return (
    <Dropdrown
      key={`messageTypesDropdown`}
      label={label}
      options={messageTypes}
      width={width}
      selected={value}
      loading={loading}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      disablePortal={false}
      maxMenuHeight={190}
    />
  );
};

export default MessageTypesDropdown;
