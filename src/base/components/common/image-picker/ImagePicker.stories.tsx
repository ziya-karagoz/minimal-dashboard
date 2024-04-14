import { Meta, StoryFn } from "@storybook/react";
import ImagePicker from "./ImagePicker";
import { ImagePickerProps } from "./ImagePicker.types";
import { swal } from "../alerts/SwalAlert";
import { LoginRequest, useAuth } from "@app/modules/auth";
import { fetchCurrentUser, login } from "@app/modules/auth/core/_requests";
import React from "react";

export default {
  title: "Components/ImagePicker",
  component: ImagePicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: "text",
      description: "The current selected image URL.",
    },
    onChange: {
      action: "onChange",
      description: "Function that handles changes to the selected image.",
    },
    exClass: {
      control: "text",
      description: "Extra CSS classes to apply for customization.",
    },
  },
} as Meta;

const Template: StoryFn<ImagePickerProps> = (args) => {
    const [image, setImage] = React.useState<string | null>(args.value);
  const { saveAuth } = useAuth();
  const handleLogin = async ({ email, password, rememberMe }: LoginRequest) => {
    const { accessToken } = await login(email, password).catch((error) => {
      swal.fire({
        title: "Hata",
        text:
          error.response?.data?.message ||
          "Bir hata oluştu. Lütfen tekrar deneyin.",
        icon: "error",
      });
      throw error;
    });
    saveAuth(accessToken, rememberMe);
    const user = await fetchCurrentUser();
    //@ts-ignore
    setCurrentUser(user);
  };

  React.useEffect(() => {
    handleLogin({
      email: "ziya@konutkonfor.com",
      password: "123456",
      rememberMe: false,
    });
  }, []);
  return <ImagePicker {...args} value={image} onChange={(image)=> setImage(image)} />;
};

export const Default = Template.bind({});
Default.args = {

};
