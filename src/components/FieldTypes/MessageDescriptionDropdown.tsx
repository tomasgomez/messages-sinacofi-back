import { getMessageDescriptions } from "@/app/services/common";
import { useEffect, useState } from "react";
import Dropdrown from "../Dropdown";

const MessageTypesDropdown = ({
  label = "Intituciones",
  defaultValue,
  width,
  placeholder,
  onChange = () => {},
} : {
  label: string,
  defaultValue?: any,
  width?: number | string,
  placeholder: string,
  onChange?: Function,
}) => {
  const [messageTypes, setMessageTypes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getMessageDescriptions().then((messageTypes: any) => {
      const formattedMessageTypes = (messageTypes || [])?.map((messageType: any) => ({
        value: messageType.id,
        label: `${messageType.id} - ${messageType.name}`
      }));
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
      loading={loading}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default MessageTypesDropdown;
