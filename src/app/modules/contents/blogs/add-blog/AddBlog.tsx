import { useFormik } from "formik";
import * as Yup from "yup";
import Card from "@base/components/common/cards/Card";
import QuillEditor from "@base/components/common/quill/QuillEditor";
import ImagePicker from "@base/components/common/image-picker/ImagePicker";
import { urlTextify } from "@base/helpers/methods/methods";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { IBlogRequest } from "../core/models/blog.interface";
import { addBlog } from "../core/api/blog.request";
import AsyncSelect from "@base/components/common/selects/AsyncSelect";
import { loadBlogCategoryOptions } from "../core/functions/blog.functions";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Blog başlığı zorunludur"),
  description: Yup.string().required("Blog açıklaması zorunludur"),
  short_description: Yup.string().required("Blog açıklaması zorunludur"),
  meta_description: Yup.string().required("Meta açıklaması zorunludur"),
  meta_keywords: Yup.string().required("Meta anahtar kelimeleri zorunludur"),
  meta_title: Yup.string().required("Meta başlığı zorunludur"),
  url: Yup.string().required("Url zorunludur"),
  main_image: Yup.string().required("Ana görsel zorunludur"),
  active: Yup.string().required("Durum zorunludur"),
  category: Yup.object().shape({
    value: Yup.number().required("Kategori zorunludur"),
    label: Yup.string().required("Kategori zorunludur"),
  }),
});
const AddBlog = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      short_description: "",
      description: "",
      meta_title: "",
      meta_description: "",
      main_image: "",
      meta_keywords: "",
      url: "",
      active: true,
      category: {
        value: null,
        label: "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const valuesToSend: IBlogRequest = {
        title: values.title,
        short_description: values.short_description,
        description: values.description,
        url: values.url,
        meta_title: values.meta_title,
        main_image: values.main_image,
        meta_description: values.meta_description,
        meta_keywords: values.meta_keywords,
        active: values.active,
        category_id: values.category?.value ?? 0,
      };
      addBlog(valuesToSend).then(() => {
        toast.success("Blog başarıyla eklendi");
        navigate(-1);
      });
    },
  });

  return (
    <form className="container" onSubmit={formik.handleSubmit}>
      <Card>
        <Card.Header>
          <h4 className="text-lg font-bold">Blog Ekle</h4>
        </Card.Header>
        <Card.Body>
          <div className="max-w-3xl mx-auto p-10">
            <div className="mb-3">
              <label
                htmlFor="category_id"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Blog Kategorisi
              </label>
              <AsyncSelect
                isSearchable
                value={{
                  value: formik.values.category?.value,
                  label: formik.values.category?.label,
                }}
                onChange={(data) => {
                  formik.setFieldValue("category", data);
                }}
                loadOptions={loadBlogCategoryOptions}
                placeholder="Kategori Seçiniz"
              />
              {formik.touched.category && formik.errors.category ? (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.category?.value}
                </p>
              ) : null}
            </div>
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
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Url{" "}
              </label>
              <input
                type="text"
                id="url"
                name="url"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                value={formik.values.url}
                onChange={formik.handleChange}
              />
              {formik.touched.url && formik.errors.url && (
                <p className="mt-2 text-sm text-red-500">{formik.errors.url}</p>
              )}
            </div>{" "}
            <div className="mb-3">
              <label
                htmlFor="meta_title"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Meta Başlık{" "}
              </label>
              <input
                type="text"
                id="meta_title"
                name="meta_title"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                value={formik.values.meta_title}
                onChange={formik.handleChange}
              />
              {formik.touched.meta_title && formik.errors.meta_title && (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.meta_title}
                </p>
              )}
            </div>{" "}
            <div className="mb-3">
              <label
                htmlFor="meta_description"
                className="block mb-2 text-sm font-normal text-gray-600 "
              >
                Meta Açıklama
              </label>
              <textarea
                id="meta_description"
                name="meta_description"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                value={formik.values.meta_description}
                onChange={formik.handleChange}
              />
              {formik.touched.meta_description &&
                formik.errors.meta_description && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.meta_description}
                  </p>
                )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="meta_keywords"
                className="block mb-2 text-sm font-normal text-gray-600"
              >
                Meta Kelimeler{" "}
              </label>
              <input
                type="text"
                id="meta_keywords"
                name="meta_keywords"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md focus:outline-red-100 block w-full p-2.5"
                value={formik.values.meta_keywords}
                onChange={formik.handleChange}
              />
              {formik.touched.meta_keywords && formik.errors.meta_keywords && (
                <p className="mt-2 text-sm text-red-500">
                  {formik.errors.meta_keywords}
                </p>
              )}
            </div>{" "}
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

export default AddBlog;
