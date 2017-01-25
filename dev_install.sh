#!/bin/sh

npm install
pip install -e .
jupyter labextension install --symlink --py --sys-prefix jupyterlab_clash
jupyter labextension enable --py --sys-prefix jupyterlab_clash
