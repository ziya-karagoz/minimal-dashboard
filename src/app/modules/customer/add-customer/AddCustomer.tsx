import Card from "@base/components/common/cards/Card";
import { useFormik } from "formik";
import { ICustomerCreateRequest } from "../core/models/customer.interface";
import * as Yup from "yup";
import ReactPhoneInput from "@base/components/common/inputs/PhoneInput";
import ImagePicker from "@base/components/common/image-picker/ImagePicker";
import { addCustomer } from "../core/api/customer.request";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import AsyncSelect from "@base/components/common/selects/AsyncSelect";
import { Icon } from "@iconify/react/dist/iconify.js";
import { EPartnerScope } from "../core/models/customer.enum";
import { loadSectorOptions } from "../core/functions/customer.functions";

const validationSchema = Yup.object().shape({
  company_name: Yup.string().required("Şirket adı zorunludur"),
  email: Yup.string()
    .email("Geçerli bir email giriniz")
    .required("Email zorunludur"),
  phone: Yup.string().required("Telefon numarası zorunludur"),
  password: Yup.string()
    .required("Şifre zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
  password_confirm: Yup.string()
    .required("Şifre tekrarı zorunludur")
    .oneOf([Yup.ref("password")], "Şifreler uyuşmuyor"),
  sector: Yup.object().shape({
    value: Yup.number().required("Sektör zorunludur"),
  }),
  image: Yup.string().required("Profil resmi zorunludur"),
});

const AddCustomer = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      account_status: true,
      company_name: "",
      email: "",
      image: "",
      partner_scopes: [] as EPartnerScope[],
      password: "",
      password_confirm: "",
      phone: "",
      phone_code: "",
      sector: {
        value: null,
        label: "Sektör Seçiniz",
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let reqBody: ICustomerCreateRequest = {
        account_status: values.account_status,
        company_name: values.company_name,
        email: values.email,
        image: values.image,
        password: values.password,
        password_confirm: values.password_confirm,
        phone: values.phone,
        phone_code: values.phone_code,
        sector_id: values.sector?.value,
        partner_scopes: values.partner_scopes,
      };
      addCustomer(reqBody).then(() => {
        toast.success("Müşteri başarıyla eklendi");
        navigate(-1);
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <Card.Header>
          <h4 className="text-lg text-gray-800 font-bold">Müşteri Ekle</h4>
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
                exClass="items-center"
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

            {/* password */}
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Şifre
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                placeholder="********"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.password}
                </p>
              )}
            </div>
            {/* password confirm */}

            <div className="mb-3">
              <label
                htmlFor="password_confirm"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Şifre Tekrarı
              </label>
              <input
                type="password"
                id="password_confirm"
                name="password_confirm"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                placeholder="********"
                value={formik.values.password_confirm}
                onChange={formik.handleChange}
              />
              {formik.touched.password_confirm &&
                formik.errors.password_confirm && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.password_confirm}
                  </p>
                )}
            </div>
            {/* birthday */}

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
                      <div className="w-full text-lg font-semibold">Panel</div>
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
                      <div className="w-full text-lg font-semibold">Kupon</div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>

            {/* account_status */}
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
                  Aktiflik Durumu
                </span>
              </label>
            </div>
          </div>
        </Card.Body>
        <Card.Footer floating>
          <div className="flex justify-center items-center gap-2">
            <button
              type="submit"
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Kaydet
            </button>
            <button
              type="reset"
              className="text-gray-900 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={() => navigate(-1)}
            >
              Iptal
            </button>
          </div>
        </Card.Footer>
      </Card>
    </form>
  );
};

export default AddCustomer;
