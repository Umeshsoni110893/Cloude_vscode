# E‑Commerce: User Login & Checkout — User Stories

## Feature: User Login

### User Story ID: US_001
**Title:** Email/password login

**User Story:**
As a returning customer
I want to log in using my registered email and password
So that I can access my account and complete purchases faster

---
### Acceptance Criteria
**Scenario: Happy Path — valid credentials**
Given a registered user with an active account
When they enter a valid email and password and submit
Then they are authenticated and redirected to the intended page within 3 seconds

**Scenario: Negative — invalid credentials**
Given a user enters an incorrect email or password
When they submit the form
Then the system displays a generic error message "Invalid credentials" and does not reveal which field is incorrect

**Scenario: Edge — account lockout after failed attempts**
Given a user fails to log in 5 consecutive times
When the 5th failed attempt occurs
Then the account is temporarily locked, the user receives an email notification, and they must use password recovery or wait 30 minutes

---
QA Enhancements:
- Key validations: email format, password non-empty, rate limit enforcement.
- Risks: brute-force attack, account lockout UX confusion.
- Missing clarifications: exact lockout duration (assumed 30 minutes); confirm if CAPTCHA is required before lockout.

## Feature: Social Login

### User Story ID: US_002
**Title:** Google/Facebook social login and account creation

**User Story:**
As a shopper
I want to sign in with Google or Facebook
So that I can log in quickly without creating a password

---
### Acceptance Criteria
**Scenario: Happy Path — social login with matching email**
Given a social provider returns an email that matches an existing account
When the user consents to sign-in
Then they are logged into the existing account

**Scenario: Happy Path — social login without existing account**
Given a social provider returns an email not present in the system
When the user consents to sign-in
Then a new account is created using the returned email and the user is logged in

**Scenario: Negative — social provider denies consent**
Given the user cancels or denies consent at the provider
When control returns to the site
Then the user sees an error and remains unauthenticated

---
QA Enhancements:
- Key validations: provider token validation, email verified flag from provider.
- Risks: email collision, duplicate accounts; need account-linking flow.
- Missing clarifications: mapping rules when social email is unverified.

## Feature: Remember Me / Persistent Login

### User Story ID: US_003
**Title:** Remember me keeps user logged in on same device

**User Story:**
As a frequent shopper
I want "Remember me" so that I stay logged in on my personal device for 30 days
So that I don't need to re-enter credentials for repeat visits

---
### Acceptance Criteria
**Scenario: Happy Path**
Given a user selects "Remember me" during login
When authentication succeeds
Then a persistent cookie is issued that expires in 30 days and is flagged Secure and HttpOnly

**Scenario: Negative — public device**
Given a user on a shared device selects "Remember me"
When they later leave the device
Then the system gives guidance to use private browsing and the cookie can be revoked from account settings

---
QA Enhancements:
- Key validations: cookie flags, expiration, logout revocation.
- Risks: stolen device misuse; require re-auth for sensitive operations.
- Missing clarifications: exact TTL for persistent sessions (assumed 30 days).

## Feature: Password Reset

### User Story ID: US_004
**Title:** Password reset via email link

**User Story:**
As a user who forgot my password
I want to receive a password reset email with a single-use link that expires in 1 hour
So that I can securely regain account access

---
### Acceptance Criteria
**Scenario: Happy Path**
Given a user requests a password reset with a registered email
When the request is accepted
Then the system sends a single-use reset link that expires after 1 hour

**Scenario: Negative — invalid or expired token**
Given the user follows an expired or invalid link
When they attempt to reset password
Then the system shows a token-expired message and offers to request a new link

---
QA Enhancements:
- Key validations: token uniqueness, single-use enforcement, link expiry.
- Risks: token leakage via logs; ensure tokens are not logged.
- Missing clarifications: allowed password complexity rules.

---

## Feature: Guest Checkout

### User Story ID: US_005
**Title:** Guest checkout with email capture

**User Story:**
As a shopper without an account
I want to complete checkout as a guest by providing an email
So that I can buy without registering while still receiving order confirmation

---
### Acceptance Criteria
**Scenario: Happy Path**
Given a guest with items in cart
When they proceed to checkout and provide a valid email and payment details
Then the order completes and a confirmation email is sent to the provided address

**Scenario: Negative — invalid email**
Given a guest enters an invalid email format
When they attempt to submit the order
Then the system blocks submission and shows an error to correct the email

**Scenario: Edge — offer account creation**
Given a guest completes checkout
When the order confirmation is shown
Then the system prompts to create an account pre-populated with the provided email and offers to preserve cart data

---
QA Enhancements:
- Key validations: email format, preservation of cart data when converting to account.
- Risks: duplicate accounts if same email later registers; ensure idempotent order submission.
- Missing clarifications: whether guest orders link to future created accounts automatically.

## Feature: Shopping Cart

### User Story ID: US_006
**Title:** Add, update, remove items; real-time totals

**User Story:**
As a shopper
I want to add, change quantity, or remove items from the cart and see totals update in real time
So that I can confirm my order before checkout

---
### Acceptance Criteria
**Scenario: Add item**
Given an item detail page
When the user clicks Add to Cart
Then the item appears in cart and totals update immediately

**Scenario: Update quantity**
Given items in cart
When the user modifies quantity
Then totals and availability are recalculated and shown immediately

**Scenario: Remove item**
Given items in cart
When the user removes an item
Then the item is deleted and totals update

**Scenario: Negative — exceed max items**
Given a cart with many items
When the user attempts to add above the max limit (100 items)
Then the system prevents adding and shows "Max items exceeded" message

---
QA Enhancements:
- Key validations: real-time calculation, concurrency when inventory changes.
- Risks: race conditions during high load causing incorrect totals.
- Missing clarifications: exact max items value (assumed 100).

### User Story ID: US_007
**Title:** Stock change notification prior to checkout

**User Story:**
As a shopper
I want to be notified if an item in my cart becomes out of stock before I pay
So that I can adjust my order and avoid failed fulfillment

---
### Acceptance Criteria
**Scenario: Item goes out of stock**
Given an item in cart becomes unavailable
When user proceeds to checkout
Then the checkout displays the affected items with an out-of-stock notice and prevents purchase of that item

**Scenario: Edge — partial availability**
Given only part of the requested quantity remains
When the user proceeds
Then the system offers to adjust quantity to available amount or remove the item

---
QA Enhancements:
- Key validations: inventory check at checkout start and at payment submission.
- Risks: overselling, poor UX if checks are delayed.
- Missing clarifications: whether to reserve inventory on add-to-cart.

### User Story ID: US_008
**Title:** Apply coupons and promo codes

**User Story:**
As a shopper
I want to apply coupon codes in my cart and see discounted totals
So that I can take advantage of promotions

---
### Acceptance Criteria
**Scenario: Valid coupon**
Given a valid coupon for the cart
When the user applies it
Then the discount is applied and totals update

**Scenario: Invalid/expired coupon**
Given an invalid or expired coupon
When the user applies it
Then the system displays an error and no discount is applied

---
QA Enhancements:
- Key validations: code validation, stacking rules, expiration checks.
- Risks: wrong discounts leading to revenue loss.
- Missing clarifications: coupon stacking and priority rules.

## Feature: Checkout Flow

### User Story ID: US_009
**Title:** Streamlined checkout steps (address, shipping, payment, review)

**User Story:**
As a buyer
I want a checkout flow with address entry, shipping selection, payment entry, and order review
So that I can complete purchases with minimal steps

---
### Acceptance Criteria
**Scenario: Happy Path**
Given items in cart and valid payment method
When the user completes address, shipping, and payment and confirms
Then the order is created and confirmation shown within 5 seconds

**Scenario: Negative — payment failure**
Given payment authorization fails
When the payment provider returns an error
Then the user sees a clear error, can retry, and cart contents are preserved

**Scenario: Edge — saved addresses**
Given a logged-in user with saved addresses
When they checkout
Then addresses are shown and selectable; adding a new address validates fields before use

---
QA Enhancements:
- Key validations: atomicity of order creation, idempotency of payment requests.
- Risks: duplicate orders on retry; ensure idempotency keys.
- Missing clarifications: acceptable payment timeout threshold (assumed <10s).

## Feature: Payment Processing

### User Story ID: US_010
**Title:** Support credit/debit cards and digital wallets with validation

**User Story:**
As a buyer
I want to pay with credit/debit cards or supported digital wallets, with client-side validation
So that payments succeed or show actionable errors quickly

---
### Acceptance Criteria
**Scenario: Happy Path — card payment success**
Given valid card details and authorization
When payment is submitted
Then the transaction completes and order confirmation is shown

**Scenario: Negative — card decline**
Given a declined card
When authorization fails
Then the user sees a clear error and may retry with a different method without losing cart

**Scenario: Edge — network blip during payment**
Given a transient network failure during payment submission
When the provider does not confirm success
Then the system handles the uncertainty by using idempotency keys and showing an intermediate status to the user

---
QA Enhancements:
- Key validations: Luhn check, expiry, CVV presence, PCI-DSS compliance (no PAN stored unless tokenized).
- Risks: double charges; ensure reconciliation and strong idempotency.
- Missing clarifications: supported digital wallets list and fallback behavior.

### User Story ID: US_011
**Title:** Order confirmation page and email

**User Story:**
As a buyer
I want to see an order confirmation page and receive an email when payment succeeds
So that I have a record of my purchase

---
### Acceptance Criteria
**Scenario: Happy Path**
Given successful payment
When order creation completes
Then show confirmation page with order summary and send confirmation email to the user-provided address

**Scenario: Edge — email send failure**
Given email service transient error
When order is created
Then the system retries sending email and logs the failure; order confirmation page still shows order number

---
QA Enhancements:
- Key validations: email content includes order id, items, totals, and shipping address.
- Risks: missing confirmation emails; ensure retry/backoff.
- Missing clarifications: SLA for email delivery retries.

## Feature: Address Validation

### User Story ID: US_012
**Title:** Validate postal code and region consistency

**User Story:**
As a shipper
I want postal codes to be validated against selected state/city
So that shipments have a higher chance of successful delivery

---
### Acceptance Criteria
**Scenario: Happy Path — validated address**
Given a user enters address fields
When postal code and city/state are consistent with validation service
Then the address is accepted without warning

**Scenario: Negative — cannot validate**
Given the validation service cannot verify the address
When user chooses to proceed
Then the system warns the user and allows continuation if they confirm

---
QA Enhancements:
- Key validations: postal code format, cross-field consistency.
- Risks: failed deliveries; log unvalidated addresses for manual review.
- Missing clarifications: which external address validation provider to use.

## Non-Functional Stories (Select)

### User Story ID: US_013
**Title:** Checkout page performance

**User Story:**
As a shopper
I want the checkout page to load quickly (under 2.5s on 75th percentile)
So that I complete purchases without friction

---
### Acceptance Criteria
- Measured P75 page load time for checkout is < 2.5 seconds under normal traffic.
- Payment submission latency P95 is < 5 seconds.

QA Enhancements:
- Key validations: performance tests and benchmarks.
- Risks: high latency during peak traffic harming conversions.
- Missing clarifications: definition of "normal traffic" (baseline to be defined).

### User Story ID: US_014
**Title:** PCI-DSS compliant payment handling

**User Story:**
As a platform operator
I want all payment data handled per PCI-DSS (use tokenization, do not store PAN)
So that we remain compliant and avoid fines

---
### Acceptance Criteria
- No PAN stored in application logs or database unless tokenized by a certified provider.
- Payment integration uses PCI-compliant processors and satisfies required controls.

QA Enhancements:
- Key validations: audit of logs, automated scanning for PAN patterns.
- Risks: compliance breach, fines.
- Missing clarifications: which PCI level applies.

---

# Notes on Coverage and Prioritization
- High priority: Payment processing, Login, Checkout flow, Cart integrity.
- Clarify: exact numeric thresholds (lockout attempts, cookie TTL, max cart items, token expiries) with product/security teams before implementation.

---
Generated from: `1-prd-to-improve/2-prd_ecommerce.md`
