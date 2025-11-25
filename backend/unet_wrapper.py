# backend/unet_wrapper.py
import torch
import segmentation_models_pytorch as smp

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def get_model(weights_path: str):
    model = smp.Unet(
        encoder_name="efficientnet-b0",
        encoder_weights=None,   # We don't re-download imagenet weights here; model state will be loaded below
        in_channels=3,
        classes=1,
        activation="sigmoid",
    )
    model.to(DEVICE)
    state = torch.load(weights_path, map_location=DEVICE)
    # state could be a state_dict or a full checkpoint; try both:
    if isinstance(state, dict) and ("state_dict" in state or "model_state_dict" in state):
        if "state_dict" in state:
            model.load_state_dict(state["state_dict"])
        elif "model_state_dict" in state:
            model.load_state_dict(state["model_state_dict"])
    else:
        model.load_state_dict(state)
    model.eval()
    return model, DEVICE
