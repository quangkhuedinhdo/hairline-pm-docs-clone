# Sample Input — FR-017 Screen 6: Affiliate Billing — Commission Payouts

Source: `personal-notes/wireframes/fr017-screen6-affiliate-billing-commission-payouts.html`

This screen has two tabs, each with its own table. Draw both as separate Figma frames.

---

## Table 1 — Pending Payouts Tab

**Table type**: `multi-section`
**Frame name**: `Screen 6 – Pending Payouts`
**Note**: Two section-header rows divide the table — Pending rows and Failed rows. The `Payout Readiness` and `Failure Reason` columns are only meaningful for these states; cells are `—` when not applicable.

| Affiliate Name | Affiliate ID | Payout Reference | Discount Code(s) | Payout Period | Total Referrals | Total Referral Revenue | Commission Rate | Commission Earned | Payment Status | Payout Readiness | Payment Method | Payment Destination | Payment Date | Processed At | Stripe Transfer ID | Failure Reason | Processed By |
| -------------- | ------------ | ---------------- | ---------------- | ------------- | --------------- | ---------------------- | --------------- | ----------------- | -------------- | ---------------- | -------------- | ------------------- | ------------ | ------------ | ------------------ | -------------- | ------------ |
| **⏳ Pending — Awaiting Processing** | | | | | | | | | | | | | | | | | |
| Sarah Mitchell | HP-AFF-00012 | PAY-AFF-2026-0312 | SARAH20, SARAH10 | 01-03-2026 to 31-03-2026 | 18 | £28,400.00 | 8% | £2,272.00 | Pending | Ready | Bank Transfer | ****4921 | — | — | — | — | — |
| TurkeyMed Referrals Ltd | HP-AFF-00007 | PAY-AFF-2026-0307 | TURKEYMED15 | 01-03-2026 to 31-03-2026 | 31 | £62,000.00 | 15% | £9,300.00 | Pending | Ready | Bank Transfer | ****8820 | — | — | — | — | — |
| Marcus Webb | HP-AFF-00019 | PAY-AFF-2026-0319 | WEBB10 | 01-03-2026 to 31-03-2026 | 7 | £11,200.00 | 10% | £1,120.00 | Pending | Missing Destination | — | — | — | — | — | Affiliate has not provided payout destination. Update in FR-018 before processing. | — |
| Priya Kapoor Agency | HP-AFF-00022 | PAY-AFF-2026-0322 | PRIYA15 | 01-03-2026 to 31-03-2026 | 13 | £19,500.00 | 15% | £2,925.00 | Pending | Ready | Bank Transfer | ****6612 | — | — | — | — | — |
| Wellness Referrals Ltd | HP-AFF-00028 | PAY-AFF-2026-0328 | WELL10 | 01-03-2026 to 31-03-2026 | 21 | £37,800.00 | 10% | £3,780.00 | Pending | Ready | Bank Transfer | ****2255 | — | — | — | — | — |
| Apex Partners | HP-AFF-00055 | PAY-AFF-2026-0355 | APEX20 | 01-03-2026 to 31-03-2026 | 9 | £14,400.00 | 20% | £2,880.00 | Pending | Ready | Bank Transfer | ****8801 | — | — | — | — | — |
| NordicHair Group | HP-AFF-00041 | PAY-AFF-2026-0341 | NORDIC12 | 01-03-2026 to 31-03-2026 | 6 | £9,000.00 | 12% | £1,080.00 | Pending | Manual Review Required | Bank Transfer | ****9934 | — | — | — | Commission disputed in FR-018. Resolve dispute before processing payout. | — |
| GlowUp Network | HP-AFF-00033 | PAY-AFF-2026-0333 | GLOW8 | 01-03-2026 to 31-03-2026 | 3 | £4,800.00 | 8% | £384.00 | Pending | Missing Destination | — | — | — | — | — | Affiliate has not provided payout destination. Update in FR-018 before processing. | — |
| **⚠️ Failed / Requires Retry** | | | | | | | | | | | | | | | | | |
| Hana Referrals Co. | HP-AFF-00004 | PAY-AFF-2026-0204 | HANA25 | 01-02-2026 to 28-02-2026 | 11 | £22,000.00 | 12% | £2,640.00 | Failed | Ready | Bank Transfer | ****3377 | — | 02-04-2026 09:03:11 UTC | tr_3Qx8... | Stripe transfer rejected — invalid account number. Destination updated by affiliate on 05-04-2026. | `admin@hairlinepm.com` |
| ZenHair Partners | HP-AFF-00031 | PAY-AFF-2026-0231 | ZENHAIR5 | 01-02-2026 to 28-02-2026 | 4 | £6,800.00 | 5% | £340.00 | Failed | Invalid Destination | Bank Transfer | ****0001 | — | 02-04-2026 09:04:45 UTC | tr_3Qx9... | Destination account closed. Affiliate must update payout details in FR-018 before retry. | `admin@hairlinepm.com` |

**Section detection rule**: Rows where the first cell is bold and starts with an emoji (`⏳`, `⚠️`) are section-header rows spanning all columns — render using `sectionHeader.*` tokens.

---

## Table 2 — Paid Payouts Tab

**Table type**: `data`
**Frame name**: `Screen 6 – Paid Payouts`
**Note**: No checkbox column. No `Payout Readiness` or `Failure Reason` columns. Read-only view.

| Affiliate Name | Affiliate ID | Payout Reference | Discount Code(s) | Payout Period | Total Referrals | Total Referral Revenue | Commission Rate | Commission Earned | Payment Status | Payment Method | Payment Destination | Payment Date | Processed At | Stripe Transfer ID | Processed By |
| -------------- | ------------ | ---------------- | ---------------- | ------------- | --------------- | ---------------------- | --------------- | ----------------- | -------------- | -------------- | ------------------- | ------------ | ------------ | ------------------ | ------------ |
| Bloom Referrals | HP-AFF-00003 | PAY-AFF-2026-0303 | BLOOM10 | 01-03-2026 to 31-03-2026 | 9 | £7,200.00 | 10% | £720.00 | Paid | Bank Transfer | ****1102 | 07-04-2026 | 07-04-2026 09:14:22 UTC | tr_3QxK9... | `admin@hairlinepm.com` |
| NordReferral AB | HP-AFF-00009 | PAY-AFF-2026-0309 | NORD20 | 01-03-2026 to 31-03-2026 | 22 | £44,000.00 | 10% | £4,400.00 | Processing | Bank Transfer | ****5588 | — | 07-04-2026 09:14:30 UTC | tr_3QxL1... | `admin@hairlinepm.com` |
| Elite Hair Referrals | HP-AFF-00015 | PAY-AFF-2026-0315 | ELITE10, ELITE15 | 01-03-2026 to 31-03-2026 | 14 | £19,600.00 | 12% | £2,352.00 | Paid | Bank Transfer | ****7743 | 07-04-2026 | 07-04-2026 09:14:55 UTC | tr_3QxM2... | `admin@hairlinepm.com` |
