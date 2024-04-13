import Card from "@base/components/common/cards/Card";
import Loader from "@base/layout/components/loader/Loader";
import React from "react";
import { IEcommerceSettingResponse, IEcommerceSettingUpdateRequest } from "../core/models/settings.interface";
import { FetchStatus } from "@base/enums/api.enum";
import { getEcommerceSettings, updateEcommerceSettings } from "../core/api/settings.request";
import { useFormik } from "formik";
import toast from "react-hot-toast";

const EcommerceSettings = () => {
    const [eCommerceSettings, setEcommerceSettings] =
        React.useState<IEcommerceSettingResponse | null>(null);
    const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
        FetchStatus.IDLE
    );

    React.useEffect(() => {
        fetchEcommerceSettings();
    }, []);

    function fetchEcommerceSettings() {
        setFetchStatus(FetchStatus.LOADING);
        getEcommerceSettings()
            .then((response) => {
                setEcommerceSettings(response);
                setFetchStatus(FetchStatus.SUCCEEDED);
            })
            .catch(() => {
                setFetchStatus(FetchStatus.FAILED);
            });
    }

    const formik = useFormik({
        initialValues: {
            eCommerceSettings,
        },
        enableReinitialize: true,
        onSubmit: (values) => {

            let reqBody: IEcommerceSettingUpdateRequest = {
                shop_without_membership: values.eCommerceSettings?.shop_without_membership,
                can_be_ordered: values.eCommerceSettings?.can_be_ordered,
                payment_pay_at_the_door: values.eCommerceSettings?.payment_pay_at_the_door,
                payment_pay_at_the_door_credit_cart: values.eCommerceSettings?.payment_pay_at_the_door_credit_cart,
                payment_eft_transfer: values.eCommerceSettings?.payment_eft_transfer,
                payment_paytr: values.eCommerceSettings?.payment_paytr,
                payment_iyzico: values.eCommerceSettings?.payment_iyzico,
                paytr_merchant_id: values.eCommerceSettings?.paytr_merchant_id,
                paytr_merchant_key: values.eCommerceSettings?.paytr_merchant_key,
                paytr_merchant_salt: values.eCommerceSettings?.paytr_merchant_salt,
                paytr_installment_code: values.eCommerceSettings?.paytr_installment_code,
                iyzico_api_key: values.eCommerceSettings?.iyzico_api_key,
                iyzico_screet_key: values.eCommerceSettings?.iyzico_screet_key,
                iyzico_base_url: values.eCommerceSettings?.iyzico_base_url,
                payment_ozan_super: values.eCommerceSettings?.payment_ozan_super,
                ozan_super_api_key: values.eCommerceSettings?.ozan_super_api_key,
                ozan_super_screet_key: values.eCommerceSettings?.ozan_super_screet_key,
                order_notif_mail: values.eCommerceSettings?.order_notif_mail,
            };

            updateEcommerceSettings(reqBody)
                .then(() => {
                    toast.success("E-ticaret Ayarlar başarıyla güncellendi");
                    fetchEcommerceSettings();
                })
        },
    });

    if (fetchStatus !== FetchStatus.SUCCEEDED) {
        return <Loader isComponent />;
    }

    return (
        <div>
            <Card>
                <Card.Header>
                    <h4 className="font-semibold text-lg">E-ticaret Ayarları</h4>
                </Card.Header>
                <Card.Body>
                    <form
                        className="max-w-2xl mx-auto p-10"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-6">
                            <label className="inline-flex items-center mb-5 cursor-pointer ">
                                <input
                                    type="checkbox"
                                    checked={
                                        formik.values.eCommerceSettings?.shop_without_membership
                                    }
                                    onChange={formik.handleChange}
                                    name="eCommerceSettings.shop_without_membership"
                                    id="eCommerceSettings.shop_without_membership"
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                <span className="ms-3 text-sm font-normal text-gray-600">
                                    Üyeliksiz Alışveriş
                                </span>
                            </label>
                        </div>
                        <div className="mb-6">
                            <label className="inline-flex items-center mb-5 cursor-pointer ">
                                <input
                                    type="checkbox"
                                    checked={formik.values.eCommerceSettings?.can_be_ordered}
                                    onChange={formik.handleChange}
                                    name="eCommerceSettings.can_be_ordered"
                                    id="eCommerceSettings.can_be_ordered"
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                <span className="ms-3 text-sm font-normal text-gray-600">
                                    Sipariş Verilebilir
                                </span>
                            </label>
                        </div>
                        <div className="mb-6">
                            <label className="inline-flex items-center mb-5 cursor-pointer ">
                                <input
                                    type="checkbox"
                                    checked={
                                        formik.values.eCommerceSettings?.payment_pay_at_the_door
                                    }
                                    onChange={formik.handleChange}
                                    name="eCommerceSettings.payment_pay_at_the_door"
                                    id="eCommerceSettings.payment_pay_at_the_door"
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                <span className="ms-3 text-sm font-normal text-gray-600">
                                    Kapıda Ödeme
                                </span>
                            </label>
                        </div>
                        <div className="mb-6">
                            <label className="inline-flex items-center mb-5 cursor-pointer ">
                                <input
                                    type="checkbox"
                                    checked={
                                        formik.values.eCommerceSettings?.payment_pay_at_the_door_credit_cart
                                    }
                                    onChange={formik.handleChange}
                                    name="eCommerceSettings.payment_pay_at_the_door_credit_cart"
                                    id="eCommerceSettings.payment_pay_at_the_door_credit_cart"
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                <span className="ms-3 text-sm font-normal text-gray-600">
                                    Kapıda Kredi Kartı İle Ödeme
                                </span>
                            </label>
                        </div>
                        <div className="mb-6">
                            <label className="inline-flex items-center mb-5 cursor-pointer ">
                                <input
                                    type="checkbox"
                                    checked={
                                        formik.values.eCommerceSettings?.payment_eft_transfer
                                    }
                                    onChange={formik.handleChange}
                                    name="eCommerceSettings.payment_eft_transfer"
                                    id="eCommerceSettings.payment_eft_transfer"
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                <span className="ms-3 text-sm font-normal text-gray-600">
                                    EFT Havale
                                </span>
                            </label>
                        </div>
                        <div className="mb-1">
                            <label className="inline-flex items-center mb-5 cursor-pointer ">
                                <input
                                    type="checkbox"
                                    checked={formik.values.eCommerceSettings?.payment_paytr}
                                    onChange={(e) => {
                                        formik.setFieldValue('eCommerceSettings.payment_paytr', e.target.checked)
                                        if (e.target.checked) {
                                            formik.setFieldValue('eCommerceSettings.payment_iyzico', false)
                                            formik.setFieldValue('eCommerceSettings.payment_ozan_super', false)
                                        }
                                    }}
                                    name="eCommerceSettings.payment_paytr"
                                    id="eCommerceSettings.payment_paytr"
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                <span className="ms-3 text-sm font-normal text-gray-600">
                                    Pay TR
                                </span>
                            </label>
                        </div>
                        {formik.values.eCommerceSettings?.payment_paytr && (
                            <React.Fragment>
                                <div className="mb-1">
                                    <label className="block text-sm font-normal text-gray-600 mb-2">
                                        Merchant ID
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 px-5 py-2.5"
                                        value={formik.values.eCommerceSettings?.paytr_merchant_id}
                                        onChange={formik.handleChange}
                                        name="eCommerceSettings.paytr_merchant_id"
                                    />
                                </div>
                                <div className="mb-1">
                                    <label className="block text-sm font-normal text-gray-600 mb-2">
                                        Merchant Key
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 px-5 py-2.5"
                                        value={formik.values.eCommerceSettings?.paytr_merchant_key}
                                        onChange={formik.handleChange}
                                        name="eCommerceSettings.paytr_merchant_key"
                                    />
                                </div><div className="mb-1">
                                    <label className="block text-sm font-normal text-gray-600 mb-2">
                                        Merchant Salt
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 px-5 py-2.5"
                                        value={formik.values.eCommerceSettings?.paytr_merchant_salt}
                                        onChange={formik.handleChange}
                                        name="eCommerceSettings.paytr_merchant_salt"
                                    />
                                </div>
                                <div className="mb-1 pb-4 border-b border-gray-100">
                                    <label className="block text-sm font-normal text-gray-600 mb-2">
                                        Installment Code
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 px-5 py-2.5"
                                        value={formik.values.eCommerceSettings?.paytr_installment_code}
                                        onChange={formik.handleChange}
                                        name="eCommerceSettings.paytr_installment_code"
                                    />
                                </div>
                            </React.Fragment>

                        )}
                        {/* Iyzico */}
                        <div className="mb-1">
                            <label className="inline-flex items-center mb-5 cursor-pointer ">
                                <input
                                    type="checkbox"
                                    checked={formik.values.eCommerceSettings?.payment_iyzico}
                                    onChange={(e) => {
                                        formik.setFieldValue('eCommerceSettings.payment_iyzico', e.target.checked)
                                        if (e.target.checked) {
                                            formik.setFieldValue('eCommerceSettings.payment_paytr', false)
                                            formik.setFieldValue('eCommerceSettings.payment_ozan_super', false)
                                        }
                                    }}
                                    name="eCommerceSettings.payment_iyzico"
                                    id="eCommerceSettings.payment_iyzico"
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                <span className="ms-3 text-sm font-normal text-gray-600">
                                    Iyzico
                                </span>
                            </label>
                        </div>
                        {formik.values.eCommerceSettings?.payment_iyzico && (
                            <React.Fragment>
                                <div className="mb-1">
                                    <label className="block text-sm font-normal text-gray-600 mb-2">
                                        API Key
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 px-5 py-2.5"
                                        value={formik.values.eCommerceSettings?.iyzico_api_key}
                                        onChange={formik.handleChange}
                                        name="eCommerceSettings.iyzico_api_key"
                                    />
                                </div>
                                <div className="mb-1">
                                    <label className="block text-sm font-normal text-gray-600 mb-2">
                                        Screet Key
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 px-5 py-2.5"
                                        value={formik.values.eCommerceSettings?.iyzico_screet_key}
                                        onChange={formik.handleChange}
                                        name="eCommerceSettings.iyzico_screet_key"
                                    />
                                </div>
                                <div className="mb-1 pb-4 border-b border-gray-100">
                                    <label className="block text-sm font-normal text-gray-600 mb-2">
                                        Base URL
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 px-5 py-2.5"
                                        value={formik.values.eCommerceSettings?.iyzico_base_url}
                                        onChange={formik.handleChange}
                                        name="eCommerceSettings.iyzico_base_url"
                                    />
                                </div>
                            </React.Fragment>
                        )}
                        {/* Ozan Super */}
                        < div className="mb-1" >
                            <label className="inline-flex items-center mb-5 cursor-pointer ">
                                <input
                                    type="checkbox"
                                    checked={formik.values.eCommerceSettings?.payment_ozan_super}
                                    onChange={(e) => {
                                        formik.setFieldValue('eCommerceSettings.payment_ozan_super', e.target.checked)
                                        if (e.target.checked) {
                                            formik.setFieldValue('eCommerceSettings.payment_paytr', false)
                                            formik.setFieldValue('eCommerceSettings.payment_iyzico', false)
                                        }
                                    }}
                                    name="eCommerceSettings.payment_ozan_super"
                                    id="eCommerceSettings.payment_ozan_super"
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                <span className="ms-3 text-sm font-normal text-gray-600">
                                    Ozan Super
                                </span>
                            </label>
                        </div>
                        {formik.values.eCommerceSettings?.payment_ozan_super && (
                            <React.Fragment>
                                <div className="mb-1">
                                    <label className="block text-sm font-normal text-gray-600 mb-2">
                                        API Key
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 px-5 py-2.5"
                                        value={formik.values.eCommerceSettings?.ozan_super_api_key}
                                        onChange={formik.handleChange}
                                        name="eCommerceSettings.ozan_super_api_key"
                                    />
                                </div>
                                <div className="mb-1 pb-4">
                                    <label className="block text-sm font-normal text-gray-600 mb-2">
                                        Super Screet Key
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 px-5 py-2.5"
                                        value={formik.values.eCommerceSettings?.ozan_super_screet_key}
                                        onChange={formik.handleChange}
                                        name="eCommerceSettings.ozan_super_screet_key"
                                    />
                                </div>
                                <div className="mb-1 pb-4">
                                    <label className="block text-sm font-normal text-gray-600 mb-2">
                                        Sipariş Bildirim Maili
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 px-5 py-2.5"
                                        value={formik.values.eCommerceSettings?.order_notif_mail}
                                        onChange={formik.handleChange}
                                        name="eCommerceSettings.order_notif_mail"
                                    />
                                </div>
                            </React.Fragment>
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

export default EcommerceSettings;
