import { useFormik } from "formik";
import * as Yup from "yup";
import Card from "@base/components/common/cards/Card";
import QuillEditor from "@base/components/common/quill/QuillEditor";
import ImagePicker from "@base/components/common/image-picker/ImagePicker";
import { urlTextify } from "@base/helpers/methods/methods";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import Loader from "@base/layout/components/loader/Loader";
import { IDynamicComponentResponse } from "../core/models/dynamic-component.interface";
import {
  getDynamicComponent,
  updateDynamicComponent,
} from "../core/api/dynamic-component.request";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Başlık zorunludur"),
  description: Yup.string().required("Açıklama zorunludur"),
  short_description: Yup.string().required("Kısa Açıklama zorunludur"),
  main_image: Yup.string().required("Ana görsel zorunludur"),
  active: Yup.string().required("Durum zorunludur"),
});
const EditDynamicComponent = () => {
  const navigate = useNavigate();
  const { id: dynamicComponentId } = useParams();
  const [dynamicComponent, setDynamicComponent] =
    React.useState<IDynamicComponentResponse | null>(null);
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
    FetchStatus.IDLE
  );

  React.useEffect(() => {
    if (dynamicComponentId) {
      setFetchStatus(FetchStatus.LOADING);
      getDynamicComponent(parseInt(dynamicComponentId)).then((res) => {
        setDynamicComponent(res);
        setFetchStatus(FetchStatus.SUCCEEDED);
      });
    }
  }, [dynamicComponentId]);
  const formik = useFormik({
    initialValues: {
      title: dynamicComponent?.title ?? "",
      short_description: dynamicComponent?.short_description ?? "",
      description: dynamicComponent?.description ?? "",
      main_image: dynamicComponent?.main_image ?? "",
      active: dynamicComponent?.active ?? false,
    } as IDynamicComponentResponse,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateDynamicComponent({
        id: parseInt(dynamicComponentId!),
        data: values,
      })
        .then(() => {
          toast.success("Bileşenler başarıyla güncellendi");
          navigate(-1);
        })
        .catch(() => {
          toast.error("Bir hata oluştu");
        });
    },
  });

  if (fetchStatus !== FetchStatus.SUCCEEDED) return <Loader isComponent />;

  return (
    <form className="container" onSubmit={formik.handleSubmit}>
      <Card>
        <Card.Header>
          <h4 className="text-lg font-bold">Bileşen Düzenle</h4>
        </Card.Header>
        <Card.Body>
          <div className="max-w-3xl mx-auto p-10">
            <div className="mb-3">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-normal text-gray-600"
              >
                Başlık
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                value={formik.values.title}
                onChange={(event) => {
                  formik.setFieldValue("url", urlTextify(event.target.value));
                  formik.setFieldValue("title", event.target.value);
                  formik.setFieldValue("meta_title", event.target.value);
                }}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.title}
                </p>
              )}
            </div>
            {/* image */}
            <div className="mb-3">
              <label
                htmlFor="short_description"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Kısa Açıklama
              </label>
              <QuillEditor
                editorHtml={formik.values?.short_description}
                name="short_description"
                setEditorHtml={(_, __, data) => {
                  formik.setFieldValue("short_description", data);
                }}
              />
              {formik.touched.short_description &&
                formik.errors.short_description && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors?.short_description}
                  </p>
                )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Açıklama
              </label>
              <QuillEditor
                editorHtml={formik.values?.description}
                name="description"
                setEditorHtml={(_, __, data) => {
                  formik.setFieldValue("description", data);
                }}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.description}
                </p>
              )}
            </div>{" "}
            <div className="mb-3">
              <label
                htmlFor="main_image"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Resim
              </label>
              <ImagePicker
                value={formik.values.main_image}
                onChange={(value) => {
                  formik.setFieldValue("main_image", value);
                }}
                exClass="items-start"
              />
              {formik.touched.main_image && formik.errors.main_image && (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.main_image}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="inline-flex items-center mb-5 cursor-pointer ">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={formik.values.active}
                  onChange={formik.handleChange}
                  id="active"
                  name="active"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-red-500"></div>
                <span className="ms-3 text-sm font-normal text-gray-600">
                  Durum{" "}
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

export default EditDynamicComponent;
