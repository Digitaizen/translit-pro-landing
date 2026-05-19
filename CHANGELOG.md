# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Routing**: Added a dedicated English `/transliteration/` page that preserves the original transliteration-focused landing experience.
- **Homepage**: Added modular workspace landing sections in `src/components/workspace/` (`WorkspaceHero`, `WorkspacePillars`, `WorkspaceAnywhere`) for the English root page.
- **Screenshots**: Added `public/screenshots/feature-ai-rewrite.png` to the marketing asset set.

### Changed
- **Homepage**: Repositioned the English `/` landing page around an AI-powered multilingual writing workspace while keeping localized `/{lang}/` pages on the existing transliteration-focused structure.
- **WorkspaceHero**: Updated the hero headline copy and applied brand-color emphasis to “multilingual” and “workspace”.
- **Screenshots**: Replaced `public/screenshots/feature-type-naturally.png` with an updated image.
- **FeatureSpotlights**: Restructured keyboard and bookmarklet spotlight sections from a 50/50 side-by-side grid to a full-width layout (text centered above, visual spanning the full container width), matching the existing editor spotlight layout
- **FeatureSpotlights**: All three spotlight visuals (two videos + one image) are now clickable and open in a full-screen lightbox overlay; videos play with controls and audio in the lightbox, and reset when closed
