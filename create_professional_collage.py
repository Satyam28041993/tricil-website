#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFilter
import os

# Select 4 diverse, attractive pouch/packaging images
images = [
    "/workspace/Assets/images/Porthfolio/YUMMZI GRANOLA BITES - POUCH.webp",
    "/workspace/Assets/images/Porthfolio/DIVYA DRY FRUITS.webp",
    "/workspace/Assets/images/Porthfolio/Dr. Rx Sanitary Pads  40 & 7 ( Anion Chip ).webp",
    "/workspace/Assets/images/Porthfolio/GROWTH EXCEL POWDER.webp"
]

# Target size for each thumbnail (larger for better quality)
thumb_width = 360
thumb_height = 360
gap = 20
border = 16

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
        
        # Make square crop (centered)
        width, height = img.size
        size = min(width, height)
        left = (width - size) // 2
        top = (height - size) // 2
        img = img.crop((left, top, left + size, top + size))
        
        img = img.resize((thumb_width, thumb_height), Image.Resampling.LANCZOS)
        thumbs.append(img)
    else:
        print(f"Warning: {img_path} not found")

if len(thumbs) < 4:
    print(f"Error: Only found {len(thumbs)} images")
    exit(1)

# Calculate collage dimensions
collage_width = (thumb_width * 2) + (gap * 1) + (border * 2)
collage_height = (thumb_height * 2) + (gap * 1) + (border * 2)

# Create background
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
collage.save(output_path, quality=95, optimize=True)
print(f"Professional collage created: {output_path}")
print(f"Dimensions: {collage_width}x{collage_height}")
print(f"Images used: {len(thumbs)}")
