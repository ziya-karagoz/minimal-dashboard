import Card from "@base/components/common/cards/Card";
import { useFormik } from "formik";

import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { createServiceGroup } from "../core/api/service-group.requests";
import { IServiceGroupCreateRequest } from "../core/models/service-group.interface";
import AsyncSelect from "@base/components/common/selects/AsyncSelect";
import { loadBusinessLineOptions } from "../core/functions/service-group.functions";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Hizmet Grubu adı zorunludur"),
    description: Yup.string().required("Hizmet Grubu açıklaması zorunludur"),
    business_line: Yup.object().shape({
        value: Yup.number().required("İş Kolu zorunludur"),
    }),
});


const AddServiceGroup = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            business_line: {
                value: null,
                label: "İş Kolu Seçiniz"
            },
            active: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const reqBody: IServiceGroupCreateRequest = {
                active: values.active,
                business_line_id: parseInt(values.business_line.value!),
                description: values.description,
                name: values.name,
            };
            createServiceGroup(reqBody).then(() => {
                toast.success("Hizmet Grubu başarıyla eklendi");
                navigate(-1);
            });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Card>
                <Card.Header>
                    <h4 className="text-lg text-gray-800 font-bold">Hizmet Grubu Ekle</h4>
                </Card.Header>
                <Card.Body>
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-4">
                            <label
                                htmlFor="customer"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                İş Kolu
                            </label>
                            <div className="col-md-6">
                                <AsyncSelect
                                    isSearchable
                                    value={{
                                        value: formik.values.business_line?.value,
                                        label: formik.values.business_line?.label,
                                    }}
                                    onChange={(data) => {
                                        formik.setFieldValue("business_line", data);
                                    }}
                                    loadOptions={loadBusinessLineOptions}
                                    placeholder="İş Kolu Seçiniz"
                                />
                                {formik.touched.business_line && formik.errors.business_line ? (
                                    <p className="mt-2 text-sm text-red-500">
                                        {formik.errors.business_line?.value}
                                    </p>
                                ) : null}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                Adı
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                                placeholder="Örnek: Bilişim"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.name}
                                </p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-normal text-gray-600 "
                            >
                                Açıklaması
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.description}
                                </p>
                            )}
                        </div>

                        {/* active */}
                        <div className="mb-3">
                            <label className="inline-flex items-center mb-5 cursor-pointer ">
                                <input type="checkbox" value="" className="sr-only peer" checked={formik.values.active} onChange={formik.handleChange} id="active" name="active" />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                                <span className="ms-3 text-sm font-normal text-gray-600">Aktiflik Durumu</span>
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

export default AddServiceGroup;
