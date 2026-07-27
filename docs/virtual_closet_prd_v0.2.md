Virtual Closet PRD v0.2

## 1. Product Overview

## Product Name

Virtual Closet


## Product Vision

Virtual Closet is a personal style archive that helps users capture daily outfits, revisit their fashion history, and gradually understand their personal style.

The product is built around a simple daily habit:

> Open the app → save today's look → build a personal style archive.

The product should feel:

- private
- visual
- elegant
- fashion-oriented
- personal


The product is NOT:

- a social network
- a shopping app
- a clothing inventory management tool
- a productivity tracker

---

# 2. Core Product Philosophy

## 2.1 Image First

Fashion is fundamentally visual.

The product should prioritize:

- outfit photos
- visual memories
- style evolution

Avoid:

- excessive metadata
- complicated forms
- manual tracking


---

## 2.2 Low Friction

The core interaction should take seconds.

The desired behavior:


Open app

↓

Capture outfit

↓

Save

↓

Continue daily life


The app should feel like:

> "I am saving my style."

Not:

> "I am entering clothing data."

---

## 2.3 Gradual Growth

Users should not need to build their entire wardrobe before getting value.

The product grows naturally:


Outfit Photos

↓

Style Archive

↓

Closet Understanding

↓

Personal Style Insights


---

# 3. MVP Scope

The MVP includes three core experiences:


LOOKS

CALENDAR

CLOSET


---

# 4. App Navigation

The MVP contains three tabs:


LOOKS | CALENDAR | CLOSET


---

# LOOKS

Primary daily experience.

Purpose:

> Capture today's outfit and maintain a personal style archive.


---

# CALENDAR

Reflection experience.

Purpose:

> Review outfit history and observe style evolution over time.


---

# CLOSET

Organization experience.

Purpose:

> View and organize owned clothing items.


---

# 5. Feature: LOOKS

## Goal

Create a simple daily outfit capture habit.

The user should be able to:

- capture today's outfit
- view the selected day's outfit
- browse nearby outfit dates


---

# Looks Screen Design

The Looks screen is the default daily experience.


## Layout

Main components:

1. Date selector
2. Outfit display area
3. Capture button


Example:

          July 26

July 24 July 25 July 26

👤         👤      +

      Today's Look


  +----------------+

  |                |
  |                |
  |       +        |
  |                |
  |                |

  +----------------+

---

# Date Selector

## Purpose

Allow users to quickly move between outfit dates.


Requirements:

- horizontal scrolling
- selected date highlighted
- dates with outfits display thumbnails


MVP:

- use cropped outfit thumbnails


Future:

- background-removed outfit figures


---

# Outfit Capture

## Main CTA

The primary action:


or:


Take Photo



---

## Capture Flow


Tap Capture

↓

Camera opens

OR

Choose existing photo

↓

Preview

↓

Save

↓

Return to Looks


---

# Photo Storage

MVP:

Store photos locally.

No:

- backend
- cloud storage
- authentication


---

# Outfit Data Model

```typescript
interface Outfit {

  id: string;

  imageUri: string;

  date: string;

  createdAt: string;

}
Example
{
  "id": "001",
  "imageUri": "file://photo.jpg",
  "date": "2026-07-26",
  "createdAt": "2026-07-26"
}
Outfit Rules

## Daily Behavior

The Looks tab always defaults to the current date.

When a new day begins:
- the selected date automatically updates to today
- the user sees an empty Today's Look state
- previous outfits remain accessible through date navigation

Past outfits are view-only in MVP.

one outfit per day
saving a new outfit replaces the previous outfit on that date

Reason:

The product focuses on:

"What did I wear today?"

not:

"Catalog every outfit."
## Look Entry Rule

The app maintains exactly one outfit record per calendar day.

A day can have:
- No Look: empty state
- One Look: completed state

Multiple looks per day are not supported.

If the user uploads a new photo on a day that already has a Look:
- The new photo replaces the existing Look.
- The Look number remains unchanged.
- The date remains the source of identity.

Look numbering:
- Sequential globally.
- Assigned when a new day receives its first Look.
- Represents style memories, not uploaded images.

6. Feature: CALENDAR
Goal

Help users review their style history.

The calendar provides a different mental model from Looks:

Looks:

"What am I wearing?"

Calendar:

"How has my style changed?"

Calendar Screen
Layout

Monthly calendar view.

Example:

             July 2026


Sun Mon Tue Wed Thu Fri Sat


          1   2   3   4


5   6   7   8   9   10


        [photo]


11  12  13  14  15


        [photo]


Calendar Interaction

Tap a date:

↓

Display outfit from that date.

If no outfit exists:

Show:

No outfit saved
7. Feature: CLOSET
Goal

Allow users to gradually build a digital wardrobe.

Important principle:

Users do NOT need to upload their entire closet.

The closet grows gradually.

Closet import
Closet
 +
 ↓

Add Item

 ↓

Add from Taobao

 ↓

Paste anything from Taobao

 ↓

System extracts URL

 ↓

Resolve short link

 ↓

Create item draft

 ↓

User confirms

Closet Screen


Example:

My Closet


Search


All | Tops | Bottoms | Shoes | Accessories


[Card] [Card]


[Card] [Card]


+
Clothing Card

Display:

Required:

image
item name
category

Optional:

brand
color

Example:

----------------


      IMAGE


Cream Sweater

Top · Cream


----------------
Clothing Data Model
interface ClothingItem {

  id: string;

  imageUri: string;

  name: string;

  category: string;

  brand?: string;

  color?: string;

  createdAt: string;

}
Add Clothing Flow
+

↓

Take Photo

↓

Add basic information

↓

Save
Clothing Fields
Required
Image

Required.

Category

Options:

Tops

Bottoms

Outerwear

Dresses

Shoes

Accessories
Optional
Name

Example:

Cream Knit Sweater
Brand

Example:

COS
Color

Example:

Ivory
8. Technical Requirements
Framework

Frontend:

React Native
Expo
TypeScript
Storage

MVP:

Local-only storage.

Use:

local image storage
local metadata storage

Suggested:

AsyncStorage
Architecture Requirements

Maintain:

reusable components
separated UI and business logic
scalable folder structure
9. MVP Exclusions

The following are NOT included:

AI Features

No:

clothing recognition
background removal
AI stylist
outfit recommendations
Social Features

No:

sharing
likes
comments
friends
Shopping Features

No:

wishlist
shopping recommendations
purchase tracking
Analytics Features

No:

wear tracking
cost analysis
wardrobe statistics
10. Future Roadmap
Phase 2 — Connect Looks and Closet

Goal:

Create wardrobe intelligence.

Features:

tag clothing items in outfits
view outfits containing a clothing item
see style patterns
Phase 3 — AI Enhancement

Features:

clothing recognition
background removal
automatic tagging
style analysis
Phase 4 — Personal Style Assistant

Features:

outfit recommendations
shopping prevention
wardrobe insights
virtual try-on
11. Product Success Criteria (MVP)

The MVP is successful if:

User opens the app naturally.
User can save an outfit within seconds.
Saved outfits remain accessible by date.
Looking back at outfits feels enjoyable.
The user begins building a personal style archive.

The MVP should prove:

"People enjoy preserving their style history."