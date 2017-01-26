# Updating dependencies (JupyterLab)

1. `git pull` jupyterlab
2. `npm install` jupyterlab
3. `pip install -e .` jupyterlab (even though it's a dev install, it looks like
   it needs to be re-run on updates -- the setup script probably generates or
   copis some of the resources...?)
4. check new version number in jupyterlab `package.json`
5. update `jupyterlab` dep version number in `jupyterlab_clash`
6. `dev_install.sh` jupyterlab_clash

It might seem easier to just depend on `"jupyterlab": "*"` in jupyterlab_clash,
but it's nice to be warned about incompatibilities when you mess up one of the
jupyterlab update steps and end up trying to install the extension against an
older version of jupyterlab.
