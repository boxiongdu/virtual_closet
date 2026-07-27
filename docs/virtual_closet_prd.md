# Virtual Closet MVP — Outfit Diary v1

## Product Vision

Virtual Closet is a personal style journal that helps users capture daily outfits, organize their wardrobe, and understand their style evolution over time.

The MVP focuses on one core behavior:

> Open the app → capture today's outfit → build a personal style archive.

The app is designed as a private fashion experience.

It is not:
- a social sharing platform
- a shopping app
- a clothing inventory system

---

# MVP Product Structure

The MVP contains two main experiences:


Looks

├── Today Mode
│
└── Calendar Mode

Closet


---

# App Navigation

MVP navigation:


Today | Calendar | Closet


---

# Feature 1: Outfit Diary (Primary Experience)

## Purpose

The Outfit Diary is the main daily experience.

It helps users:

- capture daily outfit photos
- revisit previous looks
- understand personal style evolution

---

# Mode 1: Today Mode (Default)

## Purpose

The daily action.

The main user behavior:

> Open app → take photo → save today's look.

The goal is minimal friction.

---

# Today Mode Layout

Example:

------------------------------------------------

                July 26


     <  July 24   July 25   July 26   >


------------------------------------------------


              TODAY'S LOOK


        ┌──────────────────┐
        │                  │
        │                  │
        │                  │
        │       +          │
        │                  │
        │                  │
        └──────────────────┘


          Add today's outfit


------------------------------------------------

---

# Main CTA

## Take Photo Button

Position:

- Center of screen

Purpose:

Create today's outfit entry.

---

## Interaction Flow


Tap Take Photo

↓

Camera / Photo Library

↓

Preview

↓

Optional caption

↓

Save

↓

Return to Today Mode


---

# Outfit Entry Data Model

```typescript
interface Outfit {

  id: string;

  imageUri: string;

  date: string;

  caption?: string;

  createdAt: string;

}
Example
{
  "id": "001",
  "imageUri": "file://photo.jpg",
  "date": "2026-07-25",
  "caption": "Coffee date",
  "createdAt": "2026-07-25"
}
Mode 2: Calendar Mode
Purpose

Help users review their style history.

The user can see:

what they wore
when they wore it
how their style changes over time
Calendar Mode Layout

Example:

             July 2026


Sun  Mon  Tue  Wed  Thu  Fri  Sat


          1    2    3    4


5     6    7    8    9    10


[photo]

11    12   13   14   15   16


[photo]

17    18   19   20   21   22


[photo]


23    24   25   26   27

Calendar Interaction

Tap a date:

↓

Open outfit detail.

Example:

July 25


[Outfit Photo]


Caption:

Coffee date

Empty State

First-time user:

Your style story starts here ✨


Take your first outfit photo


        +

Avoid:

"Your diary is empty."

The feeling should be positive.

Feature 2: Closet
Purpose

The Closet supports the Outfit Diary.

It answers:

"What clothes create my style?"

The closet grows gradually.

Users do NOT need to upload their entire wardrobe.

Closet Screen

Layout:

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

  category:
    | "tops"
    | "bottoms"
    | "outerwear"
    | "dresses"
    | "shoes"
    | "accessories";

  brand?: string;

  color?: string;

  notes?: string;

  createdAt: string;

}
Add Clothing Flow

Purpose:

Allow users to gradually build their wardrobe.

Flow:

+

↓

Take Photo

↓

Basic Information

↓

Save

Clothing Fields
Required
Image
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
Notes

Example:

Favorite winter piece
MVP Product Principles
1. Low Friction

The app should feel like:

"I am saving my style."

Not:

"I am entering clothing data."

2. Image First

Fashion is visual.

Prioritize:

photos
layouts
memories

Avoid:

excessive metadata
3. Gradual Growth

The wardrobe grows naturally:

Outfit Photos

↓

Clothing Items

↓

Personal Style Understanding
Technical Scope
Storage

MVP:

Local storage only.

No:

backend
authentication
cloud storage
Architecture

Maintain:

Expo Router
TypeScript
reusable components
separated business logic
Out of Scope

Do NOT build:

social sharing
likes/comments
friends
AI outfit recognition
AI stylist
virtual try-on
shopping recommendations
automatic clothing tagging
weather suggestions
wear tracking
Future Roadmap
Phase 2

Connect:

Outfit Diary ↔ Closet

Features:

tag clothes in outfits
view all outfits containing a clothing item
Phase 3

AI Layer:

clothing recognition
style analysis
outfit recommendations
Phase 4

Personal Style Assistant:

shopping prevention
wardrobe insights
virtual try-on

One small change I made from the previous version: I renamed **"Camera Mode" → "Today Mode"** beca