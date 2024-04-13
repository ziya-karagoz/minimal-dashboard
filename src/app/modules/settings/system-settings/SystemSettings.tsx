import Card from "@base/components/common/cards/Card";
import {
  ISystemSetting,
  ISystemSettingUpdateRequest,
} from "../core/models/settings.interface";
import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import {
  getSystemSettings,
  updateSystemSettings,
} from "../core/api/settings.request";
import Loader from "@base/layout/components/loader/Loader";
import { useFormik } from "formik";
import ReactPhoneInput from "@base/components/common/inputs/PhoneInput";
import toast from "react-hot-toast";

const SystemSettings = () => {
  const [systemSettingsResponse, setSystemSettingsResponse] = React.useState<{
    settings: ISystemSetting[];
  }>();
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
    FetchStatus.IDLE
  );

  React.useEffect(() => {
    fetchSystemSettings();
  }, []);

  function fetchSystemSettings() {
    setFetchStatus(FetchStatus.LOADING);
    getSystemSettings()
      .then((response) => {
        setSystemSettingsResponse(response);
        setFetchStatus(FetchStatus.SUCCEEDED);
      })
      .catch(() => {
        setFetchStatus(FetchStatus.FAILED);
      });
  }

  const formik = useFormik({
    initialValues: {
      systemSettingsResponse: systemSettingsResponse,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      let reqBody = {
        systemSettings: values.systemSettingsResponse?.settings.map(
          (setting) => {
            return {
              setting_name: setting.setting_name,
              value: setting.value,
              code: setting.code,
            };
          }
        ),
      } as ISystemSettingUpdateRequest;

      updateSystemSettings(reqBody).then(() => {
        toast.success("Ayarlar başarıyla güncellendi.");
        fetchSystemSettings();
      });
    },
  });

  if (fetchStatus !== FetchStatus.SUCCEEDED) {
    return <Loader isComponent />;
  }

  return (
    <div>
      <Card>
        <Card.Header>
          <h4 className="font-semibold text-lg">Sistem Ayarları</h4>
        </Card.Header>
        <Card.Body>
          <form
            className="max-w-2xl mx-auto p-10"
            onSubmit={formik.handleSubmit}
          >
            {formik.values.systemSettingsResponse?.settings?.map(
              (setting, index) => (
                <React.Fragment key={index}>
                  {setting.setting_type === "text" ? (
                    <div className="mb-6">
                      <label
                        htmlFor={setting.setting_name}
                        className="block mb-2 text-sm font-normal text-gray-600 "
                      >
                        {setting.setting_label}
                      </label>
                      <input
                        type={setting?.setting_type}
                        id={setting?.setting_name}
                        name={setting?.setting_name}
                        className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                        placeholder={setting.setting_label}
                        value={setting?.value}
                        onChange={(e) =>
                          formik.setFieldValue(
                            `systemSettingsResponse.settings[${index}].value`,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ) : setting.setting_type === "checkbox" ? (
                    <div className="mb-6">
                      <label className="inline-flex items-center mb-5 cursor-pointer ">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          onChange={(e) => {
                            formik.setFieldValue(
                              `systemSettingsResponse.settings[${index}].value`,
                              e.target.checked ? "1" : ""
                            );
                          }}
                          id={setting?.setting_name}
                          name={setting?.setting_name}
                          checked={
                            formik?.values?.systemSettingsResponse?.settings[
                              index
                            ].value === "1"
                              ? true
                              : false
                          }
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                        <span className="ms-3 text-sm font-normal text-gray-600">
                          {setting.setting_label}
                        </span>
                      </label>
                    </div>
                  ) : setting.setting_type === "phone" ? (
                    <div className="mb-6">
                      <label
                        htmlFor={setting.setting_name}
                        className="block mb-2 text-sm font-normal text-gray-600 "
                      >
                        {setting.setting_label}
                      </label>
                      <ReactPhoneInput
                        id={setting?.setting_name}
                        name={setting?.setting_name}
                        value={setting?.value}
                        onChange={(e) =>
                          formik.setFieldValue(
                            `systemSettingsResponse.settings[${index}].value`,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  ) : null}
                </React.Fragment>
              )
            )}
          </form>
        </Card.Body>
        <Card.Footer floating>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => {
                formik.handleSubmit();
              }}
              type="button"
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Kaydet
            </button>
            <button
              type="reset"
              className="text-gray-900 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              İptal
            </button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SystemSettings;
