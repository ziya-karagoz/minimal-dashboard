import FileBrowserModal from "@app/modules/file-manager/components/modals/FileBrowserModal";
import React from "react";
import Avatar from "../avatars/Avatar";
import Button from "../buttons/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ImagePickerProps } from "./ImagePicker.types";


const ImagePicker = ({ value, onChange, exClass }: ImagePickerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={`flex flex-col ${exClass}`}>
      <div className={`flex flex-col gap-2 `}>
        {value && (
          <div className="flex py-1">
            <Avatar
              className="shadow-lg shadow-red-100"
              src={value}
              alt="avatar"
              size="xl"
              shape="rounded"
              type="default"
            />
          </div>
        )}
        <Button
          className="w-full"
          color="red"
          size="sm"
          type="button"
          onClick={() => {
            if (value) {
              onChange(null);
            } else setOpen(true);
          }}
          icon={
            value ? (
              <Icon icon="basil:trash-alt-outline" />
            ) : (
              <Icon icon="gravity-ui:picture" />
            )
          }
        >
          {value ? "Resmi Kaldır" : "Resim Seç"}
        </Button>
      </div>
      <FileBrowserModal
        show={open}
        handleClose={() => setOpen(false)}
        setSelectedFileUrl={onChange}
      />
    </div>
  );
};

export default ImagePicker;
