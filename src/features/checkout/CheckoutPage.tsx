import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchOrder, refreshOrderStatus } from "@/features/checkout/checkoutSlice";
import Icon from "@/components/common/Icon";
import { formatCurrency } from "@/utils/formatCurrency";

const POLL_INTERVAL_MS = 5000;

const CheckoutPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const dispatch = useAppDispatch();
  const { currentOrder, status } = useAppSelector((state) => state.checkout);

  const isCurrentOrderLoaded = !!currentOrder && currentOrder.orderId === orderId;

  // Khách F5 trang thanh toán (hoặc mở link trực tiếp): Redux chưa có currentOrder trong bộ nhớ,
  // phải gọi lại GET /orders/:orderId để lấy đầy đủ dữ liệu thay vì báo "không tìm thấy" ngay.
  useEffect(() => {
    if (!orderId || isCurrentOrderLoaded) return;
    dispatch(fetchOrder(orderId));
  }, [dispatch, orderId, isCurrentOrderLoaded]);

  useEffect(() => {
    if (!orderId || currentOrder?.status !== "pending") return;

    const interval = setInterval(() => {
      dispatch(refreshOrderStatus(orderId));
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [dispatch, orderId, currentOrder?.status]);

  if (!isCurrentOrderLoaded && status === "loading") {
    return (
      <div className="mx-auto max-w-container-max px-gutter py-section-gap text-center md:px-margin-desktop">
        <Icon name="hourglass_top" className="mb-4 animate-pulse text-6xl text-secondary" />
        <p className="font-body-lg text-body-lg text-on-surface-variant">Đang tải thông tin đơn hàng...</p>
      </div>
    );
  }

  if (!isCurrentOrderLoaded) {
    return (
      <div className="mx-auto max-w-container-max px-gutter py-section-gap text-center md:px-margin-desktop">
        <Icon name="error" className="mb-4 text-6xl text-on-surface-variant/40" />
        <h1 className="mb-4 font-headline-lg text-headline-lg text-secondary">Không tìm thấy đơn hàng</h1>
        <p className="mb-8 font-body-lg text-body-lg text-on-surface-variant">
          Đơn hàng đã hết hạn phiên hoặc chưa được tạo. Vui lòng quay lại giỏ hàng để thử lại.
        </p>
        <Link
          to="/cart"
          className="inline-block rounded bg-deep-red px-8 py-3 font-label-lg text-label-lg text-inverse-surface transition-all hover:shadow-[0_0_15px_rgba(233,195,73,0.4)]"
        >
          Quay lại giỏ hàng
        </Link>
      </div>
    );
  }

  if (currentOrder.status === "paid") {
    return (
      <div className="mx-auto max-w-container-max px-gutter py-section-gap text-center md:px-margin-desktop">
        <Icon name="check_circle" className="mb-4 text-6xl text-secondary" />
        <h1 className="mb-4 font-headline-lg text-headline-lg text-secondary">Thanh toán thành công!</h1>
        <p className="mb-8 font-body-lg text-body-lg text-on-surface-variant">
          Cảm ơn bạn đã đặt hàng tại Tễu Tạc. Chúng tôi đã gửi email xác nhận và sẽ sớm liên hệ để giao hàng.
        </p>
        <Link
          to="/products"
          className="inline-block rounded bg-deep-red px-8 py-3 font-label-lg text-label-lg text-inverse-surface transition-all hover:shadow-[0_0_15px_rgba(233,195,73,0.4)]"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  if (currentOrder.status === "expired" || currentOrder.status === "failed") {
    return (
      <div className="mx-auto max-w-container-max px-gutter py-section-gap text-center md:px-margin-desktop">
        <Icon name="hourglass_disabled" className="mb-4 text-6xl text-error" />
        <h1 className="mb-4 font-headline-lg text-headline-lg text-secondary">
          {currentOrder.status === "expired" ? "Mã QR đã hết hạn" : "Thanh toán thất bại"}
        </h1>
        <p className="mb-8 font-body-lg text-body-lg text-on-surface-variant">
          Vui lòng quay lại giỏ hàng và đặt hàng lại để tạo mã thanh toán mới.
        </p>
        <Link
          to="/cart"
          className="inline-block rounded bg-deep-red px-8 py-3 font-label-lg text-label-lg text-inverse-surface transition-all hover:shadow-[0_0_15px_rgba(233,195,73,0.4)]"
        >
          Quay lại giỏ hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-container-max px-gutter py-section-gap md:px-margin-desktop">
      <div className="mb-12 text-center">
        <h1 className="mb-2 font-headline-lg text-headline-lg text-secondary">Thanh toán qua VietQR</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Quét mã QR bằng ứng dụng ngân hàng để hoàn tất đơn hàng #{currentOrder.orderId}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
        <div className="ghost-border flex flex-col items-center gap-4 rounded-lg bg-surface-container-high p-8 lg:col-span-7">
          <div className="flex h-64 w-64 items-center justify-center rounded bg-white p-3">
            {currentOrder.qrCodeText ? (
              <QRCodeSVG value={currentOrder.qrCodeText} size={232} level="M" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-on-surface-variant/50">
                <Icon name="qr_code_2" className="text-6xl" />
                <span className="max-w-48 text-center font-body-md text-sm">Đang tạo mã QR...</span>
              </div>
            )}
          </div>
          <p className="font-headline-sm text-headline-sm text-secondary">{formatCurrency(currentOrder.totalAmount)}</p>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <Icon name="hourglass_top" className="animate-pulse text-secondary" />
            <span className="font-label-lg text-label-lg">Đang chờ xác nhận thanh toán...</span>
          </div>
          <p className="text-center font-body-md text-sm text-on-surface-variant/70">
            Mã QR hết hạn lúc {new Date(currentOrder.expiresAt).toLocaleTimeString("vi-VN")}. Trang này sẽ tự cập
            nhật khi thanh toán được xác nhận.
          </p>
          {currentOrder.checkoutUrl && (
            <a
              href={currentOrder.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label-md text-label-md text-secondary underline hover:text-secondary/80"
            >
              Không quét được QR? Mở trang thanh toán
            </a>
          )}
        </div>

        <div className="ghost-border rounded-lg bg-surface-container p-8 lg:col-span-5">
          <h2 className="mb-6 border-b border-secondary/30 pb-4 font-headline-sm text-headline-sm text-secondary">
            Đơn hàng #{currentOrder.orderId}
          </h2>
          <div className="flex flex-col gap-4">
            {currentOrder.items.map((item) => (
              <div key={item.productId} className="flex justify-between font-body-md text-body-md">
                <span className="text-on-surface-variant">
                  {item.name} x{item.quantity}
                </span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-secondary/30 pt-4">
              <span className="font-headline-sm text-headline-sm text-on-background">Tổng cộng</span>
              <span className="font-headline-md text-headline-md text-secondary">
                {formatCurrency(currentOrder.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
