#!/usr/bin/env python3
from PIL import Image
import os

# Select 4 diverse product packaging images
images = [
    "/workspace/Assets/images/Porthfolio/SANITARY  PAD'S  7pcs  POUCH MOCKUP.webp",
    "/workspace/Assets/images/Porthfolio/CF - MENAVON VITAMIN D3+K2 -120T   CARTON SELF LOCK.webp",
    "/workspace/Assets/images/Porthfolio/MONK FRUIT CARTON BOTTOM LOCK.webp",
    "/workspace/Assets/images/Porthfolio/BABY WIPES MOCKUP.webp"
]

# Target size for each thumbnail
thumb_width = 380
thumb_height = 280
gap = 16
border = 12

# Load and resize images
thumbs = []
for img_path in images:
    if os.path.exists(img_path):
        img = Image.open(img_path)
        # Convert RGBA to RGB if necessary
        if img.mode == 'RGBA':
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3] if len(img.split()) == 4 else None)
            img = background
        img.thumbnail((thumb_width, thumb_height), Image.Resampling.LANCZOS)
        thumbs.append(img)
    else:
        print(f"Warning: {img_path} not found")

if len(thumbs) < 4:
    print(f"Error: Only found {len(thumbs)} images")
    exit(1)

# Calculate collage dimensions
collage_width = (thumb_width * 2) + (gap * 1) + (border * 2)
collage_height = (thumb_height * 2) + (gap * 1) + (border * 2)

# Create white background
collage = Image.new('RGB', (collage_width, collage_height), (255, 255, 255))

# Paste images in 2x2 grid
positions = [
    (border, border),  # top-left
    (border + thumb_width + gap, border),  # top-right
    (border, border + thumb_height + gap),  # bottom-left
    (border + thumb_width + gap, border + thumb_height + gap)  # bottom-right
]

for thumb, pos in zip(thumbs, positions):
    collage.paste(thumb, pos)

# Save the collage
output_path = "/workspace/Assets/images/about-collage.jpg"
collage.save(output_path, quality=92, optimize=True)
print(f"Collage created: {output_path}")
print(f"Dimensions: {collage_width}x{collage_height}")
print(f"Images used: {len(thumbs)}")
