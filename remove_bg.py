from PIL import Image
import numpy as np

def remove_black_background(input_path, output_path, threshold=50):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # Get RGB values
    r, g, b, a = data.T
    
    # Calculate brightness/intensity of pixels
    # We want to keep non-black pixels.
    # Simple heuristic: if pixel is very dark, it's background.
    # Interactive/smooth removal: Use the max channel value as alpha?
    # For a glowing neon chart on black, 'Screen' blend mode logic is: Alpha = Max(R, G, B)
    # Let's try to simulate that for a PNG.
    
    # Strategy: Set Alpha based on brightness.
    # This works well for glow effects on black.
    
    # Calculate max of RGB channels
    max_rgb = np.max(data[:, :, :3], axis=2)
    
    # Replace the alpha channel with the max_rgb value
    # This effectively makes black (0,0,0) transparent (0)
    # And bright colors opaque.
    # We might want to boost opacity slightly to avoid semi-transparent look on mid-tones.
    
    new_alpha = max_rgb.astype(float)
    
    # Boost alpha curve to make solid parts more opaque
    # y = x^0.5 (gamma correction) or similar?
    # Let's just linearly scale so that anything above 'threshold' becomes more opaque?
    # Actually, the 'screen' logic is best preserved by just setting A = brightness.
    # But let's make sure vivid colors aren't too transparent.
    
    # Let's use a simpler approach for the 'solid' parts of the chart (the bars/arrow).
    # They should be fully opaque.
    # The glow should be semi-transparent.
    
    # Mask for black background
    black_mask = (r < threshold) & (g < threshold) & (b < threshold)
    
    # Create new alpha channel
    # Default to 255
    data[:, :, 3] = 255
    
    # Identify background pixels and make them transparent
    # But this is hard with glow/anti-aliasing.
    
    # Better approach for neon on black:
    # 1. Colors are additive.
    # 2. We want to preserve the color but remove the black.
    
    # Let's stick to the 'Luminance to Alpha' trick which is standard for this.
    data[:, :, 3] = max_rgb
    
    # Save
    new_img = Image.fromarray(data)
    new_img.save(output_path)
    print(f"Saved transparent logo to {output_path}")

if __name__ == "__main__":
    remove_black_background(
        r"c:\Users\kamal\Downloads\YourWebPartner-main (3)\YourWebPartner-main (2)\YourWebPartner-main\src\assets\logo-main.png",
        r"c:\Users\kamal\Downloads\YourWebPartner-main (3)\YourWebPartner-main (2)\YourWebPartner-main\src\assets\logo-final-transparent.png"
    )
