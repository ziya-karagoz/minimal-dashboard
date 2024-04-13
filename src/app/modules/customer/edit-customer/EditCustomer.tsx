import Card from "@base/components/common/cards/Card";
import { useFormik } from "formik";
import {
  ICustomerResponseP,
  ICustomerUpdateRequest,
} from "../core/models/customer.interface";
import * as Yup from "yup";
import ReactPhoneInput from "@base/components/common/inputs/PhoneInput";
import React, { useEffect } from "react";
import ImagePicker from "@base/components/common/image-picker/ImagePicker";
import { getCustomer, updateCustomer } from "../core/api/customer.request";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { FetchStatus } from "@base/enums/api.enum";
import Loader from "@base/layout/components/loader/Loader";
import { ECustomerType, EPartnerScope } from "../core/models/customer.enum";
import { Icon } from "@iconify/react/dist/iconify.js";
import AsyncSelect from "@base/components/common/selects/AsyncSelect";
import { loadSectorOptions } from "../core/functions/customer.functions";

const validationSchema = Yup.object().shape({
  company_name: Yup.string().required("Şirket adı zorunludur"),
  email: Yup.string()
    .email("Geçerli bir email giriniz")
    .required("Email zorunludur"),
  phone: Yup.string().required("Telefon numarası zorunludur"),
  sector: Yup.object().shape({
    value: Yup.number().required("Sektör zorunludur"),
  }),
  image: Yup.string().required("Profil resmi zorunludur"),
});

const EditCustomer = () => {
  const { id: customerId } = useParams();
  const [customer, setCustomer] = React.useState<ICustomerResponseP | null>(
    null
  );
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
    FetchStatus.IDLE
  );

  useEffect(() => {
    if (customerId) {
      setFetchStatus(FetchStatus.LOADING);
      getCustomer(parseInt(customerId)).then((res) => {
        setCustomer(res);
        setFetchStatus(FetchStatus.SUCCEEDED);
      });
    }
  }, [customerId]);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      account_status: customer?.account_status ?? false,
      company_name: customer?.company_name ?? "",
      email: customer?.email ?? "",
      image: customer?.image ?? "",
      partner_scopes: customer?.partner_scopes ?? ([] as EPartnerScope[]),
      partner_type: customer?.partner_type ?? null,
      phone: customer?.phone ?? "",
      phone_code: customer?.phone_code ?? "",
      sector: customer?.sector
        ? {
          value: customer.sector.id,
          label: customer.sector.name,
        }
        : {
          value: null,
          label: "Sektör Seçiniz",
        },
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const reqBody: ICustomerUpdateRequest = {
        account_status: values.account_status,
        company_name: values.company_name,
        email: values.email,
        image: values.image,
        partner_scopes: values.partner_scopes,
        phone: values.phone,
        phone_code: values.phone_code,
        sector_id: values.sector?.value ?? null,
      };

      updateCustomer({ id: parseInt(customerId!), data: reqBody }).then(
        () => {
          toast.success("Müşteri başarıyla güncellendi");
          navigate(-1);
        }
      );
    },
  });

  React.useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  if (fetchStatus !== FetchStatus.SUCCEEDED) return <Loader isComponent />;

  return (
    <form className="container" onSubmit={formik.handleSubmit}>
      <Card>
        <Card.Header>
          <h4 className="text-lg font-bold">
            {customer?.company_name} Müşterisini Düzenle
          </h4>
        </Card.Header>
        <Card.Body>
          <div className="max-w-2xl mx-auto">
            {/* image */}
            <div className="mb-3">
              <label
                htmlFor="tc_or_passport"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Profil Resmi
              </label>
              <ImagePicker
                value={formik.values.image}
                onChange={(value) => {
                  formik.setFieldValue("image", value);
                }}
              />
              {formik.touched.image && formik.errors.image && (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.image}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="company_name"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Şirket Adı
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                placeholder="John"
                value={formik.values.company_name}
                onChange={formik.handleChange}
              />
              {formik.touched.company_name && formik.errors.company_name && (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.company_name}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Eposta
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                placeholder="ornek@konutkonfor.com"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.email}
                </p>
              )}
            </div>
            {/* phone */}
            <div className="mb-3">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Telefon Numarası
              </label>
              <ReactPhoneInput
                withCode
                value={formik.values.phone}
                name="phone"
                onChange={(e) => {
                  formik.setFieldValue("phone", e.target.value.phone);
                  formik.setFieldValue(
                    "phone_code",
                    "+" + e.target.value.phone_code
                  );
                }}
                id="phone"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.phone}
                </p>
              ) : null}
            </div>
            {/* sector select */}
            {customer?.type === ECustomerType.CORPORATE ? (
              <div className="mb-3">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-normal text-gray-600 "
                >
                  Sektör
                </label>
                <AsyncSelect
                  loadOptions={loadSectorOptions}
                  value={formik.values.sector}
                  onChange={(value) => {
                    console.log(value);
                    formik.setFieldValue("sector", value);
                  }}
                  placeholder="Sektör Seçiniz"
                />

                {formik.touched.sector?.value && formik.errors.sector?.value ? (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.sector?.value}
                  </p>
                ) : null}
              </div>
            ) : null}

            {customer?.type === ECustomerType.CORPORATE ? (
              <div className="mb-3">
                <label className="block mb-2 text-sm font-normal text-gray-600 ">
                  Kapsam Alanları
                </label>
                <ul className="grid w-full gap-6 md:grid-cols-3">
                  <li>
                    <input
                      type="checkbox"
                      id={EPartnerScope.DASHBOARD}
                      className="hidden peer"
                      value={EPartnerScope.DASHBOARD}
                      checked={formik.values.partner_scopes.includes(
                        EPartnerScope.DASHBOARD
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          formik.setFieldValue("partner_scopes", [
                            ...formik.values.partner_scopes,
                            EPartnerScope.DASHBOARD,
                          ]);
                        } else {
                          formik.setFieldValue(
                            "partner_scopes",
                            formik.values.partner_scopes.filter(
                              (item) => item !== EPartnerScope.DASHBOARD
                            )
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={EPartnerScope.DASHBOARD}
                      className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-red-500 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50 "
                    >
                      <div className="block">
                        <Icon
                          icon="ic:round-dashboard"
                          className="mb-2 w-7 h-7 text-red-600"
                        />
                        <div className="w-full text-lg font-semibold">
                          Panel
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <input
                      type="checkbox"
                      id={EPartnerScope.API}
                      className="hidden peer"
                      value={EPartnerScope.API}
                      checked={formik.values.partner_scopes.includes(
                        EPartnerScope.API
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          formik.setFieldValue("partner_scopes", [
                            ...formik.values.partner_scopes,
                            EPartnerScope.API,
                          ]);
                        } else {
                          formik.setFieldValue(
                            "partner_scopes",
                            formik.values.partner_scopes.filter(
                              (item) => item !== EPartnerScope.API
                            )
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={EPartnerScope.API}
                      className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-red-500 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50"
                    >
                      <div className="block">
                        <Icon
                          icon="ant-design:api-filled"
                          className="mb-2 text-red-600 w-7 h-7"
                        />
                        <div className="w-full text-lg font-semibold">API</div>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id={EPartnerScope.COUPON}
                      className="hidden peer"
                      value={EPartnerScope.COUPON}
                      checked={formik.values.partner_scopes.includes(
                        EPartnerScope.COUPON
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          formik.setFieldValue("partner_scopes", [
                            ...formik.values.partner_scopes,
                            EPartnerScope.COUPON,
                          ]);
                        } else {
                          formik.setFieldValue(
                            "partner_scopes",
                            formik.values.partner_scopes.filter(
                              (item) => item !== EPartnerScope.COUPON
                            )
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={EPartnerScope.COUPON}
                      className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer  peer-checked:border-red-500 hover:text-gray-600  peer-checked:text-gray-600 hover:bg-gray-50 "
                    >
                      <div className="block">
                        <Icon
                          icon="mdi:coupon"
                          className="mb-2 text-red-600 w-7 h-7"
                        />
                        <div className="w-full text-lg font-semibold">
                          Kupon
                        </div>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
            ) : null}

            {/* account_status */}
            {customer?.type === ECustomerType.CORPORATE ? (
              <div className="mb-3">
                <label className="inline-flex items-center mb-5 cursor-pointer ">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={formik.values.account_status}
                    onChange={formik.handleChange}
                    id="account_status"
                    name="account_status"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                  <span className="ms-3 text-sm font-normal text-gray-600">
                    Hesap Durumu
                  </span>
                </label>
              </div>
            ) : null}
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="flex justify-center items-center gap-2">
            <button
              type="submit"
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Kaydet
            </button>
            <button
              type="reset"
              onClick={() => navigate(-1)}
              className="text-gray-900 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              İptal
            </button>
          </div>
        </Card.Footer>
      </Card>
    </form>
  );
};

export default EditCustomer;
