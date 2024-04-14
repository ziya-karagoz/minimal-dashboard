import PhoneInput, { CountryData } from "react-phone-input-2";

import 'react-phone-input-2/lib/high-res.css'

import React from 'react'
import { ReactPhoneInputProps } from "./PhoneInput.types";



const ReactPhoneInput: React.FC<ReactPhoneInputProps> = ({ value, name, onChange, id, withCode = false }) => {
    return (
        <PhoneInput
            preferredCountries={["tr"]}
            country={"tr"}
            value={value}
            onChange={(value, data, __, ___) => {
                if (!withCode) {
                    onChange && onChange({ target: { value: value, name: name } });
                }
                else {
                    onChange && onChange({
                        target: {
                            value: {
                                phone: value,
                                phone_code: (data as CountryData).dialCode
                            }, name: name
                        }
                    });
                }
            }
            }
            searchPlaceholder="Search for a country"
            inputProps={{
                name: name,
                id: id,
            }}
            containerStyle={{
                width: "100%",
            }}
            inputStyle={{
                width: "100%",
                backgroundColor: "white",
                paddingLeft: "7rem",
                padding: "1.250rem",
                borderRadius: "0.5rem",
                border: "1px solid #D0D7DE",
            }}
            buttonStyle={{
                position: "static",
                backgroundColor: "white",
                padding: "1.250rem",
                borderRadius: "0.5rem",
                border: "1px solid #D0D7DE",
                marginRight: "0.5rem",
            }}
        />

    )
}

export default ReactPhoneInput