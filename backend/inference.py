# backend/inference.py
import io
import base64
import numpy as np
from PIL import Image, ImageDraw
import torch
import cv2
from scipy.ndimage import binary_dilation
import segmentation_models_pytorch as smp

from unet_wrapper import get_model, DEVICE

# Config - adjust if your training used a different size
INPUT_SIZE = (240, 240)
WEIGHTS_PATH = "models/weights.pt"   # ensure this file exists

model, device = get_model(WEIGHTS_PATH)

# def preprocess_pil(img_pil: Image.Image, size=INPUT_SIZE):
#     # Convert PIL -> RGB -> numpy -> normalized float32
#     img = img_pil.convert("RGB")
#     orig_size = img.size  # (width, height)
#     img = img.resize(size, Image.BILINEAR)
#     arr = np.array(img).astype(np.float32) / 255.0
#     # smp encoders expect ImageNet normalized inputs for encoder pretrained weights.
#     # We'll apply standard ImageNet normalization for EfficientNet-B0 (mean,std)
#     # mean = np.array([0.485, 0.456, 0.406])
#     # std  = np.array([0.229, 0.224, 0.225])
#     # arr = (arr - mean) / std
#     arr = arr / 255.0
#     # HWC -> CHW
#     tensor = torch.from_numpy(arr.transpose(2, 0, 1)).unsqueeze(0).float().to(device)
#     return tensor, orig_size

# def postprocess_mask(mask_tensor, orig_size):
#     # mask_tensor: numpy 2D array in model's input size with values 0..1
#     # threshold at 0.5
#     #mask = (mask_tensor > 0.5).astype(np.uint8)
#     mask = (mask_tensor > 0.35).astype(np.uint8)
#     mask = binary_dilation(mask, iterations=2)
#     # resize back to original image size
#     mask_resized = cv2.resize(mask, orig_size, interpolation=cv2.INTER_NEAREST)
#     return mask_resized

# --- REPLACE preprocess_pil and postprocess_mask WITH THE FOLLOWING ---

def preprocess_pil(img_pil: Image.Image, size=INPUT_SIZE):
    # Convert PIL -> RGB -> numpy -> normalized float32
    img = img_pil.convert("RGB")
    orig_size = img.size  # (width, height)

    # resize only if size is provided (size is (W,H) or (H,W) depending on your convention)
    if size is not None:
        img = img.resize(size, Image.BILINEAR)

    arr = np.array(img).astype(np.float32) / 255.0
    # NOTE: removed ImageNet normalization — using 0..1 as in notebook
    # HWC -> CHW
    tensor = torch.from_numpy(arr.transpose(2, 0, 1)).unsqueeze(0).float().to(device)
    return tensor, orig_size


def postprocess_mask(mask_tensor, orig_size):
    """
    mask_tensor: numpy 2D array in model's input size with values in [0..1]
    orig_size: tuple (width, height) coming from PIL.Image.size
    Returns mask_resized as dtype=np.uint8 with values 0 or 1 and shape (height, width)
    """
    # threshold (choose value that matched your notebook, e.g. 0.35)
    mask = (mask_tensor > 0.35).astype(np.uint8)   # <<< ensure uint8, not bool

    # optional morphological smoothing/dilation to match notebook visuals
    # binary_dilation returns bool, so convert back to uint8
    mask = binary_dilation(mask, iterations=2).astype(np.uint8)

    # cv2.resize expects dsize=(width, height) (ints) and numeric src dtype
    # orig_size is PIL size tuple (width, height)
    if not (isinstance(orig_size, tuple) and len(orig_size) == 2):
        raise ValueError("orig_size must be (width, height) tuple")

    # cv2.resize wants (width, height) for dsize; mask shape is (H_in, W_in)
    mask_resized = cv2.resize(mask, orig_size, interpolation=cv2.INTER_NEAREST)

    # Ensure final mask is shaped as (height, width) with values 0/1 uint8
    # (cv2 returns shape (height, width) already, but ensure dtype)
    mask_resized = (mask_resized > 0).astype(np.uint8)

    return mask_resized


# def mask_to_overlay(original_pil: Image.Image, mask_np: np.ndarray, alpha=0.35):
#     # original_pil: RGB
#     orig = original_pil.convert("RGB")
#     orig_np = np.array(orig).astype(np.uint8)
#     h, w = mask_np.shape
#     overlay = orig_np.copy()
#     # create green overlay where mask==1
#     green = np.zeros_like(overlay)
#     green[..., 1] = 255
#     mask_3ch = np.stack([mask_np]*3, axis=-1)
#     overlay = (overlay * (1 - (mask_3ch * alpha)) + green * (mask_3ch * alpha)).astype(np.uint8)

#     # also draw boundaries (thin) as brighter green lines:
#     from skimage import morphology
#     edges = mask_np - morphology.binary_erosion(mask_np)
#     overlay[edges==1] = [0, 255, 0]

#     pil_overlay = Image.fromarray(overlay)
#     return pil_overlay

def mask_to_overlay(original_pil, mask_np):
    # Convert to array
    orig = np.array(original_pil.convert("RGB")).copy()

    # Extract contour only (no fill)
    from skimage import morphology
    edges = mask_np - morphology.binary_erosion(mask_np)

    # Draw thin green boundary
    orig[edges == 1] = [0, 255, 0]  # bright green contour

    return Image.fromarray(orig)


def tensor_to_base64_png(pil_img: Image.Image):
    buffered = io.BytesIO()
    pil_img.save(buffered, format="PNG")
    b64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{b64}"

def predict_from_pil(img_pil: Image.Image):
    # preprocess
    tensor, orig_size = preprocess_pil(img_pil, size=INPUT_SIZE)
    with torch.no_grad():
        out = model(tensor)   # [1,1,H,W]
        out_np = out.cpu().numpy()[0, 0]
    # postprocess
    mask = postprocess_mask(out_np, orig_size)
    overlay = mask_to_overlay(img_pil, mask)
    # package base64 images
    before_b64 = tensor_to_base64_png(img_pil.convert("RGB"))
    after_b64 = tensor_to_base64_png(overlay)
    return {"before": before_b64, "after": after_b64}
