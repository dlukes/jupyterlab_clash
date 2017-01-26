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

# Clash GUI

Currently, there's only one ClashWidget object which is hidden on close and can
be restored via the launcher or the command palette. This object should be
connected to a python kernel which will execute the user's actions (which will
also be globally unique).

In the future though, it may make sense to use a ClashWidgetFactory to allow
users to create multiple corpus exploration interfaces.
