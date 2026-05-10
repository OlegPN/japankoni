#!/usr/bin/env python3
"""
Make checker pattern (white/light-gray squares) transparent in koni PNGs.
Uses flood-fill from edges so internal white parts of Koni stay opaque.
"""
import sys
from pathlib import Path
from PIL import Image
from collections import deque

ROOT = Path(__file__).resolve().parent.parent
IMG_DIRS = [
    ROOT / "public" / "koni",
    ROOT.parent / "img" / "koni",
    ROOT.parent / "docs" / "img" / "koni",
]

# How close a pixel needs to be to (255,255,255) or (203,203,203) to count as checker.
# Keep this tight so we don't eat Koni's white snout/clothing — but those whites are
# typically not connected to the image edge, so flood-fill protects them anyway.
CHECKER_TOLERANCE = 18

def is_checker(rgb):
    r, g, b = rgb[0], rgb[1], rgb[2]
    # Gray-ish (near-equal RGB) AND in the upper range AND close to one of the two checker tones
    if abs(r - g) > 6 or abs(g - b) > 6 or abs(r - b) > 6:
        return False
    avg = (r + g + b) / 3
    if avg < 190:
        return False
    # close to 255 (white square) or close to ~203 (light-gray square)
    return abs(avg - 255) <= CHECKER_TOLERANCE or abs(avg - 203) <= CHECKER_TOLERANCE

def process(path: Path):
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    px = img.load()

    visited = [[False] * h for _ in range(w)]
    q = deque()

    # seed all edge pixels that look like checker
    for x in range(w):
        for y in (0, h - 1):
            if is_checker(px[x, y]):
                q.append((x, y))
                visited[x][y] = True
    for y in range(h):
        for x in (0, w - 1):
            if is_checker(px[x, y]) and not visited[x][y]:
                q.append((x, y))
                visited[x][y] = True

    # 4-connected flood fill: mark every checker pixel reachable from the edge
    while q:
        x, y = q.popleft()
        # erase: full transparency
        px[x, y] = (255, 255, 255, 0)
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny] and is_checker(px[nx, ny]):
                visited[nx][ny] = True
                q.append((nx, ny))

    img.save(path, "PNG")
    print(f"  ✓ {path.name}")

def main():
    targets = []
    for d in IMG_DIRS:
        if d.exists():
            targets += sorted(d.glob("koni-*.png"))
    if not targets:
        print("No koni-*.png found")
        return 1
    print(f"Processing {len(targets)} files…")
    for p in targets:
        process(p)
    return 0

if __name__ == "__main__":
    sys.exit(main())
