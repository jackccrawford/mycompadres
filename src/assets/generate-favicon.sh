#!/bin/bash

# Create a directory for temporary files
mkdir -p /tmp/mvara-favicon

# Create a white background circle
convert -size 128x128 xc:transparent -fill white -draw "circle 64,64 64,0" /tmp/mvara-favicon/white-circle.png

# Create the V letter in blue
convert -size 128x128 xc:transparent -fill "#4B9CD3" -font DejaVu-Sans-Bold -pointsize 100 -gravity center -annotate 0 "V" /tmp/mvara-favicon/v-letter.png

# Combine the two
convert /tmp/mvara-favicon/white-circle.png /tmp/mvara-favicon/v-letter.png -composite /tmp/mvara-favicon/final-icon.png

# Create different sizes for PNG
convert /tmp/mvara-favicon/final-icon.png -resize 16x16 /tmp/mvara-favicon/favicon-16.png
convert /tmp/mvara-favicon/final-icon.png -resize 32x32 /tmp/mvara-favicon/favicon-32.png
convert /tmp/mvara-favicon/final-icon.png -resize 64x64 /tmp/mvara-favicon/favicon-64.png

# Create ICO file with multiple sizes
convert /tmp/mvara-favicon/favicon-16.png /tmp/mvara-favicon/favicon-32.png /tmp/mvara-favicon/favicon-64.png /tmp/mvara-favicon/favicon.ico

# Copy files to the destination
cp /tmp/mvara-favicon/favicon-32.png /home/explora/dev/mvllc/git/mvara-hub/mvara-website-rwa/src/assets/favicon.png
cp /tmp/mvara-favicon/favicon.ico /home/explora/dev/mvllc/git/mvara-hub/mvara-website-rwa/src/assets/favicon.ico

echo "Favicons generated and copied successfully!"
