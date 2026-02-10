# Component Structure Documentation

## Overview
The TrueMate frontend codebase has been restructured for maximum maintainability, scalability, and clear separation of concerns.

## Directory Structure

### `/src/components/`
All reusable UI components are organized by purpose:

#### `/src/components/ui/`
**Basic UI primitives** - Reusable across the entire application
- `Button.tsx` - Primary, secondary, ghost button variants
- `Input.tsx` - Text, email, password, search inputs
- `Card.tsx` - Profile cards, gift cards, generic cards
- `Loader.tsx` - Loading states and spinners

#### `/src/components/layout/`
**Layout components** - App shell and navigation
- `Navigation.tsx` - Main navigation bar
- `Layout.tsx` - App layout wrapper

#### `/src/components/landing/`
**Landing page specific components** - Marketing and homepage features
- `HeroSection.tsx` - Main hero banner
- `FeaturesSection.tsx` - Feature highlights
- `StatsSection.tsx` - Statistics display
- `CTASection.tsx` - Call-to-action sections
- `WhyChooseTrueMate.tsx` - Value proposition
- `AppleCard.tsx` - Apple-style card component
- `AppleCardsCarousel.tsx` - Carousel container
- `AppleCardsCarouselDemo.tsx` - Demo implementation
- `FocusCards.tsx` - Focus card grid
- `InfiniteMovingCards.tsx` - Infinite scroll testimonials

#### `/src/components/auth/`
**Authentication components**
- `AuthButton.tsx` - Login/logout button
- `AuthModal.tsx` - Login/register modal

#### `/src/components/profile/`
**Profile-specific components**
- `ProfilePhotoUpload.tsx` - Photo upload functionality

### `/src/styles/`
Styles mirror the component structure for better organization:

#### `/src/styles/components/`
Component-specific styles organized by category:
- `/ui/` - Basic UI component styles
- `/layout/` - Layout component styles  
- `/landing/` - Landing page component styles

#### `/src/styles/pages/`
Page-specific styles:
- `/about/` - About page styles
- `/auth/` - Authentication page styles
- `/chat/` - Chat page styles
- `/contact/` - Contact page styles
- `/discover/` - Discover page styles
- `/download/` - Download page styles
- `/gifts/` - Gifts page styles
- `/privacy/` - Privacy page styles
- `/profile/` - Profile page styles
- `/search/` - Search page styles
- `/settings/` - Settings page styles
- `Home.module.css` - Homepage styles
- `Landing.module.css` - Landing page styles

## Import Patterns

### Recommended Imports
Use the barrel exports for cleaner imports:

```tsx
// Instead of multiple imports
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

// Use barrel export
import { Button, Input } from '../components/ui';
```

### Component Import Examples
```tsx
// UI Components
import { Button, Input, Card } from '@/components/ui';

// Layout Components  
import { Navigation, Layout } from '@/components/layout';

// Landing Components
import { HeroSection, FeaturesSection } from '@/components/landing';

// Auth Components
import { AuthButton, AuthModal } from '@/components/auth';
```

## Style Organization

### CSS Module Naming Convention
- Component styles: `ComponentName.module.css`
- Page styles: `PageName.module.css`

### Style Path Structure
Styles are co-located with their components but organized in a parallel structure:

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   └── landing/
│       └── HeroSection.tsx
└── styles/
    ├── components/
    │   ├── ui/
    │   │   ├── Button.module.css
    │   │   └── Input.module.css
    │   └── landing/
    │       └── HeroSection.module.css
    └── pages/
        └── ...
```

## Benefits of This Structure

1. **Scalability** - Easy to add new components without clutter
2. **Maintainability** - Clear separation of concerns
3. **Discoverability** - Predictable file locations
4. **Team Collaboration** - Different developers can work on different sections
5. **Code Reuse** - UI components are easily reusable
6. **Testing** - Components can be tested in isolation

## Adding New Components

1. **UI Components**: Add to `/src/components/ui/`
2. **Layout Components**: Add to `/src/components/layout/`
3. **Feature Components**: Add to appropriate feature folder
4. **Styles**: Add corresponding styles to `/src/styles/components/[category]/`
5. **Update Exports**: Add to the appropriate `index.ts` barrel export file

## Migration Notes

- All import paths have been updated to reflect the new structure
- Unused components and empty directories have been removed
- Barrel exports (`index.ts` files) have been added for cleaner imports
- The build process has been verified and works correctly
