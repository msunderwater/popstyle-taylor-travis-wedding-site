# Wedding Website Assets

## Image Files Overview

This folder contains all the photos used in the Taylor & Travis wedding website.

### Required Photos (8 total):

#### Homepage Images:
- `bride.jpg` - Taylor's portrait photo (192x192px or 256x256px)
- `groom.jpg` - Travis's portrait photo (192x192px or 256x256px)  
- `photo1.jpg` - Taylor's individual photo (3:4 aspect ratio, portrait)
- `photo2.jpg` - Couple photo together (3:4 aspect ratio, portrait)
- `photo3.jpg` - Travis's individual photo (3:4 aspect ratio, portrait)
- `venue.jpg` - Centennial Greenhouse venue photo (16:9 aspect ratio, landscape)

#### Our Story Page Images:
- `story1.jpg` - "Quiet Rooms & Millions" chapter photo (1:1 aspect ratio, square)
- `story2.jpg` - "The Calm in the Chaos" chapter photo (1:1 aspect ratio, square)

### File Structure:
```
popstyle-taylor-&-travis-wedding-site/
├── bride.jpg          # Main files referenced by code
├── groom.jpg
├── photo1.jpg
├── photo2.jpg
├── photo3.jpg
├── venue.jpg
├── story1.jpg
├── story2.jpg
└── assets/
    └── images/         # Backup copies
        ├── bride.jpg
        ├── groom.jpg
        ├── photo1.jpg
        ├── photo2.jpg
        ├── photo3.jpg
        ├── venue.jpg
        ├── story1.jpg
        └── story2.jpg
```

### Usage Notes:
- Main image files must be in the project root directory for the `./` paths in the code to work correctly
- The `assets/images/` folder contains backup copies for organization
- All images use responsive design and include fallback placeholders if loading fails
- The website uses a custom `ImageWithFallback` component to handle missing images gracefully

### Dashboard Editor:
The admin dashboard includes a content editor where couple can upload and replace photos through the interface.