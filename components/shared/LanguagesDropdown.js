import React from "react";
import Select from "react-select";
import { languagesData } from "@/constants";
import { customStyles } from "@/utils/customStyles";

const LanguagesDropdown = ({ onSelectChange, value=null }) => {
  if (value) {
    return (
      <Select
        instanceId="language-select"
        options={languagesData}
        value={value}
        styles={customStyles}
        defaultValue={languagesData[3]}
        onChange={onSelectChange}
      />
    );
  }
  return (
    <Select
      instanceId="language-select"
      options={languagesData}
      styles={customStyles}
      defaultValue={languagesData[3]}
      onChange={onSelectChange}
    />
  );
};

export default LanguagesDropdown;
