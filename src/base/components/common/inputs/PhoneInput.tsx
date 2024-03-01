import PhoneInput from "react-phone-input-2";

import 'react-phone-input-2/lib/high-res.css'

import React from 'react'

type ReactPhoneInputProps = {
    value?: any;
    name?: string | undefined;
};


// .rpi_input{
//     width: 100%;
//     background-color: #F6F8FA;
//     padding: 2rem;
//     border-radius: 0.5rem;
//     border: 1px solid #AFB8C1;

//   }

//   .rpi_input:focus{
//     background-color: white;
//   }

//   .rpi_dropdown{
//     width: 100%;
//     background-color: white;
//     padding: 2rem;
//     border-radius: 0.5rem;
//     border: 1px solid #AFB8C1;


//   }

//   .rpi_dropdown:focus{
//     background-color: white;
//   }

//   .rpi_button{
//     width: 100%;
//     background-color: #F6F8FA;
//     padding: 2rem;
//     border-radius: 0.5rem;
//     border: 1px solid #AFB8C1;

//   }

//   .rpi_button:focus{
//     background-color: white;
//   }

//   .rpi_search{
//     width: 100%;
//     background-color: #F6F8FA;
//     padding: 2rem;
//     border-radius: 0.5rem;
//     border: 1px solid #AFB8C1;

//   }

//   .rpi_search:focus{
//     background-color: white;
//   }


const ReactPhoneInput: React.FC<ReactPhoneInputProps> = ({ value, name }) => {
    return (
        <PhoneInput

            preferredCountries={["gb"]}
            country={"gb"}
            value={value}
            inputProps={{
                name: name,
            }}
            containerStyle={{
                width: "100%",
                backgroundColor: "#F6F8FA"
            }}
            inputStyle={{
                width: "100%",
                backgroundColor: "#F6F8FA",
                padding: "1.250rem",
                borderRadius: "0.5rem",
                border: "1px solid #AFB8C1",
            }}
            buttonStyle={{
                width: "100%",
                backgroundColor: "#F6F8FA",
                padding: "1.250rem",
                borderRadius: "0.5rem",
                border: "1px solid #AFB8C1",
            }}
            searchStyle={{
                width: "100%",
                backgroundColor: "#F6F8FA",
                padding: "1.250rem",
                borderRadius: "0.5rem",
                border: "1px solid #AFB8C1",
            }}
            dropdownStyle={{
                zIndex: "1000",
                position: "absolute",
                width: "100%",
                backgroundColor: "white",
                padding: "1.250rem",
                borderRadius: "0.5rem",
                border: "1px solid #AFB8C1",
            }}
        />

    )
}

export default ReactPhoneInput