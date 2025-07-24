# hash:sha256:aed31a38c2e6dd894f464cb6ea8c512c474935afb39240061020fc0fce25bc4c
FROM registry.codeocean.com/codeocean/miniconda3:4.9.2-cuda11.7.0-cudnn8-ubuntu20.04

ARG DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6 dos2unix -y

# Install Python dependencies
RUN pip install -U --no-cache-dir --upgrade-strategy=only-if-needed \
    argparse==1.4.0 \
    h5py==3.2.1 \
    imageio==2.9.0 \
    numpy==1.20.3 \
    opencv-python==4.5.3.56 \
    pyyaml==5.4.1 \
    scikit-video==1.1.11 \
    torch \
    torchvision

# Copy and fix postInstall script
COPY postInstall /
RUN dos2unix /postInstall && chmod +x /postInstall

# Execute the postInstall script
RUN /postInstall
