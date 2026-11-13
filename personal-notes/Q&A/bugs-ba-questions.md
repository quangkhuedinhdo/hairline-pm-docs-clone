# Câu hỏi cho BA / PO

Cập nhật 2026-11-12. Nguồn: `samasu-group-…-e4ca76f4.xlsx` (127 issue BE, HAIRL-1554 → HAIRL-1766), đối chiếu với code trên `main` (`7f3a405f`, đã push), PRD trong `hairline-pm-docs` (bản 2026-11-10) và design trong `HL-Design`.
Số dòng PRD tính theo bản pm-docs hiện tại. Đường dẫn PRD: `hairline-pm-docs/project-requirements/functional-requirements/<fr>/prd.md`.

Cách trả lời: ghi dưới từng issue, ví dụ "HAIRL-1712 Q1: Có".

## Tóm tắt

| Trạng thái | Số issue |
|---|---|
| Xong (code trên `main`) | 83 |
| Xong một phần (phần còn lại là việc dev, không chờ BA; chi tiết trong `bugs-remaining-work.md` mục D) | 35 |
| **Chờ BA trả lời (mục 1 bên dưới)** | 8 |
| Chờ module khác (FR-037) | 1 |
| **Tổng** | 127 |

---

## 1. Câu hỏi còn mở (PRD chưa trả lời hoặc tự mâu thuẫn)

### HAIRL-1712 (A-09 / FR-028) — vị trí patient theo IP
PRD tự mâu thuẫn: `fr028-regional-config-pricing` dòng 97, 282, 593 và REQ-028-003 (dòng 768) yêu cầu lấy vị trí "from profile or IP geolocation", nhưng mục External Dependencies (dòng 562) ghi "None". Backend hiện chỉ dùng quốc gia trong profile (hoặc quốc gia app gửi lên).
- **Q1.** Có cần IP geolocation không? Nếu Có: dùng file MaxMind GeoLite2 đặt trên server (tra cứu nội bộ, không gọi dịch vụ ngoài, cần licence key miễn phí và job cập nhật định kỳ), đúng không?
**Q2.** Nếu Không: sửa FR-028, bỏ "IP geolocation", chỉ dùng quốc gia trong profile, đúng không?

### HAIRL-1740 (PR-02 / FR-003, FR-026) — thời hạn provider phản hồi inquiry
`fr003-inquiry-submission` Rule 2 (dòng 1030) "Providers must respond within 72 hours (configurable)" và Screen 9 (dòng 852) "Inquiry expiration configurable by admin". Nhưng `fr026-app-settings-security` Screen 5c Inquiry Configuration (dòng 600, 798) chỉ có treatment area và lead time. Backend hiện đọc biến môi trường `INQUIRY_RESPONSE_DEADLINE_HOURS` (mặc định 72).
- **Q1.** Thêm trường "Provider response window (giờ, mặc định 72)" vào FR-026 Screen 5c, đúng không? Nếu Không: ghi rõ trong FR-003 đây là cấu hình lúc triển khai, không có màn admin.

### HAIRL-1746 (PR-02 / FR-003, FR-004, FR-005, FR-022) — các điểm PRD chưa thống nhất
Phân tích đầy đủ trong repo backend: `docs/ba-questions/HAIRL-1746-product-decisions.md`. Những phần PRD đã quy định đều đã sửa trong code.
- **Q1. Kênh xin làm rõ inquiry (W3-G6, C1-G1).** FR-003 C1 (dòng 313–325) ghi provider xin làm rõ "via admin" nhưng không nói qua kênh nào. FR-034 có danh mục case (dòng 186, 241) nhưng không gắn được inquiry. Đề xuất: provider mở case FR-034 với danh mục mới "Inquiry clarification" kèm mã inquiry (không bắt buộc), admin chuyển lời cho patient. Đồng ý không?
- **Q2. Inquiry tự hết hạn (E7-G2).** FR-003 Rule 1 (dòng 1025) "Inquiry automatically expires if unquoted (configurable timeframe)" nhưng không có stage, luồng hay thông báo nào đi kèm, và system PRD EC-003 lại mô tả kết quả khác. Bỏ Rule 1 (chỉ giữ thời hạn phản hồi 72 giờ của từng provider), đúng không? Nếu Không: cần một change request định nghĩa stage, luồng và thông báo.
- **Q3. HPID (W1-G5, W2-G7).** FR-003 dòng 761 ghi "HPID + YY + MM + 4-digit sequence" và gọi đây là mã inquiry; FR-016, FR-022, FR-034 lại coi HPID là mã patient. Dữ liệu hiện có dạng `HPID2501-0001` và là mã patient. Thống nhất HPID = mã patient, định dạng `HPIDYYMM-NNNN`, và trường "Inquiry Reference" ở màn 8a/8b và FR-006 hiển thị HPID của patient, đúng không?
- **Q4. Bản nháp inquiry (A1-G1, A2-G2, A2-G3, US2-G1).** FR-003 dòng 131 và REQ-003-004 (dòng 1219) ghi "System saves draft" mà không nói lưu ở đâu; tech spec lưu trên thiết bị (`draft_inquiry`). Xác nhận bản nháp lưu trên thiết bị (không đồng bộ giữa các máy, hết hạn sau 7 ngày), và "incomplete/pending" chỉ là nhãn hiển thị trên app, không phải trạng thái API, đúng không?
- **Q5. Giới hạn 5 file (E1-G2).** FR-003 Screen 3 (dòng 529–530) ghi "Up to 5 images" và "Up to 5 videos", nhưng Business Rules (dòng 542) ghi "Visual evidence limited to 5 files total". Áp dụng tối đa 5 file cho ảnh và video cộng lại, đúng không? ✅Đồng ý
- **Q6. Schema.** Các cột `inquiry_providers.response_deadline_at`, `responded_at`, `sla_breach_notified_at` đang được dùng nhưng chưa có trong `system-data-schema.md` §5A. BA bổ sung vào schema, đúng không?

### HAIRL-1655 (PR-01 / FR-009) — người nhận việc khi xoá thành viên
`fr009-provider-team-roles` Screen 4 (dòng 409) ghi Reassignment Dropdown "Filters by role compatibility" nhưng không định nghĩa thế nào là "compatible". Design (`Provider/Setting & Support/Team/Remove or Suspend Team Member.png`) cho tìm bất kỳ thành viên nào.
- **Q1.** Mọi thành viên Active đều nhận được việc chuyển giao (không lọc theo vai trò), đúng không? Nếu Không: liệt kê vai trò được nhận cho từng loại việc (inquiry, quote, lịch hẹn, tin nhắn).✅Tạm thời cứ cho mọi thành viên được active đều nhận được việc chuyển giao

### HAIRL-1640 (PR-01 / FR-009) — lý do xoá thành viên
FR-009 Screen 4 (dòng 410) có "Removal Reason: select + textarea, Required Yes, Predefined reasons" nhưng không liệt kê lý do nào; Workflow bước 12 (dòng 252) lại ghi "reason (if provided)". Design modal Remove/Suspend **không có ô lý do**.
- **Q1.** Danh sách lý do: "Left the clinic", "Role change", "Performance", "Security concern", "Other" (chọn Other thì bắt buộc ghi chú). Đồng ý không? ✅Đồng ý với điều này
- **Q2.** Lý do là bắt buộc (theo Screen 4), và designer bổ sung ô này vào modal, đúng không? ✅Đồng ý với điều này

### HAIRL-1646 (PR-01 / FR-009) — nhóm hành động trong Activity Log
FR-009 Tab 2 (dòng 482–487) có bộ lọc "Login, Inquiry, Quote, Treatment, Patient Communication, Settings". Design (Team member → Activity Log) cũng dùng đúng 6 nhóm này, nhưng không nói hành động nào thuộc nhóm nào.
- **Q1.** Đề xuất:
  - Login: đăng nhập, đăng xuất, đổi mật khẩu.
  - Inquiry: xem, phản hồi, từ chối inquiry.
  - Quote: tạo, sửa, gửi, rút quote.
  - Treatment: lịch hẹn, ghi nhận điều trị, aftercare.
  - Patient Communication: tin nhắn, cuộc gọi.
  - Settings: hồ sơ, team, vai trò, thông báo, ngân hàng.

  Đồng ý không? ✅Đồng ý với điều này

### HAIRL-1654 (PR-01 / FR-009) — bộ lọc Region
FR-009 Screen 10 Provider Team Directory (màn admin, dòng 596) có "Filter by status, role, region", nhưng thành viên không có trường region.
- **Q1.** "Region" là quốc gia và thành phố của provider (FR-015 Tab 1 Location), đúng không?✅Đồng ý với điều này

### HAIRL-1659 (PR-05 / FR-032, FR-017) — tiền tệ nhận payout
`fr032-provider-dashboard-settings` Screen 4 Billing (dòng 1131–1178) không có trường tiền tệ; `fr017-payment-billing` Currency Rule 1 (dòng 1240) ghi "providers paid in their configured currency" nhưng không nói cấu hình ở đâu. Code hiện cho phép USD, AUD, BDT.
- **Q1.** Owner chọn tiền tệ nhận payout ở FR-032 Screen 4, từ danh sách tiền tệ đang hoạt động của FR-029, đúng không?

---

## 2. Câu hỏi cũ đã có đáp án trong PRD (đã bỏ khỏi danh sách)

Ghi lại để BA kiểm tra nhanh. Backend làm theo PRD; phần việc còn lại nằm trong `bugs-remaining-work.md`.

| Issue | Câu hỏi cũ | Đáp án trong PRD |
|---|---|---|
| HAIRL-1655 Q1, Q2 | Việc nào được tính khi xoá thành viên; có định tuyến hội thoại không | FR-009 Workflow bước 3 (dòng 247–250): inquiry, draft quote, lịch hẹn; B6 (dòng 283–293): tin nhắn chuyển sang người nhận việc |
| HAIRL-1652 | Thời hạn lời mời do admin chỉnh | FR-009 dòng 112, 137: cố định 7 ngày; CR-FR009-20261028-01 ghi "unchanged" |
| HAIRL-1690 | Danh sách quyền chỉ Owner có | FR-031 dòng 753, 763, 775: Manage Bank Details, Remove Team Members, Edit Settings |
| HAIRL-1659 Q1 | Manager/Billing có xem thông tin ngân hàng không | FR-032 Rule 4 và Screen 4: chỉ Owner; FR-031 dòng 856 |
| HAIRL-1637 | Còn chuyển tài khoản standalone vào clinic khi nhận lời mời không | CR-FR009-20261015 (global email identity) dòng 42, 76: chặn, không chuyển |
| HAIRL-1759 | Kiểm tra giờ hẹn; bỏ `schedule-quote`? | FR-004 dòng 273, 367: giờ hẹn chốt trên từng dòng option/ngày khi gửi quote; thay đổi sau đó qua FR-010 (REQ-004-037). Bỏ route là việc phối hợp với FE |
| HAIRL-1713 | Patient sửa bệnh sử | FR-002 Rule 2 trỏ sang FR-003; FR-003 dòng 743: patient sửa inquiry (cả bảng câu hỏi y tế) khi còn ở stage Inquiry |
| HAIRL-1626 | Đích "Hairline aftercare team"; bước xác nhận | FR-011 Screen 19: Target Type (provider hoặc team) + New Aftercare Team Member; lý do 10–1000 ký tự; Confirmation Summary rồi Confirm |
| HAIRL-1700 | Câu thông báo lỗi của danh sách lý do | FR-026 dòng 549–551, 582–583 đã nêu đủ quy tắc (không trùng, ít nhất 2 lý do active, "Other" cố định); câu chữ viết theo các quy tắc này |
| HAIRL-1738 | Lý do và tần suất job lưu trữ draft | FR-004 dòng 208, 881, 1020: tự lưu trữ sau 7 ngày; phần còn lại là chi tiết triển khai |
| HAIRL-1736 | Admin có được huỷ booking Confirmed/In Progress không | FR-006 dòng 142: được, từ Accepted, Payment Window Expired, Confirmed, In Progress, Aftercare (`docs/domain/booking-states.md` trong repo đã cũ) |
| HAIRL-1744 Q1, HAIRL-1732 | Câu thông báo khi quote đã bị rút / đã đổi phiên bản | FR-005 không quy định câu chữ; giữ câu đang dùng |
| HAIRL-1744 Q2 | Khi nào gửi `booking.provider_fault_replacement` | FR-020 dòng 59, FR-006 dòng 175: khi booking đã accept bị đóng vì lỗi provider, kể cả khi provider rút quote sau khi accept (backend cần bổ sung) |
| HAIRL-1742 | Loại file; khi nào patient được sửa inquiry | FR-003 Screen 3 (dòng 529–543): ảnh JPG/PNG ≤ 2 MB, video MP4 ≤ 30 giây và ≤ 20 MB (không có PDF); dòng 743: chỉ khi còn stage Inquiry |
| HAIRL-1755 | Có mã hoá log tìm kiếm không; xem log ở đâu | FR-022 REQ-022-027: có mã hoá; dòng 356: xem ở FR-016 Screen 7 |
| HAIRL-1757 | Thế nào là tài khoản trùng | FR-022 Edge Case 7 (dòng 2153–2154): cùng tên hoặc cùng email, đánh dấu trong kết quả tìm kiếm |
| HAIRL-1667, HAIRL-1661 | Cấu trúc item của package; versioning; admin chỉ được xem | FR-024 dòng 236, 491 (item có loại, giá thành phần, cờ included), 238 (kế hoạch theo ngày tương đối), 262–268 (version), 286–294 (clone), 56 (admin chỉ xem) |
| HAIRL-1704, HAIRL-1709 | Bảng câu hỏi có điều khiển cảnh báo y tế không; ảnh hưởng khi vô hiệu hoá treatment | FR-025 dòng 24, 30, 53: cảnh báo y tế sinh từ bộ câu hỏi active cho Inquiry; FR-024 A2 (dòng 152–167): báo số quote đang dùng, chặn chọn cho quote mới, quote/booking hiện có giữ nguyên |
| HAIRL-1745 | Patient chọn một provider có tính là định tuyến độc quyền không | FR-003 dòng 200–202 và B3: chỉ inquiry chuyển từ case theo dõi của FR-037 mới độc quyền; chờ FR-037 |
| HAIRL-1707 Q2 | Chuyển media treatment sang lưu trữ riêng tư | FR-024 Privacy Rule 3 (dòng 558): bắt buộc signed URL có thời hạn. Chọn công cụ quét virus (Q1) là quyết định hạ tầng, không phải câu hỏi BA |
| HAIRL-1746 (một phần) | Draft quote có đưa inquiry sang Quoted không; thứ tự chọn provider khi vượt 10; bộ lọc subquote của patient; prompt chi tiết y tế; tuỳ biến package trong quote | Đã có trong PRD: stage Quoted chỉ tính quote đã gửi (FR-004/FR-005); FR-003 dòng 109 (đánh giá tốt và admin curation); FR-022 User Story 5 và Screen dòng 444; FR-025; FR-004 dòng 102 |
| HAIRL-1720 (tất cả) | Chương trình tự động; mã không còn hợp lệ; design cộng dồn mã | FR-019 Screen 2 dòng 277, 305; Edge Cases; B2. Đã làm và merge (`35f5e95c`) |
| HAIRL-1583 | Chặn lưu khi hai admin sửa cùng lúc | CR-FR015-20261027-01, FR-015 dòng 452, 1169: last-save-wins, chỉ lưu trường có thay đổi, không kiểm tra xung đột. Expectation của issue đã lỗi thời; code làm theo PRD |

---

## 3. Design lệch PRD (BA chuyển cho designer)

| Issue | Design hiện tại | PRD |
|---|---|---|
| HAIRL-1640 | Modal Remove/Suspend Team Member không có ô lý do | FR-009 Screen 4 dòng 410: Removal Reason bắt buộc |
| HAIRL-1720 | Màn Apply Discount (app patient) cộng dồn mã với khuyến mãi của provider, không có nhãn phạm vi giảm giá, không có trạng thái lỗi; thư mục `Dashboard (Offers)` cho Accept ở cấp quote cha | FR-019 B2, Screen 11 dòng 673, 677, 681–682; FR-005 Rule 1 dòng 328, Screen 3 |

---

## 4. Trạng thái từng issue

### 4.1 Xong (83)

**A-01** (6)

| Issue | Nội dung |
|---|---|
| HAIRL-1747 | A-01 / FR-022 - Admin patient list and detail, quote audit trail, version history and Hairline Overview are readable with provider or patient sign-ins |
| HAIRL-1748 | A-01 / FR-004 - Quote version restore is open to providers, takes no reason and can revive expired, cancelled or accepted quotes |
| HAIRL-1750 | A-01 / FR-003 - Admin inquiry management has no actions screen, and reassignment, overrides, edits, archive and audit trail miss PRD rules |
| HAIRL-1752 | A-01 / FR-004 - Admin quote list shows only the latest quote per inquiry, rejects most quote statuses and has no Archived view, audit trail or version history |
| HAIRL-1754 | A-01 / FR-022 - Admin patient list drops status, Patient ID and age filters, lacks date range, provider picker, chips and empty-state guidance, and search debounce does not work |
| HAIRL-1755 | A-01 / FR-022 - Admin patient searches are not audit-logged or rate-limited |

**A-02** (44)

| Issue | Nội dung |
|---|---|
| HAIRL-1554 | A-02 / FR-015 - Status change does not require reason, admin password or confirmation |
| HAIRL-1555 | A-02 / FR-015 - Provider document download, notes and upload skip ownership checks |
| HAIRL-1556 | A-02 / FR-015 - Provider creation route has no admin permission check |
| HAIRL-1557 | A-02 / FR-015 - Quotes and bookings of a suspended provider can still be accepted and paid |
| HAIRL-1562 | A-02 / FR-015 - Reactivation has no Screen 5 modal |
| HAIRL-1564 | A-02 / FR-015 - Scheduled suspension and deactivation are not supported |
| HAIRL-1566 | A-02 / FR-015 - Deactivation modal does not list affected cases |
| HAIRL-1567 | A-02 / FR-015 - Suspended provider's profile can still be edited |
| HAIRL-1569 | A-02 / FR-015 - Wizard and server do not enforce all required provider fields |
| HAIRL-1572 | A-02 / FR-015 - Flat Rate Currency and commission Effective Date are not captured |
| HAIRL-1574 | A-02 / FR-015 - Admin edits to provider data take no reason for change |
| HAIRL-1575 | A-02 / FR-015 - Suspension and deactivation do not cancel or hand off the provider's cases |
| HAIRL-1576 | A-02 / FR-015 - No notifications are sent on suspension, deactivation or reactivation |
| HAIRL-1578 | A-02 / FR-015 - Flat-rate commission providers cannot be created |
| HAIRL-1579 | A-02 / FR-015 - Provider email uniqueness ignores team members, invitations and deactivated providers |
| HAIRL-1581 | A-02 / FR-022 - Provider list lacks rating, active patients and onboarding progress |
| HAIRL-1583 | A-02 / FR-015 - Concurrent admin saves overwrite each other silently |
| HAIRL-1585 | A-02 / FR-015 - Commission edit deletes history and does not follow PRD rules |
| HAIRL-1586 | A-02 / FR-015 - Flat commission is charged per payment and not snapshotted at booking |
| HAIRL-1588 | A-02 / FR-015 - Login as Provider does not work |
| HAIRL-1589 | A-02 / FR-015 - Provider documents are stored publicly and unencrypted |
| HAIRL-1591 | A-02 / FR-015 - Admins cannot process provider account-closure requests |
| HAIRL-1592 | A-02 / FR-015 - Inactive or not-activated providers still receive inquiries |
| HAIRL-1594 | A-02 / FR-015 - Provider search accepts more than 200 characters |
| HAIRL-1596 | A-02 / FR-015 - Provider list has no status count tiles |
| HAIRL-1598 | A-02 / FR-015 - Provider field limits differ from the PRD |
| HAIRL-1600 | A-02 / FR-015 - Commission values are silently clamped and past start dates accepted |
| HAIRL-1604 | A-02 / FR-015 - Wrong creation message and hidden activation email failure |
| HAIRL-1606 | A-02 / FR-015 - Profile Tab 1 is missing fields and cannot be edited in place |
| HAIRL-1608 | A-02 / FR-015 - Languages and Awards cannot be managed in profile tabs |
| HAIRL-1610 | A-02 / FR-015 - Admin can delete provider-uploaded documents and cannot replace files |
| HAIRL-1611 | A-02 / FR-015 - Staff tab seat usage shows 0 with staff members present |
| HAIRL-1613 | A-02 / FR-015 - Featured limit and Active-only rule are not enforced everywhere |
| HAIRL-1614 | A-02 / FR-015 - Self-service activation resend skips status, owner and rate-limit rules |
| HAIRL-1615 | A-02 / FR-022 - Provider search has no fuzzy or accent-insensitive matching |
| HAIRL-1617 | A-02 / FR-022 - Provider date filter has no Last Activity option |
| HAIRL-1618 | A-02 / FR-022 - Admin provider searches are not logged or rate-limited |
| HAIRL-1621 | A-02 / FR-015 - Seat limit below team size is rejected instead of confirmed |
| HAIRL-1623 | A-02 / FR-015 - Reviews tab has no review management |
| HAIRL-1624 | A-02 / FR-015 - Document audit entries are skipped or incomplete |
| HAIRL-1625 | A-02 / FR-015 - Active provider cannot be deactivated directly |
| HAIRL-1626 | A-02 / FR-015 - Aftercare reassignment accepts any provider |
| HAIRL-1629 | A-02 / FR-015 - Activity log lacks case links and support markers |
| HAIRL-1764 | A-02 / FR-015 - Admin screens and clients call legacy or duplicate endpoints that skip session revocation, audit and status rules |

**A-09** (7)

| Issue | Nội dung |
|---|---|
| HAIRL-1682 | A-09 / FR-031 - Admin API and settings changes do not check the admin's role permissions |
| HAIRL-1683 | A-09 / FR-028 - Provider sessions can reach admin-only regional grouping, patient management and global treatment actions |
| HAIRL-1685 | A-09 / FR-031 - Admin team invitation flow is missing: no Invite button, pending list, resend or account setup page |
| HAIRL-1686 | A-09 / FR-031 - Suspended admin keeps working in an already open session |
| HAIRL-1694 | A-09 / FR-026 - Saving the authentication throttling policy fails because the fixed OTP code length is required |
| HAIRL-1700 | A-09 / FR-026 - Inquiry cancellation reasons fail with "Validation failed" and miss the uniqueness and minimum rules |
| HAIRL-1707 | A-09 / FR-024 - Treatment media files are publicly reachable and uploads are not virus-scanned |

**PR-01** (3)

| Issue | Nội dung |
|---|---|
| HAIRL-1637 | PR-01 / FR-009 - Invites accept other providers' emails and signup takes over the existing account |
| HAIRL-1638 | PR-01 / FR-009 - Removed team member keeps access, and removal fails for invited staff |
| HAIRL-1648 | PR-01 / FR-009 - Admin console has no cross-provider Provider Team Directory |

**PR-02** (18)

| Issue | Nội dung |
|---|---|
| HAIRL-1713 | PR-02 / FR-003 - Providers and signed-out callers can open or change inquiries and medical data they are not entitled to |
| HAIRL-1716 | PR-02 / FR-004 - Providers can create, edit and restore quotes on inquiries and quotes they do not own |
| HAIRL-1717 | PR-02 / FR-003 - Suspended, deactivated and not-activated providers still receive inquiries and can create or edit quotes |
| HAIRL-1718 | PR-02 / FR-004 - Suspending or deactivating a provider does not cancel its quotes, holds and bookings or tell affected patients |
| HAIRL-1719 | PR-02 / FR-005 - Patient can cancel an inquiry after accepting a quote, and the accepted quote and acceptance record are overwritten |
| HAIRL-1720 | PR-02 / FR-005 - Promotions are not reserved, frozen or released correctly, and a patient's code is written onto the provider's quote |
| HAIRL-1724 | PR-02 / FR-004 - Quotes can be sent with a zero price, and tab validations and clinician checks differ from the PRD |
| HAIRL-1728 | PR-02 / FR-004 - Expired, cancelled and other-accepted quotes can still be edited, and providers see no locked state, badge or banner |
| HAIRL-1730 | PR-02 / FR-004 - Accepting a quote sends no selected or not-selected notices, and the older acceptance path sets the wrong statuses |
| HAIRL-1731 | PR-02 / FR-005 - Quote acceptance is not safe against double acceptance, and the appointment slot hold is not placed, checked or released |
| HAIRL-1733 | PR-02 / FR-005 - The post-acceptance payment window does not expire, remind the patient or release the booking |
| HAIRL-1736 | PR-02 / FR-005 - Admin booking cancellation does not cancel the inquiry, release the slot or notify the patient and provider |
| HAIRL-1739 | PR-02 / FR-003 - Inquiry cancellation writes no audit entry, sends the patient's reason to providers and overwrites closed quotes |
| HAIRL-1743 | PR-02 / FR-003 - Inquiries closed by account deletion keep their quotes open, store no reason and do not notify providers |
| HAIRL-1759 | PR-02 / FR-004 - Provider quote reads, documents, schedules, clinician assignment and shared treatments skip ownership and permission checks |
| HAIRL-1760 | PR-02 / FR-003 - Recent inquiries, inquiry distribution and quote detail return patient identity to providers before payment |
| HAIRL-1765 | PR-02 / FR-004 - Quote expiry never matches stored quotes, statuses have no single transition rule, and quote date edits skip range and overlap checks |
| HAIRL-1766 | PR-02 / FR-003 - Pre-payment display of the patient's first name and head photos needs a product decision |

**PR-06** (5)

| Issue | Nội dung |
|---|---|
| HAIRL-1656 | PR-06 / FR-024 - Providers can see and change other providers' packages, and packages are hard-deleted |
| HAIRL-1657 | PR-06 / FR-032 - Profile and award saves can reach another provider and admin-only fields, and award images are not virus-scanned |
| HAIRL-1665 | PR-06 / FR-032 - Uploaded provider documents are not saved |
| HAIRL-1670 | PR-06 / FR-032 - Suspended providers cannot log in to a view-only dashboard, and suspended accounts can still edit |
| HAIRL-1681 | PR-06 / FR-032 - Award delete timing, notification edge cases and graft-range rules need product decisions |

### 4.2 Xong một phần (35) — phần còn lại là việc dev, xem `bugs-remaining-work.md` mục D

| Issue | Nội dung |
|---|---|
| HAIRL-1642 | PR-01 / FR-009 - Role change ignores custom roles, Owner lock and Screen 3 rules |
| HAIRL-1650 | PR-01 / FR-009 - Invitation lacks names, message, inline validation and delivery-failure handling |
| HAIRL-1652 | PR-01 / FR-009 - Invitation resend, expiry, seat limit and rate limit do not follow FR-009 |
| HAIRL-1661 | PR-06 / FR-024 - Package catalog cannot create or clone packages, and edits and deactivation break the version and usage rules |
| HAIRL-1663 | PR-06 / FR-024 - Treatment pricing lets providers pick a currency and does not show Not Configured or Offered states |
| HAIRL-1667 | PR-06 / FR-024 - Package form misses typed items, travel services, the day plan and the PRD validation rules |
| HAIRL-1668 | PR-06 / FR-032 - Profile, award, language, account and billing changes are not audit-logged, and awards are hard-deleted |
| HAIRL-1672 | PR-06 / FR-032 - Profile edit accepts invalid fields and images, loses unsaved changes and allows removing the last language |
| HAIRL-1674 | PR-06 / FR-032 - Mandatory notices can be switched off and notification preferences are not applied correctly |
| HAIRL-1676 | PR-06 / FR-032 - Account settings use a fixed timezone list, ignore the timezone, and skip phone and password rules |
| HAIRL-1678 | PR-06 / FR-024 - Quote creation ignores provider packages, provider pricing and deactivated treatments |
| HAIRL-1680 | PR-06 / FR-022 - Provider Help Centre and Reviews use patient or mock data and miss the FR-022 filters |
| HAIRL-1688 | A-09 / FR-031 - Admin role change lacks Effective From, permission comparison, notice and last Super Admin rules |
| HAIRL-1690 | A-09 / FR-031 - Role permission editing lets custom provider roles take Owner-only permissions and blocks default role edits |
| HAIRL-1692 | A-09 / FR-031 - Audit trail misses denied access and key admin events, lacks filters, and Admin Users search misses full names |
| HAIRL-1696 | A-09 / FR-026 - Quote Configuration settings group is missing |
| HAIRL-1698 | A-09 / FR-026 - Settings dashboard misses setting groups, and Inquiry Configuration, version history and concurrent-edit protection are incomplete |
| HAIRL-1702 | A-09 / FR-025 - Inquiry questionnaire questions are not saved, and sets cannot be published or made active |
| HAIRL-1704 | A-09 / FR-025 - Active questionnaire does not drive the inquiry form and alerts, and aftercare, category, context and history screens are incomplete |
| HAIRL-1706 | A-09 / FR-028 - Regional groupings and location pricing miss PRD rules, audit, currency conversion and bulk tools |
| HAIRL-1709 | A-09 / FR-024 - Admin treatment catalog create, edit, deactivate and media rules are incomplete |
| HAIRL-1711 | A-09 / FR-026 - Other setting groups are incomplete or show mock data: countries, OTP templates, discovery, deletion reasons, analytics, specialties, Help Centre, commission and notification rules |
| HAIRL-1715 | PR-02 / FR-022 - Provider inquiry and quote lists expose patient names, and search, filters and paging do not follow the PRD |
| HAIRL-1722 | PR-02 / FR-004 - Quotes cannot be built from up to five package-based options, and option edits change the shared package library |
| HAIRL-1726 | PR-02 / FR-004 - Quotes skip the draft stage, take currency and expiry from the provider, and edits are not versioned before the patient is notified |
| HAIRL-1729 | PR-02 / FR-004 - Quote expiry stops when quote notifications are off, misses older quotes, and does not notify the provider or write an audit entry |
| HAIRL-1732 | PR-02 / FR-005 - Acceptance does not check the quote version, keep a snapshot or show the right messages, and offers are not sorted as specified |
| HAIRL-1735 | PR-02 / FR-005 - Admin cannot assign inquiries, edit quote options, restore archived quotes, author replacement quotes or oversee acceptances |
| HAIRL-1738 | PR-02 / FR-004 - Archiving a quote leaves its status unchanged, providers cannot archive from the dashboard, and abandoned drafts are never archived |
| HAIRL-1741 | PR-02 / FR-005 - Acceptance, withdrawal, admin quote edits, account-deletion closure and medical-history edits leave no complete audit trail |
| HAIRL-1742 | PR-02 / FR-003 - Inquiry submission accepts wrong files, sizes and incomplete data, and patients cannot edit a submitted inquiry |
| HAIRL-1744 | PR-02 / FR-004 - Providers cannot withdraw an accepted quote, and withdrawal sends no notices and does not start the provider-fault transfer |
| HAIRL-1757 | A-01 / FR-022 - Admin search has no fuzzy matching, failure, timeout or large-result handling or duplicate-account flag, and Help Centre search does not sanitise input |
| HAIRL-1758 | A-01 / FR-004 - Admin replacement quote and acceptance miss preconditions, the supersession record, the supportRequired flag, notices and the conflict flag |
| HAIRL-1761 | Cross-module / FR-032 - Production screens and APIs show sample, mock or random data instead of live data |

### 4.3 Chờ BA (8) — xem mục 1

| Issue | Nội dung |
|---|---|
| HAIRL-1640 | PR-01 / FR-009 - Remove member flow has no responsibilities, reassignment, reason or notifications |
| HAIRL-1646 | PR-01 / FR-009 - Activity log blocks Owners and misses events, IP addresses and filters |
| HAIRL-1654 | PR-01 / FR-022 - Team list search and filters do not follow FR-022 |
| HAIRL-1655 | PR-01 / FR-009 - Removal workload, blocked-removal audit, conversation routing and role compatibility need product decisions |
| HAIRL-1659 | PR-06 / FR-032 - Bank details are open to non-Owners, stored unencrypted and saved without format validation |
| HAIRL-1712 | A-09 / FR-026 - Settings roles, apply-to scope, regional store and pricing fallback need product decisions |
| HAIRL-1740 | PR-02 / FR-003 - Inquiry distribution failures are silent, the patient delay notice is missing, and the response deadline is hard-coded |
| HAIRL-1746 | PR-02 / FR-003 - Inquiry drafts, HPID format, clarification requests, auto-expiry and other open rules need product decisions |

### 4.4 Chờ module khác (1)

| Issue | Nội dung |
|---|---|
| HAIRL-1745 | PR-02 / FR-003 - Inquiries for a specific provider are not routed exclusively to that provider, and the decline path is missing |
