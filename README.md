# Portfolio · Nguyễn Gia Hân

Website portfolio tĩnh, song ngữ (Tiếng Việt / English), không cần build — mở `index.html` là chạy.

## Cấu trúc

```
├── index.html / index-en.html            Trang chủ
├── about.html / about-en.html            Giới thiệu
├── projects.html / projects-en.html      Danh sách dự án
├── project-furify(.html|-en.html)        Hồ sơ dự án Furify
├── project-cham(.html|-en.html)          Hồ sơ dự án CHẠM
├── project-vinamilk(.html|-en.html)      Hồ sơ dự án Vinamilk 100%
├── project-momo(.html|-en.html)          Hồ sơ dự án MoMo
├── contact.html / contact-en.html        Liên hệ
├── 404.html                              Trang lỗi
├── css/style.css                         Toàn bộ giao diện (token màu ở :root)
├── css/fonts.css + fonts/                Phông chữ tự lưu trữ (Bricolage Grotesque, Be Vietnam Pro, Patrick Hand)
├── js/main.js                            Tương tác dùng chung
├── assets/                               Ảnh dự án & icon công cụ
└── favicon.svg
```

## Phong cách
"Sổ tay nghiên cứu": nền giấy kẻ ô, bìa hồ sơ viền mực, tường bằng chứng với 4 ảnh ghim nối bằng chỉ đỏ ở trang chủ, bút dạ quang đánh dấu số liệu. Mỗi dự án có một màu riêng xuyên suốt hồ sơ (Furify tím, CHẠM xanh trời, Vinamilk xanh bạc hà, MoMo hồng).

## Tính năng
- Responsive desktop → mobile, menu dạng viên thuốc, chuyển ngôn ngữ VI/EN trên mọi trang.
- Ảnh ghim ở trang chủ rơi xuống khi tải trang; thanh tiến độ đọc, nút lên đầu trang.
- Bấm vào ảnh minh chứng trong hồ sơ dự án để phóng to (Esc để đóng).
- Trang liên hệ: bấm số điện thoại để gọi, email để soạn thư, nút Sao chép.
- Tôn trọng `prefers-reduced-motion`, có link "Bỏ qua đến nội dung", in ấn gọn.
- Meta SEO / Open Graph, `hreflang` cho từng cặp trang.

## Đổi nội dung
Sửa trực tiếp chữ trong file `.html` tương ứng (nhớ sửa cả bản `-en`). Đổi màu ở biến `:root` đầu `css/style.css`.

## Đưa lên mạng
Kéo thả cả thư mục vào **Netlify Drop**, hoặc đẩy lên GitHub rồi bật **GitHub Pages** / import vào **Vercel**. Không cần cấu hình gì thêm.
