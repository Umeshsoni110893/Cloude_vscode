# Ambiguity Report

| Original Statement | Problem Type | Why it is problematic | Suggested Clarification |
|--------------------|--------------|----------------------|------------------------|
| "reasonable time" (Performance) | Ambiguity | "Reasonable" is subjective and not measurable. | Specify a maximum response time (e.g., "All account data must load within 2 seconds under normal conditions.") |
| "noticeable delay" (Funds transfer) | Ambiguity | "Noticeable" is subjective and not measurable. | Define a maximum allowed delay (e.g., "Submission must complete within 1 second.") |
| "sufficient period of time" (Transaction history retention) | Ambiguity | "Sufficient" is undefined and not measurable. | Specify the retention window (e.g., "at least 7 years"). |
| "large number of concurrent authenticated sessions" | Ambiguity | "Large number" is vague. | Specify a minimum supported number (e.g., "at least 10,000 concurrent sessions"). |
| "planned maintenance windows communicated in advance" | Ambiguity | "In advance" is vague. | Specify minimum notice period (e.g., "at least 48 hours before maintenance"). |
| "Disaster recovery procedures must be documented and tested periodically." | Ambiguity | "Periodically" is vague. | Specify the frequency (e.g., "at least once per year"). |
| "The exact retention window is to be confirmed with compliance." | Missing | Requirement is incomplete. | Confirm and specify the retention window before implementation. |
| "Permissions for joint holders... should be addressed separately." | Missing | Rules for joint account permissions are not defined. | Define joint holder permissions before implementation. |

# Improved Requirements

## Feature: User Authentication & Session Management

### Acceptance Criteria

**Scenario: Successful login**
Given a registered user with valid credentials,
When the user logs in,
Then access is granted and a session is created.

**Scenario: Multi-factor authentication required**
Given a user logging in,
When credentials are valid,
Then the user must complete MFA via SMS OTP or authenticator app before access is granted.

**Scenario: Account lockout after failed attempts**
Given a user with multiple failed login attempts,
When the maximum allowed attempts is reached,
Then the account is locked and the user must contact support or complete recovery to unlock.

**Scenario: Session expiration**
Given a user is logged in and inactive for the session timeout period,
When the timeout is reached,
Then the session expires and the user is warned before logout.

**Scenario: Unrecognized device login**
Given a user logs in from a new device,
When the device is not recognized,
Then additional verification is required.

**Scenario: Concurrent sessions**
Given a user logs in on multiple devices,
When a new session is created,
Then concurrent sessions are handled per platform policy (define expected behavior).

**Scenario: View and terminate active sessions**
Given a user accesses security settings,
When viewing active sessions,
Then the user can terminate any session.

## Feature: Account Overview Dashboard

### Acceptance Criteria

**Scenario: View all accounts**
Given a logged-in user,
When accessing the dashboard,
Then all associated accounts are displayed with type, masked number, current and available balance.

**Scenario: View account details**
Given a user selects an account,
When viewing details,
Then full account info and transaction history are shown.

**Scenario: Dashboard auto-refresh**
Given the dashboard is open,
When the refresh interval elapses,
Then balances are updated automatically.

**Scenario: Restricted accounts**
Given an account is frozen or pending review,
When displayed on the dashboard,
Then it is marked with an indicator but balances are visible.

**Scenario: Joint account holder view**
Given a joint account holder logs in,
When viewing the dashboard,
Then all joint accounts are visible per defined permissions.

## Feature: Funds Transfer

### Acceptance Criteria

**Scenario: Internal transfer**
Given a user initiates a transfer between their own accounts,
When the transfer is submitted,
Then it is processed immediately.

**Scenario: Platform transfer**
Given a user transfers to another customer,
When the transfer is submitted,
Then it completes within the same business day.

**Scenario: External transfer (ACH)**
Given a user transfers to an external account,
When the transfer is submitted,
Then the estimated completion date is shown and standard processing applies.

**Scenario: Scheduled/recurring transfer**
Given a user sets a future or recurring transfer,
When the schedule is set,
Then the transfer occurs as scheduled.

**Scenario: Transfer limits**
Given a user initiates a transfer,
When the amount exceeds limits,
Then the user is notified and may request a limit increase.

**Scenario: Transfer confirmation**
Given a user initiates a transfer,
When reviewing details,
Then explicit confirmation is required before submission.

**Scenario: High-value transfer verification**
Given a transfer exceeds a threshold,
When submitted,
Then additional verification is required.

**Scenario: View transfer history**
Given a user accesses account activity,
When viewing transfer history,
Then all transfers are listed.

## Feature: Transaction History

### Acceptance Criteria

**Scenario: View transactions**
Given a user views transaction history,
When accessing an account,
Then transactions are listed in reverse chronological order with date, description, amount, and running balance.

**Scenario: Filter transactions**
Given a user views transaction history,
When applying filters,
Then results are filtered by date, type, or amount.

**Scenario: Search transactions**
Given a user uses search,
When entering a keyword or merchant,
Then matching transactions are shown.

**Scenario: Export transactions**
Given a user views transaction history,
When exporting,
Then data is available as CSV or PDF.

**Scenario: Pending transactions**
Given a user views transaction history,
When pending transactions exist,
Then they are clearly marked or separated.

## Feature: Profile & Security Settings

### Acceptance Criteria

**Scenario: Update contact info**
Given a user updates email, phone, or address,
When changes are submitted,
Then a verification step is triggered using an existing verified method.

**Scenario: Change password**
Given a user changes their password,
When submitting a new password,
Then it must meet security standards.

**Scenario: Manage biometric login**
Given a device supports biometrics,
When enabled or disabled,
Then the setting is updated accordingly.

**Scenario: Manage MFA method**
Given a user accesses security settings,
When managing MFA,
Then the user can enable, disable, or change their MFA method.

**Scenario: Configure notifications**
Given a user accesses notification preferences,
When configuring settings,
Then preferences for account events are updated.

## Non-Functional Requirements

**Performance:**
- All account data must load within 2 seconds under normal conditions.
- Funds transfer submission must complete within 1 second.
- The platform must support at least 10,000 concurrent authenticated sessions.

**Security:**
- All data in transit and at rest must be encrypted using industry-standard methods.
- Audit logs must capture all sensitive actions and be retained per compliance.
- Vulnerability scanning and penetration testing must be conducted quarterly.
- PII must never be logged in plain text.

**Reliability & Availability:**
- The platform must target 99.9% uptime, with maintenance windows communicated at least 48 hours in advance.
- Transfers before end-of-day cutoff are processed same-day.
- Disaster recovery procedures must be documented and tested at least once per year.

**Accessibility:**
- The platform must meet WCAG 2.1 Level AA.
- Screen reader support is required for all core flows.

**Compliance:**
- The product must adhere to KYC/AML and regional privacy regulations.
