# EarlySteps

# DeepLearning Model : capsule-6073072

# Webapp : app {app(nextjs) deprecated}

docker build -t cuda-env .

docker run --gpus all -it cuda-env

docker run --gpus all -it -v 'D:\EarlySteps\capsule-6073072:/workspace' cuda-env

\---------------------------

next steps

python start.py , you get some errors which can be fixed by these cmds

cd /workspace/code/torchlight  
python setup.py install  
cd ..

pip install --upgrade numpy  
pip install "numpy>=1.20"
