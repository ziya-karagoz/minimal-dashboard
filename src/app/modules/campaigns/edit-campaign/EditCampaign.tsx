import { useFormik } from "formik";
import * as Yup from "yup";
import Card from "@base/components/common/cards/Card";
import QuillEditor from "@base/components/common/quill/QuillEditor";
import ImagePicker from "@base/components/common/image-picker/ImagePicker";
import { getCampaign, updateCampaign } from "../core/api/campaign.request";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import CustomSelect from "@base/components/common/selects/CustomSelect";
import {
  ICampaignRequest,
  ICampaignResponse,
} from "../core/models/campaign.interface";
import DatePicker from "@base/components/common/date-picker/DatePicker";
import AsyncSelect from "@base/components/common/selects/AsyncSelect";
import { loadCustomerOptions } from "../core/functions/campaign.function";
import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import Loader from "@base/layout/components/loader/Loader";
import { ECampaignStatus, ECampaignStatusL, EDiscountTypes, EDiscountTypesL, EUsagePeriodTypesL } from "../core/models/campaign.enums";

const validationSchema = Yup.object().shape({
  campaign_name: Yup.string().required("Ad zorunludur"),
  campaign_description: Yup.string().required("Açıklama zorunludur"),
  coupon_generate_limit: Yup.number().required("Kupon Limiti Zorunludur"),
  usage_period_type: Yup.object().shape({
    value: Yup.string().required("Kullanım Türü Zorunludur"),
    label: Yup.string().required("Kullanım Türü Zorunludur"),
  }),
  discount_type: Yup.object().shape({
    value: Yup.string().required("İndirim Türü Zorunludur"),
    label: Yup.string().required("İndirim Türü Zorunludur"),
  }),
  discount_value: Yup.number().required("İndirim tutarı Zorunludur"),
  valid_start_date: Yup.string().required("Başlangıç Tarihi Zorunludur"),
  valid_end_date: Yup.string().required("Bitiş Tarihi Zorunludur"),
  customer: Yup.object().shape({
    value: Yup.number().required("Müşteri zorunludur"),
    label: Yup.string().required("Müşteri zorunludur"),
  }),
  campaign_status: Yup.object().shape({
    value: Yup.string().required("Kampanya Durumu Zorunludur"),
    label: Yup.string().required("Kampanya Durumu Zorunludur"),
  }),
  is_ui_shown: Yup.boolean().required("Arayüz Gösterimi Zorunludur"),
  campaign_image: Yup.string().required("Resim Zorunludur"),
});
const EditCampaign = () => {
  const navigate = useNavigate();
  const { id: campaignId } = useParams();
  const [campaign, setCampaign] = React.useState<ICampaignResponse | null>(
    null
  );
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
    FetchStatus.IDLE
  );

  const formik = useFormik({
    initialValues: {
      campaign_name: campaign?.campaign_name ?? "",
      campaign_description: campaign?.campaign_description ?? "",
      coupon_generate_limit: campaign?.coupon_generate_limit ?? 0,
      usage_period_type: {
        value: campaign?.usage_period_type ?? "",
        label: EUsagePeriodTypesL[campaign?.usage_period_type as keyof typeof EUsagePeriodTypesL],
      },
      discount_type: {
        value: campaign?.discount_type ?? "",
        label: EDiscountTypesL[campaign?.discount_type as keyof typeof EDiscountTypesL],
      },
      discount_value: campaign?.discount_value ?? 0,
      valid_start_date: campaign?.valid_start_date ?? "",
      valid_end_date: campaign?.valid_end_date ?? "",
      customer: {
        value: campaign?.customer?.id ?? 0,
        label: campaign?.customer?.company_name ?? "",
      },
      campaign_status: {
        value: campaign?.campaign_status ?? "",
        label: ECampaignStatusL[campaign?.campaign_status as keyof typeof ECampaignStatusL],
      },
      is_ui_shown: campaign?.is_ui_shown ?? false,
      campaign_image: campaign?.campaign_image ?? "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const reqBody = {
        campaign_name: values.campaign_name,
        campaign_description: values.campaign_description,
        coupon_generate_limit: values.coupon_generate_limit,
        usage_period_type: values.usage_period_type
          ? values.usage_period_type.value
          : undefined,
        discount_type: values.discount_type
          ? values.discount_type.value
          : undefined,
        discount_value: values.discount_value,
        valid_start_date: values.valid_start_date,
        valid_end_date: values.valid_end_date,
        campaign_status: values.campaign_status
          ? values.campaign_status.value
          : undefined,
        is_ui_shown: values.is_ui_shown,
        campaign_image: values.campaign_image,
        customer_id: values.customer ? values.customer.value : undefined,
      } as ICampaignRequest;
      updateCampaign({ id: parseInt(campaignId!), data: reqBody }).then(() => {
        toast.success("Kampanya başarıyla güncellendi");
        navigate(-1);
      });
    },
  });
  React.useEffect(() => {
    if (campaignId) {
      setFetchStatus(FetchStatus.LOADING);
      getCampaign(parseInt(campaignId)).then((res) => {
        setCampaign(res);
        setFetchStatus(FetchStatus.SUCCEEDED);
      });
    }
  }, [campaignId]);
  if (fetchStatus !== FetchStatus.SUCCEEDED) return <Loader isComponent />;

  return (
    <form className="container" onSubmit={formik.handleSubmit}>
      <Card>
        <Card.Header>
          <h4 className="text-lg font-bold">Kampanya Ekle</h4>
        </Card.Header>
        <Card.Body>
          <div className="max-w-3xl mx-auto p-10">
            <div className="mb-3">
              <label
                htmlFor="campaign_name"
                className="block mb-2 text-sm font-normal text-gray-600"
              >
                Kampanya Adı
              </label>
              <input
                type="text"
                id="campaign_name"
                name="campaign_name"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                value={formik.values.campaign_name}
                onChange={(event) => {
                  formik.setFieldValue("campaign_name", event.target.value);
                }}
              />
              {formik.touched.campaign_name && formik.errors.campaign_name && (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.campaign_name}
                </p>
              )}
            </div>
            {/* image */}
            <div className="mb-3">
              <label
                htmlFor="campaign_description"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Kampanya Açıklaması
              </label>
              <QuillEditor
                editorHtml={formik.values?.campaign_description}
                name="campaign_description"
                setEditorHtml={(_, __, data) => {
                  formik.setFieldValue("campaign_description", data);
                }}
              />
              {formik.touched.campaign_description &&
                formik.errors.campaign_description && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors?.campaign_description}
                  </p>
                )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="campaign_image"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Resim
              </label>
              <ImagePicker
                value={formik.values.campaign_image}
                onChange={(value) => {
                  formik.setFieldValue("campaign_image", value);
                }}
                exClass="items-start"
              />
              {formik.touched.campaign_image &&
                formik.errors.campaign_image && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.campaign_image}
                  </p>
                )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="coupon_generate_limit"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Kupon Limiti{" "}
              </label>
              <input
                type="number"
                id="coupon_generate_limit"
                name="coupon_generate_limit"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                value={formik.values.coupon_generate_limit}
                onChange={formik.handleChange}
              />
              {formik.touched.coupon_generate_limit &&
                formik.errors.coupon_generate_limit && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.coupon_generate_limit}
                  </p>
                )}
            </div>{" "}
            <div className="mb-3">
              <label
                htmlFor="usage_period_type"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Kullanım Süresi Türü
              </label>
              <CustomSelect
                value={formik.values?.usage_period_type}
                options={[
                  {
                    value: ECampaignStatus.ACTIVE,
                    label: ECampaignStatusL[ECampaignStatus.ACTIVE],
                  },
                  {
                    value: ECampaignStatus.DRAFT,
                    label: ECampaignStatusL[ECampaignStatus.DRAFT],
                  },
                  {
                    value: ECampaignStatus.EXPIRED,
                    label: ECampaignStatusL[ECampaignStatus.EXPIRED],
                  },
                ]}
                onChange={(item) => {
                  formik.setFieldValue("usage_period_type", item);
                }}
                placeholder="Kullanım Türü"
              />

              {formik.touched.usage_period_type?.value &&
                formik.errors.usage_period_type?.value ? (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.usage_period_type.value}
                </p>
              ) : null}
            </div>
            <div className="mb-3">
              <label
                htmlFor="discount_type"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                İndirim Türü
              </label>
              <CustomSelect
                isDisabled={true}
                value={formik.values?.discount_type}
                options={[
                  {
                    value: EDiscountTypes.PERCENTAGE,
                    label: EDiscountTypesL[EDiscountTypes.PERCENTAGE],
                  },
                  {
                    value: EDiscountTypes.FIXED,
                    label: EDiscountTypesL[EDiscountTypes.FIXED],
                  },
                ]}
                onChange={(item) => {
                  formik.setFieldValue("discount_type", item);
                }}
                placeholder="İndirim Türü"
              />

              {formik.touched?.discount_type?.value &&
                formik.errors.usage_period_type?.value ? (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors?.discount_type?.value}
                </p>
              ) : null}
            </div>
            {formik.values.discount_type.value === "percentage" ? (
              <div className="mb-3">
                <label
                  htmlFor="discount_value"
                  className="block mb-2 text-sm font-normal text-gray-600 "
                >
                  İndirim Oranı (%)
                </label>
                <input
                  disabled={true}
                  type="number"
                  id="discount_value"
                  name="discount_value"
                  className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                  value={formik.values.discount_value}
                  onChange={formik.handleChange}
                />
                {formik.touched.discount_value &&
                  formik.errors.discount_value && (
                    <p className="mt-2 text-sm text-red-500">
                      {formik.errors.discount_value}
                    </p>
                  )}
              </div>
            ) : (
              <div className="mb-3">
                <label
                  htmlFor="discount_value"
                  className="block mb-2 text-sm font-normal text-gray-600 "
                >
                  İndirim Tutarı (₺)
                </label>
                <input
                  disabled={true}
                  type="number"
                  id="discount_value"
                  name="discount_value"
                  className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                  value={formik.values.discount_value}
                  onChange={formik.handleChange}
                />

                {formik.touched.discount_value &&
                  formik.errors.discount_value && (
                    <p className="mt-2 text-sm text-red-500">
                      {formik.errors.discount_value}
                    </p>
                  )}
              </div>
            )}
            <div className="mb-3">
              <label
                htmlFor="valid_start_date"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Başlangıç Tarihi
              </label>
              <DatePicker
                disabled={true}
                value={formik.values.valid_start_date}
                onChange={(e) => {
                  formik.setFieldValue("valid_start_date", e.target.value);
                }}
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
              />

              {formik.touched.valid_start_date &&
                formik.errors.valid_start_date && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.valid_start_date}
                  </p>
                )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="valid_end_date"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Bitiş Tarihi
              </label>
              <DatePicker
                value={formik.values.valid_end_date}
                onChange={(e) => {
                  formik.setFieldValue("valid_end_date", e.target.value);
                }}
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
              />

              {formik.touched.valid_end_date &&
                formik.errors.valid_end_date && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.valid_end_date}
                  </p>
                )}
            </div>
            <div className="form-group row mb-4">
              <label
                htmlFor="customer"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Müşteri
              </label>
              <div className="col-md-6">
                <AsyncSelect
                  isDisabled={true}
                  isSearchable
                  value={{
                    value: formik.values.customer?.value,
                    label: formik.values.customer?.label,
                  }}
                  onChange={(data) => {
                    formik.setFieldValue("customer", data);
                  }}
                  loadOptions={loadCustomerOptions}
                  placeholder="Müşteri Seçiniz"
                />
                {formik.touched.customer && formik.errors.customer ? (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.customer?.value}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="campaign_status"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Kampanya Durumu
              </label>
              <CustomSelect
                value={formik.values?.campaign_status}
                options={[
                  {
                    value: ECampaignStatus.ACTIVE,
                    label: ECampaignStatusL[ECampaignStatus.ACTIVE],
                  },
                  {
                    value: ECampaignStatus.DRAFT,
                    label: ECampaignStatusL[ECampaignStatus.DRAFT],
                  },
                  {
                    value: ECampaignStatus.EXPIRED,
                    label: ECampaignStatusL[ECampaignStatus.EXPIRED],
                  },
                ]}
                onChange={(item) => {
                  formik.setFieldValue("campaign_status", item);
                }}
                placeholder="İndirim Türü"
              />

              {formik.touched?.discount_type?.value &&
                formik.errors.usage_period_type?.value ? (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors?.discount_type?.value}
                </p>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="inline-flex items-center mb-5 cursor-pointer ">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={formik.values.is_ui_shown}
                  onChange={formik.handleChange}
                  id="is_ui_shown"
                  name="is_ui_shown"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                <span className="ms-3 text-sm font-normal text-gray-600">
                  Arayüz Gösterimi{" "}
                </span>
              </label>
            </div>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="flex justify-center items-center gap-2">
            <button
              type="submit"
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Güncelle
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

export default EditCampaign;
