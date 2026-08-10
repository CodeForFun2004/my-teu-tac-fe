import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import Icon from "@/components/common/Icon";

interface WorkshopFormValues {
  fullName: string;
  phone: string;
  email: string;
  participants: string;
  workshopPackage: string;
  note: string;
}

const initialValues: WorkshopFormValues = {
  fullName: "",
  phone: "",
  email: "",
  participants: "",
  workshopPackage: "",
  note: "",
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ và tên"),
  phone: Yup.string()
    .matches(/^[0-9+ ]{9,15}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  participants: Yup.number()
    .typeError("Vui lòng nhập số")
    .min(1, "Tối thiểu 1 người")
    .required("Vui lòng nhập số lượng người tham gia"),
  workshopPackage: Yup.string().required("Vui lòng chọn gói Workshop"),
  note: Yup.string(),
});

const HIGHLIGHTS = [
  "Tìm hiểu nghệ thuật rối nước",
  "Hướng dẫn lắp ráp chi tiết từ nghệ nhân",
  "Mang thành phẩm mang dấu ấn cá nhân về nhà",
];

const WorkshopSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <section id="workshop" className="mx-auto max-w-container-max px-gutter py-section-gap md:px-margin-desktop">
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 font-headline-lg text-headline-lg text-secondary">Trải nghiệm Tễu Tạc</h2>
          <p className="mb-6 font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
            Tham gia không gian sáng tạo của chúng tôi để tự tay lắp ráp và thổi hồn vào những mô hình Tễu. Một trải
            nghiệm văn hóa độc đáo dành cho bạn và người thân.
          </p>
          <ul className="mb-8 space-y-4 font-body-md text-on-background">
            {HIGHLIGHTS.map((highlight) => (
              <li key={highlight} className="flex items-center gap-3">
                <Icon name="check_circle" className="text-secondary" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="ghost-border rounded-xl bg-surface-container-highest p-8">
          <h3 className="mb-6 font-headline-md text-[24px] text-secondary">Đăng ký Workshop</h3>

          {isSubmitted ? (
            <p className="font-body-md text-body-md text-secondary">
              Cảm ơn bạn đã đăng ký! Tễu Tạc sẽ liên hệ sớm để xác nhận lịch tham gia.
            </p>
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(_values, { resetForm }) => {
                setIsSubmitted(true);
                resetForm();
              }}
            >
              <Form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormInput name="fullName" placeholder="Họ và tên" />
                  <FormInput name="phone" type="tel" placeholder="Số điện thoại" />
                </div>
                <FormInput name="email" type="email" placeholder="Email" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormInput name="participants" type="number" placeholder="Số lượng người tham gia" />
                  <FormSelect
                    name="workshopPackage"
                    placeholder="Chọn gói Workshop"
                    options={[
                      { label: "Workshop Cơ Bản", value: "basic" },
                      { label: "Workshop Gia Đình", value: "family" },
                    ]}
                  />
                </div>
                <FormInput name="note" as="textarea" rows={3} placeholder="Ghi chú thêm (nếu có)" />
                <button
                  type="submit"
                  className="ghost-border mt-4 w-full rounded bg-deep-red px-6 py-3 font-label-lg text-label-lg text-inverse-surface transition-all hover:border-secondary"
                >
                  Đăng ký tham gia
                </button>
              </Form>
            </Formik>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkshopSection;
