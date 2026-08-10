import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "@/features/cart/cartSlice";
import { createOrder } from "@/features/checkout/checkoutSlice";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormCheckbox from "@/components/forms/FormCheckbox";
import Icon from "@/components/common/Icon";
import { formatCurrency } from "@/utils/formatCurrency";

interface ShippingFormValues {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  addressDetail: string;
  note: string;
  confirmInfo: boolean;
}

// 34 tỉnh/thành phố trực thuộc trung ương sau sáp nhập, hiệu lực từ 12/6/2025 (Nghị quyết 60-NQ/TW, Nghị quyết 306/NQ-CP).
const PROVINCES = [
  { label: "An Giang", value: "an-giang" },
  { label: "Bắc Ninh", value: "bac-ninh" },
  { label: "Cà Mau", value: "ca-mau" },
  { label: "TP. Cần Thơ", value: "can-tho" },
  { label: "Cao Bằng", value: "cao-bang" },
  { label: "TP. Đà Nẵng", value: "da-nang" },
  { label: "Đắk Lắk", value: "dak-lak" },
  { label: "Điện Biên", value: "dien-bien" },
  { label: "Đồng Nai", value: "dong-nai" },
  { label: "Đồng Tháp", value: "dong-thap" },
  { label: "Gia Lai", value: "gia-lai" },
  { label: "TP. Hà Nội", value: "ha-noi" },
  { label: "Hà Tĩnh", value: "ha-tinh" },
  { label: "TP. Hải Phòng", value: "hai-phong" },
  { label: "TP. Hồ Chí Minh", value: "ho-chi-minh" },
  { label: "TP. Huế", value: "hue" },
  { label: "Hưng Yên", value: "hung-yen" },
  { label: "Khánh Hòa", value: "khanh-hoa" },
  { label: "Lai Châu", value: "lai-chau" },
  { label: "Lâm Đồng", value: "lam-dong" },
  { label: "Lạng Sơn", value: "lang-son" },
  { label: "Lào Cai", value: "lao-cai" },
  { label: "Nghệ An", value: "nghe-an" },
  { label: "Ninh Bình", value: "ninh-binh" },
  { label: "Phú Thọ", value: "phu-tho" },
  { label: "Quảng Ngãi", value: "quang-ngai" },
  { label: "Quảng Ninh", value: "quang-ninh" },
  { label: "Quảng Trị", value: "quang-tri" },
  { label: "Sơn La", value: "son-la" },
  { label: "Tây Ninh", value: "tay-ninh" },
  { label: "Thái Nguyên", value: "thai-nguyen" },
  { label: "Thanh Hóa", value: "thanh-hoa" },
  { label: "Tuyên Quang", value: "tuyen-quang" },
  { label: "Vĩnh Long", value: "vinh-long" },
];

const initialValues: ShippingFormValues = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  addressDetail: "",
  note: "",
  confirmInfo: false,
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ và tên"),
  phone: Yup.string()
    .matches(/^[0-9+ ]{9,15}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  city: Yup.string().required("Vui lòng chọn Tỉnh/Thành phố"),
  addressDetail: Yup.string().required("Vui lòng nhập địa chỉ cụ thể"),
  note: Yup.string(),
  confirmInfo: Yup.boolean().oneOf(
    [true],
    "Vui lòng xác nhận thông tin giao hàng",
  ),
});

const CartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-container-max px-gutter py-section-gap text-center md:px-margin-desktop">
        <Icon
          name="shopping_cart"
          className="mb-4 text-6xl text-on-surface-variant/40"
        />
        <h1 className="mb-4 font-headline-lg text-headline-lg text-secondary">
          Giỏ hàng của bạn đang trống
        </h1>
        <p className="mb-8 font-body-lg text-body-lg text-on-surface-variant">
          Hãy chọn một Tễu để bắt đầu hành trình lắp ráp của bạn.
        </p>
        <Link
          to="/products"
          className="inline-block rounded bg-deep-red px-8 py-3 font-label-lg text-label-lg text-inverse-surface transition-all hover:shadow-[0_0_15px_rgba(233,195,73,0.4)]"
        >
          Khám phá sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-container-max px-gutter py-section-gap md:px-margin-desktop">
      <div className="mb-12">
        <h1 className="mb-2 font-headline-lg text-headline-lg text-secondary">
          Giỏ hàng của bạn
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Kiểm tra lại các Tễu trước khi hoàn tất đơn hàng.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setIsSubmitting(true);
          const order = await dispatch(
            createOrder({
              shippingInfo: values,
              items: items.map((item) => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
              })),
            }),
          ).unwrap();
          dispatch(clearCart());
          navigate(`/checkout/${order.orderId}`);
        }}
      >
        <Form className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-8">
            {items.map((item) => (
              <div
                key={item.productId}
                className="ghost-border group relative flex items-center gap-6 rounded-lg bg-surface-container-high p-6 transition-colors duration-300 hover:border-secondary"
              >
                <div className="ghost-border h-32 w-32 flex-shrink-0 overflow-hidden rounded bg-surface-container-lowest">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Icon
                        name="image"
                        className="text-3xl text-on-surface-variant/40"
                      />
                    </div>
                  )}
                </div>
                <div className="flex h-32 flex-grow flex-col justify-between">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-background">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-body-md text-body-md text-secondary">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="ghost-border flex items-center rounded">
                      <button
                        type="button"
                        aria-label="Giảm số lượng"
                        onClick={() =>
                          dispatch(decrementQuantity(item.productId))
                        }
                        className="px-3 py-1 text-on-surface-variant transition-colors hover:text-secondary"
                      >
                        -
                      </button>
                      <span className="px-3 font-body-md text-body-md">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Tăng số lượng"
                        onClick={() =>
                          dispatch(incrementQuantity(item.productId))
                        }
                        className="px-3 py-1 text-on-surface-variant transition-colors hover:text-secondary"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="mb-1 font-label-md text-label-md text-on-surface-variant">
                        Tạm tính
                      </p>
                      <p className="font-headline-sm text-headline-sm text-secondary">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={`Xoá ${item.name} khỏi giỏ hàng`}
                  onClick={() => dispatch(removeItem(item.productId))}
                  className="absolute right-4 top-4 text-on-surface-variant transition-colors hover:text-error"
                >
                  <Icon name="delete" />
                </button>
              </div>
            ))}

            <Link
              to="/products"
              className="mt-4 inline-flex items-center gap-2 font-label-lg text-label-lg text-secondary hover:underline"
            >
              <Icon name="arrow_back" className="text-sm" />
              Tiếp tục mua sắm
            </Link>

            <section className="ghost-border mt-8 rounded-lg bg-surface-container-high p-8">
              <h2 className="mb-6 font-headline-sm text-headline-sm text-secondary">
                Thông tin giao hàng
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormInput
                  name="fullName"
                  label="Họ và tên *"
                  placeholder="Nguyễn Văn A"
                />
                <FormInput
                  name="phone"
                  type="tel"
                  label="Số điện thoại *"
                  placeholder="0901234567"
                />
                <div className="md:col-span-2">
                  <FormInput
                    name="email"
                    type="email"
                    label="Email *"
                    placeholder="nguyenvana@email.com"
                  />
                </div>
                <FormSelect
                  name="city"
                  label="Tỉnh / Thành phố *"
                  placeholder="Chọn Tỉnh / Thành phố"
                  options={PROVINCES}
                />
                <FormInput
                  name="addressDetail"
                  label="Địa chỉ cụ thể *"
                  placeholder="Số nhà, tên đường, phường/xã..."
                />
              </div>
            </section>

            <section className="ghost-border rounded-lg bg-surface-container-high p-8">
              <h2 className="mb-6 font-headline-sm text-headline-sm text-secondary">
                Bạn có câu hỏi hoặc yêu cầu gì thêm không?
              </h2>
              <FormInput
                name="note"
                as="textarea"
                rows={4}
                placeholder="Ví dụ: Giao hàng trong giờ hành chính, kiểm tra kỹ phụ kiện trước khi gửi, hoặc ghi chú khác cho đơn hàng..."
              />
            </section>

            <div className="px-2">
              <FormCheckbox
                name="confirmInfo"
                label="Tôi xác nhận thông tin giao hàng là chính xác."
              />
            </div>
          </div>

          <div className="ghost-border sticky top-28 overflow-hidden rounded-lg bg-surface-container p-8 lg:col-span-4">
            <div className="pointer-events-none absolute right-0 top-0 m-2 h-16 w-16 border-r-2 border-t-2 border-secondary opacity-30" />
            <h2 className="mb-6 border-b border-secondary/30 pb-4 font-headline-sm text-headline-sm text-secondary">
              Tóm tắt đơn hàng
            </h2>
            <div className="mb-6 flex flex-col gap-4">
              <div className="flex justify-between font-body-md text-body-md">
                <span className="text-on-surface-variant">Tạm tính</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between font-body-md text-body-md">
                <span className="text-on-surface-variant">Giảm giá</span>
                <span>{formatCurrency(0)}</span>
              </div>
              <div className="flex justify-between border-b border-secondary/30 pb-4 font-body-md text-body-md">
                <span className="text-on-surface-variant">Phí vận chuyển</span>
                <span className="text-sm italic">Tính ở bước sau</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-on-background">
                  Tổng cộng
                </span>
                <span className="font-headline-md text-headline-md text-secondary">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <label className="mb-2 block font-label-lg text-label-lg text-on-background">
                Mã ưu đãi
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập mã..."
                  className="w-full border-0 border-b border-secondary/50 bg-transparent px-0 py-2 font-body-md text-on-background placeholder:text-on-surface-variant focus:border-secondary focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  className="whitespace-nowrap rounded border border-secondary px-4 py-2 font-label-lg text-label-lg text-secondary transition-colors hover:bg-secondary/10"
                >
                  Áp dụng
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mb-8 flex w-full items-center justify-center gap-2 rounded bg-deep-red py-4 font-headline-sm text-headline-sm text-inverse-surface transition-all hover:shadow-[0_0_15px_rgba(233,195,73,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Đang tạo mã thanh toán..."
                : "Thanh toán qua VietQR"}
              <Icon name="arrow_forward" />
            </button>

            <div className="flex flex-col gap-3 border-t border-secondary/30 pt-6">
              <div className="flex items-center gap-3 text-on-surface-variant">
                <Icon
                  name="local_shipping"
                  className="text-secondary opacity-70"
                />
                <span className="font-label-md text-label-md">
                  Giao hàng qua GHTK
                </span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <Icon
                  name="build_circle"
                  className="text-secondary opacity-70"
                />
                <span className="font-label-md text-label-md">
                  Hỗ trợ thiếu hoặc lỗi linh kiện
                </span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <Icon
                  name="verified_user"
                  className="text-secondary opacity-70"
                />
                <span className="font-label-md text-label-md">
                  Sản phẩm được kiểm tra trước khi đóng gói
                </span>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CartPage;
