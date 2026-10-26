# Lab 4: Acceptance Criteria
Team E - Echo

Status: Proposed criteria based on simulated notes.

## US-01: Manage Listings

### Happy Path
Given a property professional is editing a listing
When they enter valid details and save
Then the system saves the updated information

### Failure Case
Given a property professional is editing a listing
When they enter a negative price
Then the system rejects the update and shows an error

## US-02: Preview Listings

### Happy Path
Given valid listing details have been entered
When the professional selects Preview
Then the system displays the listing before submission

### Failure Case
Given required listing information is missing
When the professional attempts to submit
Then the system blocks submission and identifies the error

## US-03: Approve Content

### Happy Path
Given a valid listing is awaiting review
When an authorized reviewer approves it
Then the listing becomes eligible for publication

### Failure Case
Given a listing has not been approved
When someone attempts to publish it
Then the system blocks publication

## US-08: Accessible Property Listings

### Happy Path
Given a visitor opens the property website
When they use a mobile or desktop screen
Then listing content remains readable and usable

### Failure Case
Given a property image is unavailable
When the visitor opens the listing
Then the page displays meaningful alternative text
and remains usable without the image

## US-05: Approve Sponsor Advertisements

### Happy Path
Given a sponsor ad is submitted for review
When an authorized reviewer approves its content and links
Then the ad becomes eligible for publication

### Failure Case
Given a sponsor ad is not approved
When someone attempts to publish it
Then publication is blocked until approval

## Verification Notes
- These are proposed acceptance criteria.
- They are based on simulated discovery evidence.
- No implementation or automated test is claimed.
- Final requirements need stakeholder confirmation.
